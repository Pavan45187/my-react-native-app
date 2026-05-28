import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image, // Included for both the portfolio icon and sparklines
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TEAL = '#2EC4B6';

/* ── Types ── */
interface HoldingItem {
  id: string;
  name: string;
  shares: string;
  current: string;
  invested: string;
  isPositive: boolean;
}

/* ── Data ── */
const HOLDINGS_DATA: HoldingItem[] = [
  { id: '1', name: 'Tata Motors Passenger', shares: '2 shares',      current: '₹799.50',     invested: '₹806.00',    isPositive: false },
  { id: '2', name: 'Artemis Medicare',      shares: '1 shares',      current: '₹242.50',     invested: '₹306.93',    isPositive: false },
  { id: '3', name: 'INOX Wind',             shares: '1 shares',      current: '₹859.50',     invested: '₹806.00',    isPositive: true  },
  { id: '4', name: 'Likhitha Infra',        shares: '1 shares',      current: '₹242.50',     invested: '₹306.93',    isPositive: false },
  { id: '5', name: 'Gold 24K Physical',     shares: '1.5147 Grams',  current: '₹20,160.19',  invested: '₹18,937.28', isPositive: true  },
  { id: '6', name: 'Silver 999 physical',   shares: '0.2402 Grams',  current: '₹42.94',      invested: '₹43.72',     isPositive: false },
];

/* ── Row item ── */
const HoldingRow = ({ item }: { item: HoldingItem }) => (
  <View style={styles.row}>
    {/* Left */}
    <View style={styles.rowLeft}>
      <Text style={styles.stockName}>{item.name}</Text>
      <Text style={styles.shares}>{item.shares}</Text>
    </View>

    {/* Replaced SVG with your static graph asset */}
    <View style={styles.rowCenter}>
      <Image 
        source={require('../../assets/images/graph1.jpg')} 
        style={styles.sparklineImage} 
      />
    </View>

    {/* Right */}
    <View style={styles.rowRight}>
      <Text style={[styles.currentPrice, { color: item.isPositive ? TEAL : '#E53935' }]}>
        {item.current}
      </Text>
      <Text style={styles.investedPrice}>({item.invested})</Text>
    </View>
  </View>
);

/* ── Main Screen ── */
export default function Holdings() {
  const [hideAmount, setHideAmount] = useState(false);

  const mask = (val: string) => (hideAmount ? '₹ ••••••' : val);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* ── SUMMARY CARD ── */}
        <View style={styles.summaryCard}>

          {/* Title + eye icon */}
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>HOLDINGS ({HOLDINGS_DATA.length})</Text>
            <TouchableOpacity onPress={() => setHideAmount((v) => !v)}>
              <View style={styles.eyeBtn}>
                <Ionicons
                  name={hideAmount ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#555"
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Total amount */}
          <Text style={styles.totalAmount}>{mask('₹1,418.42')}</Text>

          <View style={styles.summaryDivider} />

          {/* Returns rows */}
          <View style={styles.returnsRow}>
            <Text style={styles.returnLabel}>1D returns</Text>
            <Text style={[styles.returnValue, { color: TEAL }]}>+7.36 (0.52%)</Text>
          </View>

          <View style={styles.returnsRow}>
            <Text style={styles.returnLabel}>Total returns</Text>
            <Text style={[styles.returnValue, { color: '#E53935' }]}>-₹159.90 (10.13%)</Text>
          </View>

          <View style={styles.returnsRow}>
            <Text style={styles.returnLabel}>Invested</Text>
            <Text style={[styles.returnValue, { color: '#111' }]}>₹1,578.32</Text>
          </View>

          <View style={styles.summaryDivider} />

          {/* Portfolio analysis */}
          <TouchableOpacity style={styles.analysisRow}>
            <Image 
              source={require('../../assets/images/analysis-icon.png')} 
              style={styles.analysisIcon} 
            />
            <Text style={styles.analysisText}>Portfolio analysis</Text>
          </TouchableOpacity>
        </View>

        {/* ── SORT / COLUMN HEADER ── */}
        <View style={styles.sortRow}>
          <TouchableOpacity style={styles.sortBtn}>
            <Text style={styles.sortText}>Sort</Text>
            <Ionicons name="filter-outline" size={16} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.columnBtn}>
            <Text style={styles.columnText}>&lt;&gt; Current (Invested)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sortDivider} />

        {/* ── HOLDINGS LIST ── */}
        <FlatList
          data={HOLDINGS_DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HoldingRow item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ItemSeparatorComponent={() => <View style={styles.rowDivider} />}
        />
      </View>
    </SafeAreaView>
  );
}

/* ── Styles ── */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },

  /* Summary card */
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    padding: 16,
    marginTop: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    letterSpacing: 0.5,
  },
  eyeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalAmount: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111',
    marginBottom: 12,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
  },
  returnsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  returnLabel: {
    fontSize: 14,
    color: '#777',
  },
  returnValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  analysisRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingTop: 4,
  },
  analysisIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: TEAL,
  },
  analysisText: {
    fontSize: 15,
    fontWeight: '600',
    color: TEAL,
  },

  /* Sort row */
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  columnBtn: {},
  columnText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  sortDivider: {
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    marginBottom: 4,
  },

  /* Holding rows */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  rowLeft: {
    flex: 1.2,
  },
  stockName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },
  shares: {
    fontSize: 12,
    color: '#888',
  },
  rowCenter: {
    flex: 1,
    alignItems: 'center',
  },
  /* Styled layout sizes for your custom chart image */
  sparklineImage: {
    width: 80,
    height: 35,
    resizeMode: 'contain',
  },
  rowRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  currentPrice: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 3,
  },
  investedPrice: {
    fontSize: 12,
    color: '#888',
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#F5F5F5',
  },
});