import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomTabs from '../../components/BottomTabs';

const TEAL = '#2EC4B6';

const FUTURES = [
  { symbol: 'NIFTY 29 MAY FUT', price: '22,450.60', change: '+0.88%', up: true },
  { symbol: 'BANKNIFTY 29 MAY FUT', price: '48,120.30', change: '+1.12%', up: true },
  { symbol: 'RELIANCE 29 MAY FUT', price: '2,912.40', change: '-0.45%', up: false },
  { symbol: 'TCS 29 MAY FUT', price: '3,850.15', change: '+0.15%', up: true },
  { symbol: 'INFY 29 MAY FUT', price: '1,425.80', change: '-1.25%', up: false },
];

export default function FuturesScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Hero */}
        <View style={styles.heroSection}>
          <Text style={styles.heroSub}>Derivative Trading</Text>
          <Text style={styles.heroBig}>FUTURES</Text>
          <Text style={styles.heroDesc}>
            Trade index and stock futures with leverage, premium real-time charts, and fast execution.
          </Text>
        </View>

        {/* Futures List */}
        <View style={styles.listCard}>
          {FUTURES.map((f, index) => (
            <View key={f.symbol}>
              {index > 0 && <View style={styles.divider} />}
              <View style={styles.itemRow}>
                <View>
                  <Text style={styles.itemName}>{f.symbol}</Text>
                  <Text style={styles.itemSub}>Futures Contract</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.itemPrice}>{f.price}</Text>
                  <View style={[styles.badge, { backgroundColor: f.up ? '#E8F5E9' : '#FFEBEE' }]}>
                    <Text style={[styles.badgeText, { color: f.up ? '#2E7D32' : '#C62828' }]}>
                      {f.change}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomTabs
        selected="Home"
        onSelect={(tab) => router.push({ pathname: '/(tabs)', params: { tab } })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F6F9',
  },
  header: {
    paddingHorizontal: 16,
    marginTop: 50,
    marginBottom: 10,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 24,
  },
  heroSub: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    marginBottom: 6,
  },
  heroBig: {
    fontSize: 28,
    fontWeight: '800',
    color: TEAL,
    marginBottom: 12,
  },
  heroDesc: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
  listCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  itemSub: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
});
