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

// --- Types ---
interface WatchlistItem {
  id: string;
  name: string;
  count: number;
  change: string;
}

// --- Mock Data ---
const WATCHLISTS_DATA: WatchlistItem[] = [
  { id: '1', name: 'Primary Watchlist', count: 15, change: '+0.52%' },
  { id: '2', name: 'Nifty 50', count: 50, change: '-0.15%' },
  { id: '3', name: 'Long Term Picks', count: 8, change: '+1.88%' },
  { id: '4', name: 'F&O Stocks', count: 12, change: '+0.01%' },
];

// --- Card ---
const WatchlistCard = ({ item }: { item: WatchlistItem }) => {
  const isPositive = item.change.startsWith('+');
  const colorStyle = isPositive ? styles.greenText : styles.redText;

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardLeft}>
        <Text style={styles.watchlistName}>{item.name}</Text>
        <Text style={styles.watchlistCount}>{item.count} stocks</Text>
      </View>

      <View style={styles.cardRight}>
        <Text style={[styles.watchlistChange, colorStyle]}>
          {item.change}
        </Text>
        <Ionicons
          name="chevron-forward-outline"
          size={20}
          color="#999"
        />
      </View>
    </TouchableOpacity>
  );
};

// --- Main Screen ---
export default function Watchlist() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={styles.mainTitle}>
            {WATCHLISTS_DATA.length} Watchlists
          </Text>

          <TouchableOpacity style={styles.addButton}>
            <Ionicons
              name="add-circle-outline"
              size={26}
              color="#00A676"
            />
          </TouchableOpacity>
        </View>

        {/* List */}
        <FlatList
          data={WATCHLISTS_DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <WatchlistCard item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
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
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  addButton: {
    padding: 5,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
  },
  cardLeft: {
    flex: 1,
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  watchlistName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  watchlistCount: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
  watchlistChange: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 10,
  },
  greenText: {
    color: '#00A676',
  },
  redText: {
    color: '#E74C3C',
  },
});