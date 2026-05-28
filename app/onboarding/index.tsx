// app/onboarding/index.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace('/auth'); // move to login
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Decorative background */}
        <View style={styles.topBlob} />
        <View style={styles.bottomBlob} />

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Credora</Text>
          <Text style={styles.subtitle}>
            Invest smarter. Track faster. Grow better.
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },

  /* Decorative shapes */
  topBlob: {
    position: 'absolute',
    top: 0,
    width: width,
    height: height * 0.45,
    backgroundColor: '#d2efcf',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 200,
    opacity: 0.6,
  },
  bottomBlob: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height * 0.35,
    backgroundColor: '#ebf0f0',
    borderTopLeftRadius: 200,
    borderTopRightRadius: 60,
    opacity: 0.7,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    marginBottom: 40,
    lineHeight: 22,
  },

  button: {
    backgroundColor: '#2EC4B6',
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: '#2EC4B6',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});