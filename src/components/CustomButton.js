import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, style = {}, ...props }) => {
  return (
    <View style={[styles.button, style]}>
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50', // Example button color
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff', // Example text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomButton;
