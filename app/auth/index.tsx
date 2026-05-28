// app/auth/index.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleGetOTP = () => {
    console.log('Requesting OTP for:', phoneNumber);
    // Example navigation later:
    // router.push('/auth/otp-verification');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Top background shape */}
        <View style={styles.visualHeader} />

        {/* Main content */}
        <View style={styles.content}>
          <Text style={styles.title}>Log in / Sign up</Text>
          <Text style={styles.subtitle}>
            Please enter your phone number.
          </Text>

          {/* Phone input */}
          <View style={styles.inputContainer}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          {/* Spacer */}
          <View style={{ flex: 1 }} />

          {/* Terms */}
          <Text style={styles.termsText}>
            By proceeding, you agree with Credora's
            <Text style={styles.linkText}> terms and conditions</Text> and
            <Text style={styles.linkText}> privacy policy</Text>.
          </Text>

          {/* Button */}
          <TouchableOpacity
            style={[
              styles.otpButton,
              { opacity: phoneNumber.length === 10 ? 1 : 0.6 },
            ]}
            disabled={phoneNumber.length !== 10}
            onPress={handleGetOTP}
          >
            <Text style={styles.buttonText}>GET OTP</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom background shape */}
        <View style={styles.visualFooter} />
      </View>
    </SafeAreaView>
  );
}

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  container: {
    flex: 1,
  },

  visualHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: width * 0.6,
    backgroundColor: '#d2efcf',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 230,
    opacity: 0.5,
  },

  visualFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width,
    height: width * 0.6,
    backgroundColor: '#ebf0f0',
    borderTopLeftRadius: 180,
    borderTopRightRadius: 30,
    opacity: 0.7,
    zIndex: -1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 80,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    marginBottom: 30,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 59,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#e1e0e0c0',
  },

  countryCode: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10,
    color: '#333',
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },

  termsText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 18,
  },

  linkText: {
    fontWeight: '700',
    color: '#000',
  },

  otpButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: '#2EC4B6',
    marginBottom: 20,
    elevation: 6,
  },

  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
  },
});