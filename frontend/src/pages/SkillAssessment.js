import React, { useState, useEffect } from 'react';
import { getAssessmentQuestions, submitAssessment } from '../utils/api';

const SkillAssessment = ({ user, refreshUser }) => {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const userSkills = user.selectedSkills || [];

  const startAssessment = async (skillName) => {
    setLoading(true);
    try {
      const result = await getAssessmentQuestions(skillName);
      setQuestions(result.questions || []);
      setSelectedSkill(skillName);
      setCurrentQuestion(0);
      setAnswers([]);
      setShowResults(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = async () => {
    const correctAnswers = answers.filter((answer, index) => 
      answer === questions[index].correctAnswer
    ).length;
    
    const score = Math.round((correctAnswers / questions.length) * 100);
    let level = 'Beginner';
    
    if (score >= 80) level = 'Advanced';
    else if (score >= 60) level = 'Intermediate';

    setSubmitting(true);
    try {
      await submitAssessment(user.id, selectedSkill, level, score);
      
      // Update user data in localStorage
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const updatedAssessments = currentUser.skillAssessments || [];
      const existingIndex = updatedAssessments.findIndex(a => a.skill === selectedSkill);
      
      if (existingIndex >= 0) {
        updatedAssessments[existingIndex] = { skill: selectedSkill, level, score };
      } else {
        updatedAssessments.push({ skill: selectedSkill, level, score });
      }
      
      const updatedUser = { ...currentUser, skillAssessments: updatedAssessments };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Refresh user state in parent component
      if (refreshUser) refreshUser();
      
    } catch (error) {
      console.error('Error submitting assessment:', error);
    } finally {
      setSubmitting(false);
    }

    setShowResults(true);
  };

  const getScore = () => {
    const correctAnswers = answers.filter((answer, index) => 
      answer === questions[index].correctAnswer
    ).length;
    return Math.round((correctAnswers / questions.length) * 100);
  };

  const resetAssessment = () => {
    setSelectedSkill('');
    setQuestions([]);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (userSkills.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <div className="card">
            <h2>No Skills Selected</h2>
            <p>Please select skills first before taking assessments.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedSkill) {
    return (
      <div className="page">
        <div className="container">
          <h1>Skill Assessment</h1>
          <p>Choose a skill to assess your current level:</p>
          
          <div className="grid grid-2">
            {userSkills.map(skill => (
              <div key={skill} className="card">
                <h3>{skill}</h3>
                <p>Test your knowledge and get personalized recommendations</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => startAssessment(skill)}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Start Assessment'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = getScore();
    const level = score >= 80 ? 'Advanced' : score >= 60 ? 'Intermediate' : 'Beginner';
    
    return (
      <div className="page">
        <div className="container">
          <div className="card">
            <h2>Assessment Results - {selectedSkill}</h2>
            <div style={{textAlign: 'center', margin: '2rem 0'}}>
              <h1 style={{color: '#667eea'}}>{score}%</h1>
              <h3>Level: {level}</h3>
              <p>You got {answers.filter((answer, index) => answer === questions[index].correctAnswer).length} out of {questions.length} questions correct.</p>
            </div>
            
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
              <button className="btn btn-primary" onClick={resetAssessment}>
                Take Another Assessment
              </button>
              <button className="btn btn-secondary" onClick={() => window.location.href = '/dashboard'}>
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div className="loading">Loading assessment...</div>;
  }

  const question = questions[currentQuestion];

  return (
    <div className="page">
      <div className="container">
        <div className="question-card">
          <div style={{marginBottom: '1rem'}}>
            <small>Question {currentQuestion + 1} of {questions.length} - {selectedSkill}</small>
          </div>
          
          <h2>{question.question}</h2>
          
          <ul className="options">
            {question.options.map((option, index) => (
              <li 
                key={index}
                className={answers[currentQuestion] === index ? 'selected' : ''}
                onClick={() => handleAnswer(index)}
              >
                {option}
              </li>
            ))}
          </ul>
          
          <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <button 
              className="btn btn-primary"
              onClick={nextQuestion}
              disabled={answers[currentQuestion] === undefined}
            >
              {currentQuestion === questions.length - 1 ? 'Finish Assessment' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessment;