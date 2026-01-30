import React from 'react';
import { Link } from 'react-router-dom';

const SkillGapAnalysis = ({ user }) => {
  const selectedSkills = user.selectedSkills || [];
  const assessments = user.skillAssessments || [];

  const getSkillLevel = (skillName) => {
    const assessment = assessments.find(a => a.skill === skillName);
    return assessment ? assessment.level : 'Not Assessed';
  };

  const getSkillScore = (skillName) => {
    const assessment = assessments.find(a => a.skill === skillName);
    return assessment ? assessment.score : 0;
  };

  const getRecommendation = (level, score) => {
    if (level === 'Not Assessed') {
      return 'Take an assessment to understand your current level';
    }
    if (score < 40) {
      return 'Focus on fundamentals and basic concepts';
    }
    if (score < 70) {
      return 'Practice intermediate topics and real-world projects';
    }
    return 'Explore advanced topics and contribute to complex projects';
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Advanced': return '#4caf50';
      case 'Intermediate': return '#ff9800';
      case 'Beginner': return '#2196f3';
      default: return '#9e9e9e';
    }
  };

  if (selectedSkills.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <div className="card">
            <h2>No Skills Selected</h2>
            <p>Please select skills first to see your skill gap analysis.</p>
            <Link to="/skills" className="btn btn-primary">Select Skills</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Skill Gap Analysis</h1>
        <p>Analyze your current skill levels and identify areas for improvement</p>

        <div className="grid grid-1" style={{margin: '2rem 0'}}>
          {selectedSkills.map(skill => {
            const level = getSkillLevel(skill);
            const score = getSkillScore(skill);
            const recommendation = getRecommendation(level, score);
            
            return (
              <div key={skill} className="card">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                  <h3>{skill}</h3>
                  <span 
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '15px',
                      backgroundColor: getLevelColor(level),
                      color: 'white',
                      fontSize: '0.8rem'
                    }}
                  >
                    {level}
                  </span>
                </div>
                
                <div style={{marginBottom: '1rem'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                    <span>Current Score</span>
                    <span>{score}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{width: `${score}%`}}
                    ></div>
                  </div>
                </div>
                
                <div style={{marginBottom: '1rem'}}>
                  <strong>Recommendation:</strong>
                  <p style={{margin: '0.5rem 0', color: '#666'}}>{recommendation}</p>
                </div>
                
                <div style={{display: 'flex', gap: '0.5rem'}}>
                  {level === 'Not Assessed' ? (
                    <Link to="/assessment" className="btn btn-primary">
                      Take Assessment
                    </Link>
                  ) : (
                    <>
                      <Link to="/roadmap" className="btn btn-primary">
                        View Learning Path
                      </Link>
                      <Link to="/assessment" className="btn btn-secondary">
                        Retake Assessment
                      </Link>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="card">
          <h3>📊 Overall Analysis</h3>
          <div className="grid grid-3">
            <div style={{textAlign: 'center'}}>
              <h2 style={{color: '#4caf50'}}>
                {assessments.filter(a => a.level === 'Advanced').length}
              </h2>
              <p>Advanced Skills</p>
            </div>
            <div style={{textAlign: 'center'}}>
              <h2 style={{color: '#ff9800'}}>
                {assessments.filter(a => a.level === 'Intermediate').length}
              </h2>
              <p>Intermediate Skills</p>
            </div>
            <div style={{textAlign: 'center'}}>
              <h2 style={{color: '#2196f3'}}>
                {assessments.filter(a => a.level === 'Beginner').length}
              </h2>
              <p>Beginner Skills</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGapAnalysis;