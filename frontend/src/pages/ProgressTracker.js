import React, { useState } from 'react';
import { updateProgress } from '../utils/api';

const ProgressTracker = ({ user, refreshUser }) => {
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  const selectedSkills = user.selectedSkills || [];
  const learningProgress = user.learningProgress || [];

  const getSkillProgress = (skillName) => {
    const progress = learningProgress.find(p => p.skill === skillName);
    return progress ? progress.progress : 0;
  };

  const getCompletedTopics = (skillName) => {
    const progress = learningProgress.find(p => p.skill === skillName);
    return progress ? progress.completedTopics || [] : [];
  };

  const updateSkillProgress = async (skillName, newProgress) => {
    setUpdating(true);
    setMessage('');

    try {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const currentProgress = currentUser.learningProgress || [];
      const completedTopics = getCompletedTopics(skillName);
      
      await updateProgress(user.id, skillName, newProgress, completedTopics);
      
      // Update user data in localStorage
      const updatedProgress = [...currentProgress];
      const existingIndex = updatedProgress.findIndex(p => p.skill === skillName);
      
      if (existingIndex >= 0) {
        updatedProgress[existingIndex] = { skill: skillName, progress: newProgress, completedTopics };
      } else {
        updatedProgress.push({ skill: skillName, progress: newProgress, completedTopics });
      }
      
      const updatedUser = { ...currentUser, learningProgress: updatedProgress };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Refresh user state in parent component
      if (refreshUser) refreshUser();
      
      setMessage('Progress updated successfully!');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    } catch (error) {
      setMessage('Error updating progress. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const addCompletedTopic = async (skillName, topic) => {
    const currentTopics = getCompletedTopics(skillName);
    if (currentTopics.includes(topic)) return;

    const newTopics = [...currentTopics, topic];
    const currentProgress = getSkillProgress(skillName);
    
    setUpdating(true);
    try {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const currentProgress = currentUser.learningProgress || [];
      
      await updateProgress(user.id, skillName, currentProgress, newTopics);
      
      // Update localStorage
      const updatedProgress = [...currentProgress];
      const existingIndex = updatedProgress.findIndex(p => p.skill === skillName);
      
      if (existingIndex >= 0) {
        updatedProgress[existingIndex] = { skill: skillName, progress: currentProgress, completedTopics: newTopics };
      } else {
        updatedProgress.push({ skill: skillName, progress: currentProgress, completedTopics: newTopics });
      }
      
      const updatedUser = { ...currentUser, learningProgress: updatedProgress };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Refresh user state in parent component
      if (refreshUser) refreshUser();
      
      setMessage('Topic marked as completed!');
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      setMessage('Error updating progress. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const getOverallProgress = () => {
    if (selectedSkills.length === 0) return 0;
    const totalProgress = selectedSkills.reduce((sum, skill) => sum + getSkillProgress(skill), 0);
    return Math.round(totalProgress / selectedSkills.length);
  };

  const sampleTopics = {
    'JavaScript': ['Variables & Data Types', 'Functions', 'Arrays & Objects', 'DOM Manipulation', 'Async Programming'],
    'React': ['Components', 'Props & State', 'Hooks', 'Routing', 'State Management'],
    'Node.js': ['Modules', 'File System', 'HTTP Server', 'Express.js', 'Database Integration'],
    'MongoDB': ['Collections', 'Queries', 'Indexing', 'Aggregation', 'Schema Design'],
    'Python': ['Syntax Basics', 'Data Structures', 'Functions', 'OOP', 'Libraries']
  };

  if (selectedSkills.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <div className="card">
            <h2>No Skills Selected</h2>
            <p>Please select skills first to track your progress.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Progress Tracker</h1>
        <p>Monitor your learning journey and celebrate your achievements</p>

        {message && (
          <div style={{
            padding: '1rem',
            marginBottom: '1rem',
            backgroundColor: message.includes('Error') ? '#ffebee' : '#e8f5e8',
            color: message.includes('Error') ? '#c62828' : '#2e7d32',
            borderRadius: '5px'
          }}>
            {message}
          </div>
        )}

        <div className="card" style={{marginBottom: '2rem'}}>
          <h3>📊 Overall Progress</h3>
          <div className="progress-bar" style={{marginBottom: '1rem'}}>
            <div 
              className="progress-fill" 
              style={{width: `${getOverallProgress()}%`}}
            ></div>
          </div>
          <p>{getOverallProgress()}% Complete across all skills</p>
        </div>

        <div className="grid grid-1">
          {selectedSkills.map(skill => {
            const progress = getSkillProgress(skill);
            const completedTopics = getCompletedTopics(skill);
            const topics = sampleTopics[skill] || ['Basic Concepts', 'Intermediate Topics', 'Advanced Topics'];
            
            return (
              <div key={skill} className="card">
                <h3>{skill}</h3>
                
                <div style={{marginBottom: '1rem'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{width: `${progress}%`}}
                    ></div>
                  </div>
                </div>

                <div style={{marginBottom: '1rem'}}>
                  <h4>Update Progress:</h4>
                  <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    {[0, 25, 50, 75, 100].map(value => (
                      <button
                        key={value}
                        className={`btn ${progress === value ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => updateSkillProgress(skill, value)}
                        disabled={updating}
                        style={{fontSize: '0.8rem', padding: '0.5rem'}}
                      >
                        {value}%
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4>Learning Topics:</h4>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                    {topics.map(topic => (
                      <div 
                        key={topic}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.5rem',
                          backgroundColor: completedTopics.includes(topic) ? '#e8f5e8' : '#f5f5f5',
                          borderRadius: '5px'
                        }}
                      >
                        <span style={{
                          textDecoration: completedTopics.includes(topic) ? 'line-through' : 'none'
                        }}>
                          {topic}
                        </span>
                        <button
                          className={`btn ${completedTopics.includes(topic) ? 'btn-success' : 'btn-secondary'}`}
                          onClick={() => addCompletedTopic(skill, topic)}
                          disabled={updating || completedTopics.includes(topic)}
                          style={{fontSize: '0.7rem', padding: '0.25rem 0.5rem'}}
                        >
                          {completedTopics.includes(topic) ? '✅' : 'Mark Complete'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="card">
          <h3>🏆 Achievements</h3>
          <div className="grid grid-3">
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>
                {selectedSkills.filter(skill => getSkillProgress(skill) === 100).length > 0 ? '🎉' : '🎯'}
              </div>
              <h4>{selectedSkills.filter(skill => getSkillProgress(skill) === 100).length}</h4>
              <p>Skills Completed</p>
            </div>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>📚</div>
              <h4>{learningProgress.reduce((sum, p) => sum + (p.completedTopics?.length || 0), 0)}</h4>
              <p>Topics Completed</p>
            </div>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>⭐</div>
              <h4>{selectedSkills.filter(skill => getSkillProgress(skill) >= 50).length}</h4>
              <p>Skills 50%+ Complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;