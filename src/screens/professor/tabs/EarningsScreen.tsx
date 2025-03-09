import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

export default function EarningsScreen() {
  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>My Earnings</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.label}>Available Balance</Text>
        <Text h3 style={styles.balance}>$0.00</Text>
      </View>
      <View style={styles.content}>
        <Text h4 style={styles.sectionTitle}>Transaction History</Text>
        <Text style={styles.subtitle}>No transactions yet</Text>
      </View>
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
  balanceContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  label: {
    color: '#666',
    marginBottom: 5,
  },
  balance: {
    color: '#2ecc71',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    marginBottom: 20,
  },
  subtitle: {
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
}); 