const User = require('../models/User');

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, careerGoal } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({ name, email, password, careerGoal });
    await user.save();

    // Return user data (without password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      careerGoal: user.careerGoal
    };

    res.status(201).json({
      message: 'User created successfully',
      user: userData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Return user data (without password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      careerGoal: user.careerGoal,
      selectedSkills: user.selectedSkills,
      skillAssessments: user.skillAssessments,
      learningProgress: user.learningProgress
    };

    res.json({
      message: 'Login successful',
      user: userData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};