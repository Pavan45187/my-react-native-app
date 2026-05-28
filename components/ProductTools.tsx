import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TOOLS } from '../constants/data';

const ToolItem = ({ tool }: { tool: { name: string; icon: any } }) => (
  <TouchableOpacity style={styles.toolItem}>
    <View style={styles.iconWrapper}>
      <Image source={tool.icon} style={styles.toolIcon} resizeMode="contain" />
    </View>
    <Text style={styles.toolText}>{tool.name}</Text>
  </TouchableOpacity>
);

export default function ProductTools({ tools }: { tools: { name: string; icon: any }[] }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products and Tools</Text>
      <View style={styles.toolsRow}>
        {tools.map((tool) => (
          <ToolItem key={tool.name} tool={tool} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#fff',
    // ADDED horizontal padding to align title and content
    paddingHorizontal: 12, 
  },
  title: {
    fontSize: 18,
    // REDUCED BOLDNESS from '800' to '700'
    fontWeight: '700', 
    color: '#1A1A1A', // Using a dark black color
    marginBottom: 15,
  },
  toolsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // Removed horizontal padding here as it is now on the container
    paddingHorizontal: 0, 
  },
  toolItem: {
    alignItems: 'center',
    width: '20%',
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  toolIcon: {
    width: 35,
    height: 35,
  },
  toolText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
});
