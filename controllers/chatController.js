const { GoogleGenAI } = require('@google/genai');

// Check if key exists on boot, fallback to prevent total crash
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

exports.handleChatMessage = async (req, res) => {
    const { message } = req.body;

    if (!ai) {
        console.error("❌ Chatbot Error: GEMINI_API_KEY is missing from environment variables.");
        return res.status(500).json({ 
            success: false, 
            reply: "AI Chat configuration error: Missing API Key on server setup." 
        });
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', 
            contents: message,
            config: {
                thinkingConfig: { thinkingBudget: 0 } 
            }
        });

        return res.status(200).json({ 
            success: true, 
            reply: response.text 
        });

    } catch (error) {
        console.error("❌ Gemini API Handshake Failure:", error.message);
        return res.status(500).json({ 
            success: false, 
            reply: "I am having trouble connecting to my brain right now. Please try again." 
        });
    }
};