import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import RequestsScreen from './tabs/RequestsScreen';
import TemplatesScreen from './tabs/TemplatesScreen';
import EarningsScreen from './tabs/EarningsScreen';
import ProfileScreen from './tabs/ProfileScreen';

type RootStackParamList = {
  StudentDashboard: undefined;
  ProfessorDashboard: undefined;
  AdminDashboard: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Tab = createBottomTabNavigator();

export default function ProfessorDashboard() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text h3>Professor Dashboard</Text>
        <View style={styles.headerButtons}>
          <Button
            title="Student View"
            type="clear"
            onPress={() => navigation.navigate('StudentDashboard')}
          />
          <Button
            title="Admin View"
            type="clear"
            onPress={() => navigation.navigate('AdminDashboard')}
          />
        </View>
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
            tabBarBadge: 3, // We'll make this dynamic later
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
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
}); 