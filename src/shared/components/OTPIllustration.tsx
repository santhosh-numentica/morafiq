import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface OTPIllustrationProps {
  width?: number;
  height?: number;
}

export const OTPIllustration: React.FC<OTPIllustrationProps> = ({
  width = 200,
  height = 200,
}) => {
  return (
    <View style={[styles.container, { width, height }]}>
      <View style={styles.illustrationContainer}>
        {/* Decorative elements */}
        <View style={[styles.dot, { top: 45, left: 35, backgroundColor: '#FF5252' }]} />
        <View style={[styles.dot, { top: 40, right: 35, backgroundColor: '#FFC107' }]} />
        <View style={[styles.dot, { top: 95, left: 30, backgroundColor: '#4CAF50' }]} />
        <View style={[styles.dot, { top: 90, right: 30, backgroundColor: '#2196F3' }]} />
        
        {/* Large phone */}
        <View style={styles.phone}>
          <View style={styles.phoneScreen}>
            <View style={styles.checkmarkCircle}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          </View>
          <View style={styles.phoneHomeButton} />
        </View>
        
        {/* Person */}
        <View style={styles.person}>
          <View style={styles.personHead} />
          <View style={styles.personBody} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationContainer: {
    position: 'relative',
    width: 200,
    height: 200,
  },
  dot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    opacity: 0.6,
  },
  phone: {
    position: 'absolute',
    top: 25,
    left: 50,
    width: 100,
    height: 140,
    backgroundColor: '#E3F2FD',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#2196F3',
    alignItems: 'center',
    paddingTop: 15,
  },
  phoneScreen: {
    width: 80,
    height: 90,
    backgroundColor: '#BBDEFB',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  phoneHomeButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#2196F3',
    marginTop: 10,
  },
  person: {
    position: 'absolute',
    bottom: 5,
    left: 85,
    alignItems: 'center',
  },
  personHead: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#90CAF9',
  },
  personBody: {
    width: 30,
    height: 15,
    backgroundColor: '#90CAF9',
    borderRadius: 15,
    marginTop: 4,
  },
});

export default OTPIllustration;
