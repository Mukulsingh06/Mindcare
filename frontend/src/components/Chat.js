import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('mindcare_chat');
    return saved ? JSON.parse(saved) : [];
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    localStorage.setItem('mindcare_chat', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = { role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chat/query', { message: input.trim() });
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', text: res.data.response }]);
        setIsTyping(false);
      }, 1000);
    } catch {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', text: "I'm here with you." }]);
        setIsTyping(false);
      }, 1000);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fffaf0 0%, #fdf4e8 100%)',
      padding: '120px 40px',
      paddingLeft: '340px'
    }}>
      <motion.div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '56px',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '60px',
          background: 'linear-gradient(90deg, #ff8c42, #ff5e78)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Counselor
        </h1>

        <div className="scroll-container" style={{
          height: 'calc(100vh - 280px)',
          background: '#ffffff',
          borderRadius: '28px',
          padding: '40px',
          marginBottom: '30px',
          boxShadow: '0 20px 50px rgba(255, 140, 66, 0.15)',
          border: '1px solid rgba(255, 140, 66, 0.2)'
        }}>
          {messages.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', marginTop: '100px', fontSize: '20px' }}>
              Begin when you're ready.<br />I'm here to listen.
            </p>
          ) : (
            messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  margin: '30px 0',
                  textAlign: msg.role === 'user' ? 'right' : 'left',
                  maxWidth: '80%',
                  marginLeft: msg.role === 'user' ? 'auto' : '0',
                  marginRight: msg.role === 'user' ? '0' : 'auto'
                }}
              >
                <div style={{
                  display: 'inline-block',
                  padding: '20px 28px',
                  background: msg.role === 'user' ? '#ff8c42' : '#fff8f0',
                  color: msg.role === 'user' ? '#fff' : '#2d1b0f',
                  borderRadius: '28px',
                  fontSize: '18px',
                  lineHeight: '1.6',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.08)'
                }}>
                  {msg.text}
                </div>
              </motion.div>
            ))
          )}
          {isTyping && <p style={{ color: '#ff8c42' }}>Counselor is typing...</p>}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && sendMessage()}
            placeholder="Share your thoughts..."
            style={{
              flex: 1,
              padding: '20px 28px',
              background: '#ffffff',
              border: '2px solid rgba(255, 140, 66, 0.3)',
              borderRadius: '28px',
              fontSize: '18px',
              outline: 'none'
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={sendMessage}
            style={{
              padding: '20px 40px',
              background: 'linear-gradient(90deg, #ff8c42, #ff5e78)',
              color: '#fff',
              border: 'none',
              borderRadius: '28px',
              fontWeight: 600,
              fontSize: '18px',
              cursor: 'pointer'
            }}
          >
            Send
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Chat;