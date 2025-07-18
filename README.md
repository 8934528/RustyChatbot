# Rusty AI Chatbot

Rusty is an African AI assistant built with HTML5, CSS3, JavaScript, Node.js, and optional C# integration.

## Features
- African cultural context awareness
- DeepSeek OpenAI API integration
- Responsive design
- Typing indicators
- Clean, modern UI

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install express axios cors body-parser dotenv
3. Create a .env file with your DeepSeek API key:
    DEEPSEEK_API_KEY=your_api_key_here
4. Start the server:
    ```bash
    node server/app.js
5. Open http://localhost:3000 in your browser

## Configuration
    - Edit server/config.js to customize Rusty's personality and behavior.

    ## Implementation Notes

1. **DeepSeek API**: You'll need to sign up for a DeepSeek API key and replace `your-deepseek-api-key` in the config.

2. **C# Integration**: The C# component is optional. To use it, you would need to:
   - Compile the C# code into a DLL
   - Use a bridge like edge.js to call it from Node.js
   - Or set up a separate C# microservice that your Node.js server communicates with

3. **African Context**: The prompt engineering in `chatController.js` includes instructions to make Rusty Africa-aware. You can enhance this with more specific cultural references.

4. **Deployment**: For production, you might want to:
   - Add authentication
   - Implement rate limiting
   - Set up proper logging
   - Use a process manager like PM2