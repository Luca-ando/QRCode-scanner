import React, { useState, createContext } from 'react';
import { login, logout, isLoggedIn } from './auth'; // Import functions from auth.js

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedIn()); // Check initial state

  const handleLogin = async (username, password) => {
    const success = await login(username, password);
    setIsLoggedIn(success);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    handleLogin,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
