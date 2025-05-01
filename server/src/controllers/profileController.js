// server/src/controllers/profileController.js

const UserProfile = require('../models/UserProfile');

// @desc    Get current user profile
// @route   GET /api/userProfile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create or update user profile
// @route   POST /api/userProfile
// @access  Private
exports.createProfile = async (req, res) => {
  try {
    let profile = await UserProfile.findOne({ user: req.user.id });
    
    const {
      educationLevel,
      fieldOfStudy,
      gpa,
      demographics,
      interests,
      skills,
      achievements
    } = req.body;
    
    const profileData = {
      user: req.user.id,
      educationLevel,
      fieldOfStudy,
      gpa,
      demographics,
      interests,
      skills,
      achievements
    };
    
    if (profile) {
      // Update
      profile = await UserProfile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileData },
        { new: true }
      );
    } else {
      // Create
      profile = await UserProfile.create(profileData);
    }
    
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};