const express = require('express');
const { 
  getScholarships, 
  getScholarship, 
  getMatchingScholarships
} = require('../controllers/scholarshipController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getScholarships);
router.get('/recommended', protect, getMatchingScholarships);
router.get('/:id', getScholarship);

module.exports = router;