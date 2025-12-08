// src/components/Profile.js — FINAL VERSION (Only Mood History)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Profile = () => {
  const [moodHistory, setMoodHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMoodHistory();
  }, []);

  const fetchMoodHistory = async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const res = await axios.get('http://localhost:5000/api/mood/logs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMoodHistory(res.data);
    } catch (err) {
      console.log("No mood history yet");
    }
  };

  const deleteAllMoods = async () => {
    if (!window.confirm('Delete all mood history permanently?')) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete('http://localhost:5000/api/mood/delete-history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMoodHistory([]);
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('mindcare_chat'); // optional: clear chat on logout
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      color: '#0f0',
      fontFamily: "'Courier New', monospace",
      paddingTop: '120px',
      paddingLeft: '300px',
      textAlign: 'center'
    }}>
      <motion.div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px' }}>
        <h1 style={{ fontSize: '48px', letterSpacing: '15px', marginBottom: '60px' }}>
          YOUR MIND JOURNEY
        </h1>

        {moodHistory.length === 0 ? (
          <p style={{ color: '#666', fontSize: '20px' }}>No mood entries yet. Start your first assessment!</p>
        ) : (
          <div style={{ display: 'grid', gap: '30px' }}>
            {moodHistory.slice().reverse().map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: '#111',
                  padding: '30px',
                  borderRadius: '16px',
                  border: '1px solid #333'
                }}
              >
                <h2 style={{ color: '#0ff', fontSize: '32px', marginBottom: '15px' }}>
                  {entry.mood || 'Unknown Mood'}
                </h2>
                {entry.exercise && (
                  <p style={{ color: '#aaa', fontSize: '18px', margin: '15px 0' }}>
                    <strong>Exercise:</strong> {entry.exercise}
                  </p>
                )}
                {entry.quote && (
                  <p style={{ color: '#0f0', fontStyle: 'italic', fontSize: '20px', marginTop: '20px' }}>
                    "{entry.quote}"
                  </p>
                )}
                <p style={{ color: '#444', fontSize: '14px', marginTop: '20px' }}>
                  {new Date(entry.date).toLocaleDateString()} at {new Date(entry.date).toLocaleTimeString()}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '60px' }}>
          {moodHistory.length > 0 && (
            <button
              onClick={deleteAllMoods}
              style={{
                padding: '16px 40px',
                background: '#f00',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 'bold',
                margin: '0 20px'
              }}
            >
              DELETE ALL MOOD HISTORY
            </button>
          )}
          <button
            onClick={logout}
            style={{
              padding: '16px 40px',
              background: '#0ff',
              color: '#000',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 'bold'
            }}
          >
            LOGOUT
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;