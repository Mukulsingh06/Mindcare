import React from 'react';
import { motion } from 'framer-motion';

const helplines = [
  { name: "iCall", number: "----------", tag: "24×7 • Always Here" },
  { name: "HMH Talks", number: "----------", tag: "Crisis • Immediate Help" },
  { name: "AASRA", number: "----------", tag: "Suicide Prevention" },
  { name: "Jeevan Aastha", number: "----------", tag: "Gujarat • Regional Support" }
];

const Resources = () => {
  return (
    <div style={{
      marginTop: "-80px",
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff8f0 0%, #fef7ec 100%)',
      padding: '120px 80px',
      paddingLeft: '360px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,140,66,0.15) 0%, transparent 70%)',
        top: '-500px',
        left: '-200px',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,94,120,0.12) 0%, transparent 70%)',
        bottom: '-300px',
        right: '-300px',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <motion.div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          style={{
            fontSize: '96px',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: '5px',
          background: 'linear-gradient(120deg, #ff6b35, #ff3855, #ff8c42)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-3px',
          lineHeight: '1.1'
        }}>
          You Are Not Alone
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            textAlign: 'center',
            fontSize: '28px',
            color: '#a0522d',
            marginBottom: '100px',
            fontWeight: 500
          }}
        >
          Someone is waiting to listen — right now.
        </motion.p>

        <div className="scroll-container" style={{
          marginTop: '-60px',
          maxHeight: '50vh',
          padding: '15px 40px',
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(50px)',
          borderRadius: '48px',
          border: '1px solid rgba(255, 140, 66, 0.25)',
          boxShadow: '0 40px 100px rgba(255, 140, 66, 0.3)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '50px'
          }}>
            {helplines.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.04, rotate: 1 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '40px',
                  padding: '60px 40px',
                  textAlign: 'center',
                  boxShadow: '0 30px 80px rgba(255, 140, 66, 0.25)',
                  border: '2px solid rgba(255, 140, 66, 0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: -10, left: '50%',
                  transform: 'translateX(-50%)',
                  width: '120px',
                  height: '120px',
                  background: 'radial-gradient(circle, rgba(255,140,66,0.3) 0%, transparent 70%)',
                  borderRadius: '50%'
                }} />

                <h3 style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  color: '#2d1b0f',
                  marginBottom: '5px'
                }}>
                  {h.name}
                </h3>
                <p style={{
                  fontSize: '20px',
                  color: '#a0522d',
                  marginBottom: '20px',
                  fontWeight: 500
                }}>
                  {h.tag}
                </p>
                <p style={{
                  fontSize: '52px',
                  fontWeight: 800,
                  color: '#ff6b35',
                  letterSpacing: '8px',
                  margin: '20px 0',
                  textShadow: '0 4px 20px rgba(255,107,53,0.3)'
                }}>
                  {h.number}
                </p>
                <motion.a
                  href={`tel:${h.number}`}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'inline-block',
                    padding: '24px 70px',
                    background: 'linear-gradient(135deg, #ff6b35, #ff3855)',
                    color: '#fff',
                    borderRadius: '40px',
                    fontSize: '24px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 20px 50px rgba(255,107,53,0.5)',
                    letterSpacing: '1px'
                  }}
                >
                  CALL NOW
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{
            textAlign: 'center',
            marginTop: '100px',
            fontSize: '32px',
            color: '#a0522d',
            fontWeight: 500
          }}
        >
          You matter. Your story matters. Keep breathing.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Resources;