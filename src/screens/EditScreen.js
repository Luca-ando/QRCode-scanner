import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import CustomButton from './components/CustomButton';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/students'; // Replace with your API URL

const EditStudentScreen = ({ route, navigation }) => {
  const [student, setStudent] = useState(null);
  const { userId } = route.params; // Get the student ID from route parameters

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`${API_URL}/${userId}`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
        navigation.goBack(); // Go back in case of error
      }
    };

    fetchStudent();
  }, [userId]); // Fetch data only on initial render or when userId changes

  if (!student) {
    return <Text>Loading student data...</Text>;
  }

  const handleSave = async () => {
    const updatedStudent = {
      ...student, // Spread existing student data
      name: name, // Update name with the current state value
      firstName: firstName, // Update first name with the current state value
      // Update other student properties with their respective state values
    };

    try {
      const response = await axios.put(`${API_URL}/${userId}`, updatedStudent);
      console.log('Student updated successfully:', response.data);
      navigation.goBack(); // Go back to the previous screen (ProfileScreen)
    } catch (error) {
      console.error('Error updating student:', error);
      alert('An error occurred while updating the student');
    }
  };

  const handleCancel = () => {
    navigation.goBack(); // Go back to the previous screen (ProfileScreen)
  };

  const [name, setName] = useState(student.name); // Set initial name from fetched data
  const [firstName, setFirstName] = useState(student.firstName); // Set initial first name from fetched data
  // Set initial values for other student properties using student.propertyName

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier un étudiant</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Numéro de matricule"
        value={student.matriculationNumber} // Matriculation number is not editable
        disabled
      />
      {/* Add more input fields for other student information */}
      <View style={styles.buttonContainer}>
        <CustomButton title="Annuler" onPress={handleCancel} style={styles.cancelButton} />
        <CustomButton title="Soumettre" onPress={handleSave} style={styles.submitButton} />
      </View>
    </View>
  );
};

export default EditStudentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  submitButton: {
    backgroundColor: '#007bff',
  },
});
