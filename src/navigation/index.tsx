import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentDashboard from '../screens/student/Dashboard';
import ProfessorDashboard from '../screens/professor/Dashboard';
import AdminDashboard from '../screens/admin/Dashboard';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  // For development, we'll show the student dashboard directly
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
        <Stack.Screen name="ProfessorDashboard" component={ProfessorDashboard} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 