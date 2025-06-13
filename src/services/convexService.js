import { convex, api } from '../convex/convex';
import { getAnonymousUserId } from './userService';

/**
 * Service for interacting with Convex backend
 * This service handles logging prompt interactions to the Convex database
 * without disrupting the user experience if logging fails
 */

/**
 * Log a prompt interaction to Convex
 * @param {string} prompt - The user's prompt text
 * @param {string} response - The AI's response text
 * @returns {Promise<void>} - A promise that resolves when logging is complete
 */
export const logPromptInteraction = async (prompt, response) => {
  try {
    // Get the anonymous user ID from localStorage
    const userId = getAnonymousUserId();
    
    // Create a human-readable timestamp in the format "June 12, 2025, 3:24 PM"
    const timestamp = new Date().toLocaleString();
    
    // Validate inputs before sending to Convex
    if (!prompt || !response) {
      console.warn('Missing prompt or response for logging');
      return;
    }
    
    // Truncate extremely long prompts/responses if needed
    // Convex may have size limits on document fields
    const maxFieldLength = 100000; // 100KB limit as a safety measure
    const truncatedPrompt = prompt.length > maxFieldLength ? 
      prompt.substring(0, maxFieldLength) + '... [truncated]' : prompt;
    const truncatedResponse = response.length > maxFieldLength ? 
      response.substring(0, maxFieldLength) + '... [truncated]' : response;
    
    // Log the interaction to Convex
    await convex.mutation(api.logPrompt.logPromptInteraction, {
      userId,
      prompt: truncatedPrompt,
      response: truncatedResponse,
      timestamp,
    });
    
    console.log('Prompt interaction logged successfully');
  } catch (error) {
    // Silently fail to not disrupt user experience
    console.error('Failed to log prompt interaction:', error);
    // No need to rethrow - this should never break the main application flow
  }
};
