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

/**
 * Searches for GitHub users based on advanced criteria.
 * @param {string} username The username or search term.
 * @param {string} location The location to filter by.
 * @param {number} minRepos The minimum number of public repositories.
 * @param {number} page The page number for pagination.
 * @returns {Promise<object>} A promise that resolves to the search results.
 */
export const searchUsers = async (username, location, minRepos, page = 1) => {
  try {
    const headers = API_KEY ? { Authorization: `token ${API_KEY}` } : {};
    
    // Construct the query string.
    let query = username;
    if (location) {
      query += `+location:${location}`;
    }
    if (minRepos > 0) {
      query += `+repos:>=${minRepos}`;
    }

    const response = await axios.get(`https://api.github.com/search/users`, {
      headers: headers,
      params: {
        q: query,
        per_page: 10, // Fetch 10 users per page
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
