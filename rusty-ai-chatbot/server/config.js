require('dotenv').config();

module.exports = {
    deepseekApiKey: process.env.DEEPSEEK_API_KEY || 'your-deepseek-api-key',
    apiBaseUrl: process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1',
    port: process.env.PORT || 3000,
    // Add any Africa-specific configurations here
    aiPersonality: {
        name: "Rusty",
        origin: "Africa",
        traits: ["knowledgeable", "friendly", "culturally aware"],
        greetings: ["Jambo!", "Sawubona!", "Habari!", "Hello!"]
    }
};