import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './AuthContext';
import { DrawerNavigator } from './DrawerNavigator';
import { AuthNavigator } from './AuthNavigator';

const RootNavigator = () => {
  const { isLoggedIn } = React.useContext(AuthContext);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <DrawerNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
