#!/usr/bin/env python3
"""
MedKitt Update Handler
Compares scraped data to current consults and manages updates.

Usage:
    python scraper/updater.py --dry-run
    python scraper/updater.py --apply
    python scraper/updater.py --status
"""

import os
import sys
import json
import re
import argparse
import logging
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Any, Tuple
from dataclasses import dataclass
import subprocess

import yaml

# =============================================================================
# CONFIGURATION & SETUP
# =============================================================================

BASE_DIR = Path(__file__).parent.parent
CONFIG_PATH = BASE_DIR / "scraper" / "config.yaml"
DATA_DIR = BASE_DIR / "scraper" / "data"
RAW_DIR = DATA_DIR / "raw"
PROCESSED_DIR = DATA_DIR / "processed"
REVIEW_QUEUE_FILE = DATA_DIR / "review_queue.json"
LOGS_DIR = BASE_DIR / "scraper" / "logs"
SRC_DIR = BASE_DIR / "src"

# Ensure directories exist
for d in [PROCESSED_DIR, LOGS_DIR]:
    d.mkdir(parents=True, exist_ok=True)

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOGS_DIR / f"updater_{datetime.now():%Y%m%d_%H%M%S}.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("MedKittUpdater")

# =============================================================================
# DATA CLASSES
# =============================================================================

@dataclass
class UpdateCandidate:
    """Represents a potential update to a consult"""
    consult_id: str
    source_id: str
    change_type: str  # 'minor', 'major', 'critical'
    change_percentage: float
    current_version: str
    proposed_changes: Dict[str, Any]
    reason: str
    timestamp: str
    auto_approved: bool = False
    requires_review: bool = False

@dataclass
class ConsultData:
    """Represents a consult's current data"""
    consult_id: str
    name: str
    file_path: Path
    content: str
    nodes: List[Dict]
    version: str
    keywords: List[str]

# =============================================================================
# UPDATE HANDLER CLASS
# =============================================================================

class MedKittUpdater:
    """Handles comparing scraped data to consults and managing updates"""
    
    def __init__(self, config_path: str = None):
        self.config = self._load_config(config_path or CONFIG_PATH)
        self.review_queue = self._load_review_queue()
    
    def _load_config(self, path: Path) -> Dict:
        """Load YAML configuration"""
        with open(path, 'r') as f:
            return yaml.safe_load(f)
    
    def _load_review_queue(self) -> List[Dict]:
        """Load pending review queue"""
        if REVIEW_QUEUE_FILE.exists():
            with open(REVIEW_QUEUE_FILE, 'r') as f:
                return json.load(f)
        return []
    
    def _save_review_queue(self):
        """Save review queue to disk"""
        with open(REVIEW_QUEUE_FILE, 'w') as f:
            json.dump(self.review_queue, f, indent=2)
    
    def _load_consult(self, consult_id: str) -> Optional[ConsultData]:
        """Load a consult from TypeScript file"""
        consults = self.config.get('consults', {})
        
        if consult_id not in consults:
            logger.error(f"Consult {consult_id} not found in configuration")
            return None
        
        consult_config = consults[consult_id]
        file_path = BASE_DIR / consult_config['file']
        
        if not file_path.exists():
            logger.error(f"Consult file not found: {file_path}")
            return None
        
        content = file_path.read_text()
        
        # Parse nodes from TypeScript file
        nodes = self._parse_ts_nodes(content)
        
        # Extract version
        version_match = re.search(r'version:\s*[\'"]([\d.]+)[\'"]', content)
        version = version_match.group(1) if version_match else '1.0'
        
        return ConsultData(
            consult_id=consult_id,
            name=consult_config['name'],
            file_path=file_path,
            content=content,
            nodes=nodes,
            version=version,
            keywords=consult_config.get('keywords', [])
        )
    
    def _parse_ts_nodes(self, content: str) -> List[Dict]:
        """Extract nodes from TypeScript decision tree file"""
        nodes = []
        
        # Find the NODES array
        match = re.search(r'export\s+const\s+\w+_NODES\s*:\s*DecisionNode\[\]\s*=\s*(\[[\s\S]*?\]);', content)
        if not match:
            return nodes
        
        # Simple parsing - extract node objects
        node_pattern = r'\{\s*id:\s*[\'"]([^\'"]+)[\'"]'
        for m in re.finditer(node_pattern, content):
            node_id = m.group(1)
            # Find the full node object (simplified)
            node_start = m.start()
            node_end = content.find('},', node_start)
            if node_end == -1:
                node_end = content.find('}\n', node_start)
            
            node_content = content[node_start:node_end+1]
            
            # Extract key fields
            node = {'id': node_id}
            
            # Type
            type_match = re.search(r'type:\s*[\'](\w+)[\']', node_content)
            if type_match:
                node['type'] = type_match.group(1)
            
            # Title
            title_match = re.search(r'title:\s*[\']([^\']+)[\']', node_content)
            if title_match:
                node['title'] = title_match.group(1)
            
            # Body
            body_match = re.search(r'body:\s*[\']([^\']+)[\']', node_content)
            if body_match:
                node['body'] = body_match.group(1)
            
            # Citations
            citation_match = re.search(r'citation:\s*\[([^\]]+)\]', node_content)
            if citation_match:
                citations_str = citation_match.group(1)
                node['citations'] = [int(c.strip()) for c in citations_str.split(',')]
            
            nodes.append(node)
        
        return nodes
    
    def _extract_treatment_tables(self, raw_data: Dict) -> List[Dict]:
        """Extract treatment tables from scraped CDC data"""
        tables = raw_data.get('tables', [])
        treatment_tables = []
        
        for table in tables:
            if not table:
                continue
            
            # Look for treatment-related headers
            headers = table[0] if table else []
            is_treatment_table = any(
                keyword in ' '.join(headers).lower()
                for keyword in ['treatment', 'regimen', 'therapy', 'drug', 'dose', 'duration']
            )
            
            if is_treatment_table:
                treatment_tables.append({
                    'headers': headers,
                    'rows': table[1:] if len(table) > 1 else []
                })
        
        return treatment_tables
    
    def _extract_cdc_updates(self, raw_data: Dict) -> List[Dict]:
        """Extract CDC guideline updates from scraped data"""
        content = raw_data.get('content', '')
        updates = []
        
        # Look for revision dates
        revision_patterns = [
            r'[Ll]ast [Uu]pdated?[:\s]+([A-Za-z]+ \d{1,2},? \d{4})',
            r'[Rr]evised?[:\s]+([A-Za-z]+ \d{1,2},? \d{4})',
            r'[Uu]pdated?[:\s]+([A-Za-z]+ \d{4})',
        ]
        
        for pattern in revision_patterns:
            matches = re.findall(pattern, content)
            for match in matches:
                updates.append({
                    'type': 'revision_date',
                    'date': match,
                    'context': content[max(0, content.find(match)-50):content.find(match)+len(match)+50]
                })
        
        # Look for key guideline changes
        change_keywords = [
            'recommendation', 'guideline', 'updated', 'revised', 'changed',
            'new recommendation', 'key changes', 'what\'s new'
        ]
        
        for keyword in change_keywords:
            if keyword in content.lower():
                # Find context around keyword
                idx = content.lower().find(keyword)
                context = content[max(0, idx-100):idx+200]
                updates.append({
                    'type': 'guideline_change',
                    'keyword': keyword,
                    'context': context
                })
        
        return updates
    
    def _compare_with_consult(self, consult: ConsultData, raw_data: Dict) -> Dict[str, Any]:
        """Compare scraped data with existing consult data"""
        differences = {
            'new_tables': [],
            'modified_content': [],
            'new_citations': [],
            'keyword_matches': []
        }
        
        # Extract treatment tables from scraped data
        treatment_tables = self._extract_treatment_tables(raw_data)
        
        # Compare with existing consult content
        consult_text = consult.content.lower()
        
        for table in treatment_tables:
            table_text = ' '.join([' '.join(row) for row in table['rows']]).lower()
            
            # Check if table content is new
            is_new = True
            for existing_node in consult.nodes:
                existing_body = existing_node.get('body', '').lower()
                # Simple similarity check
                if table_text[:100] in existing_body:
                    is_new = False
                    break
            
            if is_new:
                differences['new_tables'].append(table)
        
        # Check for keyword matches in scraped content
        content = raw_data.get('content', '').lower()
        for keyword in consult.keywords:
            if keyword.lower() in content:
                differences['keyword_matches'].append(keyword)
        
        # Extract CDC updates
        cdc_updates = self._extract_cdc_updates(raw_data)
        if cdc_updates:
            differences['cdc_updates'] = cdc_updates
        
        return differences
    
    def analyze_changes(self, source_id: str, raw_data_file: Optional[Path] = None) -> List[UpdateCandidate]:
        """Analyze changes from a scraped source and identify update candidates"""
        candidates = []
        
        # Get source config
        sources = self.config.get('sources', {})
        if source_id not in sources:
            logger.error(f"Source {source_id} not found")
            return candidates
        
        source_config = sources[source_id]
        affected_consults = source_config.get('consults', [])
        
        if not affected_consults:
            logger.info(f"No consults mapped to source {source_id}")
            return candidates
        
        # Load raw data
        if raw_data_file is None:
            # Find most recent raw file
            raw_files = sorted(RAW_DIR.glob(f"{source_id}_*.json"), reverse=True)
            if not raw_files:
                logger.error(f"No raw data found for {source_id}")
                return candidates
            raw_data_file = raw_files[0]
        
        with open(raw_data_file, 'r') as f:
            raw_data = json.load(f)
        
        # Analyze each affected consult
        for consult_id in affected_consults:
            consult = self._load_consult(consult_id)
            if not consult:
                continue
            
            # Compare data
            differences = self._compare_with_consult(consult, raw_data)
            
            # Determine if update is needed
            if not any(differences.values()):
                logger.info(f"No changes detected for {consult_id}")
                continue
            
            # Calculate change metrics
            new_tables_count = len(differences.get('new_tables', []))
            keyword_match_count = len(differences.get('keyword_matches', []))
            
            # Determine change type based on rules
            consults_config = self.config.get('consults', {})
            consult_config = consults_config.get(consult_id, {})
            update_rules = consult_config.get('update_rules', [])
            
            change_type = 'minor'
            auto_approve = False
            requires_review = False
            
            if new_tables_count > 0:
                # Check treatment table rules
                for rule in update_rules:
                    if rule.get('type') == 'treatment_table':
                        threshold = rule.get('threshold', 'minor')
                        if threshold in ['major', 'critical']:
                            change_type = threshold
                        auto_approve = rule.get('auto_update', False)
                        break
            
            # If changes are significant, require review
            if change_type in ['major', 'critical']:
                requires_review = not auto_approve
            
            # Create update candidate
            reason = f"Detected {new_tables_count} new treatment tables, {keyword_match_count} keyword matches"
            if differences.get('cdc_updates'):
                reason += f", {len(differences['cdc_updates'])} CDC guideline updates"
            
            candidate = UpdateCandidate(
                consult_id=consult_id,
                source_id=source_id,
                change_type=change_type,
                change_percentage=0.0,  # Calculated elsewhere
                current_version=consult.version,
                proposed_changes=differences,
                reason=reason,
                timestamp=datetime.now().isoformat(),
                auto_approved=auto_approve,
                requires_review=requires_review
            )
            
            candidates.append(candidate)
        
        return candidates
    
    def queue_for_review(self, candidate: UpdateCandidate):
        """Add an update candidate to the review queue"""
        self.review_queue.append({
            'consult_id': candidate.consult_id,
            'source_id': candidate.source_id,
            'change_type': candidate.change_type,
            'reason': candidate.reason,
            'proposed_changes': candidate.proposed_changes,
            'timestamp': candidate.timestamp,
            'status': 'pending_review'
        })
        self._save_review_queue()
        logger.info(f"Queued {candidate.consult_id} for review")
    
    def apply_minor_update(self, candidate: UpdateCandidate, dry_run: bool = True) -> bool:
        """Apply a minor update to a consult"""
        consult = self._load_consult(candidate.consult_id)
        if not consult:
            return False
        
        logger.info(f"{'[DRY RUN] ' if dry_run else ''}Applying update to {candidate.consult_id}")
        logger.info(f"  Reason: {candidate.reason}")
        
        if dry_run:
            return True
        
        # Load the TypeScript file
        content = consult.content
        
        # Add update metadata comment
        update_comment = f"""
// AUTO-UPDATE: {datetime.now().isoformat()}
// Source: {candidate.source_id}
// Changes: {candidate.reason}
"""
        
        # Insert after imports
        import_end = content.find('export const')
        if import_end > 0:
            content = content[:import_end] + update_comment + '\n' + content[import_end:]
        
        # Write updated file
        consult.file_path.write_text(content)
        
        # Also update JSON export
        self._export_consult_json(consult)
        
        logger.info(f"Applied update to {candidate.consult_id}")
        return True
    
    def _export_consult_json(self, consult: ConsultData):
        """Export consult to JSON format for PWA consumption"""
        consults_config = self.config.get('consults', {})
        consult_config = consults_config.get(consult.consult_id, {})
        json_path = BASE_DIR / consult_config.get('json_output', f'src/data/consults/{consult.consult_id}.json')
        
        # Ensure directory exists
        json_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Export data
        export_data = {
            'id': consult.consult_id,
            'name': consult.name,
            'version': consult.version,
            'last_updated': datetime.now().isoformat(),
            'nodes': consult.nodes,
            'keywords': consult.keywords
        }
        
        with open(json_path, 'w') as f:
            json.dump(export_data, f, indent=2)
        
        logger.info(f"Exported {consult.consult_id} to {json_path}")
    
    def process_all_sources(self, dry_run: bool = True) -> Dict[str, Any]:
        """Process all sources and handle updates"""
        results = {
            'processed': 0,
            'auto_updated': 0,
            'queued_for_review': 0,
            'no_changes': 0,
            'errors': 0,
            'details': []
        }
        
        sources = self.config.get('sources', {})
        
        for source_id in sources:
            try:
                candidates = self.analyze_changes(source_id)
                results['processed'] += 1
                
                for candidate in candidates:
                    detail = {
                        'consult_id': candidate.consult_id,
                        'source_id': source_id,
                        'change_type': candidate.change_type,
                        'auto_approved': candidate.auto_approved
                    }
                    
                    if candidate.requires_review:
                        self.queue_for_review(candidate)
                        results['queued_for_review'] += 1
                        detail['action'] = 'queued_for_review'
                    elif candidate.auto_approved or candidate.change_type == 'minor':
                        success = self.apply_minor_update(candidate, dry_run=dry_run)
                        if success:
                            results['auto_updated'] += 1
                            detail['action'] = 'auto_updated' if not dry_run else 'would_auto_update'
                    
                    results['details'].append(detail)
                
                if not candidates:
                    results['no_changes'] += 1
                    
            except Exception as e:
                logger.error(f"Error processing {source_id}: {e}")
                results['errors'] += 1
        
        return results
    
    def commit_changes(self, message: str = None) -> bool:
        """Commit changes to Git repository"""
        try:
            if message is None:
                message = f"[AUTO-SCRAPER] Update consults - {datetime.now().isoformat()}"
            
            # Add files
            subprocess.run(['git', 'add', 'src/data/consults/'], cwd=BASE_DIR, check=True)
            subprocess.run(['git', 'add', 'scraper/data/'], cwd=BASE_DIR, check=True)
            
            # Check if there are changes to commit
            result = subprocess.run(
                ['git', 'diff', '--cached', '--quiet'],
                cwd=BASE_DIR,
                capture_output=True
            )
            
            if result.returncode == 0:
                logger.info("No changes to commit")
                return True
            
            # Commit
            subprocess.run(['git', 'commit', '-m', message], cwd=BASE_DIR, check=True)
            logger.info(f"Committed changes: {message}")
            
            return True
            
        except subprocess.CalledProcessError as e:
            logger.error(f"Git error: {e}")
            return False
    
    def get_status(self) -> Dict[str, Any]:
        """Get current status of the update system"""
        return {
            'pending_reviews': len(self.review_queue),
            'review_items': [
                {
                    'consult_id': item['consult_id'],
                    'change_type': item['change_type'],
                    'timestamp': item['timestamp'],
                    'status': item['status']
                }
                for item in self.review_queue[-5:]  # Last 5
            ],
            'consults_tracked': list(self.config.get('consults', {}).keys()),
            'sources_monitored': list(self.config.get('sources', {}).keys())
        }

# =============================================================================
# COMMAND LINE INTERFACE
# =============================================================================

def main():
    parser = argparse.ArgumentParser(description='MedKitt Update Handler')
    parser.add_argument('--dry-run', action='store_true', help='Simulate without applying changes')
    parser.add_argument('--apply', action='store_true', help='Apply detected updates')
    parser.add_argument('--status', action='store_true', help='Show current status')
    parser.add_argument('--source', help='Process specific source')
    parser.add_argument('--commit', action='store_true', help='Commit changes to git')
    
    args = parser.parse_args()
    
    updater = MedKittUpdater()
    
    if args.status:
        status = updater.get_status()
        print("\n" + "=" * 60)
        print("MEDKITT UPDATER STATUS")
        print("=" * 60)
        print(f"Pending reviews: {status['pending_reviews']}")
        print(f"Consults tracked: {len(status['consults_tracked'])}")
        print(f"Sources monitored: {len(status['sources_monitored'])}")
        
        if status['review_items']:
            print("\nRecent review items:")
            for item in status['review_items']:
                print(f"  - {item['consult_id']} ({item['change_type']}) - {item['status']}")
    
    elif args.source:
        print(f"Analyzing source: {args.source}")
        candidates = updater.analyze_changes(args.source)
        
        if candidates:
            print(f"\nFound {len(candidates)} update candidates:")
            for c in candidates:
                print(f"\n  {c.consult_id}")
                print(f"    Type: {c.change_type}")
                print(f"    Reason: {c.reason}")
                print(f"    Auto-approved: {c.auto_approved}")
                print(f"    Requires review: {c.requires_review}")
                
                if args.apply and not c.requires_review:
                    updater.apply_minor_update(c, dry_run=False)
                elif args.apply and c.requires_review:
                    updater.queue_for_review(c)
        else:
            print("No updates detected")
    
    elif args.apply or args.dry_run:
        print(f"{'[DRY RUN] ' if args.dry_run else ''}Processing all sources...")
        results = updater.process_all_sources(dry_run=args.dry_run)
        
        print("\n" + "=" * 60)
        print("UPDATE SUMMARY")
        print("=" * 60)
        print(f"Sources processed: {results['processed']}")
        print(f"Auto-updates: {results['auto_updated']}")
        print(f"Queued for review: {results['queued_for_review']}")
        print(f"No changes: {results['no_changes']}")
        print(f"Errors: {results['errors']}")
        
        if results['details']:
            print("\nDetails:")
            for detail in results['details']:
                print(f"  {detail['consult_id']}: {detail['action']}")
        
        if args.commit and not args.dry_run:
            updater.commit_changes()
    
    else:
        parser.print_help()

if __name__ == '__main__':
    main()
