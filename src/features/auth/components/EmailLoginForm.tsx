import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';

interface EmailLoginFormProps {
  onContinue: (email: string) => void;
  isLoading?: boolean;
}

export const EmailLoginForm: React.FC<EmailLoginFormProps> = ({
  onContinue,
  isLoading = false,
}) => {
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    onContinue(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in with Email</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <Pressable 
        onPress={handleContinue} 
        style={[styles.submitButton, isLoading && styles.buttonDisabled]}
        disabled={isLoading}
      >
        <Text style={styles.submitButtonText}>Continue</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  placeholder: {
    fontSize: 14,
    color: '#999999',
  },
  submitButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EmailLoginForm;
