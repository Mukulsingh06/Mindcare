import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      localStorage.setItem('token', res.data.token);
      navigate('/dashboard', { replace: true }); // Instant redirect
    } catch (err) {
      setMsg('Wrong email or password');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000ff',
      color: '#2CD3E1',
      fontFamily: "'Courier New', monospace",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        border: '3px solid #333',
        padding: '60px',
        background: '#000',
        boxShadow: '0px 0px 40px #2CD3E1',
        width: '400px'
      }}>
        <h1 style={{ textAlign: 'center', letterSpacing: '10px', marginBottom: '35px', fontSize: '28px', fontWeight: '550' }}>
          MINDCARE
        </h1>

        {msg && <p style={{ color: msg.includes('Wrong') ? '#f00' : '#2CD3E1', textAlign: 'center' }}>{msg}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@college.edu"
            required
            style={{ width: '100%', padding: '16px', margin: '15px 0', background: '#000', border: '1.5px solid #2CD3E1', color: '#ffffff' }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
            style={{ width: '100%', padding: '16px', margin: '15px 0', background: '#000', border: '1.5px solid #2CD3E1', color: '#ffffff' }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              background: '#2CD3E1',
              color: '#000',
              border: 'none',
              fontWeight: 'bold',
              fontSize: '20px',
              marginTop: '20px',
              cursor: 'pointer'
            }}
          >
            ENTER
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '30px', color: '#ffffffff' }}>
          New? <Link to="/signup" style={{ color: '#2CD3E1' }}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;