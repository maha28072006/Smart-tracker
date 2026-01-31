const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  careerGoal: {
    type: String,
    required: true
  },
  selectedSkills: [{
    type: String
  }],
  skillAssessments: [{
    skill: String,
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    score: Number
  }],
  learningProgress: [{
    skill: String,
    progress: {
      type: Number,
      default: 0
    },
    completedTopics: [String]
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);