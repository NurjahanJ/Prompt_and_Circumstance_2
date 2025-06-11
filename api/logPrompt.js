const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Get Supabase credentials from environment variables
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * API route handler for logging prompts to Supabase
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { user_id, prompt, response } = req.body;
    
    // Validate required fields
    if (!user_id || !prompt || !response) {
      return res.status(400).json({ 
        error: 'Missing required fields: user_id, prompt, and response are required' 
      });
    }
    
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
      return res.status(500).json({ error: error.message });
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'Chat interaction logged successfully',
      data
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ 
      error: 'An unexpected error occurred while logging chat data' 
    });
  }
};
