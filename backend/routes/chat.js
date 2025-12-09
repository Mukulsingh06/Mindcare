const express = require('express');
const router = express.Router();

router.post('/query', async (req, res) => {
  const { message } = req.body;

  if (!message?.trim()) {
    return res.json({ response: "I'm listening... How are you feeling?" });
  }

  try {
    const key = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
    if (!key) {
      // Return this specific response if the keys are missing
      return res.json({ response: "I'm here with you. How can I support you today? (API Key missing)" });
    }

    let url, body;
    let reply = "I'm here with you. Tell me more about that."; 
    
    if (process.env.GEMINI_API_KEY) {
      url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${key}`;
      body = {
        contents: [{ role: "user", parts: [{ text: `Be a caring counselor. Respond concisely and empathetically to the user's message: ${message}` }] }]
      };
    } 

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    
    if (data.error) {
        console.error("Gemini API Error Response:", data.error);
        return res.status(500).json({ 
            response: `I encountered an issue connecting to the core server: ${data.error.message}` 
        });
    }

    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      reply = data.candidates[0].content.parts[0].text.trim();
    } 

    res.json({ response: reply });
    
  } catch (error) {
    console.error("AI Error:", error.message);
    res.json({ response: "I'm still here with you, even when the connection is weak. You're not alone." });
  }
});

module.exports = router;