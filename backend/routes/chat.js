// backend/routes/chat.js
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
      return res.json({ response: "I'm here with you. How can I support you today?" });
    }

    let url, body;
    if (key.startsWith('sk-')) {
      // OpenAI fallback
      url = 'https://api.openai.com/v1/chat/completions';
      body = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `You are a warm counselor. Respond kindly: ${message}` }],
        max_tokens: 150
      };
    } else {
      // Gemini
      url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${key}`;
      body = {
        contents: [{ role: "user", parts: [{ text: `Be a caring counselor: ${message}` }] }]
      };
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    let reply = "I'm here for you.";

    if (data.choices?.[0]?.message?.content) {
      reply = data.choices[0].message.content.trim();
    } else if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      reply = data.candidates[0].content.parts[0].text.trim();
    }

    res.json({ response: reply });
  } catch (error) {
    console.log("AI Error:", error.message);
    res.json({ response: "I'm still here with you, even when the connection is weak. You're not alone." });
  }
});

module.exports = router;