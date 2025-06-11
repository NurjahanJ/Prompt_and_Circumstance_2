import supabase from './supabase';

/**
 * Logs a chat interaction to Supabase
 * @param {Object} data - The data to log
 * @param {string} data.user_id - The user's UUID
 * @param {string} data.prompt - The user's message
 * @param {string} data.response - The AI's response
 * @returns {Promise<Object>} - Object with success status and message
 */
export const logChatInteraction = async ({ user_id, prompt, response }) => {
  try {
    // Create timestamp for the log entry
    const timestamp = new Date().toISOString();
    
    // Insert the data into Supabase
    const { data, error } = await supabase
      .from('prompts_log')
      .insert([
        { user_id, prompt, response, timestamp }
      ]);
    
    if (error) {
      console.error('Error logging to Supabase:', error);
      return { 
        success: false, 
        message: error.message 
      };
    }
    
    return { 
      success: true, 
      message: 'Chat interaction logged successfully',
      data
    };
  } catch (err) {
    console.error('Unexpected error logging to Supabase:', err);
    return { 
      success: false, 
      message: 'An unexpected error occurred while logging chat data'
    };
  }
};
