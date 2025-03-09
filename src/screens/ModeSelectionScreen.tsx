import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  ModeSelection: undefined;
  StudentDashboard: undefined;
  ProfessorDashboard: undefined;
  AdminDashboard: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ModeSelectionScreen() {
  const navigation = useNavigation<NavigationProp>();

  const modes = [
    {
      title: 'Student',
      description: 'Request and manage your reference letters',
      icon: 'graduation-cap',
      route: 'StudentDashboard',
      color: '#3498db',
    },
    {
      title: 'Professor',
      description: 'Manage reference requests and templates',
      icon: 'book',
      route: 'ProfessorDashboard',
      color: '#2ecc71',
    },
    {
      title: 'Admin',
      description: 'System management and oversight',
      icon: 'shield',
      route: 'AdminDashboard',
      color: '#e74c3c',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text h2 style={styles.title}>ProfEndorse</Text>
        <Text style={styles.subtitle}>Select your mode to continue</Text>
      </View>

      <View style={styles.content}>
        {modes.map((mode) => (
          <Button
            key={mode.title}
            onPress={() => navigation.navigate(mode.route as keyof RootStackParamList)}
            containerStyle={styles.cardContainer}
            buttonStyle={[styles.card, { backgroundColor: mode.color }]}
          >
            <View style={styles.cardContent}>
              <Icon
                name={mode.icon}
                type="font-awesome"
                color="#fff"
                size={32}
                containerStyle={styles.iconContainer}
              />
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{mode.title}</Text>
                <Text style={styles.cardDescription}>{mode.description}</Text>
              </View>
              <Icon
                name="chevron-right"
                type="feather"
                color="#fff"
                size={24}
              />
            </View>
          </Button>
        ))}
      </View>

      <Text style={styles.version}>Version 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    color: '#2089dc',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cardContainer: {
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    padding: 20,
    height: 100,
    borderRadius: 15,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    marginRight: 15,
    width: 40,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  version: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    fontSize: 12,
  },
}); 