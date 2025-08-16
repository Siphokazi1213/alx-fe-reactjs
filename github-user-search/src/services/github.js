import axios from 'axios';

// The base URL for the GitHub API.
const GITHUB_API_URL = 'https://api.github.com';

// Use the environment variable as instructed.
const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

/**
 * Searches for a GitHub user by username.
 * @param {string} username The username to search for.
 * @returns {Promise<object>} The user data from the API.
 */
export const getUser = async (username) => {
  try {
    const headers = API_KEY ? { Authorization: `token ${API_KEY}` } : {};
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    // Handle specific errors, like user not found.
    console.error('Error fetching user:', error);
    throw error; // Re-throw to allow component to handle it.
  }
};