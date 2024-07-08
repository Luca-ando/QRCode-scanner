import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './AuthContext'; // Import AuthContext

import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import DrawerNavigator from './DrawerNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';

const Navigation = () => {
  const { isLoggedIn } = useContext(AuthContext); 

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <>
          {/* Render DrawerNavigator et ProfileStackNavigator pour les utilisateurs connectés */}
          <DrawerNavigator />
          <ProfileStackNavigator />
        </>
      ) : (
        <>
          {/* Render both AuthNavigator et BottomTabNavigator pour les utilisateurs non-connectés  */}
          <AuthNavigator />
          <BottomTabNavigator />
        </>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
