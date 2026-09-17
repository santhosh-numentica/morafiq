import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MorafiqLogo } from '@shared/components';
import { Button } from '@shared/components';
import { useToast } from '@shared/hooks/useToast';
import { Toast } from '@shared/components/Toast';
import { validateEmail, calculateAge } from '@helpers';

export const RegisterScreen: React.FC = () => {
  const { showToast } = useToast();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');

  const handleDobChange = (text: string) => {
    let formatted = text.replace(/\D/g, '');
    
    if (formatted.length > 8) {
      formatted = formatted.substring(0, 8);
    }
    
    if (formatted.length >= 2) {
      formatted = formatted.substring(0, 2) + '/' + formatted.substring(2);
    }
    if (formatted.length >= 5) {
      formatted = formatted.substring(0, 5) + '/' + formatted.substring(5);
    }
    
    setDob(formatted);
    setAge(calculateAge(formatted));
  };

  const handleSignUp = () => {
    console.log('Sign up clicked', { firstName, lastName, email, dob, age });
    
    if (!firstName || !lastName || !email || !dob) {
      console.log('Validation failed: empty fields');
      showToast('Please fill all fields', 'error');
      return;
    }
    
    if (!validateEmail(email)) {
      console.log('Validation failed: invalid email');
      showToast('Please enter a valid email address', 'error');
      return;
    }
    
    if (dob.length !== 10) {
      console.log('Validation failed: invalid DOB', dob.length);
      showToast('Please enter a valid date of birth (DD/MM/YYYY)', 'error');
      return;
    }
    
    console.log('Validation passed, showing success toast');
    showToast('Account created successfully', 'success');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <MorafiqLogo width={300} height={200} />
            <Text style={styles.title}>Sign up</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter first name"
                placeholderTextColor="#9E9E9E"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter last name"
                placeholderTextColor="#9E9E9E"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email address"
                placeholderTextColor="#9E9E9E"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#9E9E9E"
                value={dob}
                onChangeText={handleDobChange}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                placeholder="Age"
                placeholderTextColor="#9E9E9E"
                value={age}
                editable={false}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Sign up"
                variant="darkBlue"
                size="lg"
                onPress={handleSignUp}
              />
            </View>
          </View>

          <View style={styles.signinContainer}>
            <Text style={styles.signinText}>Already have an account?</Text>
            <Text style={styles.signinLink}>Sign In</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 4,
  },
  formContainer: {
    marginBottom: 32,
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'center',
  },
  disabledInput: {
    backgroundColor: '#F3F4F6',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 8,
  },
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinText: {
    fontSize: 14,
    color: '#4B5563',
    marginRight: 4,
  },
  signinLink: {
    fontSize: 14,
    color: '#1D4ED8',
    fontWeight: '600',
  },
});

export default RegisterScreen;
