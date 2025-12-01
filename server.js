// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // serve CSS, JS, images, HTML

// Serve index.html at root
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Chatbot endpoint
app.post("/chat", (req, res) => {
    const msg = req.body.message?.toLowerCase() || "";
    let reply = "I'm NOVA — ask me anything!";
    if (msg.includes("hello") || msg.includes("hi")) reply = "Hello! I'm NOVA, your AI assistant!";
    else if (msg.includes("who are you")) reply = "I am NOVA, created by Thish. I can answer and generate images!";
    else if (msg.includes("what is ai")) reply = "AI means giving machines the ability to think and learn.";
    else if (msg.includes("love")) reply = "Haha! I'm a bot da, but naan unna virumburen 😄";
    else reply = "That's interesting! Let me know more…";
    res.json({ reply });
});

// Image generator endpoint
app.post("/generate-image", (req, res) => {
    const prompt = req.body.prompt?.trim();
    if (!prompt) return res.status(400).json({ error: "Prompt required" });

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
    res.json({ image: imageUrl });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🔥 NOVA SERVER running at http://localhost:3000ORT`);
});
