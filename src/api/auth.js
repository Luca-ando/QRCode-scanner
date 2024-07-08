import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';
const refreshTokenStorageKey = 'refreshToken';

// Function to handle API error responses
const handleAPIError = (error) => {
  console.error('Error:', error.response ? error.response.data : error.message);
  // You can also display a user-friendly error message based on the error code
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/token`, { username, password });

    if (response.status === 200) {
      const { token, refreshToken } = response.data; // Destructure response data

      localStorage.setItem('userToken', token);
      storeRefreshToken(refreshToken); // Store refresh token securely

      console.log('Login successful!');
      return true;
    } else {
      handleAPIError(response);
      return false;
    }
  } catch (error) {
    handleAPIError(error);
    return false;
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem('userToken');
    removeRefreshToken(); // Remove refresh token from storage

    console.log('Logged out successfully!');
  } catch (error) {
    handleAPIError(error);
  }
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('userToken');
};

// Function to store the refresh token securely (consider using a more secure storage mechanism)
const storeRefreshToken = (refreshToken) => {
  localStorage.setItem(refreshTokenStorageKey, refreshToken);
};

// Function to remove the refresh token from storage
const removeRefreshToken = () => {
  localStorage.removeItem(refreshTokenStorageKey);
};

export const refreshToken = async () => {
  // Check if a refresh token exists
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return false; // Handle case where refresh token is unavailable
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/refresh_token`, {
      grant_type: 'refresh_token',
      refresh_token,
    });

    if (response.status === 200) {
      const { token, refreshToken: newRefreshToken } = response.data; // Destructure response data

      localStorage.setItem('userToken', token);
      storeRefreshToken(newRefreshToken); // Update refresh token if provided

      console.log('Access token refreshed successfully!');
      return true;
    } else {
      handleAPIError(response);
      // Handle unsuccessful refresh (e.g., expired refresh token)
      return false;
    }
  } catch (error) {
    handleAPIError(error);
    // Handle errors during refresh token request
    return false;
  }
};

// Function to retrieve the refresh token from storage
const getRefreshToken = () => {
  return localStorage.getItem(refreshTokenStorageKey);
};

export const getUserData = async () => {
  // Check if user is logged in
  if (!isLoggedIn()) {
    console.error('User is not logged in!');
    return false;
  }

  try {
    // Try to refresh token if access token might be expired
    const refreshTokenSuccess = await refreshToken();
    if (!refreshTokenSuccess) {
      console.error('Failed to refresh access token. User might need to re-login.');
      return false;
    }

    // Make API request with the access token
    const userToken = localStorage.getItem('userToken');
    const response = await axios.get(`${API_BASE_URL}/operator/me`, { // Replace with your user data endpoint
      headers: { Authorization: `Bearer ${userToken}` },
    });

    if (response.status === 200) {
      console.log('Successfully retrieved user data!');
      return response.data;
    } else {
      handleAPIError(response);
      return false;
    }
  } catch (error) {
    handleAPIError(error);
    return false;
  }
};
