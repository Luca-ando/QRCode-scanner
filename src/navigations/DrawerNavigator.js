import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ProfileScreen, JournalLogScreen } from '../screens';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerStyle={{
        backgroundColor: '#fff',
        width: 240,
      }}
      drawerContentOptions={{
        itemStyle: {
          marginHorizontal: -20,
        },
        labelStyle: {
          fontSize: 18,
          fontWeight: '500',
        },
      }}
    >
      <Drawer.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          drawerLabel: 'Profile',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="JournalLogScreen"
        component={JournalLogScreen}
        options={{
          drawerLabel: 'Journal',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Item
        label="Déconnexion"
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="logout" color={color} size={size} />
        )}
        onPress={async () => {
          await AsyncStorage.clear(); // Clear storage for logout
          navigation.navigate('LogInScreen'); // Navigate to login screen
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
