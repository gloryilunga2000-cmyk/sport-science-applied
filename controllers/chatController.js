const { GoogleGenAI } = require('@google/genai');

// 🤖 Securely initialize using your Render environment variable
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.handleChatMessage = async (req, res) => {
    const { message } = req.body;

    try {
        // ⚡ HIGH-VELOCITY TIMEOUT BYPASS CONFIGURATION
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', // Light, blazing-fast streaming architecture
            contents: message,
            config: {
                // 🌟 CRUCIAL: Turns off the reasoning delay so it responds in under 2 seconds!
                thinkingConfig: { thinkingBudget: 0 } 
            }
        });

        return res.status(200).json({ 
            success: true, 
            reply: response.text 
        });

    } catch (error) {
        console.error("Gemini Handshake Failure:", error);
        return res.status(500).json({ 
            success: false, 
            message: "AI pipeline latency block encountered." 
        });
    }
};