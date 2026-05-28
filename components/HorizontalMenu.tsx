import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, View } from 'react-native';

interface Item {
  id: number;
  title: string;
}

interface Props {
  items: Item[];
  selected: string;
  onSelect: (title: string) => void;
}

export default function HorizontalMenu({ items, selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onSelect(item.title)}
            style={[
              styles.item,
              selected === item.title && styles.activeItem,
            ]}
          >
            <Text
              style={[
                styles.text,
                selected === item.title && styles.activeText,
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 8, marginBottom: 10 },
  item: {
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 6,
  },
  activeItem: {
    backgroundColor: '#007aff',
  },
  text: { fontSize: 14, fontWeight: '500', color: '#333' },
  activeText: { color: '#fff' },
});
