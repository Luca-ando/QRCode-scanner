import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen, AddStudentScreen, EditStudentScreen } from '../screens';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
          headerRight: () => (
            <MaterialCommunityIcons
              name="pencil"
              color="#fff"
              size={24}
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate('EditStudentScreen')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="AddStudentScreen"
        component={AddStudentScreen}
        options={{
          headerTitle: 'Ajouter un étudiant',
        }}
      />
      <Stack.Screen
        name="EditStudentScreen"
        component={EditStudentScreen}
        options={{
          headerTitle: 'Modifier un étudiant',
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
