import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const items = [
    { path: '/dashboard', label: 'Home' },
    { path: '/chat', label: 'Counselor' },
    { path: '/resources', label: 'Help' },
    { path: '/profile', label: 'Profile' }
  ];

  return (
    <div style={{
      position: 'fixed',
      left: 0, top: 0, bottom: 0,
      width: '300px',
      background: 'rgba(20,20,20,0.9)',
      backdropFilter: 'blur(40px)',
      borderRight: '1px solid rgba(255,255,255,0.08)',
      padding: '40px 30px',
      zIndex: 9999
    }}>
      <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '80px', textAlign: 'center' }}>
        MindCare
      </h1>
      {items.map(item => (
        <motion.button
          key={item.path}
          onClick={() => navigate(item.path)}
          whileHover={{ x: 10 }}
          style={{
            width: '100%',
            padding: '18px 24px',
            background: pathname === item.path ? '#007aff' : 'transparent',
            color: '#fff',
            border: 'none',
            borderRadius: '16px',
            textAlign: 'left',
            fontSize: '18px',
            fontWeight: 500,
            marginBottom: '12px',
            cursor: 'pointer'
          }}
        >
          {item.label}
        </motion.button>
      ))}
    </div>
  );
};

export default Navbar;