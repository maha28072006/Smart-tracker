const express = require('express');
const { 
  getAllSkills, 
  getSkillsByCareer, 
  getAssessmentQuestions, 
  getLearningResources 
} = require('../controllers/skillController');

const router = express.Router();

router.get('/', getAllSkills);
router.get('/career/:careerGoal', getSkillsByCareer);
router.get('/assessment/:skillName', getAssessmentQuestions);
router.get('/resources/:skillName', getLearningResources);

module.exports = router;