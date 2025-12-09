// src/components/Login.js — FINAL WORKING VERSION
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
    e.preventDefault();               // ← THIS STOPS PAGE RELOAD
    setLoading(true);
    setMsg('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      // Save token immediately
      localStorage.setItem('token', res.data.token);

      setMsg('Welcome back!');
      
      // Force redirect after small delay so UI updates
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 800);

    } catch (err) {
      setMsg('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#b3c6c4',
      color: '#0ff',
      fontFamily: "'Courier New', monospace",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <motion.div style={{
        border: '3px solid #0B2443',
        borderRadius: '20px',
        padding: '60px',
        background: '#b3c6c4',
        // boxShadow: '0 0 30px #0ff',
        width: '420px'
      }}>
        <h1 style={{ textAlign: 'center', letterSpacing: '10px', marginBottom: '40px' , color:"#0B2443" , fontSize: '46px', fontWeight: 'bold', zIndex: '1', opacity: '1'}}>
          MINDCARE
        </h1>

        {msg && (
          <p style={{ 
            textAlign: 'center', 
            color: msg.includes('Welcome') ? '#0B2443' : '#f00',
            marginBottom: '20px',
            fontWeight: 'bold'
          }}>
            {msg}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email@college.edu"
            required
            disabled={loading}
            style={{ width: '100%', padding: '16px', margin: '15px 0', background: 'transparent', border: '1px solid #333', color: '#0B2443' }}
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
            required
            disabled={loading}
            style={{ width: '100%', padding: '16px', margin: '15px 0', background: 'transparent', border: '1px solid #333', color: '#0B2443' }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: loading ? '#ffffff' : '#0B2443',
              color: '#ffffff',
              border: 'none',
              fontWeight: '100',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'ENTERING...' : 'ENTER'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '30px', color: '#0B2443' }}>
          New here? <Link to="/signup" style={{ color: '#0B2443' }}>Register</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;