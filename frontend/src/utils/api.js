const API_BASE_URL = '/api';

// Auth API calls
export const signup = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const login = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

// Skills API calls
export const getAllSkills = async () => {
  const response = await fetch(`${API_BASE_URL}/skills`);
  return response.json();
};

export const getSkillsByCareer = async (careerGoal) => {
  const response = await fetch(`${API_BASE_URL}/skills/career/${careerGoal}`);
  return response.json();
};

export const getAssessmentQuestions = async (skillName) => {
  const response = await fetch(`${API_BASE_URL}/skills/assessment/${skillName}`);
  return response.json();
};

export const getLearningResources = async (skillName) => {
  const response = await fetch(`${API_BASE_URL}/skills/resources/${skillName}`);
  return response.json();
};

// User API calls
export const updateUserSkills = async (userId, skills) => {
  const response = await fetch(`${API_BASE_URL}/user/skills`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, skills }),
  });
  return response.json();
};

export const submitAssessment = async (userId, skill, level, score) => {
  const response = await fetch(`${API_BASE_URL}/user/assessment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, skill, level, score }),
  });
  return response.json();
};

export const updateProgress = async (userId, skill, progress, completedTopics) => {
  const response = await fetch(`${API_BASE_URL}/user/progress`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, skill, progress, completedTopics }),
  });
  return response.json();
};

export const getUserProfile = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/user/profile/${userId}`);
  return response.json();
};