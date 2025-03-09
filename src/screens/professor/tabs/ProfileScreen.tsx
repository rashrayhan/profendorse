import React, { useState, useMemo, useRef } from 'react';
import { View, StyleSheet, ScrollView, Switch, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { Text, Button, Input, Avatar, Divider, Icon, ListItem, Overlay } from 'react-native-elements';
import { TextInput } from 'react-native';

type Professor = {
  firstName: string;
  lastName: string;
  email: string;
  institution: string;
  department: string;
  qualification: string;
  bio: string;
  title: string;
  researchAreas: string[];
  publications: number;
  officeHours: string;
  languages: string[];
  profileVisibility: 'public' | 'private' | 'verified-only';
  referenceLetterPreferences: {
    acceptingNew: boolean;
    minimumNotice: number;
    preferredFormat: string;
    fee: number;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    loginAlerts: boolean;
  };
  verification: {
    email: boolean;
    institution: boolean;
    academic: boolean;
    government: boolean;
  };
  banking: {
    bankAccounts: Array<{
      id: string;
      bankName: string;
      accountType: 'checking' | 'savings';
      accountNumber: string;
      isDefault: boolean;
      lastUsed: string;
    }>;
    paymentMethods: Array<{
      id: string;
      type: 'credit_card' | 'debit_card' | 'paypal';
      lastFour: string;
      expiryDate: string;
      isDefault: boolean;
    }>;
    autoWithdrawal: {
      enabled: boolean;
      threshold: number;
      preferredAccount: string;
    };
  };
  joinedDate: string;
  profileImage?: string;
  privacySettings: {
    profileVisibility: 'public' | 'private' | 'verified-only';
    referenceLetterVisibility: 'all' | 'verified-students' | 'invited-only';
    contactPreference: 'direct' | 'platform-only' | 'verified-only';
    showInSearchResults: boolean;
    showResearchAreas: boolean;
    showPublications: boolean;
    showInstitution: boolean;
    showDepartment: boolean;
    showQualification: boolean;
    dataRetention: 'standard' | 'minimal' | 'extended';
  };
};

const MOCK_PROFESSOR: Professor = {
  firstName: 'John',
  lastName: 'Smith',
  email: 'john.smith@university.edu',
  institution: 'University of Technology',
  department: 'Computer Science',
  profileImage: undefined,
  qualification: 'PhD in Computer Science',
  bio: 'Professor of Computer Science with 10+ years of experience in teaching and research.',
  title: 'Professor',
  researchAreas: ['Artificial Intelligence', 'Machine Learning', 'Data Science'],
  publications: 45,
  officeHours: 'Mon, Wed 2-4 PM',
  languages: ['English', 'French'],
  profileVisibility: 'public',
  referenceLetterPreferences: {
    acceptingNew: true,
    minimumNotice: 14,
    preferredFormat: 'PDF',
    fee: 50,
  },
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  security: {
    twoFactorEnabled: true,
    lastPasswordChange: '2024-02-15',
    loginAlerts: true,
  },
  verification: {
    email: true,
    institution: true,
    academic: true,
    government: false,
  },
  banking: {
    bankAccounts: [
      {
        id: '1',
        bankName: 'Chase Bank',
        accountType: 'checking',
        accountNumber: '****6789',
        isDefault: true,
        lastUsed: '2024-03-15',
      },
      {
        id: '2',
        bankName: 'Bank of America',
        accountType: 'savings',
        accountNumber: '****4321',
        isDefault: false,
        lastUsed: '2024-02-28',
      },
    ],
    paymentMethods: [
      {
        id: '1',
        type: 'credit_card',
        lastFour: '4567',
        expiryDate: '12/25',
        isDefault: true,
      },
      {
        id: '2',
        type: 'paypal',
        lastFour: '',
        expiryDate: '',
        isDefault: false,
      },
    ],
    autoWithdrawal: {
      enabled: false,
      threshold: 1000,
      preferredAccount: '1',
    },
  },
  joinedDate: '2023-09-15',
  privacySettings: {
    profileVisibility: 'public',
    referenceLetterVisibility: 'verified-students',
    contactPreference: 'platform-only',
    showInSearchResults: true,
    showResearchAreas: true,
    showPublications: true,
    showInstitution: true,
    showDepartment: true,
    showQualification: true,
    dataRetention: 'standard',
  },
};

const formatJoinedDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    return date.getFullYear().toString();
  } catch (error) {
    return 'Date not available';
  }
};

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [professor, setProfessor] = useState<Professor>(MOCK_PROFESSOR);
  const [activeSection, setActiveSection] = useState<string>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [isAccountOptionsVisible, setIsAccountOptionsVisible] = useState(false);
  const [isImagePickerVisible, setIsImagePickerVisible] = useState(false);
  const tabScrollViewRef = useRef<ScrollView>(null);

  const scrollToTab = (index: number) => {
    if (tabScrollViewRef.current) {
      // Calculate the approximate position of the tab
      const tabWidth = 120; // Approximate width of each tab
      const screenWidth = 400; // Approximate screen width
      const scrollPosition = Math.max(0, (index * tabWidth) - (screenWidth / 2) + (tabWidth / 2));
      
      tabScrollViewRef.current.scrollTo({
        x: scrollPosition,
        animated: true
      });
    }
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving profile:', professor);
    setIsEditing(false);
  };

  const handleAccountOptions = (accountId: string) => {
    setSelectedAccount(accountId);
    setIsAccountOptionsVisible(true);
  };

  const handleSetDefaultAccount = async (accountId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfessor(prev => ({
        ...prev,
        banking: {
          ...prev.banking,
          bankAccounts: prev.banking.bankAccounts.map(account => ({
            ...account,
            isDefault: account.id === accountId
          }))
        }
      }));
      
      setIsAccountOptionsVisible(false);
    } catch (err) {
      setError('Failed to set default account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveAccount = async (accountId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Don't allow removing the last account
      if (professor.banking.bankAccounts.length <= 1) {
        setError('Cannot remove the last bank account.');
        return;
      }

      // Don't allow removing the default account
      const isDefault = professor.banking.bankAccounts.find(acc => acc.id === accountId)?.isDefault;
      if (isDefault) {
        setError('Cannot remove the default account. Please set another account as default first.');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setProfessor(prev => ({
        ...prev,
        banking: {
          ...prev.banking,
          bankAccounts: prev.banking.bankAccounts.filter(account => account.id !== accountId)
        }
      }));

      setIsAccountOptionsVisible(false);
    } catch (err) {
      setError('Failed to remove account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImagePick = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Implement actual image picker integration
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful image upload
      const mockImageUrl = 'https://example.com/profile.jpg';
      setProfessor(prev => ({
        ...prev,
        profileImage: mockImageUrl
      }));
      
      setIsImagePickerVisible(false);
    } catch (err) {
      setError('Failed to update profile picture. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveImage = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfessor(prev => ({
        ...prev,
        profileImage: undefined
      }));
      
      setIsImagePickerVisible(false);
    } catch (err) {
      setError('Failed to remove profile picture. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log('Logging out...');
  };

  const renderProfileSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text h4>Professional Profile</Text>
        <Button
          type="clear"
          title={isEditing ? "Cancel" : "Edit"}
          onPress={() => setIsEditing(!isEditing)}
        />
      </View>
      <Divider style={styles.divider} />

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Title</Text>
        <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
          <Icon name="school" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.formInput}
            value={professor.title}
            editable={isEditing}
            onChangeText={(text) => setProfessor({ ...professor, title: text })}
            placeholder="Enter title"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.formRow}>
        <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
          <Text style={styles.formLabel}>First Name</Text>
          <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
            <Icon name="person" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.formInput}
              value={professor.firstName}
              editable={isEditing}
              onChangeText={(text) => setProfessor({ ...professor, firstName: text })}
              placeholder="Enter first name"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={[styles.formGroup, { flex: 1 }]}>
          <Text style={styles.formLabel}>Last Name</Text>
          <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
            <Icon name="person-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.formInput}
              value={professor.lastName}
              editable={isEditing}
              onChangeText={(text) => setProfessor({ ...professor, lastName: text })}
              placeholder="Enter last name"
              placeholderTextColor="#999"
            />
          </View>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Email</Text>
        <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
          <Icon name="email" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.formInput}
            value={professor.email}
            editable={isEditing}
            onChangeText={(text) => setProfessor({ ...professor, email: text })}
            placeholder="Enter email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Institution</Text>
        <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
          <Icon name="business" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.formInput}
            value={professor.institution}
            editable={isEditing}
            onChangeText={(text) => setProfessor({ ...professor, institution: text })}
            placeholder="Enter institution"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Department</Text>
        <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
          <Icon name="apartment" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.formInput}
            value={professor.department}
            editable={isEditing}
            onChangeText={(text) => setProfessor({ ...professor, department: text })}
            placeholder="Enter department"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Qualification</Text>
        <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
          <Icon name="stars" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.formInput}
            value={professor.qualification}
            editable={isEditing}
            onChangeText={(text) => setProfessor({ ...professor, qualification: text })}
            placeholder="Enter qualification"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Office Hours</Text>
        <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
          <Icon name="access-time" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.formInput}
            value={professor.officeHours}
            editable={isEditing}
            onChangeText={(text) => setProfessor({ ...professor, officeHours: text })}
            placeholder="Enter office hours"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Bio</Text>
        <View style={[styles.inputContainer, styles.textAreaContainer, !isEditing && styles.inputDisabled]}>
          <Icon 
            name="description" 
            size={20} 
            color="#666" 
            style={{ ...styles.inputIcon, alignSelf: 'flex-start', marginTop: 12 }}
          />
          <TextInput
            style={[styles.formInput, styles.textArea]}
            value={professor.bio}
            editable={isEditing}
            onChangeText={(text) => setProfessor({ ...professor, bio: text })}
            placeholder="Enter bio"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </View>

      {isEditing && (
        <Button
          title="Save Changes"
          containerStyle={styles.saveButton}
          onPress={handleSave}
          raised
        />
      )}
    </View>
  );

  const renderVerificationSection = () => (
    <View style={styles.section}>
      <Text h4>Verification Status</Text>
      <Divider style={styles.divider} />
      
      <ListItem containerStyle={styles.verificationItem}>
        <Icon name={professor.verification.email ? "check-circle" : "cancel"} color={professor.verification.email ? "#2ecc71" : "#e74c3c"} />
        <ListItem.Content>
          <ListItem.Title>Email Verification</ListItem.Title>
          <ListItem.Subtitle>{professor.verification.email ? "Verified" : "Not Verified"}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>

      <ListItem containerStyle={styles.verificationItem}>
        <Icon name={professor.verification.institution ? "check-circle" : "cancel"} color={professor.verification.institution ? "#2ecc71" : "#e74c3c"} />
        <ListItem.Content>
          <ListItem.Title>Institution Verification</ListItem.Title>
          <ListItem.Subtitle>{professor.verification.institution ? "Verified" : "Not Verified"}</ListItem.Subtitle>
        </ListItem.Content>
        {!professor.verification.institution && (
          <Button
            title="Verify"
            type="outline"
            buttonStyle={styles.smallButton}
          />
        )}
      </ListItem>

      <ListItem containerStyle={styles.verificationItem}>
        <Icon name={professor.verification.academic ? "check-circle" : "cancel"} color={professor.verification.academic ? "#2ecc71" : "#e74c3c"} />
        <ListItem.Content>
          <ListItem.Title>Academic Credentials</ListItem.Title>
          <ListItem.Subtitle>{professor.verification.academic ? "Verified" : "Not Verified"}</ListItem.Subtitle>
        </ListItem.Content>
        {!professor.verification.academic && (
          <Button
            title="Verify"
            type="outline"
            buttonStyle={styles.smallButton}
          />
        )}
      </ListItem>

      <ListItem containerStyle={styles.verificationItem}>
        <Icon name={professor.verification.government ? "check-circle" : "cancel"} color={professor.verification.government ? "#2ecc71" : "#e74c3c"} />
        <ListItem.Content>
          <ListItem.Title>Government ID</ListItem.Title>
          <ListItem.Subtitle>{professor.verification.government ? "Verified" : "Not Verified"}</ListItem.Subtitle>
        </ListItem.Content>
        {!professor.verification.government && (
          <Button
            title="Verify"
            type="outline"
            buttonStyle={styles.smallButton}
          />
        )}
      </ListItem>
    </View>
  );

  const renderReferenceLetterSection = () => (
    <View style={styles.section}>
      <Text h4>Reference Letter Settings</Text>
      <Divider style={styles.divider} />

      <ListItem containerStyle={styles.settingItem}>
        <ListItem.Content>
          <ListItem.Title>Accepting New Requests</ListItem.Title>
        </ListItem.Content>
        <Switch
          value={professor.referenceLetterPreferences.acceptingNew}
          onValueChange={(value) => setProfessor({
            ...professor,
            referenceLetterPreferences: {
              ...professor.referenceLetterPreferences,
              acceptingNew: value
            }
          })}
        />
      </ListItem>

      <ListItem containerStyle={styles.settingItem}>
        <ListItem.Content>
          <ListItem.Title>Minimum Notice (Days)</ListItem.Title>
          <Input
            keyboardType="numeric"
            value={professor.referenceLetterPreferences.minimumNotice.toString()}
            onChangeText={(text) => setProfessor({
              ...professor,
              referenceLetterPreferences: {
                ...professor.referenceLetterPreferences,
                minimumNotice: parseInt(text) || 0
              }
            })}
            containerStyle={styles.inlineInput}
          />
        </ListItem.Content>
      </ListItem>

      <ListItem containerStyle={styles.settingItem}>
        <ListItem.Content>
          <ListItem.Title>Reference Letter Fee ($)</ListItem.Title>
          <Input
            keyboardType="numeric"
            value={professor.referenceLetterPreferences.fee.toString()}
            onChangeText={(text) => setProfessor({
              ...professor,
              referenceLetterPreferences: {
                ...professor.referenceLetterPreferences,
                fee: parseInt(text) || 0
              }
            })}
            containerStyle={styles.inlineInput}
          />
        </ListItem.Content>
      </ListItem>
    </View>
  );

  const renderBankingSection = () => (
    <View style={styles.section}>
      <Text h4>Banking & Payments</Text>
      <Divider style={styles.divider} />

      {error && (
        <View style={styles.errorContainer}>
          <Icon name="error" color="#e74c3c" size={20} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Bank Accounts Section */}
      <View style={styles.subsection}>
        <View style={styles.subsectionHeader}>
          <Text h4 style={styles.subsectionTitle}>Bank Accounts</Text>
          <Button
            title="Add Account"
            type="clear"
            icon={<Icon name="add" size={20} color="#2089dc" />}
            onPress={() => {/* TODO: Implement add bank account */}}
            disabled={isLoading}
          />
        </View>

        {professor.banking.bankAccounts.map((account) => (
          <ListItem key={account.id} containerStyle={[styles.bankingItem, isLoading && styles.disabledItem]}>
            <Icon name="account-balance" color="#2089dc" />
            <ListItem.Content>
              <ListItem.Title style={styles.bankName}>{account.bankName}</ListItem.Title>
              <ListItem.Subtitle>{account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1)} - {account.accountNumber}</ListItem.Subtitle>
              <Text style={styles.lastUsed}>Last used: {account.lastUsed}</Text>
            </ListItem.Content>
            {account.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultBadgeText}>Default</Text>
              </View>
            )}
            <Button
              type="clear"
              icon={<Icon name="more-vert" size={20} color="#666" />}
              onPress={() => handleAccountOptions(account.id)}
              disabled={isLoading}
            />
          </ListItem>
        ))}
      </View>

      {/* Payment Methods Section */}
      <View style={styles.subsection}>
        <View style={styles.subsectionHeader}>
          <Text h4 style={styles.subsectionTitle}>Payment Methods</Text>
          <Button
            title="Add Method"
            type="clear"
            icon={<Icon name="add" size={20} color="#2089dc" />}
            onPress={() => {/* TODO: Implement add payment method */}}
            disabled={isLoading}
          />
        </View>

        {professor.banking.paymentMethods.map((method) => (
          <ListItem key={method.id} containerStyle={[styles.bankingItem, isLoading && styles.disabledItem]}>
            <Icon 
              name={method.type === 'paypal' ? 'payment' : 'credit-card'} 
              color="#2089dc" 
            />
            <ListItem.Content>
              <ListItem.Title>
                {method.type === 'paypal' ? 'PayPal' : `${method.type === 'credit_card' ? 'Credit' : 'Debit'} Card`}
              </ListItem.Title>
              <ListItem.Subtitle>
                {method.type === 'paypal' ? 'Connected' : `****${method.lastFour} - Expires ${method.expiryDate}`}
              </ListItem.Subtitle>
            </ListItem.Content>
            {method.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultBadgeText}>Default</Text>
              </View>
            )}
            <Button
              type="clear"
              icon={<Icon name="more-vert" size={20} color="#666" />}
              onPress={() => {/* TODO: Implement payment method options */}}
              disabled={isLoading}
            />
          </ListItem>
        ))}
      </View>

      {/* Auto-Withdrawal Settings */}
      <View style={styles.subsection}>
        <Text h4 style={styles.subsectionTitle}>Auto-Withdrawal Settings</Text>
        
        <ListItem containerStyle={[styles.settingItem, isLoading && styles.disabledItem]}>
          <ListItem.Content>
            <ListItem.Title>Enable Auto-Withdrawal</ListItem.Title>
            <ListItem.Subtitle>Automatically withdraw when balance exceeds threshold</ListItem.Subtitle>
          </ListItem.Content>
          <Switch
            value={professor.banking.autoWithdrawal.enabled}
            onValueChange={(value) => setProfessor({
              ...professor,
              banking: {
                ...professor.banking,
                autoWithdrawal: {
                  ...professor.banking.autoWithdrawal,
                  enabled: value
                }
              }
            })}
            disabled={isLoading}
          />
        </ListItem>

        {professor.banking.autoWithdrawal.enabled && (
          <>
            <ListItem containerStyle={[styles.settingItem, isLoading && styles.disabledItem]}>
              <ListItem.Content>
                <ListItem.Title>Withdrawal Threshold ($)</ListItem.Title>
                <Input
                  keyboardType="numeric"
                  value={professor.banking.autoWithdrawal.threshold.toString()}
                  onChangeText={(text) => {
                    const value = parseInt(text) || 0;
                    if (value >= 0) {
                      setProfessor({
                        ...professor,
                        banking: {
                          ...professor.banking,
                          autoWithdrawal: {
                            ...professor.banking.autoWithdrawal,
                            threshold: value
                          }
                        }
                      });
                    }
                  }}
                  containerStyle={styles.inlineInput}
                  disabled={isLoading}
                />
              </ListItem.Content>
            </ListItem>

            <ListItem containerStyle={[styles.settingItem, isLoading && styles.disabledItem]}>
              <ListItem.Content>
                <ListItem.Title>Preferred Account</ListItem.Title>
                <ListItem.Subtitle>
                  {professor.banking.bankAccounts.find(acc => acc.id === professor.banking.autoWithdrawal.preferredAccount)?.bankName || 'Select account'}
                </ListItem.Subtitle>
              </ListItem.Content>
              <Button
                type="clear"
                title="Change"
                onPress={() => {/* TODO: Implement account selection */}}
                disabled={isLoading}
              />
            </ListItem>
          </>
        )}
      </View>

      {/* Account Options Overlay */}
      <Overlay
        isVisible={isAccountOptionsVisible}
        onBackdropPress={() => setIsAccountOptionsVisible(false)}
        overlayStyle={styles.overlay}
      >
        <View>
          <Text h4 style={styles.overlayTitle}>Account Options</Text>
          <Divider style={styles.divider} />
          
          <Button
            title="Set as Default"
            type="clear"
            containerStyle={styles.overlayButton}
            icon={<Icon name="star" size={20} color="#2089dc" style={{ marginRight: 10 }} />}
            onPress={() => selectedAccount && handleSetDefaultAccount(selectedAccount)}
            disabled={isLoading || professor.banking.bankAccounts.find(acc => acc.id === selectedAccount)?.isDefault}
          />
          
          <Button
            title="Remove Account"
            type="clear"
            containerStyle={styles.overlayButton}
            icon={<Icon name="delete" size={20} color="#e74c3c" style={{ marginRight: 10 }} />}
            titleStyle={{ color: '#e74c3c' }}
            onPress={() => selectedAccount && handleRemoveAccount(selectedAccount)}
            disabled={isLoading}
          />
          
          <Button
            title="Cancel"
            type="clear"
            containerStyle={styles.overlayButton}
            onPress={() => setIsAccountOptionsVisible(false)}
            disabled={isLoading}
          />
          
          {isLoading && (
            <ActivityIndicator style={styles.loader} color="#2089dc" />
          )}
        </View>
      </Overlay>
    </View>
  );

  const renderSecuritySection = () => (
    <View style={styles.section}>
      <Text h4>Security Settings</Text>
      <Divider style={styles.divider} />

      <ListItem containerStyle={styles.settingItem}>
        <ListItem.Content>
          <ListItem.Title>Two-Factor Authentication</ListItem.Title>
          <ListItem.Subtitle>Additional security for your account</ListItem.Subtitle>
        </ListItem.Content>
        <Switch
          value={professor.security.twoFactorEnabled}
          onValueChange={(value) => setProfessor({
            ...professor,
            security: { ...professor.security, twoFactorEnabled: value }
          })}
        />
      </ListItem>

      <ListItem containerStyle={styles.settingItem}>
        <ListItem.Content>
          <ListItem.Title>Login Alerts</ListItem.Title>
          <ListItem.Subtitle>Get notified of new sign-ins</ListItem.Subtitle>
        </ListItem.Content>
        <Switch
          value={professor.security.loginAlerts}
          onValueChange={(value) => setProfessor({
            ...professor,
            security: { ...professor.security, loginAlerts: value }
          })}
        />
      </ListItem>

      <Button
        title="Change Password"
        type="outline"
        containerStyle={styles.button}
        icon={<Icon name="lock" size={20} color="#2089dc" style={{ marginRight: 10 }} />}
      />

      <Text style={styles.lastPasswordChange}>
        Last password change: {professor.security.lastPasswordChange}
      </Text>
    </View>
  );

  const renderNotificationSection = () => (
    <View style={styles.section}>
      <Text h4>Notification Preferences</Text>
      <Divider style={styles.divider} />

      <ListItem containerStyle={styles.settingItem}>
        <ListItem.Content>
          <ListItem.Title>Email Notifications</ListItem.Title>
        </ListItem.Content>
        <Switch
          value={professor.notifications.email}
          onValueChange={(value) => setProfessor({
            ...professor,
            notifications: { ...professor.notifications, email: value }
          })}
        />
      </ListItem>

      <ListItem containerStyle={styles.settingItem}>
        <ListItem.Content>
          <ListItem.Title>Push Notifications</ListItem.Title>
        </ListItem.Content>
        <Switch
          value={professor.notifications.push}
          onValueChange={(value) => setProfessor({
            ...professor,
            notifications: { ...professor.notifications, push: value }
          })}
        />
      </ListItem>

      <ListItem containerStyle={styles.settingItem}>
        <ListItem.Content>
          <ListItem.Title>SMS Notifications</ListItem.Title>
        </ListItem.Content>
        <Switch
          value={professor.notifications.sms}
          onValueChange={(value) => setProfessor({
            ...professor,
            notifications: { ...professor.notifications, sms: value }
          })}
        />
      </ListItem>
    </View>
  );

  const renderPrivacySection = () => (
    <View style={styles.section}>
      <Text h4>Privacy Settings</Text>
      <Divider style={styles.divider} />

      {/* Profile Visibility */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Profile & Visibility</Text>
        
        <ListItem containerStyle={styles.settingItem}>
          <ListItem.Content>
            <ListItem.Title>Profile Visibility</ListItem.Title>
            <ListItem.Subtitle>Control who can see your profile</ListItem.Subtitle>
          </ListItem.Content>
          <Button
            title={professor.privacySettings.profileVisibility.replace('-', ' ')}
            type="clear"
            onPress={() => {/* TODO: Implement visibility picker */}}
          />
        </ListItem>

        <ListItem containerStyle={styles.settingItem}>
          <ListItem.Content>
            <ListItem.Title>Reference Letter Service Visibility</ListItem.Title>
            <ListItem.Subtitle>Who can see your reference letter service</ListItem.Subtitle>
          </ListItem.Content>
          <Button
            title={professor.privacySettings.referenceLetterVisibility.replace('-', ' ')}
            type="clear"
            onPress={() => {/* TODO: Implement visibility picker */}}
          />
        </ListItem>

        <ListItem containerStyle={styles.settingItem}>
          <ListItem.Content>
            <ListItem.Title>Contact Preference</ListItem.Title>
            <ListItem.Subtitle>How students can contact you</ListItem.Subtitle>
          </ListItem.Content>
          <Button
            title={professor.privacySettings.contactPreference.replace('-', ' ')}
            type="clear"
            onPress={() => {/* TODO: Implement preference picker */}}
          />
        </ListItem>

        <ListItem containerStyle={styles.settingItem}>
          <ListItem.Content>
            <ListItem.Title>Show in Search Results</ListItem.Title>
            <ListItem.Subtitle>Allow students to find you in searches</ListItem.Subtitle>
          </ListItem.Content>
          <Switch
            value={professor.privacySettings.showInSearchResults}
            onValueChange={(value) => setProfessor({
              ...professor,
              privacySettings: { ...professor.privacySettings, showInSearchResults: value }
            })}
          />
        </ListItem>
      </View>

      {/* Information Visibility */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Information Visibility</Text>
        
        <ListItem containerStyle={styles.settingItem}>
          <ListItem.Content>
            <ListItem.Title>Show Research Areas</ListItem.Title>
          </ListItem.Content>
          <Switch
            value={professor.privacySettings.showResearchAreas}
            onValueChange={(value) => setProfessor({
              ...professor,
              privacySettings: { ...professor.privacySettings, showResearchAreas: value }
            })}
          />
        </ListItem>

        <ListItem containerStyle={styles.settingItem}>
          <ListItem.Content>
            <ListItem.Title>Show Publications</ListItem.Title>
          </ListItem.Content>
          <Switch
            value={professor.privacySettings.showPublications}
            onValueChange={(value) => setProfessor({
              ...professor,
              privacySettings: { ...professor.privacySettings, showPublications: value }
            })}
          />
        </ListItem>

        <ListItem containerStyle={styles.settingItem}>
          <ListItem.Content>
            <ListItem.Title>Show Institution</ListItem.Title>
          </ListItem.Content>
          <Switch
            value={professor.privacySettings.showInstitution}
            onValueChange={(value) => setProfessor({
              ...professor,
              privacySettings: { ...professor.privacySettings, showInstitution: value }
            })}
          />
        </ListItem>

        <ListItem containerStyle={styles.settingItem}>
          <ListItem.Content>
            <ListItem.Title>Show Department</ListItem.Title>
          </ListItem.Content>
          <Switch
            value={professor.privacySettings.showDepartment}
            onValueChange={(value) => setProfessor({
              ...professor,
              privacySettings: { ...professor.privacySettings, showDepartment: value }
            })}
          />
        </ListItem>

        <ListItem containerStyle={styles.settingItem}>
          <ListItem.Content>
            <ListItem.Title>Show Qualification</ListItem.Title>
          </ListItem.Content>
          <Switch
            value={professor.privacySettings.showQualification}
            onValueChange={(value) => setProfessor({
              ...professor,
              privacySettings: { ...professor.privacySettings, showQualification: value }
            })}
          />
        </ListItem>
      </View>

      {/* Data Management */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Data Management</Text>

        <ListItem containerStyle={styles.settingItem}>
          <ListItem.Content>
            <ListItem.Title>Data Retention Period</ListItem.Title>
            <ListItem.Subtitle>How long we keep your reference letter data</ListItem.Subtitle>
          </ListItem.Content>
          <Button
            title={professor.privacySettings.dataRetention}
            type="clear"
            onPress={() => {/* TODO: Implement retention picker */}}
          />
        </ListItem>

        <Button
          title="Download My Data"
          type="outline"
          containerStyle={[styles.button, { marginTop: 10 }]}
          icon={<Icon name="download" size={20} color="#2089dc" style={{ marginRight: 10 }} />}
        />

        <Button
          title="Delete Account"
          type="outline"
          containerStyle={[styles.button, { marginTop: 10 }]}
          buttonStyle={{ borderColor: '#e74c3c' }}
          titleStyle={{ color: '#e74c3c' }}
          icon={<Icon name="delete" size={20} color="#e74c3c" style={{ marginRight: 10 }} />}
        />
      </View>
    </View>
  );

  const sections = [
    { key: 'profile', title: 'Profile', icon: 'person' },
    { key: 'reference', title: 'References', icon: 'description' },
    { key: 'banking', title: 'Banking', icon: 'account-balance' },
    { key: 'verification', title: 'Verification', icon: 'verified' },
    { key: 'security', title: 'Security', icon: 'security' },
    { key: 'notifications', title: 'Notifications', icon: 'notifications' },
    { key: 'privacy', title: 'Privacy', icon: 'privacy-tip' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => setIsImagePickerVisible(true)}
          style={styles.avatarContainer}
        >
          <View>
            <Avatar
              size="xlarge"
              rounded
              source={professor.profileImage ? { uri: professor.profileImage } : undefined}
              title={professor.profileImage ? undefined : `${professor.firstName[0]}${professor.lastName[0]}`}
              containerStyle={styles.avatar}
            />
            <TouchableOpacity 
              style={styles.editIconContainer}
              onPress={() => setIsImagePickerVisible(true)}
            >
              <Icon
                name="edit"
                size={20}
                color="#fff"
                containerStyle={styles.editIcon}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
        <Text h3 style={styles.name}>{`${professor.title} ${professor.firstName} ${professor.lastName}`}</Text>
        <Text style={styles.institution}>{professor.institution}</Text>
        <Text style={styles.department}>{professor.department}</Text>
        <View style={styles.joinedContainer}>
          <Icon name="event" size={16} color="#666" />
          <Text style={styles.joinedText}>
            Joined {formatJoinedDate(professor.joinedDate)}
          </Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <ScrollView 
          ref={tabScrollViewRef}
          horizontal 
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          {sections.map((section, index) => (
            <TouchableOpacity
              key={section.key}
              style={[
                styles.tab,
                activeSection === section.key && styles.activeTab
              ]}
              onPress={() => {
                setActiveSection(section.key);
                scrollToTab(index);
              }}
            >
              <Icon
                name={section.icon}
                size={20}
                color={activeSection === section.key ? '#2089dc' : '#666'}
              />
              <Text style={[
                styles.tabText,
                activeSection === section.key && styles.activeTabText
              ]}>
                {section.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {activeSection === 'profile' && renderProfileSection()}
      {activeSection === 'verification' && renderVerificationSection()}
      {activeSection === 'reference' && renderReferenceLetterSection()}
      {activeSection === 'banking' && renderBankingSection()}
      {activeSection === 'security' && renderSecuritySection()}
      {activeSection === 'notifications' && renderNotificationSection()}
      {activeSection === 'privacy' && renderPrivacySection()}

      <View style={styles.logoutContainer}>
        <Button
          title="Logout"
          type="outline"
          containerStyle={styles.logoutButton}
          buttonStyle={{ borderColor: '#e74c3c' }}
          titleStyle={{ color: '#e74c3c' }}
          icon={<Icon name="logout" size={20} color="#e74c3c" style={{ marginRight: 10 }} />}
          onPress={handleLogout}
        />
      </View>

      {/* Image Picker Overlay */}
      <Overlay
        isVisible={isImagePickerVisible}
        onBackdropPress={() => setIsImagePickerVisible(false)}
        overlayStyle={styles.overlay}
      >
        <View>
          <Text h4 style={styles.overlayTitle}>Profile Picture</Text>
          <Divider style={styles.divider} />
          
          <Button
            title="Take Photo"
            type="clear"
            containerStyle={styles.overlayButton}
            icon={<Icon name="camera-alt" size={20} color="#2089dc" style={{ marginRight: 10 }} />}
            onPress={handleImagePick}
            disabled={isLoading}
          />
          
          <Button
            title="Choose from Gallery"
            type="clear"
            containerStyle={styles.overlayButton}
            icon={<Icon name="photo-library" size={20} color="#2089dc" style={{ marginRight: 10 }} />}
            onPress={handleImagePick}
            disabled={isLoading}
          />
          
          {professor.profileImage && (
            <Button
              title="Remove Photo"
              type="clear"
              containerStyle={styles.overlayButton}
              icon={<Icon name="delete" size={20} color="#e74c3c" style={{ marginRight: 10 }} />}
              titleStyle={{ color: '#e74c3c' }}
              onPress={handleRemoveImage}
              disabled={isLoading}
            />
          )}
          
          <Button
            title="Cancel"
            type="clear"
            containerStyle={styles.overlayButton}
            onPress={() => setIsImagePickerVisible(false)}
            disabled={isLoading}
          />
          
          {isLoading && (
            <ActivityIndicator style={styles.loader} color="#2089dc" />
          )}
        </View>
      </Overlay>
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    backgroundColor: '#2089dc',
    marginBottom: 10,
  },
  changePhotoText: {
    color: '#2089dc',
    fontSize: 14,
    marginTop: 8,
  },
  name: {
    marginBottom: 5,
  },
  institution: {
    color: '#666',
    fontSize: 16,
    marginBottom: 2,
  },
  department: {
    color: '#666',
    fontSize: 14,
  },
  tabContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  activeTab: {
    backgroundColor: '#e6f3ff',
  },
  tabText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  activeTabText: {
    color: '#2089dc',
    fontWeight: '500',
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
  verificationItem: {
    paddingVertical: 12,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  settingItem: {
    paddingVertical: 12,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  inlineInput: {
    width: 100,
    marginTop: 5,
  },
  lastPasswordChange: {
    color: '#666',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
  smallButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    minHeight: 30,
  },
  subsection: {
    marginBottom: 25,
  },
  subsectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subsectionTitle: {
    fontSize: 18,
    color: '#2c3e50',
  },
  bankingItem: {
    paddingVertical: 12,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  bankName: {
    fontWeight: '500',
  },
  defaultBadge: {
    backgroundColor: '#e6f3ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  defaultBadgeText: {
    color: '#2089dc',
    fontSize: 12,
    fontWeight: '500',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fde8e8',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  errorText: {
    color: '#e74c3c',
    marginLeft: 10,
    flex: 1,
  },
  disabledItem: {
    opacity: 0.6,
  },
  lastUsed: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  overlay: {
    width: '80%',
    borderRadius: 15,
    padding: 20,
  },
  overlayTitle: {
    marginBottom: 10,
  },
  overlayButton: {
    marginVertical: 5,
  },
  loader: {
    marginTop: 10,
  },
  joinedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  joinedText: {
    color: '#666',
    fontSize: 14,
    marginLeft: 5,
  },
  formGroup: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
    paddingHorizontal: 12,
  },
  inputDisabled: {
    backgroundColor: '#f1f3f5',
    borderColor: '#dee2e6',
  },
  inputIcon: {
    marginRight: 10,
  },
  formInput: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
    paddingVertical: 12,
  },
  textAreaContainer: {
    minHeight: 120,
    alignItems: 'flex-start',
  },
  textArea: {
    height: 100,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2089dc',
    borderRadius: 15,
    padding: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  editIcon: {
    backgroundColor: 'transparent',
  },
  logoutContainer: {
    padding: 20,
    paddingTop: 0,
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 10,
  },
}); 