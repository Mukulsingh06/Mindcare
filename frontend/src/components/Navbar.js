import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const items = [
    { path: '/dashboard', label: 'Home', icon: '☀' },
    { path: '/chat', label: 'Counselor', icon: '♡' },
    { path: '/resources', label: 'Help', icon: '✦' },
    { path: '/profile', label: 'Journal', icon: '✎' }
  ];

  return (
    <motion.div
      initial={{ x: -400 }}
      animate={{ x: 0 }}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: '320px',
        background: 'rgba(255, 248, 240, 0.98)',
        borderRight: '1px solid rgba(255, 180, 120, 0.3)',
        padding: '60px 40px',
        zIndex: 9999,
        boxShadow: '20px 0 60px rgba(255, 140, 66, 0.15)'
      }}
    >
      <h1 style={{
        fontSize: '44px',
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: '100px',
        background: 'linear-gradient(90deg, #ff8c42, #ff5e78)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        MindCare
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {items.map(item => (
          <motion.button
            key={item.path}
            onClick={() => navigate(item.path)}
            whileHover={{ x: 16 }}
            style={{
              padding: '20px 28px',
              background: pathname === item.path ? 'rgba(255, 140, 66, 0.25)' : 'transparent',
              border: pathname === item.path ? '2px solid #ff8c42' : '2px solid rgba(255, 140, 66, 0.3)',
              borderRadius: '20px',
              color: '#2d1b0f',
              fontSize: '19px',
              fontWeight: 600,
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '18px'
            }}
          >
            <span style={{ fontSize: '30px' }}>{item.icon}</span>
            {item.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Navbar;