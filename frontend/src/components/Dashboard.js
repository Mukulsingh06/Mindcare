import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const QUESTIONS = [/* your 50 questions here */];

const Dashboard = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [journal, setJournal] = useState('');
  const [result, setResult] = useState(null);
  const [currentQuestions, setCurrentQuestions] = useState([]);

  useEffect(() => {
    const shuffled = QUESTIONS.sort(() => Math.random() - 0.5).slice(0, 5);
    setCurrentQuestions(shuffled);
  }, []);

  const select = (score) => {
    const newAns = [...answers, score];
    if (newAns.length === 5) analyze(newAns);
    else { setAnswers(newAns); setStep(step + 1); }
  };

  const analyze = async (final) => {
    // Your AI call here
    setResult({ mood: "Deeply Calm", exercise: "Breathe deeply", quote: "You are enough." });
  };

  if (result) {
    return (
      <motion.div style={{ padding: '120px 40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '80px', fontWeight: 700, background: 'linear-gradient(90deg, #30d158, #007aff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {result.mood}
        </h1>
        <div style={{ background: 'rgba(30,30,30,0.6)', backdropFilter: 'blur(30px)', borderRadius: '24px', padding: '40px', margin: '40px auto', maxWidth: '600px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ fontSize: '20px', color: '#fff' }}>{result.exercise}</p>
        </div>
        <p style={{ fontSize: '24px', fontStyle: 'italic', color: '#888' }}>"{result.quote}"</p>
      </motion.div>
    );
  }

  return (
    <motion.div style={{ padding: '120px 40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '60px' }}>How are you feeling?</h1>
      <p style={{ color: '#888' }}>Question {step + 1} of 5</p>
      <h2 style={{ fontSize: '28px', margin: '40px 0', maxWidth: '800px', margin: '0 auto' }}>
        {currentQuestions[step]}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '20px', maxWidth: '700px', margin: '0 auto' }}>
        {['Not at all', 'Slightly', 'Moderately', 'Very', 'Completely'].map((l,i) => (
          <motion.button key={i} whileTap={{ scale: 0.95 }} onClick={() => select(i+1)}
            style={{ padding: '24px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', color: '#fff' }}>
            {l}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Dashboard;