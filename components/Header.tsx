import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  username: string;
  onBellPress?: () => void;
  onSearchPress?: () => void;
  userImage?: any; // Optional local image import
}

export default function Header({ username, onBellPress, onSearchPress, userImage }: HeaderProps) {
  return (
    <View style={styles.container}>
      {/* Left: Avatar + Greeting */}
      <View style={styles.leftContainer}>
        {userImage ? (
          <Image source={userImage} style={styles.avatar} />
        ) : (
          <Ionicons name="person-circle-outline" size={40} color="#555" />
        )}
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.username}>{username}</Text>
        </View>
      </View>

      {/* Right: Icons */}
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={onSearchPress}>
          <Ionicons name="search-outline" size={24} color="#333" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onBellPress}>
          <Ionicons name="notifications-outline" size={24} color="#333" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  username: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 18,
  },
});
