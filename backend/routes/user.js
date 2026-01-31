const express = require('express');
const { 
  updateSkills, 
  submitAssessment, 
  updateProgress, 
  getProfile 
} = require('../controllers/userController');

const router = express.Router();

router.put('/skills', updateSkills);
router.post('/assessment', submitAssessment);
router.put('/progress', updateProgress);
router.get('/profile/:userId', getProfile);

module.exports = router;