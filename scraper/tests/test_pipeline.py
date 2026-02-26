#!/usr/bin/env python3
"""
Tests for the MedKitt Scraping Pipeline
"""

import sys
import unittest
from pathlib import Path

# Add parent to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from service import MedKittScraper
from updater import MedKittUpdater

class TestScraper(unittest.TestCase):
    """Test cases for the scraper"""
    
    @classmethod
    def setUpClass(cls):
        cls.scraper = MedKittScraper()
        cls.updater = MedKittUpdater()
    
    def test_config_loading(self):
        """Test that configuration loads correctly"""
        self.assertIn('sources', self.scraper.config)
        self.assertIn('consults', self.scraper.config)
        self.assertIn('scraper', self.scraper.config)
    
    def test_cdc_sources_configured(self):
        """Test that CDC sources are configured"""
        sources = self.scraper.config['sources']
        cdc_sources = [k for k in sources.keys() if k.startswith('cdc')]
        self.assertGreater(len(cdc_sources), 0, "No CDC sources configured")
    
    def test_fda_sources_configured(self):
        """Test that FDA sources are configured"""
        sources = self.scraper.config['sources']
        fda_sources = [k for k in sources.keys() if k.startswith('fda')]
        self.assertGreater(len(fda_sources), 0, "No FDA sources configured")
    
    def test_pubmed_sources_configured(self):
        """Test that PubMed sources are configured"""
        sources = self.scraper.config['sources']
        pubmed_sources = [k for k in sources.keys() if k.startswith('pubmed')]
        self.assertGreater(len(pubmed_sources), 0, "No PubMed sources configured")
    
    def test_consult_mappings(self):
        """Test that consults have proper mappings"""
        consults = self.scraper.config['consults']
        sources = self.scraper.config['sources']
        
        for consult_id, consult_config in consults.items():
            # Check consult has required fields
            self.assertIn('name', consult_config)
            self.assertIn('file', consult_config)
            self.assertIn('keywords', consult_config)
            
            # Check if any sources reference this consult
            referenced = False
            for source_config in sources.values():
                if consult_id in source_config.get('consults', []):
                    referenced = True
                    break
            
            self.assertTrue(referenced, f"Consult {consult_id} not referenced by any source")
    
    def test_hash_calculation(self):
        """Test content hash calculation"""
        test_content = "Test content for hashing"
        hash1 = self.scraper._get_hash(test_content)
        hash2 = self.scraper._get_hash(test_content)
        
        self.assertEqual(hash1, hash2, "Hash should be consistent")
        self.assertEqual(len(hash1), 64, "SHA256 hash should be 64 characters")
    
    def test_change_percentage(self):
        """Test change percentage calculation"""
        old = "This is the old content"
        new = "This is the new content"
        
        pct = self.scraper._calculate_change_percentage(old, new)
        self.assertGreater(pct, 0, "Change should be detected")
        self.assertLess(pct, 1, "Change should not be 100%")
        
        # Same content = 0% change
        pct_same = self.scraper._calculate_change_percentage(old, old)
        self.assertEqual(pct_same, 0, "Same content should be 0% change")


class TestUpdater(unittest.TestCase):
    """Test cases for the updater"""
    
    @classmethod
    def setUpClass(cls):
        cls.updater = MedKittUpdater()
    
    def test_review_queue_loading(self):
        """Test that review queue can be loaded"""
        # Should return list (empty or with items)
        self.assertIsInstance(self.updater.review_queue, list)
    
    def test_consult_loading(self):
        """Test loading a consult"""
        consults = self.updater.config.get('consults', {})
        if consults:
            consult_id = list(consults.keys())[0]
            consult = self.updater._load_consult(consult_id)
            
            if consult:
                self.assertEqual(consult.consult_id, consult_id)
                self.assertIsNotNone(consult.content)
                self.assertIsInstance(consult.nodes, list)


def run_tests():
    """Run all tests"""
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    
    suite.addTests(loader.loadTestsFromTestCase(TestScraper))
    suite.addTests(loader.loadTestsFromTestCase(TestUpdater))
    
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    return result.wasSuccessful()


if __name__ == '__main__':
    success = run_tests()
    sys.exit(0 if success else 1)
