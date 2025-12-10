import React from 'react';
import { motion } from 'framer-motion';

const helplines = [
  { name: "iCall (TISS)", number: "9152987821", desc: "24×7 Support" },
  { name: "Vandrevala Foundation", number: "9999666555", desc: "Crisis Helpline" },
  { name: "AASRA", number: "9820466726", desc: "Suicide Prevention" },
  { name: "Jeevan Aastha", number: "18002333330", desc: "Gujarat Helpline" }
];

const Resources = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fffaf0 0%, #fdf4e8 100%)',
      padding: '120px 40px',
      paddingLeft: '340px'
    }}>
      <motion.div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '80px',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: '80px',
          background: 'linear-gradient(90deg, #ff8c42, #ff5e78)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          You're Safe Here
        </h1>

        <div className="scroll-container" style={{
          maxHeight: '70vh',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.6)',
          borderRadius: '32px',
          border: '1px solid rgba(255, 140, 66, 0.2)',
          boxShadow: '0 20px 60px rgba(255, 140, 66, 0.15)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            padding: '20px'
          }}>
            {helplines.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                style={{
                  background: '#ffffff',
                  borderRadius: '32px',
                  padding: '50px 30px',
                  textAlign: 'center',
                  boxShadow: '0 15px 40px rgba(255, 140, 66, 0.2)',
                  border: '2px solid rgba(255, 140, 66, 0.3)'
                }}
              >
                <h3 style={{ fontSize: '28px', color: '#2d1b0f', marginBottom: '16px' }}>
                  {h.name}
                </h3>
                <p style={{ fontSize: '18px', color: '#888', marginBottom: '24px' }}>
                  {h.desc}
                </p>
                <p style={{
                  fontSize: '44px',
                  fontWeight: 700,
                  color: '#ff8c42',
                  letterSpacing: '6px'
                }}>
                  {h.number}
                </p>
                <a
                  href={`tel:${h.number}`}
                  style={{
                    display: 'inline-block',
                    marginTop: '30px',
                    padding: '20px 50px',
                    background: 'linear-gradient(90deg, #ff8c42, #ff5e78)',
                    color: '#fff',
                    borderRadius: '28px',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    textDecoration: 'none'
                  }}
                >
                  Call Now
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Resources;