import unittest
from app import DataGenerator

class TestDataGeneration(unittest.TestCase):
    def setUp(self):
        self.generator = DataGenerator()
        
    def test_us_data(self):
        data = self.generator._us_data()
        self.assertIsInstance(data, dict)
        # Add more specific tests
        
    def test_credit_card_validation(self):
        # Test valid and invalid cards
        pass
        
    def test_iban_validation(self):
        # Test valid and invalid IBANs
        pass

if __name__ == '__main__':
    unittest.main()
