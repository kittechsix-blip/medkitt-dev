#!/usr/bin/env python3
"""
MedKitt Scrapling Service
Automated content scraping from CDC, FDA, and PubMed sources.

Usage:
    python scraper/service.py --source cdc_sti_guidelines
    python scraper/service.py --all
    python scraper/service.py --test
"""

import os
import sys
import json
import hashlib
import logging
import argparse
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
from urllib.parse import urljoin, urlparse
import time
import re

import yaml
import requests
from Bio import Entrez

# Try to import Scrapling
try:
    from scrapling.fetchers import StealthyFetcher
    SCRAPLING_AVAILABLE = True
except ImportError:
    SCRAPLING_AVAILABLE = False
    print("Warning: Scrapling not available. Install with: pip install scrapling")

# =============================================================================
# CONFIGURATION & SETUP
# =============================================================================

BASE_DIR = Path(__file__).parent.parent
CONFIG_PATH = BASE_DIR / "scraper" / "config.yaml"
DATA_DIR = BASE_DIR / "scraper" / "data"
RAW_DIR = DATA_DIR / "raw"
HASHES_DIR = DATA_DIR / "hashes"
LOGS_DIR = BASE_DIR / "scraper" / "logs"

# Ensure directories exist
for d in [RAW_DIR, HASHES_DIR, LOGS_DIR]:
    d.mkdir(parents=True, exist_ok=True)

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOGS_DIR / f"scraper_{datetime.now():%Y%m%d_%H%M%S}.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("MedKittScraper")

# =============================================================================
# DATA CLASSES
# =============================================================================

@dataclass
class ScrapeResult:
    """Result of a scraping operation"""
    source_id: str
    source_name: str
    url: str
    timestamp: str
    status: str  # 'success', 'error', 'unchanged'
    content_hash: str
    previous_hash: Optional[str]
    data: Dict[str, Any]
    error: Optional[str] = None
    change_detected: bool = False
    change_percentage: float = 0.0
    
@dataclass
class ChangeReport:
    """Report of changes detected"""
    source_id: str
    source_name: str
    change_type: str  # 'minor', 'major', 'critical'
    change_percentage: float
    affected_consults: List[str]
    summary: str
    raw_changes: Dict[str, Any]
    timestamp: str

# =============================================================================
# SCRAPER CLASS
# =============================================================================

class MedKittScraper:
    """Main scraper class using Scrapling for content extraction"""
    
    def __init__(self, config_path: str = None):
        self.config = self._load_config(config_path or CONFIG_PATH)
        self.fetcher = None
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': self.config['scraper']['user_agent']
        })
        
        if SCRAPLING_AVAILABLE:
            self.fetcher = StealthyFetcher(
                adaptive=True,
                headless=True
            )
            logger.info("Scrapling StealthyFetcher initialized")
        
        # Set up PubMed
        Entrez.email = "medkitt-research@example.com"
        Entrez.tool = "MedKittScraper/1.0"
    
    def _load_config(self, path: Path) -> Dict:
        """Load YAML configuration"""
        with open(path, 'r') as f:
            return yaml.safe_load(f)
    
    def _get_hash(self, content: str) -> str:
        """Generate hash for content comparison"""
        return hashlib.sha256(content.encode('utf-8')).hexdigest()
    
    def _get_previous_hash(self, source_id: str) -> Optional[str]:
        """Get previous content hash for a source"""
        hash_file = HASHES_DIR / f"{source_id}.hash"
        if hash_file.exists():
            return hash_file.read_text().strip()
        return None
    
    def _save_hash(self, source_id: str, content_hash: str):
        """Save content hash for future comparison"""
        hash_file = HASHES_DIR / f"{source_id}.hash"
        hash_file.write_text(content_hash)
    
    def _calculate_change_percentage(self, old_content: str, new_content: str) -> float:
        """Calculate percentage of content change using difflib"""
        if not old_content:
            return 1.0 if new_content else 0.0
        
        import difflib
        seq = difflib.SequenceMatcher(None, old_content, new_content)
        return 1.0 - seq.ratio()
    
    def _save_raw_data(self, source_id: str, data: Dict):
        """Save raw scraped data"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        raw_file = RAW_DIR / f"{source_id}_{timestamp}.json"
        with open(raw_file, 'w') as f:
            json.dump(data, f, indent=2, default=str)
        logger.info(f"Raw data saved to {raw_file}")
        return raw_file
    
    # ======================================================================
    # CDC SCRAPING
    # ======================================================================
    
    def scrape_cdc(self, source_id: str, source_config: Dict) -> ScrapeResult:
        """Scrape CDC guideline pages"""
        url = source_config['url']
        logger.info(f"Scraping CDC source: {source_id} from {url}")
        
        try:
            if self.fetcher:
                # Use Scrapling for adaptive parsing
                page = self.fetcher.fetch(url, auto_save=True)
                
                # Extract content using adaptive CSS selectors
                content_blocks = []
                for selector in source_config.get('selectors', {}).get('content', '').split(','):
                    selector = selector.strip()
                    if selector:
                        blocks = page.css(selector, adaptive=True)
                        content_blocks.extend(blocks)
                
                # Extract tables
                tables = []
                table_selectors = source_config.get('selectors', {}).get('tables', 'table')
                for selector in table_selectors.split(','):
                    selector = selector.strip()
                    if selector:
                        table_elements = page.css(selector, adaptive=True)
                        for table in table_elements:
                            tables.append(self._parse_table(table))
                
                # Get page text content
                text_content = ' '.join([block.text for block in content_blocks if hasattr(block, 'text')])
                
                # Extract last updated date if available
                last_updated = None
                for update_selector in source_config.get('selectors', {}).get('updates', '').split(','):
                    update_selector = update_selector.strip()
                    if update_selector:
                        update_elem = page.css_first(update_selector, adaptive=True)
                        if update_elem:
                            last_updated = update_elem.text
                            break
                
                data = {
                    'source': 'cdc',
                    'url': url,
                    'title': page.title if hasattr(page, 'title') else '',
                    'content': text_content,
                    'tables': tables,
                    'last_updated': last_updated,
                    'scraped_at': datetime.now().isoformat()
                }
            else:
                # Fallback to requests + BeautifulSoup
                response = self.session.get(url, timeout=self.config['scraper']['timeout'])
                response.raise_for_status()
                
                from bs4 import BeautifulSoup
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # Extract content
                text_content = soup.get_text(separator=' ', strip=True)
                
                # Extract tables
                tables = []
                for table in soup.find_all('table'):
                    tables.append(self._parse_table_bs4(table))
                
                data = {
                    'source': 'cdc',
                    'url': url,
                    'title': soup.title.string if soup.title else '',
                    'content': text_content,
                    'tables': tables,
                    'scraped_at': datetime.now().isoformat()
                }
            
            # Calculate hash and detect changes
            content_str = json.dumps(data, sort_keys=True)
            content_hash = self._get_hash(content_str)
            previous_hash = self._get_previous_hash(source_id)
            
            # Load previous content for comparison
            old_content = ""
            if previous_hash:
                # Find most recent raw file
                raw_files = sorted(RAW_DIR.glob(f"{source_id}_*.json"), reverse=True)
                if raw_files:
                    try:
                        with open(raw_files[0], 'r') as f:
                            old_data = json.load(f)
                            old_content = old_data.get('content', '')
                    except:
                        pass
            
            change_percentage = self._calculate_change_percentage(old_content, data['content'])
            change_detected = content_hash != previous_hash
            
            # Save data and hash
            self._save_raw_data(source_id, data)
            self._save_hash(source_id, content_hash)
            
            return ScrapeResult(
                source_id=source_id,
                source_name=source_config['name'],
                url=url,
                timestamp=datetime.now().isoformat(),
                status='success',
                content_hash=content_hash,
                previous_hash=previous_hash,
                data=data,
                change_detected=change_detected,
                change_percentage=change_percentage
            )
            
        except Exception as e:
            logger.error(f"Error scraping {source_id}: {e}")
            return ScrapeResult(
                source_id=source_id,
                source_name=source_config['name'],
                url=url,
                timestamp=datetime.now().isoformat(),
                status='error',
                content_hash='',
                previous_hash=None,
                data={},
                error=str(e)
            )
    
    def _parse_table(self, table_element) -> List[List[str]]:
        """Parse HTML table from Scrapling element"""
        rows = []
        try:
            for row in table_element.css('tr'):
                cells = []
                for cell in row.css('td, th'):
                    cells.append(cell.text.strip() if hasattr(cell, 'text') else '')
                if cells:
                    rows.append(cells)
        except:
            pass
        return rows
    
    def _parse_table_bs4(self, table_element) -> List[List[str]]:
        """Parse HTML table from BeautifulSoup element"""
        rows = []
        for row in table_element.find_all('tr'):
            cells = [cell.get_text(strip=True) for cell in row.find_all(['td', 'th'])]
            if cells:
                rows.append(cells)
        return rows
    
    # ======================================================================
    # FDA SCRAPING
    # ======================================================================
    
    def scrape_fda(self, source_id: str, source_config: Dict) -> ScrapeResult:
        """Scrape FDA safety alerts and drug information"""
        url = source_config['url']
        logger.info(f"Scraping FDA source: {source_id} from {url}")
        
        try:
            response = self.session.get(url, timeout=self.config['scraper']['timeout'])
            response.raise_for_status()
            
            from bs4 import BeautifulSoup
            soup = BeautifulSoup(response.content, 'html.parser')
            
            alerts = []
            drug_keywords = source_config.get('drug_keywords', [])
            
            # Extract alerts
            alert_selectors = source_config.get('selectors', {}).get('alerts', '.views-row')
            for selector in alert_selectors.split(','):
                selector = selector.strip()
                if not selector:
                    continue
                    
                for alert_elem in soup.select(selector):
                    alert_text = alert_elem.get_text(separator=' ', strip=True)
                    alert_link = alert_elem.find('a')
                    alert_url = urljoin(url, alert_link['href']) if alert_link and alert_link.has_attr('href') else url
                    
                    # Check if alert mentions relevant drugs
                    mentioned_drugs = [kw for kw in drug_keywords if kw.lower() in alert_text.lower()]
                    
                    if mentioned_drugs:
                        alerts.append({
                            'title': alert_text[:200],
                            'url': alert_url,
                            'mentioned_drugs': mentioned_drugs,
                            'full_text': alert_text
                        })
            
            data = {
                'source': 'fda',
                'url': url,
                'alerts': alerts,
                'alert_count': len(alerts),
                'drugs_monitored': drug_keywords,
                'scraped_at': datetime.now().isoformat()
            }
            
            # Hash and save
            content_str = json.dumps(data, sort_keys=True)
            content_hash = self._get_hash(content_str)
            previous_hash = self._get_previous_hash(source_id)
            
            self._save_raw_data(source_id, data)
            self._save_hash(source_id, content_hash)
            
            return ScrapeResult(
                source_id=source_id,
                source_name=source_config['name'],
                url=url,
                timestamp=datetime.now().isoformat(),
                status='success',
                content_hash=content_hash,
                previous_hash=previous_hash,
                data=data,
                change_detected=content_hash != previous_hash
            )
            
        except Exception as e:
            logger.error(f"Error scraping FDA {source_id}: {e}")
            return ScrapeResult(
                source_id=source_id,
                source_name=source_config['name'],
                url=url,
                timestamp=datetime.now().isoformat(),
                status='error',
                content_hash='',
                previous_hash=None,
                data={},
                error=str(e)
            )
    
    # ======================================================================
    # PUBMED SCRAPING
    # ======================================================================
    
    def scrape_pubmed(self, source_id: str, source_config: Dict) -> ScrapeResult:
        """Search PubMed for recent evidence"""
        search_query = source_config.get('search_query', '')
        max_results = source_config.get('max_results', 10)
        
        logger.info(f"Searching PubMed: {source_id} - Query: {search_query[:50]}...")
        
        try:
            # Search PubMed
            handle = Entrez.esearch(
                db='pubmed',
                term=search_query,
                retmax=max_results,
                sort='date'
            )
            record = Entrez.read(handle)
            handle.close()
            
            id_list = record.get('IdList', [])
            
            if not id_list:
                return ScrapeResult(
                    source_id=source_id,
                    source_name=source_config['name'],
                    url=source_config['url'],
                    timestamp=datetime.now().isoformat(),
                    status='success',
                    content_hash='',
                    previous_hash=None,
                    data={'articles': [], 'count': 0}
                )
            
            # Fetch article details
            handle = Entrez.efetch(
                db='pubmed',
                id=id_list,
                rettype='abstract',
                retmode='xml'
            )
            articles_data = Entrez.read(handle)
            handle.close()
            
            articles = []
            for article in articles_data.get('PubmedArticle', []):
                try:
                    medline = article.get('MedlineCitation', {})
                    article_data = medline.get('Article', {})
                    
                    # Extract title
                    title = ''
                    title_data = article_data.get('ArticleTitle', '')
                    if isinstance(title_data, list):
                        title = ' '.join([str(t) for t in title_data])
                    else:
                        title = str(title_data)
                    
                    # Extract abstract
                    abstract = ''
                    abstract_data = article_data.get('Abstract', {})
                    if abstract_data:
                        abstract_text = abstract_data.get('AbstractText', [])
                        if isinstance(abstract_text, list):
                            abstract = ' '.join([str(a) for a in abstract_text])
                        else:
                            abstract = str(abstract_text)
                    
                    # Extract authors
                    authors = []
                    author_list = article_data.get('AuthorList', [])
                    for author in author_list[:3]:  # First 3 authors
                        last_name = author.get('LastName', '')
                        initials = author.get('Initials', '')
                        if last_name:
                            authors.append(f"{last_name} {initials}")
                    
                    # Extract PMID
                    pmid = medline.get('PMID', '')
                    
                    # Extract publication date
                    pub_date = ''
                    journal = article_data.get('Journal', {})
                    journal_issue = journal.get('JournalIssue', {})
                    pub_date_data = journal_issue.get('PubDate', {})
                    if pub_date_data:
                        year = pub_date_data.get('Year', '')
                        month = pub_date_data.get('Month', '')
                        pub_date = f"{year} {month}".strip()
                    
                    articles.append({
                        'pmid': str(pmid),
                        'title': title,
                        'abstract': abstract[:500] + '...' if len(abstract) > 500 else abstract,
                        'authors': authors,
                        'publication_date': pub_date,
                        'url': f"https://pubmed.ncbi.nlm.nih.gov/{pmid}/"
                    })
                except Exception as e:
                    logger.warning(f"Error parsing article: {e}")
                    continue
            
            data = {
                'source': 'pubmed',
                'query': search_query,
                'articles': articles,
                'count': len(articles),
                'scraped_at': datetime.now().isoformat()
            }
            
            # Hash and save
            content_str = json.dumps(data, sort_keys=True)
            content_hash = self._get_hash(content_str)
            previous_hash = self._get_previous_hash(source_id)
            
            self._save_raw_data(source_id, data)
            self._save_hash(source_id, content_hash)
            
            return ScrapeResult(
                source_id=source_id,
                source_name=source_config['name'],
                url=source_config['url'],
                timestamp=datetime.now().isoformat(),
                status='success',
                content_hash=content_hash,
                previous_hash=previous_hash,
                data=data,
                change_detected=content_hash != previous_hash
            )
            
        except Exception as e:
            logger.error(f"Error scraping PubMed {source_id}: {e}")
            return ScrapeResult(
                source_id=source_id,
                source_name=source_config['name'],
                url=source_config['url'],
                timestamp=datetime.now().isoformat(),
                status='error',
                content_hash='',
                previous_hash=None,
                data={},
                error=str(e)
            )
    
    # ======================================================================
    # MAIN SCRAPING METHODS
    # ======================================================================
    
    def scrape_source(self, source_id: str) -> ScrapeResult:
        """Scrape a single source by ID"""
        sources = self.config.get('sources', {})
        
        if source_id not in sources:
            logger.error(f"Source {source_id} not found in configuration")
            return ScrapeResult(
                source_id=source_id,
                source_name='Unknown',
                url='',
                timestamp=datetime.now().isoformat(),
                status='error',
                content_hash='',
                previous_hash=None,
                data={},
                error=f"Source {source_id} not found in configuration"
            )
        
        source_config = sources[source_id]
        source_type = source_config.get('type', '')
        
        # Route to appropriate scraper
        if source_type.startswith('cdc'):
            return self.scrape_cdc(source_id, source_config)
        elif source_type.startswith('fda'):
            return self.scrape_fda(source_id, source_config)
        elif source_type.startswith('pubmed'):
            return self.scrape_pubmed(source_id, source_config)
        else:
            logger.error(f"Unknown source type: {source_type}")
            return ScrapeResult(
                source_id=source_id,
                source_name=source_config.get('name', 'Unknown'),
                url=source_config.get('url', ''),
                timestamp=datetime.now().isoformat(),
                status='error',
                content_hash='',
                previous_hash=None,
                data={},
                error=f"Unknown source type: {source_type}"
            )
    
    def scrape_all(self) -> List[ScrapeResult]:
        """Scrape all configured sources"""
        sources = self.config.get('sources', {})
        results = []
        
        logger.info(f"Starting full scrape of {len(sources)} sources")
        
        for source_id, source_config in sources.items():
            result = self.scrape_source(source_id)
            results.append(result)
            
            # Delay between requests
            delay = self.config['scraper'].get('request_delay', 2.0)
            time.sleep(delay)
        
        return results
    
    def detect_changes(self, results: List[ScrapeResult]) -> List[ChangeReport]:
        """Analyze scrape results for significant changes"""
        reports = []
        thresholds = self.config['scraper']['thresholds']
        
        for result in results:
            if not result.change_detected:
                continue
            
            # Determine change type
            change_pct = result.change_percentage
            if change_pct >= thresholds['critical']:
                change_type = 'critical'
            elif change_pct >= thresholds['major']:
                change_type = 'major'
            else:
                change_type = 'minor'
            
            # Get affected consults
            source_config = self.config['sources'].get(result.source_id, {})
            affected_consults = source_config.get('consults', [])
            
            # Generate summary
            if change_type == 'critical':
                summary = f"CRITICAL: Major restructuring detected in {result.source_name}"
            elif change_type == 'major':
                summary = f"MAJOR: Significant content changes in {result.source_name}"
            else:
                summary = f"Minor: Content updates in {result.source_name}"
            
            report = ChangeReport(
                source_id=result.source_id,
                source_name=result.source_name,
                change_type=change_type,
                change_percentage=change_pct,
                affected_consults=affected_consults,
                summary=summary,
                raw_changes=result.data,
                timestamp=result.timestamp
            )
            reports.append(report)
        
        return reports

# =============================================================================
# COMMAND LINE INTERFACE
# =============================================================================

def main():
    parser = argparse.ArgumentParser(description='MedKitt Scrapling Service')
    parser.add_argument('--source', help='Scrape specific source by ID')
    parser.add_argument('--all', action='store_true', help='Scrape all sources')
    parser.add_argument('--test', action='store_true', help='Run test scrape (CDC syphilis)')
    parser.add_argument('--list-sources', action='store_true', help='List configured sources')
    
    args = parser.parse_args()
    
    scraper = MedKittScraper()
    
    if args.list_sources:
        print("\nConfigured Sources:")
        print("-" * 50)
        for source_id, config in scraper.config['sources'].items():
            print(f"  {source_id}: {config['name']}")
            print(f"    Type: {config['type']}")
            print(f"    URL: {config['url']}")
            print()
    
    elif args.test:
        print("Running test scrape of CDC syphilis guidelines...")
        result = scraper.scrape_source('cdc_syphilis_detail')
        print(f"\nStatus: {result.status}")
        print(f"URL: {result.url}")
        print(f"Change detected: {result.change_detected}")
        if result.change_detected:
            print(f"Change percentage: {result.change_percentage:.2%}")
        print(f"\nContent preview (first 500 chars):")
        content = result.data.get('content', '')[:500]
        print(content)
    
    elif args.source:
        print(f"Scraping source: {args.source}")
        result = scraper.scrape_source(args.source)
        print(f"\nStatus: {result.status}")
        if result.status == 'error':
            print(f"Error: {result.error}")
        else:
            print(f"Change detected: {result.change_detected}")
            if result.change_detected:
                print(f"Change percentage: {result.change_percentage:.2%}")
    
    elif args.all:
        print("Scraping all sources...")
        results = scraper.scrape_all()
        
        print("\n" + "=" * 60)
        print("SCRAPING SUMMARY")
        print("=" * 60)
        
        success_count = sum(1 for r in results if r.status == 'success')
        error_count = sum(1 for r in results if r.status == 'error')
        change_count = sum(1 for r in results if r.change_detected)
        
        print(f"Total sources: {len(results)}")
        print(f"Successful: {success_count}")
        print(f"Errors: {error_count}")
        print(f"Changes detected: {change_count}")
        
        if change_count > 0:
            print("\nChanges detected in:")
            reports = scraper.detect_changes(results)
            for report in reports:
                print(f"  - {report.source_name} ({report.change_type}, {report.change_percentage:.1%})")
    
    else:
        parser.print_help()

if __name__ == '__main__':
    main()
