import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import BottomTabs from '../../components/BottomTabs';

const TEAL = '#2EC4B6';
const MARKET_PRICE = 9092.3;
const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 32;
const CHART_HEIGHT = 200;

const CHART_DATA: Record<string, number[]> = {
  '1M': [30, 28, 45, 40, 55, 48, 62, 58, 70, 66, 75, 72, 80, 78, 88, 84, 95, 91, 105, 110],
  '3M': [20, 28, 25, 40, 36, 52, 46, 60, 55, 70, 65, 80, 75, 90, 85, 98, 93, 108, 103, 118],
  '6M': [15, 22, 20, 35, 30, 46, 42, 57, 53, 67, 63, 77, 73, 87, 83, 96, 92, 106, 102, 120],
  '1Y': [10, 18, 15, 30, 26, 42, 38, 54, 50, 64, 60, 75, 71, 85, 81, 95, 91, 107, 103, 122],
};

const XLABELS: Record<string, [string, string]> = {
  '1M': ['FEB', 'MAR'],
  '3M': ['JAN', 'MAR'],
  '6M': ['OCT', 'MAR'],
  '1Y': ['MAR 24', 'MAR 25'],
};

const PERFORMANCE: Record<string, string> = {
  '1M': '4.51%',
  '3M': '7.83%',
  '6M': '6.20%',
  '1Y': '11.34%',
};

function buildPath(data: number[]): { line: string; area: string } {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const padding = 10;

  const points = data.map((val, i) => ({
    x: (i / (data.length - 1)) * CHART_WIDTH,
    y: CHART_HEIGHT - padding - ((val - min) / range) * (CHART_HEIGHT - padding * 2),
  }));

  let line = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpX = (prev.x + curr.x) / 2;
    line += ` C ${cpX} ${prev.y} ${cpX} ${curr.y} ${curr.x} ${curr.y}`;
  }

  const area =
    line +
    ` L ${points[points.length - 1].x} ${CHART_HEIGHT}` +
    ` L ${points[0].x} ${CHART_HEIGHT} Z`;

  return { line, area };
}

export default function SetPriceAlertSilverScreen() {
  const router = useRouter();
  const [targetPrice, setTargetPrice] = useState(String(MARKET_PRICE));
  const [notifyMode, setNotifyMode] = useState<'Once' | 'Everyday'>('Once');
  const [activeTab, setActiveTab] = useState('1M');

  const numTarget = parseFloat(targetPrice) || 0;
  const diff = numTarget - MARKET_PRICE;
  const pct = MARKET_PRICE > 0 ? ((diff / MARKET_PRICE) * 100).toFixed(1) : '0.0';
  const absPct = Math.abs(parseFloat(pct));
  const direction = diff >= 0 ? 'above' : 'below';

  const data = CHART_DATA[activeTab];
  const { line, area } = buildPath(data);
  const [xStart, xEnd] = XLABELS[activeTab];

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 190 }}
      >
        {/* ── HEADER ── */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        {/* ── TARGET PRICE INPUT ── */}
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Target Price</Text>

          <View style={styles.priceInputRow}>
            <Text style={styles.rupeeSymbol}>₹</Text>
            <TextInput
              style={styles.priceInput}
              value={targetPrice}
              onChangeText={setTargetPrice}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>

          <View style={styles.priceDivider} />

          <Text style={styles.pctLabel}>
            {absPct}% {direction} the mkt price
          </Text>
        </View>

        {/* ── NOTIFY OPTIONS ── */}
        <View style={styles.notifySection}>
          <View style={styles.notifyTitleRow}>
            <Ionicons name="notifications-outline" size={22} color="#333" />
            <Text style={styles.notifyTitle}>Notify :</Text>
          </View>

          <View style={styles.notifyPills}>
            <TouchableOpacity
              style={[styles.notifyPill, notifyMode === 'Once' && styles.notifyPillActive]}
              onPress={() => setNotifyMode('Once')}
            >
              <Ionicons
                name="refresh-circle-outline"
                size={16}
                color={notifyMode === 'Once' ? TEAL : '#aaa'}
              />
              <Text style={[
                styles.notifyPillText,
                notifyMode === 'Once' && styles.notifyPillTextActive,
              ]}>
                Once
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.notifyPill, notifyMode === 'Everyday' && styles.notifyPillActive]}
              onPress={() => setNotifyMode('Everyday')}
            >
              <Ionicons
                name="calendar-outline"
                size={16}
                color={notifyMode === 'Everyday' ? TEAL : '#aaa'}
              />
              <Text style={[
                styles.notifyPillText,
                notifyMode === 'Everyday' && styles.notifyPillTextActive,
              ]}>
                Everyday
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── STATS ROW ── */}
        <View style={styles.statsRow}>
          <View>
            <Text style={styles.statLabel}>Performance in {activeTab}</Text>
            <View style={[styles.statBadge, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="caret-up" size={12} color="#2E7D32" />
              <Text style={[styles.statBadgeText, { color: '#2E7D32' }]}>
                {PERFORMANCE[activeTab]}
              </Text>
            </View>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.statLabel}>Live Price</Text>
            {/* Silver badge — gray */}
            <View style={[styles.statBadge, { backgroundColor: '#F0F0F0' }]}>
              <Text style={{ fontSize: 14 }}>🪨</Text>
              <Text style={[styles.statBadgeText, { color: '#555' }]}>
                ₹{MARKET_PRICE}/gm
              </Text>
            </View>
          </View>
        </View>

        {/* ── SILVER CHART ── */}
        <View style={styles.chartWrapper}>
          <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
            <Defs>
              <LinearGradient id="silverGradAlert" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor="#C0C0C0" stopOpacity="0.8" />
                <Stop offset="100%" stopColor="#C0C0C0" stopOpacity="0.05" />
              </LinearGradient>
            </Defs>
            <Path d={area} fill="url(#silverGradAlert)" />
            <Path
              d={line}
              fill="none"
              stroke="#A8A8A8"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>

          <View style={styles.xLabels}>
            <Text style={styles.xLabel}>{xStart}</Text>
            <Text style={styles.xLabel}>{xEnd}</Text>
          </View>
        </View>

        {/* ── TIME TABS ── */}
        <View style={styles.tabsRow}>
          {(['1M', '3M', '6M', '1Y'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabPill, activeTab === tab && styles.tabPillActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ── SET ALERT BUTTON (Shifted above tabs) ── */}
      <View style={[styles.footer, { bottom: 70, paddingBottom: 16 }]}>
        <TouchableOpacity style={styles.alertBtn}>
          <Text style={styles.alertBtnText}>SET ALERT</Text>
        </TouchableOpacity>
      </View>

      <BottomTabs
        selected="Metals"
        onSelect={(tab) => router.push({ pathname: '/(tabs)', params: { tab } })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /* Header */
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Target price */
  priceSection: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 24,
  },
  priceLabel: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
    marginBottom: 16,
  },
  priceInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rupeeSymbol: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111',
    marginRight: 2,
  },
  priceInput: {
    fontSize: 36,
    fontWeight: '700',
    color: '#111',
    minWidth: 120,
    padding: 0,
    textAlign: 'center',
  },
  priceDivider: {
    width: width * 0.65,
    height: 1.5,
    backgroundColor: '#111',
    marginTop: 6,
    marginBottom: 10,
  },
  pctLabel: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },

  /* Notify */
  notifySection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  notifyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  notifyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  notifyPills: {
    flexDirection: 'row',
    gap: 12,
  },
  notifyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  notifyPillActive: {
    borderColor: TEAL,
    backgroundColor: '#E6F9F7',
  },
  notifyPillText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#aaa',
  },
  notifyPillTextActive: {
    color: TEAL,
  },

  /* Stats */
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 6,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
  },
  statBadgeText: {
    fontSize: 14,
    fontWeight: '700',
  },

  /* Chart */
  chartWrapper: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  xLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  xLabel: {
    fontSize: 12,
    color: '#aaa',
    fontWeight: '500',
  },

  /* Time tabs */
  tabsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  tabPill: {
    borderWidth: 1.5,
    borderColor: TEAL,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 7,
  },
  tabPillActive: {
    backgroundColor: TEAL,
  },
  tabText: {
    fontSize: 14,
    color: TEAL,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
  },

  /* Footer */
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#F0F0F0',
  },
  alertBtn: {
    backgroundColor: TEAL,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
  },
  alertBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
});