import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Icon } from 'react-native-elements';

import ModeSelectionScreen from '../screens/ModeSelectionScreen';
import StudentDashboard from '../screens/student/Dashboard';
import ProfessorDashboard from '../screens/professor/Dashboard';
import AdminDashboard from '../screens/admin/Dashboard';
import RequestDetailsScreen from '../screens/professor/RequestDetailsScreen';
import ReferenceRequestScreen from '../screens/student/ReferenceRequestScreen';
import { ReferenceRequest } from '../types/request';

export type RootStackParamList = {
  ModeSelection: undefined;
  StudentDashboard: undefined;
  ProfessorDashboard: undefined;
  AdminDashboard: undefined;
  RequestDetails: {
    request: ReferenceRequest;
    onAccept?: (request: ReferenceRequest) => void;
    onReject?: (request: ReferenceRequest) => void;
    onComplete?: (request: ReferenceRequest) => void;
  };
  ReferenceRequest: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#fff',
  },
  headerTitleStyle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerTintColor: '#000',
  headerBackVisible: true,
  headerShadowVisible: false,
  ...Platform.select({
    ios: {
      headerLargeTitle: false,
    },
  }),
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ModeSelection"
        screenOptions={defaultScreenOptions}
      >
        <Stack.Screen
          name="ModeSelection"
          component={ModeSelectionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StudentDashboard"
          component={StudentDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfessorDashboard"
          component={ProfessorDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RequestDetails"
          component={RequestDetailsScreen}
          options={({ navigation }) => ({ 
            headerShown: true,
            title: 'Reference Request',
            headerBackVisible: false,
            headerLeft: () => (
              <Icon
                name="arrow-left"
                type="feather"
                size={24}
                color="#000"
                containerStyle={{ 
                  padding: 10,
                  marginLeft: -8
                }}
                onPress={() => navigation.goBack()}
              />
            )
          })}
        />
        <Stack.Screen
          name="ReferenceRequest"
          component={ReferenceRequestScreen}
          options={{ 
            headerShown: true,
            title: 'New Reference Request',
            headerBackTitle: 'Back'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 