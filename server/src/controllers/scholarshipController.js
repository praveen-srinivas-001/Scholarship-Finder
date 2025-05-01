const Scholarship = require('../models/Scholarship');
const UserProfile = require('../models/UserProfile');
const User = require('../models/User');

// @desc    Get all scholarships
// @route   GET /api/scholarships
// @access  Public
exports.getScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    
    res.status(200).json({
      success: true,
      count: scholarships.length,
      data: scholarships
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single scholarship
// @route   GET /api/scholarships/:id
// @access  Public
exports.getScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findOne({ scholarship_id: req.params.id });
    
    if (!scholarship) {
      return res.status(404).json({ success: false, message: 'Scholarship not found' });
    }
    
    res.status(200).json({
      success: true,
      data: scholarship
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get scholarships filtered by user profile
// @route   GET /api/scholarships/matches
// @access  Private
exports.getMatchingScholarships = async (req, res) => {
  try {
    // Get user profile
    const userProfile = await UserProfile.findOne({ user: req.user.id });
    
    if (!userProfile) {
      return res.status(404).json({ 
        success: false, 
        message: 'Please complete your profile first' 
      });
    }
    
    // Build filter criteria based on user profile
    const filterCriteria = {};
    
    // Filter by education level if available
    if (userProfile.educationLevel) {
      filterCriteria.educationLevel = { $in: [userProfile.educationLevel, null, undefined] };
    }
    
    // Filter by income if available
    if (userProfile.familyIncome) {
      filterCriteria.$or = [
        { maxIncome: { $gte: userProfile.familyIncome } },
        { maxIncome: null },
        { maxIncome: { $exists: false } }
      ];
    }
    
    // Filter by category if available
    if (userProfile.category) {
      filterCriteria.$or = [
        { category: userProfile.category },
        { category: 'all' },
        { category: null },
        { category: { $exists: false } }
      ];
    }
    
    // Filter by gender if available
    if (userProfile.gender) {
      filterCriteria.$or = [
        { genderSpecific: userProfile.gender },
        { genderSpecific: 'all' },
        { genderSpecific: null },
        { genderSpecific: { $exists: false } }
      ];
    }
    
    // Find matching scholarships
    const scholarships = await Scholarship.find(filterCriteria);
    
    // Calculate selection probability for each scholarship
    const scholarshipsWithProbability = scholarships.map(scholarship => {
      let matchScore = 0;
      let totalCriteria = 0;
      
      // Education level match
      if (scholarship.educationLevel && scholarship.educationLevel.includes(userProfile.educationLevel)) {
        matchScore++;
      }
      totalCriteria++;
      
      // Income match
      if (scholarship.maxIncome && userProfile.familyIncome <= scholarship.maxIncome) {
        matchScore++;
      }
      totalCriteria++;
      
      // Category match
      if (scholarship.category && (scholarship.category === userProfile.category || scholarship.category === 'all')) {
        matchScore++;
      }
      totalCriteria++;
      
      // Academic score match
      if (scholarship.minPercentage && userProfile.academicScore >= scholarship.minPercentage) {
        matchScore++;
      }
      totalCriteria++;
      
      // Calculate probability
      const matchPercentage = (matchScore / totalCriteria) * 100;
      let selectionChance = 'Low';
      
      if (matchPercentage >= 80) {
        selectionChance = 'High';
      } else if (matchPercentage >= 50) {
        selectionChance = 'Medium';
      }
      
      // Return scholarship with selection probability
      return {
        ...scholarship._doc,
        selectionChance,
        matchPercentage
      };
    });
    
    // Sort by match percentage (highest first)
    scholarshipsWithProbability.sort((a, b) => b.matchPercentage - a.matchPercentage);
    
    res.status(200).json({
      success: true,
      count: scholarshipsWithProbability.length,
      data: scholarshipsWithProbability
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Bookmark a scholarship
// @route   POST /api/scholarships/:id/bookmark
// @access  Private
exports.bookmarkScholarship = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    const scholarshipId = req.params.id;
    
    // Check if scholarship exists
    const scholarship = await Scholarship.findOne({ scholarship_id: scholarshipId });
    if (!scholarship) {
      return res.status(404).json({ success: false, message: 'Scholarship not found' });
    }
    
    // Check if already bookmarked
    if (user.bookmarkedScholarships.includes(scholarshipId)) {
      return res.status(400).json({ success: false, message: 'Scholarship already bookmarked' });
    }
    
    // Add to bookmarks
    user.bookmarkedScholarships.push(scholarshipId);
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Scholarship bookmarked successfully',
      data: user.bookmarkedScholarships
    });
  } catch (error) {
    res.status(500).json({ success: false , message: error.message });
  } 
};