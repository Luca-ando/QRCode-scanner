import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LogInScreen, ProfileScreen } from '../screens';
import { AuthContext } from './AuthContext'; 

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthContext.Consumer>
      {(context) => (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2196F3',
              height: 70,
            },
            headerTitleStyle: {
              color: '#fff',
              fontWeight: 'bold',
            },
            headerTintColor: '#fff',
          }}
        >
          <Stack.Screen
            name="LogInScreen"
            component={LogInScreen}
            options={{
              headerTitle: 'Connexion',
            }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
              headerTitle: 'Mon profil',
            }}
          />
        </Stack.Navigator>
      )}
    </AuthContext.Consumer>
  );
};

export default AuthNavigator;
