const express = require('express');
const router = express.Router();

router.post('/query', async (req, res) => {
  const { message } = req.body;

  if (!message?.trim()) {
    return res.json({ response: "Hey, I'm here. How are you feeling?" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    console.log("No Gemini key in .env");
    return res.json({ response: "I'm having a tiny connection issue, but I'm still here for you." });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `You are a warm, caring counselor. Keep replies short and kind. Message: ${message}` }]
            }
          ],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 150
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Gemini API error:", response.status, errorText);
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!reply) {
      console.log("Empty reply from Gemini");
      throw new Error("No text returned");
    }

    console.log("Gemini reply:", reply);
    res.json({ response: reply });

  } catch (err) {
    console.log("Chat failed:", err.message);
    res.json({ 
      response: "I'm still right here with you, even if the connection is being slow today." 
    });
  }
});

module.exports = router;