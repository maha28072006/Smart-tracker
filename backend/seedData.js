const mongoose = require('mongoose');
const Skill = require('./models/Skill');
require('dotenv').config();

const sampleSkills = [
  // Web Developer Skills
  {
    name: 'HTML',
    category: 'Frontend',
    description: 'Markup language for creating web pages',
    difficulty: 'Beginner',
    careerPaths: ['Web Developer', 'Frontend Developer', 'Full Stack Developer'],
    prerequisites: [],
    learningResources: [
      { title: 'HTML Crash Course For Absolute Beginners', type: 'Video', url: 'https://www.youtube.com/watch?v=UB1O30fR-EE', duration: '2 hours' },
      { title: 'HTML Practice Exercises', type: 'Practice', url: 'https://www.w3schools.com/html/html_exercises.asp', duration: '1 hour' },
      { title: 'FreeCodeCamp HTML Course', type: 'Course', url: 'https://www.freecodecamp.org/learn/responsive-web-design/', duration: '3 hours' }
    ],
    assessmentQuestions: [
      { question: 'What does HTML stand for?', options: ['HyperText Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'None'], correctAnswer: 0, difficulty: 'Beginner' },
      { question: 'Which tag is used for headings?', options: ['<head>', '<h1>', '<header>', '<title>'], correctAnswer: 1, difficulty: 'Beginner' }
    ]
  },
  {
    name: 'CSS',
    category: 'Frontend',
    description: 'Styling language for web pages',
    difficulty: 'Beginner',
    careerPaths: ['Web Developer', 'Frontend Developer', 'Full Stack Developer'],
    prerequisites: ['HTML'],
    learningResources: [
      { title: 'CSS Tutorial - Zero to Hero', type: 'Video', url: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc', duration: '3 hours' },
      { title: 'CSS Exercises and Challenges', type: 'Practice', url: 'https://www.w3schools.com/css/css_exercises.asp', duration: '2 hours' },
      { title: 'CSS Grid Garden Game', type: 'Practice', url: 'https://cssgridgarden.com/', duration: '1 hour' }
    ],
    assessmentQuestions: [
      { question: 'What does CSS stand for?', options: ['Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style Sheets', 'None'], correctAnswer: 0, difficulty: 'Beginner' }
    ]
  },
  {
    name: 'JavaScript',
    category: 'Programming',
    description: 'Dynamic programming language for web development',
    difficulty: 'Beginner',
    careerPaths: ['Web Developer', 'Frontend Developer', 'Full Stack Developer'],
    prerequisites: ['HTML', 'CSS'],
    learningResources: [
      { title: 'JavaScript Full Course for Beginners', type: 'Video', url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg', duration: '4 hours' },
      { title: 'JavaScript Challenges on Codewars', type: 'Practice', url: 'https://www.codewars.com/kata/search/javascript', duration: '2 hours' },
      { title: 'JavaScript30 - 30 Day Challenge', type: 'Practice', url: 'https://javascript30.com/', duration: '30 days' }
    ],
    assessmentQuestions: [
      { question: 'What is a variable in JavaScript?', options: ['A container for data', 'A function', 'A loop', 'An object'], correctAnswer: 0, difficulty: 'Beginner' }
    ]
  },
  {
    name: 'React',
    category: 'Frontend Framework',
    description: 'JavaScript library for building user interfaces',
    difficulty: 'Intermediate',
    careerPaths: ['Frontend Developer', 'Full Stack Developer'],
    prerequisites: ['JavaScript'],
    learningResources: [
      { title: 'React Course - Beginner to Advanced', type: 'Video', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', duration: '5 hours' },
      { title: 'React Challenges on Frontend Mentor', type: 'Practice', url: 'https://www.frontendmentor.io/challenges', duration: '3 hours' },
      { title: 'React Official Tutorial', type: 'Course', url: 'https://react.dev/learn', duration: '4 hours' }
    ],
    assessmentQuestions: [
      { question: 'What is JSX?', options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript Extension'], correctAnswer: 0, difficulty: 'Intermediate' }
    ]
  },
  
  // Backend Developer Skills
  {
    name: 'Node.js',
    category: 'Backend',
    description: 'JavaScript runtime for server-side development',
    difficulty: 'Intermediate',
    careerPaths: ['Backend Developer', 'Full Stack Developer'],
    prerequisites: ['JavaScript'],
    learningResources: [
      { title: 'Node.js Tutorial for Beginners', type: 'Video', url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4', duration: '4 hours' },
      { title: 'Node.js Exercises on HackerRank', type: 'Practice', url: 'https://www.hackerrank.com/domains/tutorials/10-days-of-javascript', duration: '2 hours' }
    ],
    assessmentQuestions: [
      { question: 'What is Node.js?', options: ['A framework', 'A runtime environment', 'A database', 'A library'], correctAnswer: 1, difficulty: 'Intermediate' }
    ]
  },
  {
    name: 'Express.js',
    category: 'Backend Framework',
    description: 'Web framework for Node.js',
    difficulty: 'Intermediate',
    careerPaths: ['Backend Developer', 'Full Stack Developer'],
    prerequisites: ['Node.js'],
    learningResources: [
      { title: 'Express.js Crash Course', type: 'Video', url: 'https://www.youtube.com/watch?v=L72fhGm1tfE', duration: '3 hours' },
      { title: 'Express.js Practice Projects', type: 'Practice', url: 'https://github.com/bradtraversy/node_crash_course', duration: '4 hours' }
    ],
    assessmentQuestions: [
      { question: 'Express.js is a framework for?', options: ['Python', 'Java', 'Node.js', 'PHP'], correctAnswer: 2, difficulty: 'Intermediate' }
    ]
  },
  {
    name: 'MongoDB',
    category: 'Database',
    description: 'NoSQL document database',
    difficulty: 'Intermediate',
    careerPaths: ['Backend Developer', 'Full Stack Developer', 'Database Administrator'],
    prerequisites: [],
    learningResources: [
      { title: 'MongoDB Crash Course', type: 'Video', url: 'https://www.youtube.com/watch?v=-56x56UppqQ', duration: '3 hours' },
      { title: 'MongoDB University Free Courses', type: 'Course', url: 'https://university.mongodb.com/', duration: '5 hours' }
    ],
    assessmentQuestions: [
      { question: 'What type of database is MongoDB?', options: ['SQL', 'NoSQL', 'Graph', 'Key-Value'], correctAnswer: 1, difficulty: 'Intermediate' }
    ]
  },
  {
    name: 'REST APIs',
    category: 'Backend',
    description: 'Architectural style for web services',
    difficulty: 'Intermediate',
    careerPaths: ['Backend Developer', 'Full Stack Developer'],
    prerequisites: [],
    learningResources: [
      { title: 'REST API Tutorial', type: 'Video', url: 'https://www.youtube.com/watch?v=pKd0Rpw7O48', duration: '2 hours' },
      { title: 'Postman API Testing', type: 'Practice', url: 'https://learning.postman.com/docs/getting-started/introduction/', duration: '1 hour' }
    ],
    assessmentQuestions: [
      { question: 'What does REST stand for?', options: ['Representational State Transfer', 'Remote State Transfer', 'Real State Transfer', 'None'], correctAnswer: 0, difficulty: 'Intermediate' }
    ]
  },
  
  // Data Scientist Skills
  {
    name: 'Python',
    category: 'Programming',
    description: 'High-level programming language',
    difficulty: 'Beginner',
    careerPaths: ['Data Scientist', 'AI Engineer', 'Backend Developer'],
    prerequisites: [],
    learningResources: [
      { title: 'Python Full Course for Beginners', type: 'Video', url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc', duration: '4 hours' },
      { title: 'Python Challenges on LeetCode', type: 'Practice', url: 'https://leetcode.com/problemset/all/?difficulty=Easy&page=1&topicSlugs=python', duration: '3 hours' },
      { title: 'Python Interactive Course', type: 'Course', url: 'https://www.codecademy.com/learn/learn-python-3', duration: '6 hours' }
    ],
    assessmentQuestions: [
      { question: 'What is Python?', options: ['A snake', 'A programming language', 'A framework', 'A database'], correctAnswer: 1, difficulty: 'Beginner' }
    ]
  },
  {
    name: 'Pandas',
    category: 'Data Analysis',
    description: 'Data manipulation library for Python',
    difficulty: 'Intermediate',
    careerPaths: ['Data Scientist'],
    prerequisites: ['Python'],
    learningResources: [
      { title: 'Pandas Tutorial for Beginners', type: 'Video', url: 'https://www.youtube.com/watch?v=vmEHCJofslg', duration: '3 hours' },
      { title: 'Pandas Practice on Kaggle', type: 'Practice', url: 'https://www.kaggle.com/learn/pandas', duration: '4 hours' }
    ],
    assessmentQuestions: [
      { question: 'Pandas is used for?', options: ['Web development', 'Data analysis', 'Game development', 'Mobile apps'], correctAnswer: 1, difficulty: 'Intermediate' }
    ]
  },
  {
    name: 'NumPy',
    category: 'Data Science',
    description: 'Numerical computing library for Python',
    difficulty: 'Intermediate',
    careerPaths: ['Data Scientist', 'AI Engineer'],
    prerequisites: ['Python'],
    learningResources: [
      { title: 'NumPy Tutorial for Beginners', type: 'Video', url: 'https://www.youtube.com/watch?v=QUT1VHiLmmI', duration: '2 hours' },
      { title: 'NumPy Exercises', type: 'Practice', url: 'https://github.com/rougier/numpy-100', duration: '3 hours' }
    ],
    assessmentQuestions: [
      { question: 'NumPy is primarily used for?', options: ['Web scraping', 'Numerical computing', 'Database management', 'UI design'], correctAnswer: 1, difficulty: 'Intermediate' }
    ]
  },
  {
    name: 'Machine Learning',
    category: 'AI/ML',
    description: 'Algorithms that learn from data',
    difficulty: 'Advanced',
    careerPaths: ['Data Scientist', 'AI Engineer'],
    prerequisites: ['Python', 'Statistics'],
    learningResources: [
      { title: 'Machine Learning Course by Andrew Ng', type: 'Video', url: 'https://www.youtube.com/watch?v=PPLop4L2eGk&list=PLLssT5z_DsK-h9vYZkQkYNWcItqhlRJLN', duration: '8 hours' },
      { title: 'Kaggle Learn ML Course', type: 'Course', url: 'https://www.kaggle.com/learn/intro-to-machine-learning', duration: '6 hours' },
      { title: 'ML Practice on Kaggle', type: 'Practice', url: 'https://www.kaggle.com/competitions', duration: '10 hours' }
    ],
    assessmentQuestions: [
      { question: 'What is supervised learning?', options: ['Learning with labeled data', 'Learning without data', 'Learning with unlabeled data', 'None'], correctAnswer: 0, difficulty: 'Advanced' }
    ]
  },
  
  // AI Engineer Skills
  {
    name: 'TensorFlow',
    category: 'AI/ML Framework',
    description: 'Open-source machine learning framework',
    difficulty: 'Advanced',
    careerPaths: ['AI Engineer'],
    prerequisites: ['Python', 'Machine Learning'],
    learningResources: [
      { title: 'TensorFlow 2.0 Complete Course', type: 'Video', url: 'https://www.youtube.com/watch?v=tPYj3fFJGjk', duration: '6 hours' },
      { title: 'TensorFlow Tutorials', type: 'Course', url: 'https://www.tensorflow.org/tutorials', duration: '8 hours' }
    ],
    assessmentQuestions: [
      { question: 'TensorFlow is developed by?', options: ['Facebook', 'Google', 'Microsoft', 'Amazon'], correctAnswer: 1, difficulty: 'Advanced' }
    ]
  },
  {
    name: 'Deep Learning',
    category: 'AI/ML',
    description: 'Neural networks with multiple layers',
    difficulty: 'Advanced',
    careerPaths: ['AI Engineer'],
    prerequisites: ['Machine Learning', 'Python'],
    learningResources: [
      { title: 'Deep Learning Specialization', type: 'Video', url: 'https://www.youtube.com/watch?v=CS4cs9xVecg&list=PLkDaE6sCZn6Ec-XTbcX1uRg2_u4xOEky0', duration: '10 hours' },
      { title: 'Deep Learning with Python', type: 'Course', url: 'https://www.manning.com/books/deep-learning-with-python', duration: '12 hours' }
    ],
    assessmentQuestions: [
      { question: 'Deep learning uses?', options: ['Decision trees', 'Neural networks', 'Linear regression', 'Clustering'], correctAnswer: 1, difficulty: 'Advanced' }
    ]
  },
  
  // Database Administrator Skills
  {
    name: 'SQL',
    category: 'Database',
    description: 'Language for managing relational databases',
    difficulty: 'Beginner',
    careerPaths: ['Database Administrator', 'Backend Developer', 'Data Scientist'],
    prerequisites: [],
    learningResources: [
      { title: 'SQL Tutorial - Full Database Course', type: 'Video', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY', duration: '4 hours' },
      { title: 'SQL Practice on HackerRank', type: 'Practice', url: 'https://www.hackerrank.com/domains/sql', duration: '3 hours' },
      { title: 'SQLBolt Interactive Lessons', type: 'Practice', url: 'https://sqlbolt.com/', duration: '2 hours' }
    ],
    assessmentQuestions: [
      { question: 'SQL stands for?', options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Language', 'None'], correctAnswer: 0, difficulty: 'Beginner' }
    ]
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    description: 'Advanced open-source relational database',
    difficulty: 'Intermediate',
    careerPaths: ['Database Administrator', 'Backend Developer'],
    prerequisites: ['SQL'],
    learningResources: [
      { title: 'PostgreSQL Tutorial', type: 'Video', url: 'https://www.youtube.com/watch?v=qw--VYLpxG4', duration: '5 hours' },
      { title: 'PostgreSQL Exercises', type: 'Practice', url: 'https://pgexercises.com/', duration: '4 hours' }
    ],
    assessmentQuestions: [
      { question: 'PostgreSQL is a?', options: ['NoSQL database', 'Relational database', 'Graph database', 'Key-value store'], correctAnswer: 1, difficulty: 'Intermediate' }
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing skills
    await Skill.deleteMany({});
    console.log('Cleared existing skills');

    // Insert sample skills
    await Skill.insertMany(sampleSkills);
    console.log('Sample skills inserted successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();