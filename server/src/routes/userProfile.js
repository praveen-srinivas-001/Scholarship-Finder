// server/src/routes/profile.js

const express = require('express');
const { getProfile, createProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
  .get(getProfile)
  .post(createProfile);

module.exports = router;