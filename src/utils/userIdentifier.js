import { v4 as uuidv4 } from 'uuid';

/**
 * Gets or creates a user ID in localStorage
 * @returns {string} The user's UUID
 */
export const getUserId = () => {
  // Try to get the existing user ID from localStorage
  let userId = localStorage.getItem('user_id');
  
  // If no user ID exists, create a new one and store it
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem('user_id', userId);
  }
  
  return userId;
};
