const deepseekService = require('../services/deepseekService');
const config = require('../config');

exports.processMessage = async (req, res) => {
    try {
        const userMessage = req.body.message;
        
        // Add African context to the prompt
        const prompt = `You are Rusty, an AI assistant from Africa. 
        You are knowledgeable about African culture, history, and current affairs.
        Respond in a friendly and helpful manner.
        
        User: ${userMessage}
        Rusty:`;
        
        const reply = await deepseekService.getAIResponse(prompt);
        
        res.json({ reply });
    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).json({ error: 'Failed to process message' });
    }
};