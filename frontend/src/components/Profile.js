import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Profile = () => {
  const [moods, setMoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/mood/logs', { headers: { Authorization: `Bearer ${token}` } });
      setMoods(res.data.reverse());
    } catch { }
  };

  const deleteAll = async () => {
    if (!window.confirm('Delete all mood history?')) return;
    const token = localStorage.getItem('token');
    await axios.delete('http://localhost:5000/api/mood/delete-history', { headers: { Authorization: `Bearer ${token}` } });
    setMoods([]);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('mindcare_chat');
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fffaf0 0%, #fdf4e8 100%)',
      padding: '120px 40px',
      paddingLeft: '340px'
    }}>
      <motion.div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '64px',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: '60px',
          background: 'linear-gradient(90deg, #ff8c42, #ff5e78)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Your Journey
        </h1>

        <div className="scroll-container" style={{
          maxHeight: '70vh',
          background: '#ffffff',
          borderRadius: '32px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(255, 140, 66, 0.15)',
          border: '1px solid rgba(255, 140, 66, 0.2)'
        }}>
          {moods.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', fontSize: '22px', marginTop: '100px' }}>
              No moods recorded yet.<br />Your first entry will appear here.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '32px' }}>
              {moods.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{
                    background: 'rgba(255, 248, 240, 0.9)',
                    borderRadius: '28px',
                    padding: '40px',
                    border: '2px solid rgba(255, 140, 66, 0.3)',
                    boxShadow: '0 15px 40px rgba(255, 140, 66, 0.15)'
                  }}
                >
                  <h2 style={{ fontSize: '36px', color: '#ff8c42', marginBottom: '16px' }}>
                    {m.mood}
                  </h2>
                  <p style={{ fontSize: '20px', color: '#2d1b0f', lineHeight: '1.7' }}>
                    {m.exercise}
                  </p>
                  <p style={{ fontSize: '22px', fontStyle: 'italic', color: '#888', marginTop: '24px' }}>
                    "{m.quote}"
                  </p>
                  <p style={{ color: '#888', fontSize: '16px', marginTop: '20px' }}>
                    {new Date(m.date).toLocaleDateString()}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          {moods.length > 0 && (
            <button onClick={deleteAll} style={{
              padding: '18px 50px',
              background: '#ff5e78',
              color: '#fff',
              border: 'none',
              borderRadius: '28px',
              fontWeight: 600,
              fontSize: '18px',
              margin: '0 20px'
            }}>
              Clear History
            </button>
          )}
          <button onClick={logout} style={{
            padding: '18px 50px',
            background: 'linear-gradient(90deg, #ff8c42, #ff5e78)',
            color: '#fff',
            border: 'none',
            borderRadius: '28px',
            fontWeight: 600,
            fontSize: '18px'
          }}>
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;