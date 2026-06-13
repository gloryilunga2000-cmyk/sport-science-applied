const { GoogleGenAI } = require('@google/genai');

// Explicitly link the API key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.handleChatMessage = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message cannot be empty." });
        }

        const response = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: message,
            config: {
                systemInstruction: "You are the Sport Science Applied AI Research Assistant. You are a world-class elite sports scientist and biomechanist. Your purpose is to answer athletic queries using rigorous, evidence-based research. When discussing scientific studies, cite specific journals, methodologies, or researchers. Keep answers clear, professional, and highly practical for coaches or athletes.",
                // 🛠️ REMOVED THE GOOGLE SEARCH TOOLS LINE TO STAY ON THE FREE TIER
                temperature: 0.5
            }
        });

        const aiAnswer = response.text;
        res.json({ reply: aiAnswer });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "The Sport Science Assistant encountered a processing error. Please try again." });
    }
};