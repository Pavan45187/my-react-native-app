import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import BottomTabs from '../../components/BottomTabs';

const TEAL = '#2EC4B6';
const GOLD_RATE = 15999.62;
const SILVER_RATE = 265.62;
const GST_RATE = 0.03;

export default function OrderSummaryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  /* ── Params passed from buygold / buysilver ── */
  const metal = (params.metal as string) || 'gold';
  const mode = (params.mode as string) || 'Rupees';
  const inputValue = parseFloat((params.value as string) || '20000');

  const isGold = metal === 'gold';
  const rate = isGold ? GOLD_RATE : SILVER_RATE;
  const metalLabel = isGold ? '24K GOLD' : '999 SILVER';
  const quantityLabel = isGold ? 'Gold Quantity' : 'Silver Quantity';
  const valueLabel = isGold ? 'Gold Value' : 'Silver Value';

  /* ── Compute quantities and amounts ── */
  const grams = mode === 'Rupees' ? inputValue / rate : inputValue;
  const metalValue = grams * rate;
  const gst = metalValue * GST_RATE;
  const amountPayable = metalValue + gst;

  /* ── Countdown timer ── */
  const [seconds, setSeconds] = useState(299);
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timerStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')} min`;

  /* ── Format helpers ── */
  const fmtINR = (val: number) =>
    val.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  /* ── Summary row component ── */
  const SummaryRow = ({
    label,
    value,
    highlight = false,
    dashed = false,
  }: {
    label: string;
    value: string;
    highlight?: boolean;
    dashed?: boolean;
  }) => (
    <>
      {dashed && <View style={styles.dashedLine} />}
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>{label}</Text>
        <Text style={[styles.summaryValue, highlight && styles.summaryValueHighlight]}>
          {value}
        </Text>
      </View>
    </>
  );

  /* ── Summary card ── */
  const SummaryCard = () => (
    <View style={styles.summaryCard}>
      <SummaryRow
        label={quantityLabel}
        value={`${grams.toFixed(4)}gm`}
      />
      <SummaryRow
        label={valueLabel}
        value={`₹${fmtINR(metalValue)}`}
      />
      <SummaryRow
        label="GST (3%)"
        value={`₹${fmtINR(gst)}`}
      />
      <SummaryRow
        label="Amount Payable"
        value={`₹${fmtINR(amountPayable)}`}
        highlight
        dashed
      />
    </View>
  );

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 190 }}
      >

        {/* ── HEADER ── */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        {/* ── HERO ── */}
        <View style={styles.heroSection}>
          <Text style={styles.heroSub}>Why waiting?</Text>
          <Text style={styles.heroBig}>BUY {metalLabel}</Text>

          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>Market Buy Rate</Text>
            <View style={styles.rateDot} />
            <Text style={styles.rateValue}>
              ₹{fmtINR(rate)}/g
            </Text>
          </View>

          <View style={styles.timerRow}>
            <Text style={styles.timerLabel}>Price valid for </Text>
            <Ionicons name="time-outline" size={14} color={TEAL} />
            <Text style={styles.timerValue}> {timerStr}</Text>
          </View>
        </View>

        {/* ── SUMMARY SECTION 1 ── */}
        <Text style={styles.sectionTitle}>Summary</Text>
        <SummaryCard />

        {/* ── SUMMARY SECTION 2 ── */}
        <Text style={styles.sectionTitle}>Summary</Text>
        <SummaryCard />

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ── BUY NOW BUTTON (Positioned above tabs) ── */}
      <View style={[styles.footer, { bottom: 70, paddingBottom: 16 }]}>
        <TouchableOpacity style={styles.buyNowBtn}>
          <Text style={styles.buyNowBtnText}>Buy Now</Text>
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
    marginBottom: 8,
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

  /* Hero */
  heroSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  heroSub: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  heroBig: {
    fontSize: 32,
    fontWeight: '800',
    color: TEAL,
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  rateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  rateLabel: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  rateDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#E53935',
  },
  rateValue: {
    fontSize: 14,
    color: '#E53935',
    fontWeight: '700',
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerLabel: {
    fontSize: 12,
    color: '#888',
  },
  timerValue: {
    fontSize: 12,
    color: TEAL,
    fontWeight: '700',
  },

  /* Section title */
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  /* Summary card */
  summaryCard: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 20,
    gap: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 15,
    color: '#555',
    fontWeight: '400',
  },
  summaryValue: {
    fontSize: 15,
    color: '#111',
    fontWeight: '500',
  },
  summaryValueHighlight: {
    color: TEAL,
    fontWeight: '700',
    fontSize: 16,
  },
  dashedLine: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 1,
    marginVertical: 2,
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
  buyNowBtn: {
    backgroundColor: TEAL,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
  },
  buyNowBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});