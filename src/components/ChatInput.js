import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);
  const { darkMode } = useTheme();

  // Auto-resize the textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
      <form 
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto relative"
      >
        <div className="relative flex items-center rounded-lg p-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message ChatGPT..."
            className={`auto-resize-textarea w-full ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
            } border rounded-lg py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-chatgpt-blue focus:border-transparent transition-all duration-300 ease-in-out`}
            rows={1}
            disabled={disabled}
            aria-label="Chat message input"
          />
          <button
            type="submit"
            className={`absolute right-3 p-1 rounded-md ${
              message.trim() && !disabled
                ? `${darkMode ? 'text-blue-400 hover:bg-gray-600' : 'text-chatgpt-blue hover:bg-gray-100'}`
                : `${darkMode ? 'text-gray-500' : 'text-gray-400'} cursor-not-allowed`
            }`}
            disabled={!message.trim() || disabled}
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
        
        <p className={`text-xs text-center mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          ChatGPT can make mistakes. Consider checking important information.
        </p>
      </form>
    </div>
  );
};

export default ChatInput;
