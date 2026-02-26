# MedKitt Scrapling Pipeline

Automated content updating from CDC, FDA, and PubMed for MedKitt medical decision support tool.

## Overview

This pipeline automatically monitors medical guidelines and research sources for updates that may affect MedKitt consults. When changes are detected, it can:

- Auto-update minor changes (citations, formatting)
- Queue major changes for manual review (treatment guidelines)
- Alert on critical changes (safety alerts, drug recalls)
- Commit changes to GitHub

## Architecture

```
scraper/
├── config.yaml          # Source configurations, consult mappings
├── service.py           # Main scraping service (Scrapling-based)
├── updater.py           # Change detection & update handler
├── scheduler.py         # Cron/daemon scheduling
├── requirements.txt     # Python dependencies
├── data/
│   ├── raw/            # Raw scraped data
│   ├── processed/      # Processed updates
│   ├── hashes/         # Content hashes for change detection
│   └── review_queue.json  # Pending manual reviews
└── logs/               # Execution logs
```

## Installation

```bash
cd ~/Desktop/medkitt-dev

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r scraper/requirements.txt
```

## Configuration

Edit `scraper/config.yaml` to customize:

### Sources
- **CDC**: STI treatment guidelines, syphilis details, HIV PEP
- **FDA**: Drug safety alerts, drug shortages
- **PubMed**: Evidence searches for each consult topic

### Consults
Each consult has:
- Source file mapping (TypeScript decision tree)
- JSON export path
- Keywords for matching
- Update rules (auto-approve thresholds)

### Notifications
- Email alerts via SMTP
- Slack webhook integration
- GitHub auto-commit

## Usage

### Quick Test

```bash
# Test scraping CDC syphilis guidelines
python scraper/service.py --test

# List all configured sources
python scraper/service.py --list-sources
```

### Run Scraper

```bash
# Scrape specific source
python scraper/service.py --source cdc_syphilis_detail

# Scrape all sources
python scraper/service.py --all
```

### Run Updater

```bash
# Dry run - see what would update
python scraper/updater.py --dry-run

# Apply minor updates
python scraper/updater.py --apply

# Check status
python scraper/updater.py --status
```

### Scheduler

```bash
# Run pipeline once
python scraper/scheduler.py --run-now

# Run as daemon (scheduled)
python scraper/scheduler.py --daemon

# Print crontab entry
python scraper/scheduler.py --cron
```

## Integration with MedKitt

### 1. Consult Data Flow

```
CDC/FDA/PubMed → Scraper → Raw Data → Updater → TypeScript/JSON → PWA
```

### 2. TypeScript → JSON Export

The updater exports consults to JSON for the PWA:
- Source: `src/data/trees/*.ts`
- Export: `src/data/consults/*.json`

### 3. GitHub Integration

- Auto-commit minor updates
- Create PRs for major changes
- Log all activity

## Change Detection

### Thresholds

| Type | Change % | Action |
|------|----------|--------|
| Minor | < 20% | Auto-update |
| Major | 20-50% | Queue for review |
| Critical | > 50% | Alert + manual review |

### Update Rules per Consult

```yaml
update_rules:
  - type: "treatment_table"
    threshold: "minor"
    auto_update: true
  - type: "guideline_revision"
    threshold: "major"
    auto_update: false
```

## Scraping with Scrapling

The service uses Scrapling for adaptive web scraping:

```python
from scrapling.fetchers import StealthyFetcher

fetcher = StealthyFetcher(adaptive=True)
page = fetcher.fetch('https://cdc.gov/...', auto_save=True)
treatments = page.css('table.treatment-rec', adaptive=True)
```

Features:
- **Adaptive selectors**: Automatically adjust to page changes
- **Auto-save**: Cache pages for debugging
- **Stealth mode**: Avoid bot detection

## Monitoring

### Logs

```bash
# View recent logs
tail -f scraper/logs/scraper_*.log

# View scheduler logs
tail -f scraper/logs/scheduler_*.log
```

### Review Queue

```bash
# View pending reviews
cat scraper/data/review_queue.json | jq
```

### Scheduler Status

```bash
python scraper/scheduler.py --status
```

## Testing

```bash
# Run all tests
pytest scraper/tests/

# Test specific source
python scraper/service.py --source cdc_sti_guidelines --test
```

## Maintenance

### Adding a New Source

1. Add source to `scraper/config.yaml`
2. Map to relevant consults
3. Define selectors
4. Test: `python scraper/service.py --source <new_source>`

### Adding a New Consult

1. Add consult to `scraper/config.yaml`
3. Define update rules
3. Run updater to generate JSON export

### Log Rotation

Logs are automatically rotated daily. Old logs are kept for 30 days (configurable in `config.yaml`).

## Troubleshooting

### Scrapling Not Available

If you see "Warning: Scrapling not available", install it:
```bash
pip install scrapling
```

The scraper will fall back to requests + BeautifulSoup, but Scrapling is recommended for robust parsing.

### Change Detection Not Working

1. Check hash files in `scraper/data/hashes/`
2. Verify raw data is being saved
3. Review logs for parsing errors

### GitHub Integration Failing

1. Ensure git is configured: `git config user.name` and `git config user.email`
2. Check repository permissions
3. Review `scraper/logs/` for detailed errors

## Security Considerations

- Respect robots.txt of scraped sites
- Use appropriate User-Agent
- Rate limiting (default: 2s between requests)
- Don't scrape personal health information

## License

Part of MedKitt - Internal use only
