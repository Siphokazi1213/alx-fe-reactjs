import axios from 'axios';

// Use the environment variable for the API key.
const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

/**
 * Fetches user data from the GitHub API based on a username.
 * @param {string} username The GitHub username to fetch.
 * @returns {Promise<object>} A promise that resolves to the user data.
 */
export const fetchUserData = async (username) => {
  try {
    // Add Authorization header if an API key is provided.
    const headers = API_KEY ? { Authorization: `token ${API_KEY}` } : {};
    const response = await axios.get(`https://api.github.com/users/${username}`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    // Re-throw the error to be handled by the calling component.
    throw error;
  }
};