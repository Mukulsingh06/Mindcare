import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const QUESTIONS = [ /* your 50 questions */ ];

const Dashboard = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [journal, setJournal] = useState('');
  const [result, setResult] = useState(null);
  const [currentQuestions, setCurrentQuestions] = useState([]);

  useEffect(() => {
    const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5);
    setCurrentQuestions(shuffled);
  }, []);

  const selectAnswer = (intensity) => {
    const newAnswers = [...answers, intensity];
    if (newAnswers.length === 5) {
      analyzeMood(newAnswers);
    } else {
      setAnswers(newAnswers);
      setStep(step + 1);
    }
  };

  const analyzeMood = async (finalAnswers) => {
    const context = finalAnswers.map((a, i) => `${currentQuestions[i]} → ${a}`).join(' | ') +
                    (journal ? ` | Journal: "${journal}"` : '');

    try {
      const res = await axios.post('http://localhost:5000/api/chat/query', {
        message: `Analyze mood from these answers. Respond in exact format:
MOOD: [One word + intensity]
EXERCISE: [1 practical action]
QUOTE: [1 uplifting quote]

Context: ${context}`
      });

      const lines = res.data.response.split('\n').filter(l => l.trim());
      const mood = lines.find(l => l.startsWith('MOOD:'))?.replace('MOOD:', '').trim() || "Balanced";
      const exercise = lines.find(l => l.startsWith('EXERCISE:'))?.replace('EXERCISE:', '').trim() || "Take a deep breath";
      const quote = lines.find(l => l.startsWith('QUOTE:'))?.replace('QUOTE:', '').trim() || "You are enough";

      setResult({ mood, exercise, quote });

      const token = localStorage.getItem('token');
      if (token) {
        await axios.post('http://localhost:5000/api/mood/log', {
          mood, exercise, quote, notes: journal
        }, { headers: { Authorization: `Bearer ${token}` } });
      }
    } catch {
      setResult({
        mood: "Resilient",
        exercise: "Walk outside for 10 minutes",
        quote: "This too shall pass"
      });
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setJournal('');
    setResult(null);
    const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5);
    setCurrentQuestions(shuffled);
  };

  if (result) {
    return (
      <motion.div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff8f0 0%, #fef7ec 100%)', padding: '140px 40px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '90px',
          fontWeight: 800,
          background: 'linear-gradient(90deg, #ff8c42, #ff5e78)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '40px'
        }}>
          {result.mood}
        </h1>

        <div style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(30px)',
          borderRadius: '32px',
          padding: '60px',
          margin: '40px auto',
          maxWidth: '700px',
          border: '1px solid rgba(255, 140, 66, 0.3)',
          boxShadow: '0 20px 60px rgba(255, 140, 66, 0.2)'
        }}>
          <p style={{ fontSize: '26px', color: '#2d1b0f', lineHeight: '1.8' }}>
            {result.exercise}
          </p>
        </div>

        <p style={{ fontSize: '30px', fontStyle: 'italic', color: '#ff8c42', margin: '60px 0' }}>
          "{result.quote}"
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          style={{
            padding: '20px 60px',
            background: 'linear-gradient(90deg, #ff8c42, #ff5e78)',
            color: '#fff',
            border: 'none',
            borderRadius: '24px',
            fontSize: '20px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          New Assessment
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff8f0 0%, #fef7ec 100%)', padding: '140px 40px', textAlign: 'center' }}>
      <h1 style={{
        fontSize: '64px',
        fontWeight: 800,
        background: 'linear-gradient(90deg, #ff8c42, #ff5e78)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '60px'
      }}>
        How are you feeling?
      </h1>

      <p style={{ color: '#888', marginBottom: '40px', fontSize: '22px' }}>
        Question {step + 1} of 5
      </p>

      <h2 style={{ fontSize: '36px', color: '#2d1b0f', margin: '40px 0 80px', maxWidth: '800px', margin: '0 auto' }}>
        {currentQuestions[step]}
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '24px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {['Not at all', 'Slightly', 'Moderately', 'Very', 'Completely'].map((label, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => selectAnswer(i + 1)}
            style={{
              padding: '32px 20px',
              background: '#ffffff',
              border: '2px solid rgba(255, 140, 66, 0.4)',
              borderRadius: '24px',
              color: '#2d1b0f',
              fontSize: '18px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(255, 140, 66, 0.15)'
            }}
          >
            {label}
          </motion.button>
        ))}
      </div>

      {step === 4 && (
        <div style={{ marginTop: '80px', maxWidth: '600px', margin: '80px auto 0' }}>
          <textarea
            value={journal}
            onChange={e => setJournal(e.target.value)}
            placeholder="Anything else on your mind?"
            style={{
              width: '100%',
              height: '140px',
              background: '#ffffff',
              border: '2px solid rgba(255, 140, 66, 0.4)',
              borderRadius: '24px',
              padding: '24px',
              color: '#2d1b0f',
              fontSize: '18px',
              outline: 'none'
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => analyzeMood(answers)}
            style={{
              marginTop: '30px',
              padding: '20px 60px',
              background: 'linear-gradient(90deg, #ff8c42, #ff5e78)',
              color: '#fff',
              border: 'none',
              borderRadius: '24px',
              fontSize: '20px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Analyze My Mood
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;