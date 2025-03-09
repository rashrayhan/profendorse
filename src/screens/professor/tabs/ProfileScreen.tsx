import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Input, Avatar, Divider } from 'react-native-elements';

type Professor = {
  firstName: string;
  lastName: string;
  email: string;
  institution: string;
  department: string;
  qualification: string;
  bio: string;
};

const MOCK_PROFESSOR: Professor = {
  firstName: 'John',
  lastName: 'Smith',
  email: 'john.smith@university.edu',
  institution: 'University of Technology',
  department: 'Computer Science',
  qualification: 'PhD in Computer Science',
  bio: 'Professor of Computer Science with 10+ years of experience in teaching and research.',
};

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [professor, setProfessor] = useState<Professor>(MOCK_PROFESSOR);

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving profile:', professor);
    setIsEditing(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar
          size="xlarge"
          rounded
          title={`${professor.firstName[0]}${professor.lastName[0]}`}
          containerStyle={styles.avatar}
        />
        <Text h3 style={styles.name}>{`${professor.firstName} ${professor.lastName}`}</Text>
        <Text style={styles.institution}>{professor.institution}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text h4>Profile Information</Text>
          <Button
            type="clear"
            title={isEditing ? "Cancel" : "Edit"}
            onPress={() => setIsEditing(!isEditing)}
          />
        </View>
        <Divider style={styles.divider} />

        <Input
          label="First Name"
          value={professor.firstName}
          disabled={!isEditing}
          onChangeText={(text) => setProfessor({ ...professor, firstName: text })}
        />
        <Input
          label="Last Name"
          value={professor.lastName}
          disabled={!isEditing}
          onChangeText={(text) => setProfessor({ ...professor, lastName: text })}
        />
        <Input
          label="Email"
          value={professor.email}
          disabled={!isEditing}
          onChangeText={(text) => setProfessor({ ...professor, email: text })}
        />
        <Input
          label="Institution"
          value={professor.institution}
          disabled={!isEditing}
          onChangeText={(text) => setProfessor({ ...professor, institution: text })}
        />
        <Input
          label="Department"
          value={professor.department}
          disabled={!isEditing}
          onChangeText={(text) => setProfessor({ ...professor, department: text })}
        />
        <Input
          label="Qualification"
          value={professor.qualification}
          disabled={!isEditing}
          onChangeText={(text) => setProfessor({ ...professor, qualification: text })}
        />
        <Input
          label="Bio"
          value={professor.bio}
          disabled={!isEditing}
          multiline
          numberOfLines={4}
          onChangeText={(text) => setProfessor({ ...professor, bio: text })}
        />

        {isEditing && (
          <Button
            title="Save Changes"
            containerStyle={styles.saveButton}
            onPress={handleSave}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text h4>Account Settings</Text>
        <Divider style={styles.divider} />
        <Button
          title="Change Password"
          type="outline"
          containerStyle={styles.button}
          onPress={() => console.log('Change password')}
        />
        <Button
          title="Notification Preferences"
          type="outline"
          containerStyle={styles.button}
          onPress={() => console.log('Notification preferences')}
        />
        <Button
          title="Withdrawal Settings"
          type="outline"
          containerStyle={styles.button}
          onPress={() => console.log('Withdrawal settings')}
        />
      </View>

      <View style={styles.section}>
        <Text h4>Verification Status</Text>
        <Divider style={styles.divider} />
        <Text style={styles.verificationStatus}>
          ✓ Your account is verified
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  avatar: {
    backgroundColor: '#2089dc',
    marginBottom: 10,
  },
  name: {
    marginBottom: 5,
  },
  institution: {
    color: '#666',
    fontSize: 16,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    marginVertical: 15,
  },
  button: {
    marginVertical: 5,
  },
  saveButton: {
    marginTop: 20,
  },
  verificationStatus: {
    color: '#2ecc71',
    fontSize: 16,
  },
}); 