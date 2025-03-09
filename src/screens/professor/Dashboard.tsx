import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import RequestsScreen from './tabs/RequestsScreen';
import TemplatesScreen from './tabs/TemplatesScreen';
import EarningsScreen from './tabs/EarningsScreen';
import ProfileScreen from './tabs/ProfileScreen';

const Tab = createBottomTabNavigator();

// Import mock data
const MOCK_PROFESSOR = {
  rank: 'Professor',
  firstName: 'John',
};

export default function ProfessorDashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi, {MOCK_PROFESSOR.rank} {MOCK_PROFESSOR.firstName}</Text>
      </View>

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Requests':
                iconName = focused ? 'mail' : 'mail-outline';
                break;
              case 'Templates':
                iconName = focused ? 'document-text' : 'document-text-outline';
                break;
              case 'Earnings':
                iconName = focused ? 'wallet' : 'wallet-outline';
                break;
              case 'Profile':
                iconName = focused ? 'person' : 'person-outline';
                break;
              default:
                iconName = 'help-outline';
            }

            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2089dc',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen 
          name="Requests" 
          component={RequestsScreen}
          options={{
            tabBarBadge: 3,
          }}
        />
        <Tab.Screen name="Templates" component={TemplatesScreen} />
        <Tab.Screen name="Earnings" component={EarningsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
  },
}); 