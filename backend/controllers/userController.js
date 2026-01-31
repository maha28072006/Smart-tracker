const User = require('../models/User');

// Update selected skills
exports.updateSkills = async (req, res) => {
  try {
    const { userId, skills } = req.body;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { selectedSkills: skills },
      { new: true }
    );

    res.json({ message: 'Skills updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit skill assessment
exports.submitAssessment = async (req, res) => {
  try {
    const { userId, skill, level, score } = req.body;
    
    const user = await User.findById(userId);
    
    // Update or add assessment
    const existingIndex = user.skillAssessments.findIndex(a => a.skill === skill);
    if (existingIndex >= 0) {
      user.skillAssessments[existingIndex] = { skill, level, score };
    } else {
      user.skillAssessments.push({ skill, level, score });
    }

    await user.save();
    res.json({ message: 'Assessment submitted successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update learning progress
exports.updateProgress = async (req, res) => {
  try {
    const { userId, skill, progress, completedTopics } = req.body;
    
    const user = await User.findById(userId);
    
    // Update or add progress
    const existingIndex = user.learningProgress.findIndex(p => p.skill === skill);
    if (existingIndex >= 0) {
      user.learningProgress[existingIndex] = { skill, progress, completedTopics };
    } else {
      user.learningProgress.push({ skill, progress, completedTopics });
    }

    await user.save();
    res.json({ message: 'Progress updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};