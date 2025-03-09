import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';

export default function StudentDashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text h3 style={styles.title}>Student Dashboard</Text>
        <Text style={styles.subtitle}>Welcome back!</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <Button
            title="Request New Reference"
            icon={{
              name: 'file-text',
              type: 'feather',
              size: 20,
              color: '#fff',
            }}
            buttonStyle={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate('ReferenceRequest')}
          />
          <Button
            title="View My Requests"
            icon={{
              name: 'list',
              type: 'feather',
              size: 20,
              color: '#2c3e50',
            }}
            type="outline"
            buttonStyle={styles.button}
            titleStyle={{ color: '#2c3e50' }}
          />
          <Button
            title="Upload Documents"
            icon={{
              name: 'upload',
              type: 'feather',
              size: 20,
              color: '#2c3e50',
            }}
            type="outline"
            buttonStyle={styles.button}
            titleStyle={{ color: '#2c3e50' }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No recent activity</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  title: {
    color: '#2c3e50',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    padding: 15,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  button: {
    marginBottom: 10,
    borderRadius: 8,
    paddingVertical: 12,
  },
  primaryButton: {
    backgroundColor: '#3498db',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#666',
    fontSize: 16,
  },
}); 