import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useLogin } from '@features/auth/hooks';
import { useGoogleLogin } from '@features/auth/hooks/useGoogleLogin';
import { useAppleLogin } from '@features/auth/hooks/useAppleLogin';
import { usePasskeyLogin } from '@features/auth/hooks/usePasskeyLogin';
import { OTPForm } from '@features/auth/components/OTPForm';
import { MorafiqLogo } from '@shared/components';
import { GoogleLogo, AppleLogo } from '@shared/components';
import { Button } from '@shared/components';
import { useToast } from '@shared/hooks/useToast';
import { Toast } from '@shared/components/Toast';
import { validateEmail } from '@helpers';

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const { login, isLoading: isEmailLoading, error: loginError } = useLogin();
  const { login: googleLogin, isLoading: isGoogleLoading } = useGoogleLogin();
  const { login: appleLogin, isLoading: isAppleLoading } = useAppleLogin();
  const { login: passkeyLogin, isLoading: isPasskeyLoading } = usePasskeyLogin();
  const { showToast } = useToast();
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (loginError) {
      showToast(loginError, 'error');
    }
  }, [loginError, showToast]);

  const handleBackToEmail = () => {
    setShowOTP(false);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (text && !validateEmail(text)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleContinue = () => {
    if (email && validateEmail(email)) {
      showToast('OTP Sent successfully', 'success');
      setShowOTP(true);
    }
  };

  const handleOTPSubmit = async (otp: string) => {
    await login(email, otp);
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin('placeholder-id-token', 'placeholder-access-token');
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      await appleLogin('placeholder-identity-token', 'placeholder-authorization-code');
    } catch (error) {
      console.error('Apple login failed:', error);
    }
  };

  const handlePasskeyLogin = async () => {
    try {
      await passkeyLogin('placeholder-challenge');
    } catch (error) {
      console.error('Passkey login failed:', error);
    }
  };

  const isLoading = isEmailLoading || isGoogleLoading || isAppleLoading || isPasskeyLoading;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {!showOTP ? (
          <>
            <View style={styles.logoContainer}>
              <MorafiqLogo width={300} height={200} />
              <Text style={styles.title}>Log in</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="morafiq@exemple.com"
                  placeholderTextColor="#9E9E9E"
                  value={email}
                  onChangeText={handleEmailChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
              </View>

              <Button
                title="Continue"
                variant="darkBlue"
                size="lg"
                onPress={handleContinue}
                disabled={!email || !!emailError}
                style={styles.button}
              />
            </View>

            <View style={styles.socialLoginContainer}>
              <Text style={styles.orLoginText}>or</Text>
              <Text style={styles.socialLoginText}>Log in with</Text>
              
              <View style={styles.socialButtonsRow}>
                <Pressable 
                  style={styles.socialButton}
                  onPress={handleGoogleLogin}
                  disabled={isLoading}
                >
                  <View style={styles.socialButtonInner}>
                    <GoogleLogo width={24} height={24} />
                  </View>
                </Pressable>

                <Pressable 
                  style={styles.socialButton}
                  onPress={handleAppleLogin}
                  disabled={isLoading}
                >
                  <View style={styles.socialButtonInner}>
                    <AppleLogo width={24} height={24} />
                  </View>
                </Pressable>
              </View>

              <Pressable 
                style={styles.passkeyButton}
                onPress={handlePasskeyLogin}
                disabled={isLoading}
              >
                <Text style={styles.passkeyButtonText}>Continue with passkey</Text>
              </Pressable>
            </View>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>No account?</Text>
              <Pressable onPress={() => navigation.navigate('Register' as never)}>
                <Text style={styles.signupLink}>Sign up</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <OTPForm
            onSubmit={handleOTPSubmit}
            onBack={handleBackToEmail}
            isLoading={isEmailLoading}
            email={email}
          />
        )}
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
    padding: 24,
    justifyContent: 'center',
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
  },
  inputContainer: {
    marginBottom: 20,
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
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
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
  button: {
    marginTop: 8,
  },
  socialLoginContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  socialLoginText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 16,
  },
  orLoginText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  socialButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  passkeyButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  passkeyButtonText: {
    fontSize: 14,
    color: '#1D4ED8',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  signupText: {
    fontSize: 14,
    color: '#4B5563',
    marginRight: 4,
  },
  signupLink: {
    fontSize: 14,
    color: '#1D4ED8',
    fontWeight: '600',
  },
});

export default LoginScreen;
