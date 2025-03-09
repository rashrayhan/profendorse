import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';

export default function AdminDashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text h3>Admin Dashboard</Text>
      </View>

      <View style={styles.content}>
        <Text h4 style={styles.sectionTitle}>System Management</Text>
        <Button
          title="User Verification"
          containerStyle={styles.buttonContainer}
          onPress={() => console.log('User verification')}
        />
        <Button
          title="Payment Management"
          containerStyle={styles.buttonContainer}
          onPress={() => console.log('Payment management')}
        />
        <Button
          title="System Reports"
          containerStyle={styles.buttonContainer}
          onPress={() => console.log('System reports')}
        />
        <Button
          title="Support Tickets"
          containerStyle={styles.buttonContainer}
          onPress={() => console.log('Support tickets')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  },
}); 