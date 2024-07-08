import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen, AddStudentScreen, EditStudentScreen } from '../screens';

const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
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
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerTitle: 'Mon profil',
          headerLeft: () => null, // Supprimer le bouton de retour par défaut
        }}
      />
      <Stack.Screen
        name="AddScreen"
        component={AddScreen}
        options={{
          headerTitle: 'Ajouter un étudiant',
        }}
      />
      <Stack.Screen
        name="EditScreen"
        component={EditScreen}
        options={{
          headerTitle: 'Modifier un étudiant',
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
