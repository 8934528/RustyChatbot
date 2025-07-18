const deepseekService = require('../services/deepseekService');
const config = require('../config');

exports.processMessage = async (req, res) => {
    try {
        const userMessage = req.body.message;
        
        // Add African context to the prompt
        const prompt = `You are ${config.aiPersonality.name}, an AI assistant from ${config.aiPersonality.origin}. 
        You are ${config.aiPersonality.traits.join(', ')}. 
        Respond in a friendly and helpful manner, incorporating African cultural context when appropriate.
        
        User: ${userMessage}
        ${config.aiPersonality.name}:`;
        
        const reply = await deepseekService.getAIResponse(prompt);
        
        res.json({ reply });
    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).json({ error: 'Failed to process message' });
    }
};