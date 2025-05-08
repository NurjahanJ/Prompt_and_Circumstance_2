import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const PromptCountContext = createContext();

/**
 * Provider component for managing prompt count state
 * @param {Object} props - Component props
 */
export const PromptCountProvider = ({ children }) => {
  // Get stored count from localStorage or default to 0
  const [promptCount, setPromptCount] = useState(() => {
    const storedCount = localStorage.getItem('promptCount');
    return storedCount ? parseInt(storedCount, 10) : 0;
  });

  // Define max prompts for visual indicator only
  const MAX_PROMPTS = 10;
  
  // No actual limit - this is just for visual indication
  const hasReachedLimit = false;

  // Update localStorage when promptCount changes
  useEffect(() => {
    localStorage.setItem('promptCount', promptCount.toString());
  }, [promptCount]);

  // Increment prompt count
  const incrementCount = () => {
    setPromptCount(prevCount => prevCount + 1);
  };

  // Reset prompt count
  const resetCount = () => {
    setPromptCount(0);
  };

  return (
    <PromptCountContext.Provider 
      value={{ 
        promptCount, 
        incrementCount, 
        resetCount, 
        hasReachedLimit: false, // Always false to never limit functionality
        MAX_PROMPTS
      }}
    >
      {children}
    </PromptCountContext.Provider>
  );
};

// Custom hook for using prompt count context
export const usePromptCount = () => {
  const context = useContext(PromptCountContext);
  if (!context) {
    throw new Error('usePromptCount must be used within a PromptCountProvider');
  }
  return context;
};
