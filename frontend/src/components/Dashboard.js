import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS = [
  "How rested do you feel in your body right now?",
  "How heavy or light does your chest feel?",
  "Are your thoughts racing, slow, or calm?",
  "How connected do you feel to yourself today?",
  "How much energy is left in your tank?",
  "Do you feel emotionally safe at this moment?",
  "How hopeful are you about tomorrow?",
  "Are you holding tension anywhere in your body?",
  "Did you eat something nourishing today?",
  "How loud are the voices in your head right now?",
  "Did anything make you genuinely smile today?",
  "How satisfied are you with how today went?",
  "Do you feel lonely even when surrounded by people?",
  "How kind have you been to yourself today?",
  "Are you avoiding something important?",
  "How meaningful did today feel to you?",
  "Do you feel stuck in any area of life?",
  "How rested is your mind — not just your body?",
  "Are you overthinking the past?",
  "How motivated are you for tomorrow?",
  "Do you feel like you're enough, just as you are?",
  "How much joy did you allow yourself today?",
  "Are you carrying unspoken guilt or regret?",
  "How grounded do you feel in this moment?",
  "Do you feel truly heard by anyone right now?",
  "How tense is your jaw, shoulders, or stomach?",
  "Are you living in the past, future, or present?",
  "How worthy do you feel of love and care?",
  "Do you feel emotionally numb or overwhelmed?",
  "How often did anxiety visit you today?",
  "Are you avoiding self-care out of exhaustion?",
  "How free do you feel to be your true self?",
  "Do you feel supported by the people around you?",
  "How heavy is your heart right now?",
  "Are you hiding how you really feel from others?",
  "How much rest does your soul actually need?",
  "Do you feel lost or without direction?",
  "How often did you feel peace today?",
  "Are you judging yourself harshly right now?",
  "How alive do you feel in this moment?",
  "Do you feel trapped inside your own mind?",
  "How much love did you give yourself today?",
  "Are you suppressing emotions that want to come out?",
  "How often did you laugh today — even a little?",
  "Do you feel accepted for who you are?",
  "How overwhelmed are you by responsibilities?",
  "Are you proud of how you handled today?",
  "How much peace did you experience, even for a second?",
  "Do you feel emotionally drained or recharged?",
  "How hopeful are you that things can get better?",
  "When was the last time you felt truly seen?"
];

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
    setAnswers(newAnswers);
    if (newAnswers.length === 5) {
      setTimeout(() => analyzeMood(newAnswers), 600);
    } else {
      setStep(step + 1);
    }
  };

  const analyzeMood = async (finalAnswers) => {
    const context = finalAnswers.map((a, i) => `${currentQuestions[i]} → ${a}`).join(' | ') +
                    (journal ? ` | Journal: "${journal}"` : '');

    try {
      const res = await axios.post('http://localhost:5000/api/chat/query', {
        message: `You are a deeply empathetic psychologist. From these answers (1=Very Bad, 5=Very Good), give:
MOOD: [One word + intensity]
EXERCISE: [One powerful self-care action]
QUOTE: [One soul-moving quote]

Context: ${context}`
      });

      const lines = res.data.response.split('\n').filter(l => l.trim());
      const mood = lines.find(l => l.startsWith('MOOD:'))?.replace('MOOD:', '').trim() || "Hopeful";
      const exercise = lines.find(l => l.startsWith('EXERCISE:'))?.replace('EXERCISE:', '').trim() || "Take a slow breath";
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
        mood: "You Are Stronger Than This Moment",
        exercise: "Close your eyes. Breathe in for 4, hold for 4, out for 6.",
        quote: "The sun will rise again — and so will you."
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
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fff8f0 0%, #fef7ec 100%)',
        padding: '100px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, type: "spring" }}
          style={{
            maxWidth: '900px',
            width: '100%',
            textAlign: 'center'
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: '100px',
              fontWeight: 800,
              background: 'linear-gradient(120deg, #ff6b35, #ff3855, #ff8c42)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-3px',
              marginBottom: '60px',
              textShadow: '0 10px 40px rgba(255,107,53,0.3)'
            }}
          >
            {result.mood}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(40px)',
              borderRadius: '40px',
              padding: '70px 60px',
              margin: '60px auto',
              maxWidth: '800px',
              border: '2px solid rgba(255, 140, 66, 0.3)',
              boxShadow: '0 40px 100px rgba(255, 140, 66, 0.3)'
            }}
          >
            <p style={{
              fontSize: '32px',
              color: '#2d1b0f',
              lineHeight: '1.8',
              fontWeight: 500
            }}>
              {result.exercise}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{
              fontSize: '36px',
              fontStyle: 'italic',
              color: '#ff6b35',
              margin: '80px 0',
              padding: '0 40px',
              lineHeight: '1.6'
            }}
          >
            "{result.quote}"
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            style={{
              padding: '24px 80px',
              background: 'linear-gradient(135deg, #ff6b35, #ff3855)',
              color: '#fff',
              border: 'none',
              borderRadius: '40px',
              fontSize: '24px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 20px 50px rgba(255,107,53,0.5)',
              letterSpacing: '1px'
            }}
          >
            Begin Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

return (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fff8f0 0%, #fef7ec 100%)',
    padding: '80px 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',  
    alignItems: 'center',        
    textAlign: 'center'
  }}>
    <motion.div style={{ maxWidth: '900px', width: '100%' }}>
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontSize: '64px',
          fontWeight: 800,
          background: 'linear-gradient(90deg, #ff6b35, #ff3855)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '80px',
          letterSpacing: '-1px'
        }}
      >
        How are you feeling?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: '24px',
          color: '#a0522d',
          marginBottom: '60px'
        }}
      >
        Question {step + 1} of 5
      </motion.p>

      <motion.h2
        key={step}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
        style={{
          fontSize: '42px',
          fontWeight: 600,
          color: '#2d1b0f',
          lineHeight: '1.5',
          margin: '0 auto 100px',
          maxWidth: '800px',
          padding: '40px',
          background: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '32px',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 140, 66, 0.2)',
          boxShadow: '0 20px 50px rgba(255, 140, 66, 0.15)'
        }}
      >
        {currentQuestions[step]}
      </motion.h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '32px',
        maxWidth: '900px',
        width: '100%'
      }}>
        {['Very Good', 'Good', 'Okay', 'Bad', 'Very Bad'].map((label, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.08, y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => selectAnswer(i + 1)}
            style={{
              padding: '40px 20px',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '3px solid rgba(255, 140, 66, 0.4)',
              borderRadius: '32px',
              color: '#2d1b0f',
              fontSize: '22px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 20px 50px rgba(255, 140, 66, 0.2)',
              transition: 'all 0.4s'
            }}
          >
            {label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '100px', width: '100%', maxWidth: '700px' }}
          >
            <textarea
              value={journal}
              onChange={e => setJournal(e.target.value)}
              placeholder="Pour your heart out... (optional but powerful)"
              style={{
                width: '100%',
                height: '180px',
                background: 'rgba(255, 255, 255, 0.95)',
                border: '3px solid rgba(255, 140, 66, 0.4)',
                borderRadius: '32px',
                padding: '32px',
                color: '#2d1b0f',
                fontSize: '20px',
                outline: 'none',
                resize: 'none',
                boxShadow: '0 20px 50px rgba(255, 140, 66, 0.2)'
              }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => analyzeMood(answers)}
              style={{
                marginTop: '40px',
                padding: '24px 80px',
                background: 'linear-gradient(135deg, #ff6b35, #ff3855)',
                color: '#fff',
                border: 'none',
                borderRadius: '40px',
                fontSize: '24px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 20px 60px rgba(255,107,53,0.5)'
              }}
            >
              Reveal My Mood
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </div>
);
};

export default Dashboard;