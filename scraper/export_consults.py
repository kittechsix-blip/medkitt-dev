#!/usr/bin/env python3
"""
Export existing TypeScript consults to JSON for PWA consumption
"""

import re
import json
from pathlib import Path
from datetime import datetime

BASE_DIR = Path(__file__).parent.parent
CONSULTS_DIR = BASE_DIR / "src" / "data" / "consults"
TREES_DIR = BASE_DIR / "src" / "data" / "trees"

def parse_ts_nodes(content):
    """Parse nodes from TypeScript file"""
    nodes = []
    
    # Find node patterns
    node_pattern = r'\{\s*id:\s*[\'"]([^\'"]+)[\'"]'
    for m in re.finditer(node_pattern, content):
        node_id = m.group(1)
        node = {'id': node_id}
        
        # Type
        type_match = re.search(rf'id:\s*[\'"]{re.escape(node_id)}[\'"]\s*,\s*[^}}]*type:\s*[\'](\w+)[\']', content)
        if type_match:
            node['type'] = type_match.group(1)
        
        # Title
        title_match = re.search(rf'id:\s*[\'"]{re.escape(node_id)}[\'"]\s*,\s*[^}}]*title:\s*[\']([^\']+)[\']', content)
        if title_match:
            node['title'] = title_match.group(1)
        
        nodes.append(node)
    
    return nodes

def export_consult(tree_file, consult_id, consult_name):
    """Export a single consult to JSON"""
    tree_path = TREES_DIR / tree_file
    
    if not tree_path.exists():
        print(f"  Skipping {consult_id} - file not found")
        return False
    
    content = tree_path.read_text()
    nodes = parse_ts_nodes(content)
    
    export_data = {
        'id': consult_id,
        'name': consult_name,
        'version': '1.0',
        'last_updated': datetime.now().isoformat(),
        'node_count': len(nodes),
        'nodes': nodes
    }
    
    output_path = CONSULTS_DIR / f"{consult_id}.json"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_path, 'w') as f:
        json.dump(export_data, f, indent=2)
    
    print(f"  Exported {consult_id}: {len(nodes)} nodes -> {output_path}")
    return True

def main():
    print("Exporting MedKitt consults to JSON...")
    CONSULTS_DIR.mkdir(parents=True, exist_ok=True)
    
    # Export key consults tracked by scraper
    consults = [
        ('neurosyphilis.ts', 'neurosyphilis', 'Neurosyphilis Workup'),
        ('pep.ts', 'pep', 'Post Exposure Prophylaxis'),
        ('pe-treatment.ts', 'pe-treatment', 'PE Treatment'),
        ('stroke.ts', 'stroke', 'Acute Ischemic Stroke'),
    ]
    
    exported = 0
    for tree_file, consult_id, consult_name in consults:
        if export_consult(tree_file, consult_id, consult_name):
            exported += 1
    
    print(f"\nExported {exported} consults to {CONSULTS_DIR}")

if __name__ == '__main__':
    main()
