import { logChatInteraction } from '../services/logService';
import { getUserId } from './userIdentifier';

/**
 * Utility function to log prompts and responses to Supabase
 * This can be used in non-React contexts or where hooks aren't available
 * 
 * @param {string} prompt - The user's prompt
 * @param {string} response - The AI's response
 * @returns {Promise<Object>} - Result of the logging operation
 */
export const logPrompt = async (prompt, response) => {
  if (!prompt || !response) {
    console.warn('Missing prompt or response for logging');
    return { success: false, message: 'Missing prompt or response' };
  }

  try {
    // Get the user ID from localStorage or generate a new one
    const user_id = getUserId();
    
    // Log the interaction to Supabase
    const result = await logChatInteraction({
      user_id,
      prompt,
      response
    });
    
    if (result.success) {
      console.log('Prompt logged successfully');
    } else {
      console.error('Failed to log prompt:', result.message);
    }
    
    return result;
  } catch (error) {
    const errorMessage = error.message || 'An unexpected error occurred while logging';
    console.error('Error logging prompt:', errorMessage);
    return { success: false, message: errorMessage };
  }
};
