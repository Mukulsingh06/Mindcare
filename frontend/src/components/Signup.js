// src/components/Signup.js — FINAL SUNRISE MASTERPIECE
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/signup', { 
        email, 
        password 
      });

      setMsg('Welcome to MindCare! Account created');
      setTimeout(() => navigate('/dashboard', { replace: true }), 1500);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Email already exists';
      setMsg(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff8f0 0%, #fef7ec 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(40px)',
          borderRadius: '44px',
          padding: '80px 60px',
          border: '1px solid rgba(255, 140, 66, 0.3)',
          boxShadow: '0 40px 100px rgba(255, 140, 66, 0.3)'
        }}
      >
        <h1 style={{
          fontSize: '56px',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: '70px',
          background: 'linear-gradient(90deg, #ff8c42, #ff5e78)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-2px'
        }}>
          MindCare
        </h1>

        {msg && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              marginBottom: '30px',
              fontSize: '20px',
              fontWeight: 600,
              color: msg.includes('Welcome') ? '#30d158' : '#ff453a'
            }}
          >
            {msg}
          </motion.p>
        )}

        <form onSubmit={handleSignup}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your Email"
            required
            style={{
              width: '100%',
              padding: '22px 28px',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '2px solid rgba(255, 140, 66, 0.4)',
              borderRadius: '28px',
              color: '#2d1b0f',
              fontSize: '19px',
              marginBottom: '24px',
              outline: 'none',
              fontWeight: 500
            }}
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Choose Password"
            required
            style={{
              width: '100%',
              padding: '22px 28px',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '2px solid rgba(255, 140, 66, 0.4)',
              borderRadius: '28px',
              color: '#2d1b0f',
              fontSize: '19px',
              marginBottom: '24px',
              outline: 'none',
              fontWeight: 500
            }}
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            style={{
              width: '100%',
              padding: '22px 28px',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '2px solid rgba(255, 140, 66, 0.4)',
              borderRadius: '28px',
              color: '#2d1b0f',
              fontSize: '19px',
              marginBottom: '50px',
              outline: 'none',
              fontWeight: 500
            }}
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '24px',
              background: 'linear-gradient(90deg, #ff8c42, #ff5e78)',
              color: '#fff',
              border: 'none',
              borderRadius: '32px',
              fontSize: '22px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 15px 40px rgba(255, 140, 66, 0.4)'
            }}
          >
            {loading ? 'Creating Account...' : 'Join MindCare'}
          </motion.button>
        </form>

        <p style={{
          textAlign: 'center',
          marginTop: '60px',
          color: '#888',
          fontSize: '18px'
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#ff8c42', textDecoration: 'none', fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;