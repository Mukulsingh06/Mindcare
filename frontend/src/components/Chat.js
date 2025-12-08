import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // ← THIS LINE WAS MISSING

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('mindcare_chat');
    return saved ? JSON.parse(saved) : [];
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate(); // ← Now defined

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Save chat to localStorage on every change
  useEffect(() => {
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

      const aiReply = res.data.response || "I'm here with you.";

      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', text: aiReply }]);
        setIsTyping(false);
      }, 800 + Math.random() * 600);
    } catch (error) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: "I'm still here for you, even if the connection is weak right now." 
        }]);
        setIsTyping(false);
      }, 1000);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      color: '#0f0',
      fontFamily: "'Courier New', monospace",
      paddingTop: '80px',
      paddingLeft: '280px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ flex: 1, padding: '40px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <h1 style={{
          textAlign: 'center',
          letterSpacing: '12px',
          fontSize: '42px',
          marginBottom: '40px',
          color: '#0ff'
        }}>
          COUNSELOR
        </h1>

        {/* Messages Container */}
        <div style={{
          height: 'calc(100vh - 300px)',
          overflowY: 'auto',
          background: '#111',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '20px',
          border: '1px solid #222'
        }}>
          {messages.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', color: '#555', marginTop: '120px', fontSize: '18px' }}
            >
              Begin when you're ready.<br />
              I'm here to listen.
            </motion.p>
          ) : (
            messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  margin: '20px 0',
                  textAlign: msg.role === 'user' ? 'right' : 'left',
                  maxWidth: '80%',
                  marginLeft: msg.role === 'user' ? 'auto' : '0',
                  marginRight: msg.role === 'user' ? '0' : 'auto'
                }}
              >
                <div style={{
                  display: 'inline-block',
                  padding: '16px 20px',
                  background: msg.role === 'user' ? '#0ff' : '#222',
                  color: msg.role === 'user' ? '#000' : '#0f0',
                  borderRadius: '20px',
                  borderBottomRightRadius: msg.role === 'user' ? '4px' : '20px',
                  borderBottomLeftRadius: msg.role === 'user' ? '20px' : '4px',
                  fontSize: '16px',
                  lineHeight: '1.5'
                }}>
                  {msg.text}
                </div>
              </motion.div>
            ))
          )}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'left', margin: '20px 0' }}
            >
              <div style={{
                display: 'inline-block',
                padding: '16px 20px',
                background: '#222',
                borderRadius: '20px',
                borderBottomLeftRadius: '4px',
                color: '#0ff'
              }}>
                thinking<span style={{ animation: 'blink 1.5s infinite' }}>...</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Share what's on your mind..."
            disabled={isTyping}
            style={{
              flex: 1,
              padding: '18px 20px',
              background: '#000',
              border: '1px solid #333',
              borderRadius: '16px',
              color: '#0f0',
              fontSize: '16px',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={sendMessage}
            disabled={isTyping || !input.trim()}
            style={{
              padding: '18px 32px',
              background: (isTyping || !input.trim()) ? '#333' : '#0ff',
              color: '#000',
              border: 'none',
              borderRadius: '16px',
              fontWeight: 'bold',
              cursor: (isTyping || !input.trim()) ? 'not-allowed' : 'pointer'
            }}
          >
            SEND
          </motion.button>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Chat;