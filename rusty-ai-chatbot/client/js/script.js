document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loadingScreen = document.getElementById('loading-screen');
    const chatContainer = document.getElementById('chat-container');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const typingIndicator = document.getElementById('typing-indicator');
    const themeToggle = document.getElementById('theme-toggle');
    const messageCount = document.getElementById('message-count');
    const messageCountSpan = messageCount.querySelector('span');
    
    // Variables
    let messageCounter = 0;
    let currentTheme = localStorage.getItem('theme') || 'light';
    
    // Initialize the app
    function init() {
        // Set theme
        setTheme(currentTheme);
        
        // Simulate loading
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                chatContainer.style.opacity = '1';
            }, 500);
        }, 2000);
        
        // Add event listeners
        setupEventListeners();
        
        // Auto-resize textarea
        autoResizeTextarea();
    }
    
    // Set theme
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update toggle icon
        if (theme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.title = 'Toggle Light Mode';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.title = 'Toggle Dark Mode';
        }
    }
    
    // Toggle theme
    function toggleTheme() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(currentTheme);
    }
    
    // Auto-resize textarea
    function autoResizeTextarea() {
        userInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Send message on button click
        sendButton.addEventListener('click', sendMessage);
        
        // Send message on Enter key (but allow Shift+Enter for new line)
        userInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        // Theme toggle
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Send message
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, 'user');
        userInput.value = '';
        userInput.style.height = 'auto';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Send message to backend
        fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        })
        .then(response => response.json())
        .then(data => {
            // Remove typing indicator
            hideTypingIndicator();
            
            if (data.reply) {
                addMessage(data.reply, 'bot');
            } else {
                addMessage("Sorry, I encountered an error. Please try again.", 'bot');
            }
        })
        .catch(error => {
            hideTypingIndicator();
            addMessage("Oops! Something went wrong. Please check your connection and try again.", 'bot');
            console.error('Error:', error);
        });
    }
    
    // Add message to chat
    function addMessage(content, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${content.replace(/\n/g, '<br>')}</p>
            </div>
            <div class="message-timestamp">${timestamp}</div>
        `;
        
        chatMessages.appendChild(messageElement);
        scrollToBottom();
        
        // Update message counter
        if (sender === 'user') {
            messageCounter++;
            messageCountSpan.textContent = messageCounter;
        }
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        typingIndicator.style.display = 'block';
        scrollToBottom();
    }
    
    // Hide typing indicator
    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }
    
    // Scroll to bottom of chat
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Initialize the app
    init();
});