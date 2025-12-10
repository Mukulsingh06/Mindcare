// src/components/Login.js — FINAL SUNRISE EDITION
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setMsg('Welcome back');
      setTimeout(() => navigate('/dashboard', { replace: true }), 800);
    } catch {
      setMsg('Invalid email or password');
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
          maxWidth: '420px',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(40px)',
          borderRadius: '40px',
          padding: '70px 50px',
          border: '1px solid rgba(255, 140, 66, 0.3)',
          boxShadow: '0 30px 80px rgba(255, 140, 66, 0.25)'
        }}
      >
        <h1 style={{
          fontSize: '52px',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: '60px',
          background: 'linear-gradient(90deg, #ff8c42, #ff5e78)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-1px'
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

        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={{
              width: '100%',
              padding: '20px 24px',
              background: 'rgba(255, 255, 255, 0.9)',
              border: '2px solid rgba(255, 140, 66, 0.4)',
              borderRadius: '24px',
              color: '#2d1b0f',
              fontSize: '18px',
              marginBottom: '20px',
              outline: 'none',
              fontWeight: 500
            }}
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={{
              width: '100%',
              padding: '20px 24px',
              background: 'rgba(255, 255, 255, 0.9)',
              border: '2px solid rgba(255, 140, 66, 0.4)',
              borderRadius: '24px',
              color: '#2d1b0f',
              fontSize: '18px',
              marginBottom: '40px',
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
              padding: '22px',
              background: 'linear-gradient(90deg, #ff8c42, #ff5e78)',
              color: '#fff',
              border: 'none',
              borderRadius: '28px',
              fontSize: '20px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 15px 40px rgba(255, 140, 66, 0.4)'
            }}
          >
            {loading ? 'Entering...' : 'Welcome Back'}
          </motion.button>
        </form>

        <p style={{
          textAlign: 'center',
          marginTop: '50px',
          color: '#888',
          fontSize: '17px'
        }}>
          New here? <Link to="/signup" style={{ color: '#ff8c42', textDecoration: 'none', fontWeight: 600 }}>Create account</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;