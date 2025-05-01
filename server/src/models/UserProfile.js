const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Academic Information
  educationLevel: {
    type: String,
    enum: ['high_school', 'undergraduate', 'postgraduate', 'doctorate'],
    required: true
  },
  course: {
    type: String,
    required: true
  },
  instituteName: {
    type: String,
    required: true
  },
  academicScore: {
    type: Number,
    required: true
  },
  yearOfStudy: {
    type: Number,
    required: true
  },
  
  // Personal Information
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  dateOfBirth: {
    type: Date
  },
  category: {
    type: String,
    enum: ['general', 'sc', 'st', 'obc', 'minority']
  },
  
  // Financial Information
  familyIncome: {
    type: Number,
    required: true
  },
  
  // Location
  state: {
    type: String
  },
  city: {
    type: String
  },
  
  // Other
  achievements: {
    type: [String]
  },
  extraCurricular: {
    type: [String]
  },
  
  // Timestamp
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
UserProfileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);