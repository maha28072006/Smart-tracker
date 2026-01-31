import React from 'react';

const ProfilePage = ({ user }) => {
  const selectedSkills = user.selectedSkills || [];
  const assessments = user.skillAssessments || [];
  const learningProgress = user.learningProgress || [];

  const getOverallProgress = () => {
    if (selectedSkills.length === 0) return 0;
    const totalProgress = selectedSkills.reduce((sum, skill) => {
      const progress = learningProgress.find(p => p.skill === skill);
      return sum + (progress ? progress.progress : 0);
    }, 0);
    return Math.round(totalProgress / selectedSkills.length);
  };

  const getAverageScore = () => {
    if (assessments.length === 0) return 0;
    const totalScore = assessments.reduce((sum, assessment) => sum + assessment.score, 0);
    return Math.round(totalScore / assessments.length);
  };

  const getSkillsByLevel = (level) => {
    return assessments.filter(assessment => assessment.level === level).length;
  };

  const getTotalCompletedTopics = () => {
    return learningProgress.reduce((sum, progress) => {
      return sum + (progress.completedTopics ? progress.completedTopics.length : 0);
    }, 0);
  };

  return (
    <div className="page">
      <div className="container">
        <div className="card">
          <h1>👤 Profile</h1>
          <div className="grid grid-2">
            <div>
              <h3>Personal Information</h3>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Career Goal:</strong> {user.careerGoal}</p>
              <p><strong>Member Since:</strong> {new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <h3>Quick Stats</h3>
              <p><strong>Selected Skills:</strong> {selectedSkills.length}</p>
              <p><strong>Assessments Taken:</strong> {assessments.length}</p>
              <p><strong>Overall Progress:</strong> {getOverallProgress()}%</p>
              <p><strong>Average Score:</strong> {getAverageScore()}%</p>
            </div>
          </div>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <h3>📊 Learning Statistics</h3>
            <div style={{marginBottom: '1rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                <span>Overall Progress</span>
                <span>{getOverallProgress()}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{width: `${getOverallProgress()}%`}}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-2">
              <div style={{textAlign: 'center'}}>
                <h2 style={{color: '#667eea'}}>{getTotalCompletedTopics()}</h2>
                <p>Topics Completed</p>
              </div>
              <div style={{textAlign: 'center'}}>
                <h2 style={{color: '#667eea'}}>{getAverageScore()}%</h2>
                <p>Average Score</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3>🎯 Skill Levels</h3>
            <div className="grid grid-3">
              <div style={{textAlign: 'center'}}>
                <h2 style={{color: '#4caf50'}}>{getSkillsByLevel('Advanced')}</h2>
                <p>Advanced</p>
              </div>
              <div style={{textAlign: 'center'}}>
                <h2 style={{color: '#ff9800'}}>{getSkillsByLevel('Intermediate')}</h2>
                <p>Intermediate</p>
              </div>
              <div style={{textAlign: 'center'}}>
                <h2 style={{color: '#2196f3'}}>{getSkillsByLevel('Beginner')}</h2>
                <p>Beginner</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>📚 Selected Skills</h3>
          {selectedSkills.length > 0 ? (
            <div className="grid grid-3">
              {selectedSkills.map(skill => {
                const assessment = assessments.find(a => a.skill === skill);
                const progress = learningProgress.find(p => p.skill === skill);
                
                return (
                  <div key={skill} style={{
                    padding: '1rem',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    textAlign: 'center'
                  }}>
                    <h4>{skill}</h4>
                    <p>Level: <strong>{assessment ? assessment.level : 'Not Assessed'}</strong></p>
                    <p>Progress: <strong>{progress ? progress.progress : 0}%</strong></p>
                    {assessment && (
                      <p>Score: <strong>{assessment.score}%</strong></p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No skills selected yet. <a href="/skills">Select skills</a> to get started!</p>
          )}
        </div>

        <div className="card">
          <h3>🏆 Recent Achievements</h3>
          <div>
            {assessments.length > 0 ? (
              <div>
                <h4>Latest Assessment Results:</h4>
                {assessments.slice(-3).map((assessment, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem',
                    marginBottom: '0.5rem',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '5px'
                  }}>
                    <span>{assessment.skill}</span>
                    <div>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '10px',
                        backgroundColor: assessment.level === 'Advanced' ? '#4caf50' : 
                                       assessment.level === 'Intermediate' ? '#ff9800' : '#2196f3',
                        color: 'white',
                        fontSize: '0.8rem',
                        marginRight: '0.5rem'
                      }}>
                        {assessment.level}
                      </span>
                      <strong>{assessment.score}%</strong>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No assessments taken yet. <a href="/assessment">Take your first assessment</a>!</p>
            )}
          </div>
        </div>

        <div className="card">
          <h3>💡 Recommendations</h3>
          <ul style={{paddingLeft: '1.5rem'}}>
            {selectedSkills.length === 0 && (
              <li>Start by selecting skills that align with your career goal</li>
            )}
            {assessments.length === 0 && selectedSkills.length > 0 && (
              <li>Take skill assessments to understand your current level</li>
            )}
            {assessments.length > 0 && getOverallProgress() < 50 && (
              <li>Focus on completing learning topics to improve your progress</li>
            )}
            {getSkillsByLevel('Beginner') > 0 && (
              <li>Work on your beginner-level skills to build a strong foundation</li>
            )}
            {getOverallProgress() > 75 && (
              <li>Great progress! Consider exploring advanced topics or new skills</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;