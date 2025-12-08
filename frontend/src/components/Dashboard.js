import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const QUESTIONS = [
  "How present do you feel right now?", "How heavy is your body today?", "Are your thoughts racing or calm?",
  "How connected do you feel to yourself?", "How much energy do you have left?", "Do you feel safe emotionally?",
  "How hopeful are you about tomorrow?", "Are you holding tension anywhere?", "Did you eat properly today?",
  "How loud are the thoughts in your head?", "Did anything make you smile today?", "How satisfied are you with today?",
  "Do you feel lonely even around people?", "How kind were you to yourself today?", "Are you avoiding something?",
  "How meaningful was today to you?", "Do you feel stuck anywhere?", "How rested is your mind?",
  "Are you overthinking the past?", "How motivated are you for tomorrow?", "Do you feel like you're enough?",
  "How much joy did you allow yourself?", "Are you carrying guilt?", "How grounded do you feel?",
  "Do you feel heard by others?", "How tense is your chest?", "Are you living in the past or future?",
  "How worthy do you feel of love?", "Do you feel emotionally numb?", "How often did you feel anxious today?",
  "Are you avoiding self-care?", "How free do you feel to be yourself?", "Do you feel supported?",
  "How heavy is your heart right now?", "Are you hiding your true feelings?", "How much rest do you need?",
  "Do you feel lost or directionless?", "How often did you feel peace today?", "Are you judging yourself harshly?",
  "How alive do you feel right now?", "Do you feel trapped in your thoughts?", "How much love did you give yourself?",
  "Are you suppressing any feelings?", "How often did you laugh today?", "Do you feel accepted by others?",
  "How overwhelmed are you by responsibilities?", "Are you proud of how you handled today?",
  "How much peace did you experience?", "Do you feel emotionally drained?", "How hopeful are you about change?"
];

const MOTIVATIONAL_QUOTES = [
  "The wound is the place where the light enters you. — Rumi",
  "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared. That's part of being human.",
  "This too shall pass.",
  "You are not your thoughts. You are the observer of your thoughts.",
  "The storm will pass. The spring will come.",
  "You were given this life because you are strong enough to live it.",
  "Even the darkest night will end and the sun will rise.",
  "Fall seven times, stand up eight.",
  "You are braver than you believe, stronger than you seem, and smarter than you think.",
  "The comeback is always stronger than the setback."
];

const Dashboard = () => {
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [journal, setJournal] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5);
    setCurrentQuestions(shuffled);
  }, []);

  const selectAnswer = (intensity) => {
    setAnswers([...answers, intensity]);
    if (step === 4) analyzeMood();
    else setStep(step + 1);
  };

  const analyzeMood = async () => {
    const context = answers.map((a, i) => `${currentQuestions[i]} → ${a}`).join(' | ') + 
                    (journal ? ` | Journal: "${journal}"` : '');

    try {
      const res = await axios.post('http://localhost:5000/api/chat/query', {
        message: `Analyze this student's mood from these 5 answers and journal. Respond in this exact format:
        MOOD: [One word mood]
        EMPATHY: [1 caring sentence]
        EXERCISE: [1 practical self-care exercise under 15 words]
        QUOTE: [One motivational quote]
        Context: ${context}`
      });

      const lines = res.data.response.split('\n').filter(l => l.trim());
      const mood = lines.find(l => l.startsWith('MOOD:'))?.replace('MOOD:', '').trim() || "Resilient";
      const empathy = lines.find(l => l.startsWith('EMPATHY:'))?.replace('EMPATHY:', '').trim() || "You're stronger than you know.";
      const exercise = lines.find(l => l.startsWith('EXERCISE:'))?.replace('EXERCISE:', '').trim() || "Take three deep breaths.";
      const quote = lines.find(l => l.startsWith('QUOTE:'))?.replace('QUOTE:', '').trim() || MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];

      setResult({ mood, empathy, exercise, quote });
    } catch {
      setResult({
        mood: "Resilient",
        empathy: "You're still here. That means everything.",
        exercise: "Place your hand on your heart and breathe.",
        quote: MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]
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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h1 style={{ fontSize: '80px', color: '#0ff', margin: '40px 0' }}>{result.mood}</h1>
        <p style={{ fontSize: '22px', color: '#aaa', margin: '40px 0', lineHeight: '1.8' }}>
          {result.empathy}
        </p>
        <div style={{ background: '#111', padding: '30px', borderRadius: '16px', margin: '40px auto', maxWidth: '600px' }}>
          <p style={{ color: '#0ff', fontWeight: 'bold' }}>Do this now:</p>
          <p style={{ color: '#fff', fontSize: '20px' }}>{result.exercise}</p>
        </div>
        <p style={{ fontSize: '20px', color: '#0ff', fontStyle: 'italic', margin: '40px 0' }}>
          "{result.quote}"
        </p>
        <button onClick={reset} style={{ padding: '16px 40px', background: '#0ff', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>
          New Assessment
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '100px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '48px', color: '#0ff', marginBottom: '60px' }}>How are you feeling?</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>Question {step + 1} of 5</p>
      <h2 style={{ fontSize: '28px', margin: '40px 0', lineHeight: '1.6' }}>
        {currentQuestions[step]}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', maxWidth: '700px', margin: '0 auto' }}>
        {['Not at all', 'Slightly', 'Moderately', 'Very', 'Completely'].map((label, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.95 }}
            onClick={() => selectAnswer(i + 1)}
            style={{
              padding: '20px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '16px',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            {label}
          </motion.button>
        ))}
      </div>
      {step === 4 && (
        <div style={{ marginTop: '40px' }}>
          <textarea value={journal} onChange={e => setJournal(e.target.value)} placeholder="Anything else on your mind?" style={{ width: '100%', height: '100px', background: '#000', color: '#0f0', border: '1px solid #333', padding: '16px', borderRadius: '12px' }} />
          <button onClick={analyzeMood} style={{ marginTop: '20px', padding: '16px 40px', background: '#0ff', color: '#000', border: 'none', borderRadius: '12px' }}>
            Analyze My Mood
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;