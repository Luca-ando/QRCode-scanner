import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'; 
import CustomButton from './components/CustomButton';
import { useNavigation } from '@react-navigation/native'; 
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/etudiants'; 

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(API_URL);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <Text>Loading profile data...</Text>;
  }

  const handleDeleteUser = async (user) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/etudiants/${user.id}`); // Use template literal for string interpolation
      setUserData(userData.filter((u) => u.id !== user.id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <CustomButton
        title="Ajouter"
        onPress={() => navigation.navigate('AddScreen')} // Navigate to AddStudentScreen
        style={styles.addButton}
      />
      <Text style={styles.title}>Profil</Text>
      <FlatList
        data={userData}
        renderItem={({ item: user }) => (
          <View style={styles.profileRow}>
            <View style={styles.profileInfo}>
              <Text style={styles.profileLabel}>Nom:</Text>
              <Text style={styles.profileValue}>{user.name}</Text>
              <Text style={styles.profileLabel}>Prénom:</Text>
              <Text style={styles.profileValue}>{user.firstName}</Text>
              <Text style={styles.profileValue}>{user.dob}</Text> 
              <Text style={styles.profileLabel}>CIN:</Text>
              <Text style={styles.profileValue}>{user.cin}</Text> 
              <Text style={styles.profileLabel}>Date CIN:</Text>
              <Text style={styles.profileValue}>{user.cin_date}</Text> 
              <Text style={styles.profileLabel}>Email:</Text>
              <Text style={styles.profileValue}>{user.email}</Text> 
              <Text style={styles.profileLabel}>Adresse:</Text>
              <Text style={styles.profileValue}>{user.adresse}</Text> 
              <Text style={styles.profileLabel}>Niveau:</Text>
              <Text style={styles.profileValue}>{user.niveau}</Text> 
              <Text style={styles.profileLabel}>Matricule:</Text>
              <Text style={styles.profileValue}>{user.matricule}</Text> 
              <Text style={styles.profileLabel}>Année Universitaire:</Text>
              <Text style={styles.profileValue}>{user.année_univ}</Text> 
            </View>
            <View style={styles.actionButtons}>
              <CustomButton
                title="Editer"
                onPress={() => navigation.navigate('EditScreen', { user })} // Pass user data to EditStudentScreen
                style={styles.actionButton}
              />
              <CustomButton
                title="Supprimer"
                onPress={() => handleDeleteUser(user)} // Implement delete functionality
                style={styles.actionButton}
                color="red" // Set a different color for delete button
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Add your styles here
});

export default ProfileScreen;
