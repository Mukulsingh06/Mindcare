import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const items = [
    { path: '/dashboard', label: 'Dashboard', icon: '⌂' },
    { path: '/chat', label: 'Counselor', icon: '◉' },
    { path: '/resources', label: 'Help', icon: '◆' },
    { path: '/profile', label: 'Profile', icon: '◼' }
  ];

  return (
    <>
      {/* Toggle Button - Always Visible */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          left: 20,
          top: 20,
          zIndex: 99999,
          background: '#0ff',
          color: '#000',
          border: 'none',
          padding: '16px',
          borderRadius: '50%',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 0 30px rgba(0,255,255,0.5)'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? '×' : '☰'}
      </motion.button>

      {/* Sidebar - Hidden by default */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
              width: '300px',
              background: 'rgba(10, 10, 10, 0.98)',
              backdropFilter: 'blur(20px)',
              borderRight: '1px solid #222',
              padding: '100px 30px 40px',
              zIndex: 9999,
              fontFamily: 'Courier New, monospace'
            }}
          >
            <h1 style={{ color: '#0ff', fontSize: '32px', textAlign: 'center', letterSpacing: '8px', marginBottom: '60px' }}>
              MINDCARE
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {items.map(item => (
                <motion.button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                  whileHover={{ x: 15 }}
                  style={{
                    textAlign: 'left',
                    padding: '18px 24px',
                    background: pathname === item.path ? '#0ff' : 'transparent',
                    color: pathname === item.path ? '#000' : '#0ff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}
                >
                  <span style={{ fontSize: '28px' }}>{item.icon}</span>
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.7)',
              zIndex: 9998
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;