import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import SkillSelection from './pages/SkillSelection';
import SkillAssessment from './pages/SkillAssessment';
import SkillGapAnalysis from './pages/SkillGapAnalysis';
import LearningRoadmap from './pages/LearningRoadmap';
import ProgressTracker from './pages/ProgressTracker';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Function to refresh user data from localStorage
  const refreshUser = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Navbar user={user} logout={logout} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage login={login} />} />
          <Route path="/login" element={<LoginPage login={login} />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} />
            </ProtectedRoute>
          } />
          <Route path="/skills" element={
            <ProtectedRoute user={user}>
              <SkillSelection user={user} refreshUser={refreshUser} />
            </ProtectedRoute>
          } />
          <Route path="/assessment" element={
            <ProtectedRoute user={user}>
              <SkillAssessment user={user} refreshUser={refreshUser} />
            </ProtectedRoute>
          } />
          <Route path="/gap-analysis" element={
            <ProtectedRoute user={user}>
              <SkillGapAnalysis user={user} refreshUser={refreshUser} />
            </ProtectedRoute>
          } />
          <Route path="/roadmap" element={
            <ProtectedRoute user={user}>
              <LearningRoadmap user={user} refreshUser={refreshUser} />
            </ProtectedRoute>
          } />
          <Route path="/progress" element={
            <ProtectedRoute user={user}>
              <ProgressTracker user={user} refreshUser={refreshUser} />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute user={user}>
              <ProfilePage user={user} refreshUser={refreshUser} />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;