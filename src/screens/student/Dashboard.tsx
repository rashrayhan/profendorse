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

export default function StudentDashboard() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Student Dashboard</Text>
      <Text style={styles.welcome}>Welcome, Student!</Text>
      
      <View style={styles.content}>
        <Text h4>Quick Actions</Text>
        <Button
          title="Request Reference"
          containerStyle={styles.buttonContainer}
          onPress={() => console.log('Request Reference')}
        />
        <Button
          title="View My Requests"
          containerStyle={styles.buttonContainer}
          onPress={() => console.log('View My Requests')}
        />
        <Button
          title="Upload Documents"
          containerStyle={styles.buttonContainer}
          onPress={() => console.log('Upload Documents')}
        />
      </View>

      <Button
        title="Switch to Professor View"
        type="clear"
        containerStyle={styles.switchButton}
        onPress={() => navigation.navigate('ProfessorDashboard')}
      />
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
  switchButton: {
    marginTop: 'auto',
  },
}); 