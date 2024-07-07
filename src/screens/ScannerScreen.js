import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Camera, useCameraDevices, usePermissions } from 'expo-camera';
import { QRCodeScanner } from 'expo-vision-camera';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'http://localhost:8000/api/students'; // Replace with your API URL

const ScannerScreen = () => {
  const [hasPermission, requestPermission] = usePermissions(Camera.Permissions);
  const [scannedData, setScannedData] = useState('');
  const [studentInfo, setStudentInfo] = useState(null);
  const navigation = useNavigation();
  const [cameraDevices, setCameraDevices] = useState([]);

  const handleCameraReady = async () => {
    const { devices } = await Camera.getAvailableCamerasAsync();
    setCameraDevices(devices);
  };

  useEffect(() => {
    handleCameraReady();
  }, []);

  const handleScanned = ({ data }) => {
    setScannedData(data);

    // API call for matching QR code with database
    axios.get(`${API_URL}/${data}`)
      .then((response) => {
        setStudentInfo(response.data || { name: 'Individu non répertorié' }); // Set student information or default message
        if (response.data) {
          navigation.navigate('StudentInfoScreen', { studentInfo: response.data });
        }
      })
      .catch((error) => {
        console.error('Error fetching student info:', error);
      });
  };

  const askForCameraPermission = async () => {
    const { status } = await requestPermission();
    if (status !== 'granted') {
      console.log('Camera permission not granted');
    }
  };

  const content = hasPermission === null ? (
    <Text>Requesting camera permission...</Text>
  ) : hasPermission === false ? (
    <Text>No access to camera</Text>
  ) : (
    <>
      {cameraDevices.length > 0 ? (
        <QRCodeScanner onScanned={handleScanned} style={styles.scanner} />
      ) : (
        <Text>No camera found</Text>
      )}
      {hasPermission === 'granted' && <Text>Scan a QR code...</Text>}
    </>
  );

  return <View style={styles.container}>{content}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanner: {
    width: 300,
    height: 300,
  },
});

export default ScannerScreen;
