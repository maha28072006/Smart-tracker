const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  description: String,
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  careerPaths: [String],
  prerequisites: [String],
  learningResources: [{
    title: String,
    type: {
      type: String,
      enum: ['Video', 'Article', 'Course', 'Practice']
    },
    url: String,
    duration: String
  }],
  assessmentQuestions: [{
    question: String,
    options: [String],
    correctAnswer: Number,
    difficulty: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Skill', skillSchema);