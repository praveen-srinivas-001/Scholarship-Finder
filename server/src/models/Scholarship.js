const mongoose = require('mongoose');

const ScholarshipSchema = new mongoose.Schema({
  scholarship_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  provider: {
    type: String,
    required: true
  },
  deadline: {
    type: String,
    required: true
  },
  eligibility: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  
  // Optional fields
  amount: {
    type: String
  },
  category: {
    type: String
  },
  educationLevel: {
    type: [String]
  },
  minIncome: {
    type: Number
  },
  maxIncome: {
    type: Number
  },
  genderSpecific: {
    type: String, // 'male', 'female', 'all'
    default: 'all'
  },
  minPercentage: {
    type: Number
  },
  
  // Source information
  source: {
    type: String,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Scholarship', ScholarshipSchema);