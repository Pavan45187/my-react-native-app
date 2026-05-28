import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const TEAL = '#2EC4B6';

const LOGOS: any = {
  Reliance:     require('../../assets/images/reliance.png'),
  'Tata Motors': require('../../assets/images/tatamotors.png'),
  TMCV:         require('../../assets/images/tatamotors.png'),
  Swiggy:       require('../../assets/images/swiggy.png'),
};

/* ── Data ── */
const RECENTLY_VIEWED = [
  { key: 'Reliance',    label: 'Reliance',    logo: 'Reliance',     change: '7.83%' },
  { key: 'TMCV1',      label: 'TMCV',        logo: 'Tata Motors',  change: '7.83%' },
  { key: 'Swiggy',     label: 'Swiggy',      logo: 'Swiggy',       change: '7.83%' },
  { key: 'Reliance2',  label: 'Reliance',    logo: 'Reliance',     change: '7.83%' },
  { key: 'TMCV2',      label: 'TMCV',        logo: 'Tata Motors',  change: '7.83%' },
];

const MOVERS = [
  { name: 'Reliance',    logo: 'Reliance',    price: '₹823.96', change: '+59.80 (7.83%)' },
  { name: 'Swiggy',     logo: 'Swiggy',      price: '₹105.90', change: '+5.82 (3.87%)'  },
  { name: 'Tata Motors',logo: 'Tata Motors', price: '₹159.65', change: '+9.80 (2.83%)'  },
];

const MOST_TRADED = [
  { name: 'Reliance Industries',  logo: 'Reliance',    price: '₹823.96', change: '+59.80 (7.83%)' },
  { name: 'Reliance Industries',  logo: 'Tata Motors', price: '₹823.96', change: '+59.80 (7.83%)' },
  { name: 'Reliance Industries',  logo: 'Tata Motors', price: '₹823.96', change: '+59.80 (7.83%)' },
];

const SEE_MORE_LOGOS = ['Swiggy', 'Reliance', 'Reliance', 'Tata Motors'];

export default function StocksScreen() {
  const [cap, setCap]   = useState('Large');
  const [type, setType] = useState('Gainers');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* ── INDICES ── */}
      <View style={styles.indicesRow}>
        <View style={styles.indexCard}>
          <Text style={styles.indexTitle}>BANK NIFTY</Text>
          <Text style={styles.indexValue}>
            52,191.50{'  '}
            <Text style={styles.negative}>-16.00 (0.03%)</Text>
          </Text>
        </View>
        <View style={styles.indexCard}>
          <Text style={styles.indexTitle}>NIFTY 50</Text>
          <Text style={styles.indexValue}>
            24,194.50{'  '}
            <Text style={styles.negative}>-27.40 (0.11%)</Text>
          </Text>
        </View>
      </View>

      {/* ── RECENTLY VIEWED ── */}
      <Text style={styles.sectionTitle}>Recently Viewed</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
        {RECENTLY_VIEWED.map((item) => (
          <TouchableOpacity key={item.key} style={styles.recentItem}>
            <View style={styles.logoCircle}>
              <Image source={LOGOS[item.logo]} style={styles.logo} />
            </View>
            <Text style={styles.recentName}>{item.label}</Text>
            <Text style={styles.positive}>{item.change}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ── TOP MOVERS ── */}
      <View style={styles.topRow}>
        <Text style={styles.sectionTitle}>Top Movers</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleBtn, type === 'Gainers' && styles.activeToggle]}
            onPress={() => setType('Gainers')}
          >
            <Text style={[styles.toggleText, type === 'Gainers' && styles.activeToggleText]}>
              Gainers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, type === 'Losers' && styles.activeToggle]}
            onPress={() => setType('Losers')}
          >
            <Text style={[styles.toggleText, type === 'Losers' && styles.activeToggleText]}>
              Loosers
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── CAP FILTER ── */}
      <View style={styles.capRow}>
        {['Large', 'Mid', 'Small'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.capBtn, cap === item && styles.activeCap]}
            onPress={() => setCap(item)}
          >
            <Text style={[styles.capText, cap === item && styles.activeCapText]}>
              {item} Cap
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── MOVER CARDS ── */}
      <View style={styles.moverGrid}>
        {MOVERS.map((item, i) => (
          <View key={i} style={styles.moverCard}>
            <View style={styles.moverLogoCircle}>
              <Image source={LOGOS[item.logo]} style={styles.moverLogo} />
            </View>
            <Text style={styles.moverName}>{item.name}</Text>
            <Text style={styles.moverPrice}>{item.price}</Text>
            <Text style={styles.positive}>{item.change}</Text>
          </View>
        ))}
      </View>

      {/* ── SEE MORE ── */}
      <TouchableOpacity style={styles.seeMoreRow}>
        <Text style={styles.seeMoreText}>See more </Text>
        <View style={styles.seeMoreCircle}>
          <Text style={styles.seeMorePlus}>+</Text>
        </View>
      </TouchableOpacity>

      {/* ── MOST TRADED ── */}
      <Text style={styles.sectionTitle}>Most Traded on Credora</Text>

      <View style={styles.tradeGrid}>
        {/* Regular trade cards */}
        {MOST_TRADED.map((item, i) => (
          <View key={i} style={styles.tradeCard}>
            <View style={styles.tradeLogoCircle}>
              <Image source={LOGOS[item.logo]} style={styles.tradeLogo} />
            </View>
            <Text style={styles.tradeName}>{item.name}</Text>
            <Text style={styles.tradePrice}>{item.price}</Text>
            <Text style={styles.positive}>{item.change}</Text>
          </View>
        ))}

        {/* See more card — 2x2 logos + label */}
        <View style={styles.tradeCard}>
          <View style={styles.miniLogoGrid}>
            {SEE_MORE_LOGOS.map((logo, i) => (
              <View key={i} style={styles.miniLogoCircle}>
                <Image source={LOGOS[logo]} style={styles.miniLogo} />
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.seeMoreTrade}>
            <Text style={styles.seeMoreTradeText}>See more  &gt;</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 120 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },

  /* Indices */
  indicesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    gap: 12,
  },
  indexCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 12,
  },
  indexTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111',
    marginBottom: 6,
  },
  indexValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111',
  },

  /* Section title */
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
    marginTop: 16,
    marginBottom: 12,
  },

  /* Recently viewed */
  recentItem: {
    alignItems: 'center',
    marginRight: 24,
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  recentName: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },

  /* Top movers header */
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  toggleRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 20,
    overflow: 'hidden',
  },
  toggleBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  activeToggle: {
    backgroundColor: '#111',
    borderRadius: 20,
  },
  toggleText: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
  },
  activeToggleText: {
    color: '#fff',
    fontWeight: '700',
  },

  /* Cap filter */
  capRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
    marginBottom: 16,
  },
  capBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#DDD',
  },
  activeCap: {
    borderColor: '#111',
    backgroundColor: '#fff',
  },
  capText: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
  },
  activeCapText: {
    color: '#111',
    fontWeight: '700',
  },

  /* Mover cards */
  moverGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  moverCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
  },
  moverLogoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  moverLogo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  moverName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginBottom: 4,
  },
  moverPrice: {
    fontSize: 13,
    color: '#333',
    marginBottom: 4,
  },

  /* See more */
  seeMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 12,
    marginBottom: 4,
    gap: 4,
  },
  seeMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  seeMoreCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seeMorePlus: {
    fontSize: 13,
    color: '#555',
    lineHeight: 16,
  },

  /* Most Traded grid */
  tradeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  tradeCard: {
    width: (width - 44) / 2,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 16,
    padding: 14,
    justifyContent: 'flex-end',
    minHeight: 140,
  },
  tradeLogoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  tradeLogo: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  tradeName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  tradePrice: {
    fontSize: 13,
    color: '#333',
    marginBottom: 4,
  },

  /* See more card */
  miniLogoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  miniLogoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniLogo: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  seeMoreTrade: {
    marginTop: 4,
  },
  seeMoreTradeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },

  /* Shared */
  positive: {
    color: '#0BAA6B',
    fontWeight: '600',
    fontSize: 13,
  },
  negative: {
    color: '#E53935',
    fontWeight: '600',
  },
});