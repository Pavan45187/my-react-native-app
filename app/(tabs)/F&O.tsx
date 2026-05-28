import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Polyline } from 'react-native-svg';

const TEAL = '#2EC4B6';
const { width } = Dimensions.get('window');

/* ── Logo imports ── */
const LOGOS: any = {
  Reliance:    require('../../assets/images/reliance.png'),
  TataMotors:  require('../../assets/images/tatamotors.png'),
  Swiggy:      require('../../assets/images/swiggy.png'),
};

/* ── Commodity image imports ── */
const COMMODITY_IMGS: any = {
  crude:   require('../../assets/images/crude.png'),
  gold:    require('../../assets/images/gold.png'),
  silver:  require('../../assets/images/silver.png'),
  copper:  require('../../assets/images/copper.png'),
  gas:     require('../../assets/images/gas.png'),
};

/* ── Sparkline data ── */
const SPARKLINES: Record<string, number[]> = {
  up1:   [10, 12, 11, 14, 13, 15, 14, 16, 15, 17, 16, 18],
  up2:   [12, 11, 13, 12, 15, 14, 16, 15, 17, 16, 18, 17],
  down1: [18, 16, 17, 14, 16, 13, 15, 12, 14, 11, 13, 10],
};

function buildPoints(data: number[], w = 90, h = 32): string {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  return data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(' ');
}

const Sparkline = ({ trend }: { trend: 'up1' | 'up2' | 'down1' }) => (
  <Svg width={90} height={32}>
    <Polyline
      points={buildPoints(SPARKLINES[trend])}
      fill="none"
      stroke={trend.startsWith('up') ? '#0BAA6B' : '#E53935'}
      strokeWidth={2}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </Svg>
);

/* ── Data ── */
interface TradeItem {
  id: string;
  logoKey: string;
  name: string;
  shares: string;
  price: string;
  change: string;
  up: boolean;
  trend: 'up1' | 'up2' | 'down1';
}

const equityData: TradeItem[] = [
  { id: '1', logoKey: 'Reliance',   name: 'Reliance',    shares: '2 shares',  price: '₹142.65', change: '+ 0.81%', up: true,  trend: 'up1'   },
  { id: '2', logoKey: 'TataMotors', name: 'Tata Motors', shares: '1 share',   price: '₹142.65', change: '+ 0.81%', up: true,  trend: 'up2'   },
  { id: '3', logoKey: 'Swiggy',     name: 'Swiggy',      shares: '10 shares', price: '₹343.01', change: '- 1.07%', up: false, trend: 'down1' },
];

const commoditiesData: TradeItem[] = [
  { id: '1', logoKey: 'copper', name: 'Copper Apr',      shares: '',  price: '₹142.65', change: '+ 0.81%', up: true,  trend: 'up1'   },
  { id: '2', logoKey: 'gas',    name: 'Natural Gas Mar', shares: '',  price: '₹142.65', change: '+ 0.81%', up: true,  trend: 'up2'   },
  { id: '3', logoKey: 'gold',   name: 'Gold Apr',        shares: '',  price: '₹343.01', change: '- 1.07%', up: false, trend: 'down1' },
];

const COMMODITIES_GRID = [
  { key: 'crude',  name: 'Crude Oil',   img: 'crude'  },
  { key: 'gold',   name: 'Gold',        img: 'gold'   },
  { key: 'silver', name: 'Silver',      img: 'silver' },
  { key: 'copper', name: 'Copper',      img: 'copper' },
  { key: 'gas',    name: 'Natural Gas', img: 'gas'    },
];

/* ── Row component ── */
const TradeRow = ({ item, isCommodity }: { item: TradeItem; isCommodity: boolean }) => (
  <View style={styles.row}>
    {/* Logo */}
    <View style={styles.logoCircle}>
      <Image
        source={isCommodity ? COMMODITY_IMGS[item.logoKey] : LOGOS[item.logoKey]}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>

    {/* Name + shares */}
    <View style={styles.rowLeft}>
      <Text style={styles.stockName}>{item.name}</Text>
      {item.shares !== '' && <Text style={styles.sharesText}>{item.shares}</Text>}
    </View>

    {/* Sparkline */}
    <View style={styles.rowCenter}>
      <Sparkline trend={item.trend} />
    </View>

    {/* Price + change */}
    <View style={styles.rowRight}>
      <Text style={styles.priceText}>{item.price}</Text>
      <Text style={{ color: item.up ? '#0BAA6B' : '#E53935', fontWeight: '600', fontSize: 13 }}>
        {item.change}
      </Text>
    </View>
  </View>
);

/* ── Main Screen ── */
export default function FOScreen() {
  const [selectedTab, setSelectedTab] = useState<'Equity' | 'Commodities'>('Equity');
  const data = selectedTab === 'Equity' ? equityData : commoditiesData;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* ── INDICES ── */}
      <View style={styles.indicesRow}>
        <View style={styles.indexCard}>
          <Text style={styles.indexTitle}>BANK NIFTY</Text>
          <Text style={styles.indexValue}>
            52,191.50{'  '}
            <Text style={styles.red}>-16.00 (0.03%)</Text>
          </Text>
        </View>
        <View style={styles.indexCard}>
          <Text style={styles.indexTitle}>NIFTY 50</Text>
          <Text style={styles.indexValue}>
            24,194.50{'  '}
            <Text style={styles.red}>-27.40 (0.11%)</Text>
          </Text>
        </View>
      </View>

      {/* ── PRO RECOMMENDATIONS ── */}
      <TouchableOpacity style={styles.proCard}>
        <View style={styles.proLeft}>
          <View style={styles.proIconBox}>
            <Text style={{ fontSize: 22 }}>📊</Text>
          </View>
          <Text style={styles.proText}>Pro Recommendations</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#aaa" />
      </TouchableOpacity>

      {/* ── TOP TRADED ── */}
      <Text style={styles.sectionTitle}>Top Traded</Text>

      {/* ── TOGGLE ── */}
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, selectedTab === 'Equity' && styles.activeBtn]}
          onPress={() => setSelectedTab('Equity')}
        >
          <Text style={[styles.toggleText, selectedTab === 'Equity' && styles.activeToggleText]}>
            Equity
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleBtn, selectedTab === 'Commodities' && styles.activeBtn]}
          onPress={() => setSelectedTab('Commodities')}
        >
          <Text style={[styles.toggleText, selectedTab === 'Commodities' && styles.activeToggleText]}>
            Commodities
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── LIST ── */}
      <View style={styles.listWrapper}>
        {data.map((item) => (
          <TradeRow key={item.id} item={item} isCommodity={selectedTab === 'Commodities'} />
        ))}
      </View>

      {/* ── SEE MORE ── */}
      <TouchableOpacity style={styles.seeMoreRow}>
        <Text style={styles.seeMoreText}>See more </Text>
        <Ionicons name="chevron-forward" size={14} color="#555" />
      </TouchableOpacity>

      {/* ── COMMODITIES GRID ── */}
      {selectedTab === 'Commodities' && (
        <>
          <View style={styles.commodityHeader}>
            <Text style={styles.commodityTitle}>Commodities</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.commodityRow}>
            {COMMODITIES_GRID.map((item) => (
              <TouchableOpacity key={item.key} style={styles.commodityItem}>
                <Image
                  source={COMMODITY_IMGS[item.img]}
                  style={styles.commodityImage}
                  resizeMode="contain"
                />
                <Text style={styles.commodityName}>{item.name}</Text>
                <Text style={styles.commodityPrice}>₹823.96</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <View style={{ height: 120 }} />
    </ScrollView>
  );
}

/* ── Styles ── */
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
    marginTop: 16,
    marginBottom: 16,
    gap: 12,
  },
  indexCard: {
    flex: 1,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
  },
  indexTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111',
    marginBottom: 6,
  },
  indexValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
  },
  red: {
    color: '#E53935',
    fontWeight: '600',
  },

  /* Pro card */
  proCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  proLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  proIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  proText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },

  /* Section title */
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
    marginBottom: 14,
  },

  /* Toggle */
  toggleRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  toggleBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#DDD',
  },
  activeBtn: {
    borderColor: '#111',
    backgroundColor: '#fff',
  },
  toggleText: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  activeToggleText: {
    color: '#111',
    fontWeight: '700',
  },

  /* List */
  listWrapper: {
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#F5F5F5',
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logo: {
    width: 28,
    height: 28,
  },
  rowLeft: {
    flex: 1,
  },
  stockName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
    marginBottom: 3,
  },
  sharesText: {
    fontSize: 12,
    color: '#888',
  },
  rowCenter: {
    width: 90,
    alignItems: 'center',
  },
  rowRight: {
    alignItems: 'flex-end',
    minWidth: 80,
  },
  priceText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    marginBottom: 3,
  },

  /* See more */
  seeMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  seeMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },

  /* Commodities grid */
  commodityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  commodityTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
  },
  viewAll: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  commodityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commodityItem: {
    alignItems: 'center',
    width: (width - 32) / 5,
  },
  commodityImage: {
    width: 48,
    height: 48,
    marginBottom: 6,
  },
  commodityName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 2,
  },
  commodityPrice: {
    fontSize: 11,
    color: '#888',
    textAlign: 'center',
  },
});