/**
 * Utility service for managing anonymous user IDs
 * This service handles the creation and retrieval of unique user identifiers
 * stored in localStorage, following the format 'anon-abc123'
 */

/**
 * Generate a random alphanumeric string of specified length
 * @param {number} length - The length of the random string to generate
 * @returns {string} A random string of the specified length
 */
const generateRandomString = (length = 6) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  try {
    // Generate random string by selecting random characters
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  } catch (error) {
    console.error('Error generating random string:', error);
    // Fallback to timestamp-based string if random generation fails
    return Date.now().toString(36).substring(2, 8);
  }
};

/**
 * Get or create a unique anonymous user ID
 * @returns {string} The user ID in format 'anon-abc123'
 */
export const getAnonymousUserId = () => {
  try {
    // Check if user ID already exists in localStorage
    let userId = localStorage.getItem('anonymousUserId');
    
    // If not, create a new one and store it
    if (!userId) {
      userId = `anon-${generateRandomString()}`;
      localStorage.setItem('anonymousUserId', userId);
    }
    
    // Validate the format - if invalid, create a new one
    if (!userId.startsWith('anon-') || userId.length < 11) {
      userId = `anon-${generateRandomString()}`;
      localStorage.setItem('anonymousUserId', userId);
    }
    
    return userId;
  } catch (error) {
    // If localStorage is unavailable (e.g., private browsing mode)
    console.error('Error accessing localStorage:', error);
    // Return a temporary ID that won't persist
    return `anon-${Date.now().toString(36).substring(2, 8)}`;
  }
};
