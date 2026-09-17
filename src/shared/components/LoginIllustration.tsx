import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface LoginIllustrationProps {
  width?: number;
  height?: number;
}

export const LoginIllustration: React.FC<LoginIllustrationProps> = ({
  width = 200,
  height = 200,
}) => {
  return (
    <View style={[styles.container, { width, height }]}>
      <View style={styles.illustrationContainer}>
        {/* Heart icons */}
        <Text style={styles.heartLeft}>❤️</Text>
        <Text style={styles.heartRight}>❤️</Text>
        
        {/* Phones */}
        <View style={styles.phoneLeft}>
          <View style={styles.phoneScreen} />
          <View style={styles.phoneButton} />
        </View>
        <View style={styles.phoneRight}>
          <View style={styles.phoneScreen} />
          <View style={styles.phoneButton} />
        </View>
        
        {/* Connection */}
        <View style={styles.connection} />
        
        {/* People */}
        <View style={styles.personLeft}>
          <View style={styles.personHead} />
          <View style={styles.personBody} />
        </View>
        <View style={styles.personRight}>
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
  heartLeft: {
    position: 'absolute',
    top: 20,
    left: 45,
    fontSize: 24,
  },
  heartRight: {
    position: 'absolute',
    top: 20,
    right: 45,
    fontSize: 24,
  },
  phoneLeft: {
    position: 'absolute',
    top: 55,
    left: 35,
    width: 40,
    height: 70,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2196F3',
    alignItems: 'center',
    paddingTop: 8,
  },
  phoneRight: {
    position: 'absolute',
    top: 55,
    right: 35,
    width: 40,
    height: 70,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2196F3',
    alignItems: 'center',
    paddingTop: 8,
  },
  phoneScreen: {
    width: 30,
    height: 50,
    backgroundColor: '#BBDEFB',
    borderRadius: 4,
  },
  phoneButton: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2196F3',
    marginTop: 6,
  },
  connection: {
    position: 'absolute',
    top: 90,
    left: 75,
    right: 75,
    height: 2,
    backgroundColor: '#2196F3',
    opacity: 0.5,
  },
  personLeft: {
    position: 'absolute',
    bottom: 20,
    left: 35,
    alignItems: 'center',
  },
  personRight: {
    position: 'absolute',
    bottom: 20,
    right: 35,
    alignItems: 'center',
  },
  personHead: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#90CAF9',
  },
  personBody: {
    width: 40,
    height: 20,
    backgroundColor: '#90CAF9',
    borderRadius: 20,
    marginTop: 4,
  },
});

export default LoginIllustration;
