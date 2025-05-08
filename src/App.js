import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import { useTheme } from './contexts/ThemeContext';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { darkMode } = useTheme();

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to handle sending a new message
  const handleSendMessage = async (message) => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setLoading(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // Mock response from assistant
      const response = getAssistantResponse(message);
      const assistantMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'assistant',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setLoading(false);
    }, 1000);
  };

  // Mock function to generate assistant responses
  const getAssistantResponse = (message) => {
    const responses = [
      "I'm an AI assistant, how can I help you today?",
      "That's an interesting question. Let me think about that...",
      "I'm here to assist with any questions you might have.",
      "I understand your question. Here's what I know about that topic...",
      "Thanks for asking! I'd be happy to help with that.",
    ];
    
    // For demo purposes, just return a random response
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'bg-gray-900' : 'bg-chatgpt-gray'}`}>
      <Header />
      <main className="flex-1 overflow-hidden flex flex-col max-w-5xl mx-auto w-full">
        <ChatHistory 
          messages={messages} 
          loading={loading} 
          messagesEndRef={messagesEndRef} 
        />
        <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
      </main>
    </div>
  );
}

export default App;
