import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    // Update current user data from localStorage on component mount
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, [user]);

  const getProgressPercentage = () => {
    if (!currentUser.learningProgress || currentUser.learningProgress.length === 0) return 0;
    const totalProgress = currentUser.learningProgress.reduce((sum, item) => sum + item.progress, 0);
    return Math.round(totalProgress / currentUser.learningProgress.length);
  };

  const getCompletedAssessments = () => {
    return currentUser.skillAssessments ? currentUser.skillAssessments.length : 0;
  };

  return (
    <div className="page">
      <div className="container">
        <h1>Welcome back, {currentUser.name}!</h1>
        <p>Career Goal: <strong>{currentUser.careerGoal}</strong></p>
        
        <div className="grid grid-3" style={{margin: '2rem 0'}}>
          <div className="card">
            <h3>📊 Overall Progress</h3>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${getProgressPercentage()}%`}}
              ></div>
            </div>
            <p>{getProgressPercentage()}% Complete</p>
          </div>
          
          <div className="card">
            <h3>✅ Assessments Completed</h3>
            <h2>{getCompletedAssessments()}</h2>
            <p>Skills assessed</p>
          </div>
          
          <div className="card">
            <h3>🎯 Selected Skills</h3>
            <h2>{currentUser.selectedSkills ? currentUser.selectedSkills.length : 0}</h2>
            <p>Skills in your learning path</p>
          </div>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <h3>🚀 Quick Actions</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <Link to="/skills" className="btn btn-primary">
                Select Skills
              </Link>
              <Link to="/assessment" className="btn btn-secondary">
                Take Assessment
              </Link>
              <Link to="/roadmap" className="btn btn-success">
                View Learning Roadmap
              </Link>
            </div>
          </div>
          
          <div className="card">
            <h3>📈 Recent Activity</h3>
            {currentUser.learningProgress && currentUser.learningProgress.length > 0 ? (
              <div>
                {currentUser.learningProgress.slice(0, 3).map((progress, index) => (
                  <div key={index} style={{marginBottom: '1rem'}}>
                    <strong>{progress.skill}</strong>
                    <div className="progress-bar" style={{marginTop: '0.5rem'}}>
                      <div 
                        className="progress-fill" 
                        style={{width: `${progress.progress}%`}}
                      ></div>
                    </div>
                    <small>{progress.progress}% complete</small>
                  </div>
                ))}
              </div>
            ) : (
              <p>No learning activity yet. Start by selecting skills!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;