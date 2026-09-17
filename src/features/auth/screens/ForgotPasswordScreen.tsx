import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ForgotPasswordScreen: React.FC = () => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your email address and we'll send you a link to reset your password.
        </Text>

        {/* Email input would be implemented here with shared Input component */}

        {/* Submit button would be implemented here with shared Button component */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 32,
    lineHeight: 24,
  },
});

export default ForgotPasswordScreen;
