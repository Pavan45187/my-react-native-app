import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';

// --- Local Image ---
const EMPTY_STATE_IMAGE = require('../../assets/images/positions.png');

// --- Empty State Illustration ---
const EmptyPositionsIllustration = () => {
  return (
    <View style={styles.illustrationContainer}>
      <Image
        source={EMPTY_STATE_IMAGE}
        style={styles.illustrationImage}
        resizeMode="contain"
      />

      <Text style={styles.mainText}>
        No open equity intraday or MTF position
      </Text>
    </View>
  );
};

// --- Main Screen ---
export default function Positions() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <EmptyPositionsIllustration />
      </View>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },
  illustrationImage: {
    width: 200,
    height: 150,
    marginBottom: 30,
  },
  mainText: {
    marginTop: 10,
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 24,
  },
});