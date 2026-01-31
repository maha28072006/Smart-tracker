import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="page">
      <div className="hero">
        <div className="container">
          <h1>Smart Skill Tracker</h1>
          <p>Discover, assess, and track your skills to achieve your career goals</p>
          <Link to="/signup" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
      
      <div className="container">
        <div className="grid grid-3">
          <div className="card">
            <h3>🎯 Skill Assessment</h3>
            <p>Take personalized assessments to understand your current skill level and identify areas for improvement.</p>
          </div>
          <div className="card">
            <h3>📚 Learning Roadmap</h3>
            <p>Get customized learning paths based on your career goals and current skill gaps.</p>
          </div>
          <div className="card">
            <h3>📊 Progress Tracking</h3>
            <p>Monitor your learning progress and celebrate your achievements along the way.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;