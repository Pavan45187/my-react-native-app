import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import BottomTabs from '../../components/BottomTabs';

const TEAL = '#2EC4B6';
const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 32;
const CHART_HEIGHT = 200;

const CHART_DATA: Record<string, number[]> = {
  '1M': [40, 38, 52, 48, 60, 55, 68, 62, 74, 70, 80, 76, 85, 82, 90, 88, 95, 93, 100, 105],
  '3M': [30, 35, 33, 48, 44, 58, 53, 66, 61, 74, 70, 82, 78, 90, 86, 98, 94, 106, 102, 115],
  '6M': [20, 28, 25, 40, 36, 50, 46, 60, 56, 70, 66, 79, 75, 88, 84, 97, 93, 106, 102, 118],
  '1Y': [10, 20, 18, 32, 28, 44, 40, 55, 51, 66, 62, 76, 72, 86, 82, 96, 92, 108, 104, 120],
};

const XLABELS: Record<string, [string, string]> = {
  '1M': ['FEB', 'MAR'],
  '3M': ['JAN', 'MAR'],
  '6M': ['OCT', 'MAR'],
  '1Y': ['MAR 24', 'MAR 25'],
};

const PERFORMANCE: Record<string, { value: string; up: boolean }> = {
  '1M': { value: '4.51%', up: true },
  '3M': { value: '7.83%', up: true },
  '6M': { value: '6.20%', up: true },
  '1Y': { value: '11.34%', up: true },
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

export default function SilverDetailScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('1M');

  const data = CHART_DATA[activeTab];
  const { line, area } = buildPath(data);
  const perf = PERFORMANCE[activeTab];
  const [xStart, xEnd] = XLABELS[activeTab];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >

        {/* ── HEADER ── */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.alertBtn}
            onPress={() => router.push('/feature/setpricealertsilver')}
          >
            <Ionicons name="notifications-outline" size={18} color="#fff" />
            <Text style={styles.alertText}>Set price alert</Text>
          </TouchableOpacity>
        </View>

        {/* ── HERO TEXT ── */}
        <View style={styles.heroSection}>
          <Text style={styles.heroSub}>Why waiting?</Text>
          <Text style={styles.heroMain}>This is the best time to</Text>
          <Text style={styles.heroBig}>BUY SILVER</Text>
        </View>

        {/* ── STATS ROW ── */}
        <View style={styles.statsRow}>
          <View>
            <Text style={styles.statLabel}>Performance in {activeTab}</Text>
            <View style={[styles.statBadge, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons
                name={perf.up ? 'caret-up' : 'caret-down'}
                size={12}
                color={perf.up ? '#2E7D32' : '#C62828'}
              />
              <Text style={[styles.statBadgeText, { color: perf.up ? '#2E7D32' : '#C62828' }]}>
                {perf.value}
              </Text>
            </View>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.statLabel}>Live Price</Text>
            <View style={[styles.statBadge, { backgroundColor: '#F0F0F0' }]}>
              <Text style={{ fontSize: 14 }}>🪨</Text>
              <Text style={[styles.statBadgeText, { color: '#555' }]}>₹9092.3/gm</Text>
            </View>
          </View>
        </View>

        {/* ── CHART ── */}
        <View style={styles.chartWrapper}>
          <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
            <Defs>
              <LinearGradient id="silverGrad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor="#C0C0C0" stopOpacity="0.8" />
                <Stop offset="100%" stopColor="#C0C0C0" stopOpacity="0.05" />
              </LinearGradient>
            </Defs>

            {/* Filled area */}
            <Path d={area} fill="url(#silverGrad)" />

            {/* Line */}
            <Path
              d={line}
              fill="none"
              stroke="#A8A8A8"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>

          {/* X-axis labels */}
          <View style={styles.xLabels}>
            <Text style={styles.xLabel}>{xStart}</Text>
            <Text style={styles.xLabel}>{xEnd}</Text>
          </View>
        </View>

        {/* ── TIME FILTER TABS ── */}
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

        {/* ── INVEST NOW ── */}
        <TouchableOpacity style={styles.investBtn}>
          <Text style={styles.investBtnText}>INVEST NOW</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
      <BottomTabs
        selected="Metals"
        onSelect={(tab) => router.push({ pathname: '/(tabs)', params: { tab } })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 24,
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
  alertBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TEAL,
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 9,
    gap: 6,
  },
  alertText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  heroSub: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  heroMain: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
  },
  heroBig: {
    fontSize: 36,
    fontWeight: '800',
    color: TEAL,
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
    paddingHorizontal: 4,
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
  chartWrapper: {
    marginBottom: 8,
  },
  xLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    marginTop: 6,
  },
  xLabel: {
    fontSize: 12,
    color: '#aaa',
    fontWeight: '500',
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 20,
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
  investBtn: {
    backgroundColor: TEAL,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 4,
  },
  investBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
});