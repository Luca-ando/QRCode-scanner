import React from 'react';
import { AuthProvider } from './src/navigations/AuthContext';
import { Navigation } from './src/navigations/Navigation';

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

export default App;
