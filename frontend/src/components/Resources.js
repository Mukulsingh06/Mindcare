import React from 'react';
import { motion } from 'framer-motion';

const helplines = [
  { name: "iCall", number: "9152987821" },
  { name: "Vandrevala", number: "9999666555" },
  { name: "AASRA", number: "9820466726" },
  { name: "Jeevan", number: "18002333330" }
];

const Resources = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#0f0', paddingTop: '120px', textAlign: 'center' }}>
      <h1 style={{ letterSpacing: '15px', fontSize: '48px', marginBottom: '60px' }}>EMERGENCY</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '900px', margin: '0 auto' }}>
        {helplines.map((h, i) => (
          <motion.div key={i} style={{ background: '#111', padding: '40px', borderRadius: '12px' }}>
            <h3 style={{ color: '#0ff' }}>{h.name}</h3>
            <p style={{ fontSize: '36px', letterSpacing: '8px' }}>{h.number}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Resources;