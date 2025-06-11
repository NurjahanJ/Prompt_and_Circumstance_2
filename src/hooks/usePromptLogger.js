import { useState, useCallback } from 'react';
import { logChatInteraction } from '../services/logService';
import { getUserId } from '../utils/userIdentifier';

/**
 * Custom hook for logging prompts and responses to Supabase
 * @returns {Object} Object containing logging function and status
 */
export const usePromptLogger = () => {
  const [isLogging, setIsLogging] = useState(false);
  const [logError, setLogError] = useState(null);
  const [logSuccess, setLogSuccess] = useState(false);

  /**
   * Log a prompt and its response to Supabase
   * @param {string} prompt - The user's prompt
   * @param {string} response - The AI's response
   * @returns {Promise<Object>} - Result of the logging operation
   */
  const logPrompt = useCallback(async (prompt, response) => {
    if (!prompt || !response) {
      console.warn('Missing prompt or response for logging');
      return { success: false, message: 'Missing prompt or response' };
    }

    setIsLogging(true);
    setLogError(null);
    setLogSuccess(false);

    try {
      // Get the user ID from localStorage or generate a new one
      const user_id = getUserId();
      
      // Log the interaction to Supabase
      const result = await logChatInteraction({
        user_id,
        prompt,
        response
      });
      
      setLogSuccess(result.success);
      
      if (!result.success) {
        setLogError(result.message);
      }
      
      return result;
    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred while logging';
      setLogError(errorMessage);
      console.error('Failed to log prompt:', error);
      return { success: false, message: errorMessage };
    } finally {
      setIsLogging(false);
    }
  }, []);

  return {
    logPrompt,
    isLogging,
    logError,
    logSuccess,
    clearLogError: () => setLogError(null),
    clearLogSuccess: () => setLogSuccess(false)
  };
};

/**
 * Simple function to log prompts without using the React hook
 * Useful for non-component contexts
 * @param {string} prompt - The user's prompt
 * @param {string} response - The AI's response
 * @returns {Promise<Object>} - Result of the logging operation
 */
export const logPromptToSupabase = async (prompt, response) => {
  if (!prompt || !response) {
    console.warn('Missing prompt or response for logging');
    return { success: false, message: 'Missing prompt or response' };
  }

  try {
    // Get the user ID from localStorage or generate a new one
    const user_id = getUserId();
    
    // Log the interaction to Supabase
    return await logChatInteraction({
      user_id,
      prompt,
      response
    });
  } catch (error) {
    console.error('Failed to log prompt:', error);
    return { 
      success: false, 
      message: error.message || 'An unexpected error occurred while logging'
    };
  }
};
