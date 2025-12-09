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
      background: 'linear-gradient(135deg, #0a0a0a 0%, #000 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          width: '100%',
          maxWidth: '380px',
          background: 'rgba(30, 30, 30, 0.6)',
          backdropFilter: 'blur(30px)',
          borderRadius: '28px',
          padding: '60px 40px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)'
        }}
      >
        <h1 style={{
          fontSize: '38px',
          fontWeight: 600,
          textAlign: 'center',
          letterSpacing: '-1px',
          marginBottom: '50px',
          background: 'linear-gradient(90deg, #fff, #aaa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          MindCare
        </h1>

        {msg && (
          <p style={{ textAlign: 'center', marginBottom: '20px', color: msg.includes('Welcome') ? '#30d158' : '#ff453a', fontWeight: 'bold' }}>
            {msg}
          </p>
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
              padding: '16px 20px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              color: '#fff',
              fontSize: '17px',
              marginBottom: '16px',
              outline: 'none'
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
              padding: '16px 20px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              color: '#fff',
              fontSize: '17px',
              marginBottom: '30px',
              outline: 'none'
            }}
          />

          <motion.button
            whileTap={{ scale: 0.96 }}
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: '#007aff',
              color: '#fff',
              border: 'none',
              borderRadius: '16px',
              fontSize: '17px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 8px 20px rgba(0, 122, 255, 0.3)'
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '40px', color: '#888', fontSize: '15px' }}>
          New here? <Link to="/signup" style={{ color: '#007aff', textDecoration: 'none' }}>Create account</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;