const Skill = require('../models/Skill');

// Get all skills
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json({ skills });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get skills by career path
exports.getSkillsByCareer = async (req, res) => {
  try {
    const { careerGoal } = req.params;
    const skills = await Skill.find({ 
      careerPaths: { $in: [careerGoal] } 
    });
    res.json({ skills });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get skill assessment questions
exports.getAssessmentQuestions = async (req, res) => {
  try {
    const { skillName } = req.params;
    const skill = await Skill.findOne({ name: skillName });
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json({ questions: skill.assessmentQuestions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get learning resources for a skill
exports.getLearningResources = async (req, res) => {
  try {
    const { skillName } = req.params;
    const skill = await Skill.findOne({ name: skillName });
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json({ resources: skill.learningResources });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};