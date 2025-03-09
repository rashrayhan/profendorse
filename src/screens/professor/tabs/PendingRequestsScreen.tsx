import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

export default function PendingRequestsScreen() {
  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>Pending Requests</Text>
      <Text style={styles.subtitle}>You have no pending requests</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  subtitle: {
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
}); 