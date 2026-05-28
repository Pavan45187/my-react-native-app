import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- Mock Mutual Funds Data ---
const MUTUAL_FUNDS = [
  {
    id: '1',
    name: 'Axis Bluechip Fund',
    category: 'Large Cap',
    returns: '15.24%',
    positive: true,
  },
  {
    id: '2',
    name: 'Parag Parikh Flexi Cap',
    category: 'Flexi Cap',
    returns: '18.62%',
    positive: true,
  },
  {
    id: '3',
    name: 'HDFC Mid-Cap Opportunities',
    category: 'Mid Cap',
    returns: '-2.15%',
    positive: false,
  },
];

// --- Card Component ---
const FundCard = ({ item }: { item: any }) => {
  const color = item.positive ? '#00C853' : '#E74C3C';

  return (
    <TouchableOpacity style={styles.card}>
      <View>
        <Text style={styles.fundName}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>

      <View style={styles.right}>
        <Text style={[styles.returns, { color }]}>{item.returns}</Text>
        <Ionicons name="chevron-forward-outline" size={18} color="#999" />
      </View>
    </TouchableOpacity>
  );
};

export default function MutualFundsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Header */}
        <Text style={styles.header}>Mutual Funds</Text>

        {/* Funds List */}
        <FlatList
          data={MUTUAL_FUNDS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FundCard item={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },

  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    marginVertical: 15,
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
  },

  fundName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },

  category: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },

  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  returns: {
    fontSize: 14,
    fontWeight: '700',
    marginRight: 6,
  },
});