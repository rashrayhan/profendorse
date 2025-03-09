import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  StudentDashboard: undefined;
  ProfessorDashboard: undefined;
  AdminDashboard: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AdminDashboard() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.welcome}>Welcome, Admin!</Text>
      
      <View style={styles.content}>
        <Text h4>Quick Actions</Text>
        <Button
          title="Manage Users"
          containerStyle={styles.buttonContainer}
          onPress={() => console.log('Manage Users')}
        />
        <Button
          title="Verify Documents"
          containerStyle={styles.buttonContainer}
          onPress={() => console.log('Verify Documents')}
        />
        <Button
          title="View Reports"
          containerStyle={styles.buttonContainer}
          onPress={() => console.log('View Reports')}
        />
        <Button
          title="Process Withdrawals"
          containerStyle={styles.buttonContainer}
          onPress={() => console.log('Process Withdrawals')}
        />
      </View>

      <View style={styles.bottomButtons}>
        <Button
          title="Switch to Student View"
          type="clear"
          containerStyle={styles.switchButton}
          onPress={() => navigation.navigate('StudentDashboard')}
        />
        <Button
          title="Switch to Professor View"
          type="clear"
          containerStyle={styles.switchButton}
          onPress={() => navigation.navigate('ProfessorDashboard')}
        />
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
    textAlign: 'center',
    marginBottom: 10,
  },
  welcome: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  bottomButtons: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  switchButton: {
    flex: 1,
    marginHorizontal: 5,
  },
}); 