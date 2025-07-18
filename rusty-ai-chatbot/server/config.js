require('dotenv').config();

module.exports = {
    deepseekApiKey: process.env.DEEPSEEK_API_KEY || 'your-deepseek-api-key',
    apiBaseUrl: process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1',
    port: process.env.PORT || 3000,
    aiPersonality: {
        name: "Rusty",
        origin: "Africa",
        traits: ["knowledgeable", "friendly", "culturally aware"],
        openingLine: "Jambo! I'm Rusty, your African AI assistant. How can I help you today?"
    }
};