import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScannerScreen, LogInScreen } from '../screens';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="ScannerScreen"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#2196F3',
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ccc',
      }}
    >
      <Tab.Screen
        name="ScannerScreen"
        component={ScannerScreen}
        options={{
          tabBarLabel: 'Scanner',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="LogInScreen"
        component={LogInScreen}
        options={{
          tabBarLabel: 'Connexion',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
