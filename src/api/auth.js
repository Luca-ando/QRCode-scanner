import axios from 'axios'; 

const API_BASE_URL = 'http://localhost:8000/api/auth';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password });

    if (response.status === 200) {
      const token = response.data.token; 
      localStorage.setItem('userToken', token); 
      console.log('Login successful!');
      return true; 
    } else {
      console.error('Login failed:', response.data);
      alert('Invalid username or password.');
      return false;
    }
  } catch (error) {
    console.error('Error logging in:', error);
    alert('An error occurred while logging in.');
    return false; 
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem('userToken'); 
    console.log('Logged out successfully!');
  } catch (error) {
    console.error('Error logging out:', error);
    alert('An error occurred while logging out.');
  }
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('userToken'); // Check if a token exists in local storage
};
