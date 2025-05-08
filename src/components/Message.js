import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Message = ({ message }) => {
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';
  const { darkMode } = useTheme();
  
  return (
    <div 
      className={`animate-fade-in flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`max-w-[80%] md:max-w-[70%] rounded-lg p-4 shadow-sm transition-all duration-500 ease-in-out ${
          isUser 
            ? `${darkMode ? 'bg-blue-700' : 'bg-chatgpt-blue'} text-white rounded-br-none` 
            : isSystem
              ? `${darkMode ? 'bg-red-900' : 'bg-red-100'} ${darkMode ? 'text-red-100' : 'text-red-800'} border ${darkMode ? 'border-red-800' : 'border-red-300'} rounded-lg`
              : `${darkMode ? 'bg-gray-800' : 'bg-white'} ${darkMode ? 'text-gray-100' : 'text-gray-800'} rounded-bl-none`
        }`}
      >
        <div className="flex items-start">
          {!isUser && !isSystem && (
            <div className="mr-3 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
            </div>
          )}
          {isSystem && (
            <div className="mr-3 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm md:text-base whitespace-pre-wrap">{message.text}</p>
          </div>
          {isUser && (
            <div className="ml-3 flex-shrink-0">
              <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} flex items-center justify-center ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="mt-1 text-xs text-right opacity-70">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default Message;
