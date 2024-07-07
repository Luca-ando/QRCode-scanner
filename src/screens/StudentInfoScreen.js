import React from 'react';
import { View, Text } from 'react-native';

const StudentInfoScreen = ({ route }) => {
  const studentInfo = route.params?.studentInfo || null;

  if (!studentInfo) {
    return <Text>Aucune information d'étudiant disponible</Text>;
  }

  return (
    <View>
      <Text>Nom: {studentInfo.name}</Text>
      <Text>Prénom: {studentInfo.firstName}</Text>
      <Text>Numéro de matricule: {studentInfo.matricule}</Text>
    </View>
  );
};

export default StudentInfoScreen;
