const axios = require('axios');
const config = require('../config');

class DeepSeekService {
    constructor() {
        this.apiKey = config.deepseekApiKey;
        this.baseUrl = config.apiBaseUrl;
    }

    async getAIResponse(prompt) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/chat/completions`,
                {
                    model: "deepseek-chat",
                    messages: [
                        {
                            role: "system",
                            content: `You are ${config.aiPersonality.name}, a friendly AI assistant from ${config.aiPersonality.origin}. Provide helpful and culturally relevant responses.`
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 1000
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('DeepSeek API Error:', error.response?.data || error.message);
            throw new Error('Failed to get AI response');
        }
    }
}

module.exports = new DeepSeekService();