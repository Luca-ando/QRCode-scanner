import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const JournalScreen = () => {
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    fetchJournalEntries();
  }, []);

  const fetchJournalEntries = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get('http://127.0.0.1:8000/journal', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setJournalEntries(data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderJournalEntry = ({ item }) => {
    const { timestamp, operator, student, operation, details } = item;
    return (
      <View style={styles.journalEntry}>
        <Text style={styles.timestamp}>{timestamp}</Text>
        <Text style={styles.operator}>{operator}</Text>
        <Text style={styles.student}>{student}</Text>
        <Text style={styles.operation}>{operation}</Text>
        <Text style={styles.details}>{details}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Journal</Text>
      <FlatList
        data={journalEntries}
        renderItem={renderJournalEntry}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

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
  journalEntry: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  timestamp: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  operator: {
    fontSize: 14,
  },
  student: {
    fontSize: 14,
  },
  operation: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
  },
});

export default JournalScreen;
