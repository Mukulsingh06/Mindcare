import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const QUESTIONS = [
  "How rested do you feel right now?", "How heavy is your body today?", "Are your thoughts racing or calm?",
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

const MOOD_INTENSITY = ["Slightly", "Moderately", "Very", "Deeply"];
const BASE_MOODS = ["Calm", "Peaceful", "Content", "Hopeful", "Anxious", "Overwhelmed", "Sad", "Lonely", "Stressed", "Drained", "Numb", "Frustrated", "Angry", "Lost", "Empty", "Tired", "Joyful", "Grateful"];

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
    if (answers.length === 4) {
      analyzeMood([...answers, intensity]);
    } else {
      setStep(step + 1);
    }
  };

  const analyzeMood = async (finalAnswers) => {
    const avgIntensity = finalAnswers.reduce((a, b) => a + b, 0) / 5;
    const context = finalAnswers.map((a, i) => `Q${i + 1}: ${currentQuestions[i]} → Intensity: ${a}`).join(' | ') +
                    (journal ? ` | Journal: "${journal}"` : '');

    try {
      const res = await axios.post('http://localhost:5000/api/chat/query', {
        message: `You are an expert psychologist. From these 5 answers (1=low, 5=high) and journal, detect the student's CURRENT emotional state.

Give response in this EXACT format:
MOOD: [One word + intensity, e.g. Deeply Calm / Moderately Anxious / Highly Overwhelmed]
EXERCISE: [One practical self-care action under 15 words]
QUOTE: [One powerful motivational quote]

Context: ${context}`
      });

      const lines = res.data.response.split('\n').filter(l => l.trim());
      const moodLine = lines.find(l => l.startsWith('MOOD:')) || 'MOOD: Balanced';
      const exerciseLine = lines.find(l => l.startsWith('EXERCISE:')) || 'EXERCISE: Take a deep breath';
      const quoteLine = lines.find(l => l.startsWith('QUOTE:')) || 'QUOTE: You are stronger than you know';

      const finalResult = {
        mood: moodLine.replace('MOOD:', '').trim(),
        exercise: exerciseLine.replace('EXERCISE:', '').trim(),
        quote: quoteLine.replace('QUOTE:', '').trim()
      };

      setResult(finalResult);

      // Save to backend
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post('http://localhost:5000/api/mood/log', {
          mood: finalResult.mood,
          exercise: finalResult.exercise,
          quote: finalResult.quote
        }, { headers: { Authorization: `Bearer ${token}` } });
      }
    } catch (error) {
      console.log("AI failed, using fallback");
      const fallbackMoods = avgIntensity < 2.5 ? ["Deeply Calm", "Peaceful"] :
                           avgIntensity < 3.5 ? ["Balanced", "Content"] :
                           avgIntensity < 4.5 ? ["Slightly Anxious", "Overwhelmed"] :
                           ["Highly Stressed", "Deeply Drained"];

      setResult({
        mood: fallbackMoods[Math.floor(Math.random() * fallbackMoods.length)],
        exercise: "Take 10 deep breaths right now",
        quote: "This feeling will pass. You are not alone."
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
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h1 style={{ fontSize: '80px', color: '#0ff', margin: '40px 0', fontWeight: 'bold' }}>
          {result.mood}
        </h1>
        <div style={{ background: '#111', padding: '40px', borderRadius: '20px', margin: '40px auto', maxWidth: '700px' }}>
          <p style={{ color: '#aaa', fontSize: '20px', margin: '20px 0', lineHeight: '1.8' }}>
            <strong>Do this now:</strong><br />
            {result.exercise}
          </p>
        </div>
        <p style={{ fontSize: '24px', color: '#0ff', fontStyle: 'italic', margin: '50px 0' }}>
          "{result.quote}"
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          style={{ padding: '18px 50px', background: '#0ff', color: '#000', border: 'none', borderRadius: '16px', fontWeight: 'bold', fontSize: '18px' }}
        >
          New Assessment
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '100px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '48px', color: '#0ff', marginBottom: '60px', letterSpacing: '8px' }}>
        Mood Assessment
      </h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>Question {step + 1} of 5</p>
      <h2 style={{ fontSize: '28px', color: '#fff', margin: '40px 0', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto 60px' }}>
        {currentQuestions[step]}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
        {['Not at all', 'Slightly', 'Moderately', 'Very', 'Extremely'].map((label, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => selectAnswer(i + 1)}
            style={{
              padding: '24px 12px',
              background: 'rgba(0, 255, 255, 0.08)',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              borderRadius: '16px',
              color: '#0ff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            {label}
          </motion.button>
        ))}
      </div>

      {step === 4 && (
        <div style={{ marginTop: '60px', maxWidth: '600px', margin: '60px auto 0' }}>
          <textarea
            value={journal}
            onChange={e => setJournal(e.target.value)}
            placeholder="Anything else on your mind? (optional)"
            style={{
              width: '100%',
              height: '120px',
              background: '#000',
              color: '#0ff',
              border: '1px solid #333',
              borderRadius: '16px',
              padding: '20px',
              fontSize: '18px',
              fontFamily: 'inherit'
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => analyzeMood(answers)}
            style={{
              marginTop: '20px',
              padding: '18px 50px',
              background: '#0ff',
              color: '#000',
              border: 'none',
              borderRadius: '16px',
              fontWeight: 'bold',
              fontSize: '18px'
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