const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const {GoogleGenAI} = require("@google/genai"); 

// Initialize Gemini AI
let genAI = null;
let model = null;

const initializeGemini = () => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    genAI = new GoogleGenAI({ apiKey });

    // ✅ Correct model initialization
    model = genAI.models.generateContent;

    console.log("✅ Gemini AI initialized");
    return true;
  }

  console.log("⚠️ GEMINI_API_KEY not found. Running in demo mode.");
  return false;
};

// Initialize on module load
initializeGemini();

// POST /api/chat - Send message and get AI reply
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const userMessage = message.trim();
    console.log

    // Save user message to database
    const userDoc = await Message.create({
      role: "user",
      content: userMessage,
    });

    let aiReply;

    // Generate AI reply
    if (model) {
      try {
        const history = await Message.find()
          .sort({ createdAt: -1 })
          .limit(20)
          .lean();

        const conversationContext = history
          .reverse()
          .map(
            (msg) =>
              `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
          )
          .join("\n");

        const prompt = conversationContext
          ? `Previous conversation:\n${conversationContext}\n\nUser: ${userMessage}\n\nAssistant:`
          : userMessage;

        // ✅ NEW OFFICIAL GEMINI API CALL STYLE
        const result = await genAI.models.generateContent({
          model: "gemini-2.5-flash", // or another available model
          contents: prompt,
        });

        aiReply = result.text;
      } catch (aiError) {
        console.error("Gemini API error:", aiError.message);
        aiReply =
          "I encountered an error processing your request. Please try again.";
      }
    } else {
      // Demo mode - no API key
      aiReply = `Demo AI Reply: You said "${userMessage}". To enable real AI responses, add your GEMINI_API_KEY to the .env file.`;
    }

    // Save AI reply to database
    const aiDoc = await Message.create({
      role: "ai",
      content: aiReply,
    });

    res.json({
      reply: aiReply,
      userMessage: userDoc,
      aiMessage: aiDoc,
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to process message" });
  }
});

// GET /api/history - Get all chat messages
router.get("/history", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 }).lean();

    res.json(messages);
  } catch (error) {
    console.error("History error:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// DELETE /api/history - Clear chat history
router.delete("/history", async (req, res) => {
  try {
    await Message.deleteMany({});
    res.json({ message: "Chat history cleared" });
  } catch (error) {
    console.error("Clear history error:", error);
    res.status(500).json({ error: "Failed to clear history" });
  }
});

module.exports = router;

//db me messag save ho rha hai ? 
