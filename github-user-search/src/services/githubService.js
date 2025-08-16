// This service file handles all API calls to the GitHub API.
import axios from 'axios';

// GitHub API base URL.
const GITHUB_API_URL = 'https://api.github.com/search/users?q';

/**
 * Searches for users on GitHub based on a query, location, and minimum number of public repositories.
 * @param {string} username - The username or keyword to search for.
 * @param {string} location - The location to filter by.
 * @param {string} minRepos - The minimum number of public repositories.
 * @param {number} page - The page number for pagination.
 * @returns {Promise<object>} A promise that resolves with the search results.
 */
export const searchUsers = async (username, location, minRepos, page = 1) => {
  try {
    const queryParts = [];
    if (username) {
      queryParts.push(`${username} in:login,name,email`);
    }
    if (location) {
      queryParts.push(`location:"${location}"`);
    }
    if (minRepos) {
      queryParts.push(`repos:>=${minRepos}`);
    }

    const searchQuery = queryParts.join('+');

    // Make the API request to GitHub.
    const response = await axios.get(
      `${GITHUB_API_URL}/search/users?q=${searchQuery}&per_page=10&page=${page}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data from GitHub:", error);
    throw error;
  }
};
