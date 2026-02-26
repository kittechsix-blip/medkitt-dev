#!/usr/bin/env python3
"""
MedKitt Scheduler
Manages scheduled runs of the scraping and update pipeline.

Usage:
    python scraper/scheduler.py --run-now      # Run immediately
    python scraper/scheduler.py --daemon       # Run as scheduled daemon
    python scraper/scheduler.py --cron         # Print crontab entry
    python scraper/scheduler.py --status       # Check last run status
"""

import os
import sys
import json
import time
import argparse
import logging
import subprocess
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, Any, Optional
from dataclasses import dataclass, asdict

import yaml

# Try to import schedule module
try:
    import schedule
    SCHEDULE_AVAILABLE = True
except ImportError:
    SCHEDULE_AVAILABLE = False

# =============================================================================
# CONFIGURATION
# =============================================================================

BASE_DIR = Path(__file__).parent.parent
CONFIG_PATH = BASE_DIR / "scraper" / "config.yaml"
DATA_DIR = BASE_DIR / "scraper" / "data"
STATUS_FILE = DATA_DIR / "scheduler_status.json"
LOGS_DIR = BASE_DIR / "scraper" / "logs"
PID_FILE = DATA_DIR / "scheduler.pid"

# Ensure directories exist
for d in [DATA_DIR, LOGS_DIR]:
    d.mkdir(parents=True, exist_ok=True)

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOGS_DIR / f"scheduler_{datetime.now():%Y%m%d}.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("MedKittScheduler")

# =============================================================================
# SCHEDULER CLASS
# =============================================================================

class MedKittScheduler:
    """Manages scheduled execution of the scraper pipeline"""
    
    def __init__(self, config_path: str = None):
        self.config = self._load_config(config_path or CONFIG_PATH)
        self.status = self._load_status()
        self.scheduler = schedule if SCHEDULE_AVAILABLE else None
    
    def _load_config(self, path: Path) -> Dict:
        """Load YAML configuration"""
        with open(path, 'r') as f:
            return yaml.safe_load(f)
    
    def _load_status(self) -> Dict:
        """Load scheduler status"""
        if STATUS_FILE.exists():
            with open(STATUS_FILE, 'r') as f:
                return json.load(f)
        return {
            'first_run': None,
            'last_run': None,
            'last_success': None,
            'run_count': 0,
            'error_count': 0,
            'last_error': None,
            'runs': []
        }
    
    def _save_status(self):
        """Save scheduler status"""
        with open(STATUS_FILE, 'w') as f:
            json.dump(self.status, f, indent=2)
    
    def _update_status(self, run_result: Dict):
        """Update status with run result"""
        now = datetime.now().isoformat()
        
        if self.status['first_run'] is None:
            self.status['first_run'] = now
        
        self.status['last_run'] = now
        self.status['run_count'] += 1
        
        if run_result.get('success'):
            self.status['last_success'] = now
        else:
            self.status['error_count'] += 1
            self.status['last_error'] = run_result.get('error')
        
        # Keep last 10 runs in history
        self.status['runs'].append({
            'timestamp': now,
            'success': run_result.get('success', False),
            'sources_processed': run_result.get('sources_processed', 0),
            'changes_detected': run_result.get('changes_detected', 0)
        })
        self.status['runs'] = self.status['runs'][-10:]
        
        self._save_status()
    
    def run_pipeline(self, dry_run: bool = False) -> Dict[str, Any]:
        """Execute the full scraping and update pipeline"""
        result = {
            'success': False,
            'timestamp': datetime.now().isoformat(),
            'sources_processed': 0,
            'changes_detected': 0,
            'updates_applied': 0,
            'errors': []
        }
        
        logger.info("=" * 60)
        logger.info("STARTING MEDKITT SCRAPING PIPELINE")
        logger.info("=" * 60)
        
        try:
            # Step 1: Run scraper
            logger.info("Step 1: Running scraper...")
            scrape_result = self._run_scraper()
            
            if scrape_result['success']:
                result['sources_processed'] = scrape_result.get('count', 0)
                result['changes_detected'] = scrape_result.get('changes', 0)
                logger.info(f"Scraper completed: {result['sources_processed']} sources, {result['changes_detected']} changes")
            else:
                result['errors'].append(f"Scraper failed: {scrape_result.get('error')}")
                logger.error(f"Scraper failed: {scrape_result.get('error')}")
            
            # Step 2: Run updater (only if scraper found changes or we're not in dry-run)
            if not dry_run and (result['changes_detected'] > 0 or scrape_result['success']):
                logger.info("Step 2: Running updater...")
                update_result = self._run_updater(dry_run=dry_run)
                
                if update_result['success']:
                    result['updates_applied'] = update_result.get('updated', 0)
                    logger.info(f"Updater completed: {result['updates_applied']} updates applied")
                else:
                    result['errors'].append(f"Updater failed: {update_result.get('error')}")
                    logger.error(f"Updater failed: {update_result.get('error')}")
            
            # Step 3: Commit changes (if enabled and updates were applied)
            if not dry_run and result['updates_applied'] > 0:
                if self.config.get('notifications', {}).get('github', {}).get('auto_commit', False):
                    logger.info("Step 3: Committing changes...")
                    commit_result = self._run_commit()
                    if commit_result['success']:
                        logger.info("Changes committed successfully")
                    else:
                        logger.warning(f"Commit failed: {commit_result.get('error')}")
            
            result['success'] = len(result['errors']) == 0
            
        except Exception as e:
            logger.exception("Pipeline failed")
            result['errors'].append(str(e))
        
        # Update status
        self._update_status(result)
        
        # Send notification if changes detected
        if result['changes_detected'] > 0:
            self._send_notification(result)
        
        logger.info("=" * 60)
        logger.info("PIPELINE COMPLETED" if result['success'] else "PIPELINE FAILED")
        logger.info("=" * 60)
        
        return result
    
    def _run_scraper(self) -> Dict[str, Any]:
        """Run the scraper service"""
        try:
            result = subprocess.run(
                [sys.executable, 'scraper/service.py', '--all'],
                cwd=BASE_DIR,
                capture_output=True,
                text=True,
                timeout=600  # 10 minute timeout
            )
            
            # Parse output for summary
            output = result.stdout + result.stderr
            
            # Extract counts from output
            success_count = 0
            change_count = 0
            
            for line in output.split('\n'):
                if 'Successful:' in line:
                    try:
                        success_count = int(line.split(':')[1].strip())
                    except:
                        pass
                if 'Changes detected:' in line:
                    try:
                        change_count = int(line.split(':')[1].strip())
                    except:
                        pass
            
            return {
                'success': result.returncode == 0,
                'count': success_count,
                'changes': change_count,
                'output': output
            }
            
        except subprocess.TimeoutExpired:
            return {'success': False, 'error': 'Scraper timed out'}
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def _run_updater(self, dry_run: bool = False) -> Dict[str, Any]:
        """Run the update handler"""
        try:
            cmd = [sys.executable, 'scraper/updater.py']
            if dry_run:
                cmd.append('--dry-run')
            else:
                cmd.append('--apply')
            
            result = subprocess.run(
                cmd,
                cwd=BASE_DIR,
                capture_output=True,
                text=True,
                timeout=300  # 5 minute timeout
            )
            
            output = result.stdout + result.stderr
            
            # Parse output
            updated_count = 0
            for line in output.split('\n'):
                if 'Auto-updates:' in line or 'would_auto_update' in line:
                    try:
                        updated_count = int(line.split(':')[1].strip())
                    except:
                        pass
            
            return {
                'success': result.returncode == 0,
                'updated': updated_count,
                'output': output
            }
            
        except subprocess.TimeoutExpired:
            return {'success': False, 'error': 'Updater timed out'}
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def _run_commit(self) -> Dict[str, Any]:
        """Commit changes to git"""
        try:
            result = subprocess.run(
                [sys.executable, 'scraper/updater.py', '--commit'],
                cwd=BASE_DIR,
                capture_output=True,
                text=True,
                timeout=60
            )
            
            return {
                'success': result.returncode == 0,
                'output': result.stdout
            }
            
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def _send_notification(self, result: Dict):
        """Send notification about detected changes"""
        config = self.config.get('notifications', {})
        
        # Log the notification
        logger.info(f"NOTIFICATION: {result['changes_detected']} changes detected")
        
        # Email notification (if configured)
        if config.get('email', {}).get('enabled', False):
            self._send_email_notification(result)
        
        # Slack notification (if configured)
        if config.get('slack', {}).get('enabled', False):
            self._send_slack_notification(result)
    
    def _send_email_notification(self, result: Dict):
        """Send email notification"""
        email_config = self.config['notifications']['email']
        
        try:
            import smtplib
            from email.mime.text import MIMEText
            
            subject = f"MedKitt Scraper Alert - {result['changes_detected']} Changes Detected"
            body = f"""
MedKitt Scraping Pipeline has detected changes in monitored sources.

Summary:
- Sources processed: {result['sources_processed']}
- Changes detected: {result['changes_detected']}
- Updates applied: {result['updates_applied']}
- Timestamp: {result['timestamp']}

Please review the changes in the GitHub repository or review queue.
            """
            
            msg = MIMEText(body)
            msg['Subject'] = subject
            msg['From'] = email_config['from']
            msg['To'] = ', '.join(email_config['to'])
            
            # Note: SMTP configuration would need to be set up
            logger.info(f"Would send email to {email_config['to']}")
            
        except Exception as e:
            logger.error(f"Failed to send email: {e}")
    
    def _send_slack_notification(self, result: Dict):
        """Send Slack notification"""
        slack_config = self.config['notifications'].get('slack', {})
        
        try:
            import requests
            
            webhook_url = slack_config.get('webhook_url', '')
            if not webhook_url:
                return
            
            message = {
                "text": f"MedKitt Scraper Alert",
                "blocks": [
                    {
                        "type": "header",
                        "text": {
                            "type": "plain_text",
                            "text": "🩺 MedKitt Changes Detected"
                        }
                    },
                    {
                        "type": "section",
                        "fields": [
                            {"type": "mrkdwn", "text": f"*Sources:*\n{result['sources_processed']}"},
                            {"type": "mrkdwn", "text": f"*Changes:*\n{result['changes_detected']}"},
                            {"type": "mrkdwn", "text": f"*Updates:*\n{result['updates_applied']}"},
                            {"type": "mrkdwn", "text": f"*Time:*\n{result['timestamp'][:16]}"}
                        ]
                    }
                ]
            }
            
            # Note: Would need actual webhook URL configured
            logger.info("Would send Slack notification")
            
        except Exception as e:
            logger.error(f"Failed to send Slack notification: {e}")
    
    def schedule_daily_run(self, run_time: str = None):
        """Schedule the pipeline to run daily at specified time"""
        if not SCHEDULE_AVAILABLE:
            logger.error("Schedule module not available. Install with: pip install schedule")
            return False
        
        scheduler_config = self.config.get('scheduler', {})
        daily_time = run_time or scheduler_config.get('daily_run_time', '02:00')
        
        logger.info(f"Scheduling daily run at {daily_time}")
        
        # Parse time
        hour, minute = map(int, daily_time.split(':'))
        
        # Schedule the job
        self.scheduler.every().day.at(daily_time).do(self.run_pipeline)
        
        return True
    
    def run_daemon(self):
        """Run as a daemon process"""
        if not SCHEDULE_AVAILABLE:
            logger.error("Schedule module not available")
            return
        
        # Check if already running
        if PID_FILE.exists():
            try:
                old_pid = int(PID_FILE.read_text())
                os.kill(old_pid, 0)  # Check if process exists
                logger.error(f"Scheduler already running (PID {old_pid})")
                return
            except (OSError, ValueError):
                pass  # Process not running, continue
        
        # Write PID file
        PID_FILE.write_text(str(os.getpid()))
        
        try:
            # Schedule daily run
            self.schedule_daily_run()
            
            logger.info("Scheduler daemon started")
            
            # Run immediately on startup
            self.run_pipeline()
            
            # Keep running
            while True:
                self.scheduler.run_pending()
                time.sleep(60)  # Check every minute
                
        except KeyboardInterrupt:
            logger.info("Scheduler stopped by user")
        finally:
            if PID_FILE.exists():
                PID_FILE.unlink()
    
    def print_cron_entry(self):
        """Print crontab entry for manual scheduling"""
        scheduler_config = self.config.get('scheduler', {})
        daily_time = scheduler_config.get('daily_run_time', '02:00')
        timezone = scheduler_config.get('timezone', 'America/Chicago')
        
        hour, minute = daily_time.split(':')
        
        cron_line = f"{minute} {hour} * * * cd {BASE_DIR} && {sys.executable} scraper/scheduler.py --run-now >> scraper/logs/cron.log 2>&1"
        
        print("\n" + "=" * 60)
        print("CRONTAB ENTRY (runs daily at 2 AM)")
        print("=" * 60)
        print(f"# MedKitt Scraper - Timezone: {timezone}")
        print(cron_line)
        print("\nTo install, run: crontab -e")
        print("And paste the above line")
        print("=" * 60)
    
    def get_status(self) -> Dict[str, Any]:
        """Get current scheduler status"""
        status = self.status.copy()
        
        # Add runtime info
        status['pid_file_exists'] = PID_FILE.exists()
        status['scheduler_config'] = self.config.get('scheduler', {})
        status['next_scheduled_run'] = None
        
        if SCHEDULE_AVAILABLE and self.scheduler:
            next_run = self.scheduler.next_run()
            if next_run:
                status['next_scheduled_run'] = next_run.isoformat()
        
        return status

# =============================================================================
# COMMAND LINE INTERFACE
# =============================================================================

def main():
    parser = argparse.ArgumentParser(description='MedKitt Scheduler')
    parser.add_argument('--run-now', action='store_true', help='Run pipeline immediately')
    parser.add_argument('--daemon', action='store_true', help='Run as scheduled daemon')
    parser.add_argument('--cron', action='store_true', help='Print crontab entry')
    parser.add_argument('--status', action='store_true', help='Show scheduler status')
    parser.add_argument('--dry-run', action='store_true', help='Run without applying changes')
    
    args = parser.parse_args()
    
    scheduler = MedKittScheduler()
    
    if args.status:
        status = scheduler.get_status()
        print("\n" + "=" * 60)
        print("MEDKITT SCHEDULER STATUS")
        print("=" * 60)
        print(f"First run: {status.get('first_run', 'Never')}")
        print(f"Last run: {status.get('last_run', 'Never')}")
        print(f"Last success: {status.get('last_success', 'Never')}")
        print(f"Total runs: {status.get('run_count', 0)}")
        print(f"Error count: {status.get('error_count', 0)}")
        
        if status.get('last_error'):
            print(f"Last error: {status['last_error']}")
        
        if status.get('runs'):
            print("\nRecent runs:")
            for run in status['runs'][-5:]:
                status_icon = "✓" if run['success'] else "✗"
                print(f"  {status_icon} {run['timestamp'][:16]} - {run.get('changes_detected', 0)} changes")
    
    elif args.cron:
        scheduler.print_cron_entry()
    
    elif args.daemon:
        print("Starting scheduler daemon...")
        print("Press Ctrl+C to stop")
        scheduler.run_daemon()
    
    elif args.run_now:
        print("Running pipeline now...")
        result = scheduler.run_pipeline(dry_run=args.dry_run)
        
        print("\n" + "=" * 60)
        print("RESULT")
        print("=" * 60)
        print(f"Success: {result['success']}")
        print(f"Sources processed: {result['sources_processed']}")
        print(f"Changes detected: {result['changes_detected']}")
        print(f"Updates applied: {result['updates_applied']}")
        
        if result.get('errors'):
            print("\nErrors:")
            for error in result['errors']:
                print(f"  - {error}")
    
    else:
        parser.print_help()
        print("\n" + "=" * 60)
        print("QUICK START")
        print("=" * 60)
        print("1. Test run:    python scraper/scheduler.py --run-now --dry-run")
        print("2. Run now:     python scraper/scheduler.py --run-now")
        print("3. Setup cron:  python scraper/scheduler.py --cron")
        print("4. Daemon mode: python scraper/scheduler.py --daemon")
        print("=" * 60)

if __name__ == '__main__':
    main()
