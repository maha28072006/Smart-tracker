import React, { useState, useEffect } from 'react';
import { getLearningResources } from '../utils/api';

const LearningRoadmap = ({ user }) => {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectedSkills = user.selectedSkills || [];
  const assessments = user.skillAssessments || [];

  const getSkillLevel = (skillName) => {
    const assessment = assessments.find(a => a.skill === skillName);
    return assessment ? assessment.level : 'Beginner';
  };

  const fetchResources = async (skillName) => {
    setLoading(true);
    try {
      const result = await getLearningResources(skillName);
      setResources(result.resources || []);
      setSelectedSkill(skillName);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'Video': return '🎥';
      case 'Article': return '📖';
      case 'Course': return '🎓';
      case 'Practice': return '💻';
      default: return '📚';
    }
  };

  if (selectedSkills.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <div className="card">
            <h2>No Skills Selected</h2>
            <p>Please select skills first to see your learning roadmap.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Learning Roadmap</h1>
        <p>Personalized learning paths based on your skill assessments</p>

        {!selectedSkill ? (
          <div>
            <h3>Choose a skill to see learning resources:</h3>
            <div className="grid grid-2" style={{margin: '2rem 0'}}>
              {selectedSkills.map(skill => {
                const level = getSkillLevel(skill);
                return (
                  <div key={skill} className="card" style={{cursor: 'pointer'}} onClick={() => fetchResources(skill)}>
                    <div style={{display: 'flex', justify: 'space-between', alignItems: 'center'}}>
                      <div>
                        <h3>{skill}</h3>
                        <p>Current Level: <strong>{level}</strong></p>
                      </div>
                      <div style={{fontSize: '2rem'}}>📚</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
              <h2>Learning Path: {selectedSkill}</h2>
              <button className="btn btn-secondary" onClick={() => setSelectedSkill('')}>
                Back to Skills
              </button>
            </div>

            {loading ? (
              <div className="loading">Loading resources...</div>
            ) : (
              <div>
                <div className="card">
                  <h3>📋 Learning Plan</h3>
                  <p>Current Level: <strong>{getSkillLevel(selectedSkill)}</strong></p>
                  <p>Follow this structured path to improve your {selectedSkill} skills:</p>
                </div>

                <div className="grid grid-1">
                  {resources.map((resource, index) => (
                    <div key={index} className="card">
                      <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                        <div style={{fontSize: '2rem'}}>
                          {getResourceIcon(resource.type)}
                        </div>
                        <div style={{flex: 1}}>
                          <h3>{resource.title}</h3>
                          <p>Type: {resource.type} | Duration: {resource.duration}</p>
                          <a 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{marginTop: '0.5rem'}}
                          >
                            Start Learning
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {resources.length === 0 && (
                  <div className="card">
                    <p>No learning resources available for this skill yet.</p>
                  </div>
                )}

                <div className="card">
                  <h3>💡 Learning Tips</h3>
                  <ul style={{paddingLeft: '1.5rem'}}>
                    <li>Start with fundamentals if you're a beginner</li>
                    <li>Practice regularly with hands-on projects</li>
                    <li>Join communities and forums for support</li>
                    <li>Track your progress and celebrate milestones</li>
                    <li>Apply what you learn in real-world scenarios</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningRoadmap;