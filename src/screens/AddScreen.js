import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import CustomButton from './components/CustomButton';
import axios from 'axios';

const API_URL = 'http://localhost:8000/etudiants'; 

const AddStudentScreen = ({ navigation }) => {
  const [studentData, setStudentData] = useState({
    name: '',
    firstName: '',
    dateOfBirth: '',
    cin: '',
    cin_date: '',
    tel: '',
    email: '',
    adresse: '',
    niveau: '',
    parcours: '',
    matricule: '',
    annee_univ: '',
  });

  const handleInputChange = (event) => {
    setStudentData({ ...studentData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    const { name, firstName, ...rest } = studentData; 
    const requiredFields = [name, firstName, ...Object.values(rest)]; 

    if (requiredFields.some((field) => !field)) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post(API_URL, studentData);
      console.log('Student added successfully:', response.data);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding student:', error);
      alert('An error occurred while adding the student');
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un étudiant</Text>
      {Object.entries(studentData).map(([key, value]) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key}
          value={value}
          onChangeText={handleInputChange}
          name={key}
        />
      ))}
      <View style={styles.buttonContainer}>
        <CustomButton title="Annuler" onPress={handleCancel} style={styles.cancelButton} />
        <CustomButton title="Soumettre" onPress={handleSubmit} style={styles.submitButton} />
      </View>
    </View>
  );
};

export default AddStudentScreen;

const styles = StyleSheet.create({
  // ... existing styles
});
