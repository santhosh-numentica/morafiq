import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button } from '@shared/components';

interface OTPFormProps {
  onSubmit: (otp: string) => void;
  onBack: () => void;
  isLoading?: boolean;
  email?: string;
}

export const OTPForm: React.FC<OTPFormProps> = ({
  onSubmit,
  onBack,
  isLoading = false,
  email = 'john@doe.com',
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleSubmit = () => {
    onSubmit(otp.join(''));
  };

  const handleOtpChange = (value: string, index: number) => {
    // Allow only numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    
    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    // Auto-focus next input
    if (numericValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    // Handle resend code logic
    console.log('Resend code');
  };

  useEffect(() => {
    // Auto-focus the first OTP input when component mounts
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <KeyboardAvoidingView
      className="flex-1 w-full p-4"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 80}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={onBack} className="self-start mb-4">
          <Text className="text-3xl text-gray-800">←</Text>
        </Pressable>
        
        <View className="items-center mb-4">
          <Text className="text-3xl font-bold text-gray-800 mt-2 mb-2">OTP</Text>
          <Text className="text-sm text-gray-600 text-center mb-1">Enter the 6-digit code we sent to {email}</Text>
          <Pressable onPress={handleResendCode}>
            <Text className="text-sm text-orange-500 font-semibold">Resend code</Text>
          </Pressable>
        </View>
        
        <View className="flex-row justify-between mb-6">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref: any) => (inputRefs.current[index] = ref)}
              className="w-12 h-14 border border-gray-200 rounded-lg text-2xl font-semibold text-center bg-white"
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(key, index)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        <Button
          title="Confirm"
          variant="darkBlue"
          size="lg"
          onPress={handleSubmit}
          isLoading={isLoading}
          disabled={isLoading || otp.join('').length !== 6}
          className="mt-2"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OTPForm;
