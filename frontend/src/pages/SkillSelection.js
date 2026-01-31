import React, { useState, useEffect } from 'react';
import { getSkillsByCareer, updateUserSkills } from '../utils/api';

const SkillSelection = ({ user, refreshUser }) => {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState(user.selectedSkills || []);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const result = await getSkillsByCareer(user.careerGoal);
      setSkills(result.skills || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSkill = (skillName) => {
    setSelectedSkills(prev => 
      prev.includes(skillName)
        ? prev.filter(s => s !== skillName)
        : [...prev, skillName]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const result = await updateUserSkills(user.id, selectedSkills);
      setMessage('Skills updated successfully!');
      
      // Update user data in localStorage
      const updatedUser = { ...user, selectedSkills };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Refresh user state in parent component
      if (refreshUser) refreshUser();
      
      setTimeout(() => {
        setMessage('');
      }, 2000);
    } catch (error) {
      setMessage('Error updating skills. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading skills...</div>;
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Select Your Skills</h1>
        <p>Choose the skills you want to learn for your career goal: <strong>{user.careerGoal}</strong></p>
        
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

        <div className="grid grid-2" style={{margin: '2rem 0'}}>
          {skills.map(skill => (
            <div 
              key={skill._id}
              className={`skill-item ${selectedSkills.includes(skill.name) ? 'skill-selected' : ''}`}
              onClick={() => toggleSkill(skill.name)}
              style={{cursor: 'pointer'}}
            >
              <div>
                <h3>{skill.name}</h3>
                <p>{skill.description}</p>
                <small>Difficulty: {skill.difficulty}</small>
              </div>
              <div>
                {selectedSkills.includes(skill.name) ? '✅' : '⭕'}
              </div>
            </div>
          ))}
        </div>

        {skills.length === 0 && (
          <div className="card">
            <p>No skills found for your career goal. Please contact support.</p>
          </div>
        )}

        <div style={{textAlign: 'center', marginTop: '2rem'}}>
          <button 
            className="btn btn-primary"
            onClick={handleSave}
            disabled={saving || selectedSkills.length === 0}
          >
            {saving ? 'Saving...' : `Save Selected Skills (${selectedSkills.length})`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillSelection;