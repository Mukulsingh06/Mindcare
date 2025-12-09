import React from 'react';
import { motion } from 'framer-motion';

const helplines = [
  { name: "iCall (TISS)", number: "9152987821", desc: "24×7 Emotional Support" },
  { name: "HMH Foundation", number: "9999666555", desc: "Crisis Helpline" },
  { name: "AASRA", number: "9820466726", desc: "Suicide Prevention" },
  { name: "Jeevan Aastha", number: "18002333330", desc: "Gujarat Helpline" }
];

const Resources = () => {
  return (
    <div style={{
      minHeight: '200vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #000 100%)',
      padding: '80px 10px',
      paddingLeft: '10px'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '1100px', margin: '0 auto' }}
      >
        <h1 style={{
          fontSize: '64px',
          fontWeight: 600,
          textAlign: 'center',
          marginBottom: '20px',
          background: 'linear-gradient(90deg, #007aff, #30d158)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          You're Not Alone
        </h1>
        <p style={{ textAlign: 'center', fontSize: '22px', color: '#aaa', marginBottom: '80px' }}>
          Reach out anytime — someone is always there.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px'
        }}>
          {helplines.map((help, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.04 }}
              style={{
                background: 'rgba(30, 30, 30, 0.6)',
                backdropFilter: 'blur(30px)',
                borderRadius: '28px',
                padding: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
                textAlign: 'center',
                transition: 'all 0.3s'
              }}
            >
              <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#fff', marginBottom: '12px' }}>
                {help.name}
              </h3>
              <p style={{ fontSize: '17px', color: '#888', marginBottom: '24px' }}>
                {help.desc}
              </p>
              <p style={{
                fontSize: '30px',
                fontWeight: 700,
                color: '#30d158',
                letterSpacing: '4px',
                margin: '20px 0'
              }}>
                {help.number}
              </p>
              <a
                href={`tel:${help.number}`}
                style={{
                  display: 'inline-block',
                  padding: '18px 48px',
                  background: '#007aff',
                  color: '#fff',
                  borderRadius: '18px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '18px',
                  boxShadow: '0 10px 30px rgba(0, 122, 255, 0.4)',
                  transition: 'all 0.3s'
                }}
              >
                Talk Now
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            textAlign: 'center',
            marginTop: '120px',
            fontSize: '26px',
            color: '#666',
            fontStyle: 'italic'
          }}
        >
          You matter. Your feelings are valid. Keep going.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Resources;