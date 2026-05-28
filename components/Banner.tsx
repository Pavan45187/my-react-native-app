import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Banner() {
  return (
    <View style={styles.bannerContainer}>
      {/* Left side text */}
      <View style={styles.textContainer}>
        <Text style={styles.sdipText}>SDIP</Text>
        <Text style={styles.subtitle}>Diversify your funds</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start Now!</Text>
        </TouchableOpacity>
      </View>

      {/* Right side image */}
      <Image
        source={require('../assets/images/sdip2.png')}
        style={styles.bannerImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: 'row',
    backgroundColor: '#00c3a5', // blue background
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  sdipText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginTop: 2,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  bannerImage: {
    width: 100,
    height: 100,
  },
});
