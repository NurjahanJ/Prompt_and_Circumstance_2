import axios from 'axios';

// Load environment variables
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

// Create axios instance with default headers
const openaiApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

/**
 * Send a message to the OpenAI API
 * @param {string} message - The user's message
 * @returns {Promise} - Promise with the API response
 */
export const sendMessage = async (message) => {
  try {
    if (!API_KEY) {
      throw new Error('OpenAI API key is missing. Please add it to your .env file as REACT_APP_OPENAI_API_KEY');
    }
    
    const response = await openaiApi.post('', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 150
    });
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    
    // Return a user-friendly error message
    if (error.message.includes('API key is missing')) {
      return error.message;
    }
    
    if (error.response) {
      return `Error: ${error.response.status} - ${error.response.data.error?.message || 'Something went wrong'}`;
    }
    
    return 'Sorry, there was an error processing your request. Please try again later.';
  }
};
