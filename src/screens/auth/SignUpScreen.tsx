import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { useAuth } from '../../contexts/AuthContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type SignUpScreenProps = NativeStackScreenProps<any, 'SignUp'>;

export default function SignUpScreen({ navigation }: SignUpScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [institution, setInstitution] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState<'student' | 'professor' | null>(null);
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();

  const handleSignUp = async () => {
    if (!email || !password || !firstName || !lastName || !role || !institution || !department) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      await signUp(email, password, {
        firstName,
        lastName,
        phoneNumber,
        role,
        institution,
        department,
      });
      Alert.alert('Success', 'Account created successfully! Please check your email for verification.');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          <Text h3 style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          <Input
            placeholder="First Name *"
            value={firstName}
            onChangeText={setFirstName}
            containerStyle={styles.input}
          />

          <Input
            placeholder="Last Name *"
            value={lastName}
            onChangeText={setLastName}
            containerStyle={styles.input}
          />

          <Input
            placeholder="Email *"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            containerStyle={styles.input}
          />

          <Input
            placeholder="Password *"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            containerStyle={styles.input}
          />

          <Input
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            containerStyle={styles.input}
          />

          <Input
            placeholder="Institution *"
            value={institution}
            onChangeText={setInstitution}
            containerStyle={styles.input}
          />

          <Input
            placeholder="Department *"
            value={department}
            onChangeText={setDepartment}
            containerStyle={styles.input}
          />

          <View style={styles.roleContainer}>
            <Text style={styles.roleTitle}>I am a: *</Text>
            <View style={styles.roleButtons}>
              <Button
                title="Student"
                type={role === 'student' ? 'solid' : 'outline'}
                onPress={() => setRole('student')}
                containerStyle={styles.roleButton}
              />
              <Button
                title="Professor"
                type={role === 'professor' ? 'solid' : 'outline'}
                onPress={() => setRole('professor')}
                containerStyle={styles.roleButton}
              />
            </View>
          </View>

          <Button
            title="Sign Up"
            onPress={handleSignUp}
            loading={loading}
            containerStyle={styles.buttonContainer}
          />

          <View style={styles.signInContainer}>
            <Text>Already have an account? </Text>
            <Button
              title="Sign In"
              type="clear"
              onPress={() => navigation.navigate('SignIn')}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  form: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  input: {
    marginBottom: 10,
  },
  roleContainer: {
    marginBottom: 20,
  },
  roleTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#86939e',
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
}); 