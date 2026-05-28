import React, { useState, useEffect } from 'react';
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
import BottomTabs from '../../components/BottomTabs';

const TEAL = '#2EC4B6';
const GOLD_RATE = 15999.62;
const SILVER_RATE = 105.66;

const QUICK_AMOUNTS = [
  { label: '₹10', value: 10, popular: false },
  { label: '₹50', value: 50, popular: false },
  { label: '₹150', value: 150, popular: false },
  { label: '₹200', value: 200, popular: false },
  { label: '₹250', value: 250, popular: true },
  { label: '₹500', value: 500, popular: false },
];

const QUICK_GRAMS = [
  { label: '0.1g', value: 0.1, popular: false },
  { label: '0.5g', value: 0.5, popular: false },
  { label: '1g', value: 1, popular: false },
  { label: '2g', value: 2, popular: false },
  { label: '5g', value: 5, popular: true },
  { label: '10g', value: 10, popular: false },
];

export default function BuyGoldScreen() {
  const router = useRouter();
  const [buyMode, setBuyMode] = useState<'Rupees' | 'Grams'>('Rupees');
  const [inputValue, setInputValue] = useState('20000');
  const [seconds, setSeconds] = useState(299); // 4:59

  /* ── countdown timer ── */
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timerStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')} min`;

  /* ── computed conversion ── */
  const numVal = parseFloat(inputValue) || 0;
  const converted =
    buyMode === 'Rupees'
      ? `${(numVal / GOLD_RATE).toFixed(4)} g`
      : `₹${(numVal * GOLD_RATE).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

  const showMinWarning = buyMode === 'Rupees' && numVal > 0 && numVal < 10;

  const handleQuickSelect = (val: number) => {
    setInputValue(String(val));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F6F9' }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
          <Text style={styles.heroBig}>BUY 24K GOLD</Text>

          {/* Rate row */}
          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>Market Buy Rate</Text>
            <View style={styles.rateDot} />
            <Text style={styles.rateValue}>₹15,999.62/g</Text>
          </View>

          {/* Timer */}
          <View style={styles.timerRow}>
            <Text style={styles.timerLabel}>Price valid for </Text>
            <Ionicons name="time-outline" size={14} color={TEAL} />
            <Text style={styles.timerValue}> {timerStr}</Text>
          </View>
        </View>

        {/* ── BUY MODE TOGGLE ── */}
        <View style={styles.modeToggle}>
          <TouchableOpacity
            style={[styles.modeBtn, buyMode === 'Rupees' && styles.modeBtnActive]}
            onPress={() => { setBuyMode('Rupees'); setInputValue('20000'); }}
          >
            <Text style={[styles.modeBtnText, buyMode === 'Rupees' && styles.modeBtnTextActive]}>
              Buy in Rupees
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeBtn, buyMode === 'Grams' && styles.modeBtnActive]}
            onPress={() => { setBuyMode('Grams'); setInputValue('1'); }}
          >
            <Text style={[styles.modeBtnText, buyMode === 'Grams' && styles.modeBtnTextActive]}>
              Buy in Grams
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── INPUT CARD ── */}
        <View style={styles.inputCard}>
          <View style={styles.inputRow}>
            {/* Left: currency/unit + input */}
            <View style={styles.inputLeft}>
              <Text style={styles.currencySymbol}>
                {buyMode === 'Rupees' ? '₹' : 'g'}
              </Text>
              <TextInput
                style={styles.amountInput}
                value={inputValue}
                onChangeText={setInputValue}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>

            {/* Right: converted value */}
            <View style={styles.convertedBadge}>
              <Text style={{ fontSize: 14 }}>🪙</Text>
              <Text style={styles.convertedText}>{converted}</Text>
            </View>
          </View>

          {/* Warning */}
          {showMinWarning && (
            <Text style={styles.warningText}>Minimum amount allowed is ₹10</Text>
          )}
        </View>

        {/* ── QUICK SELECT GRID ── */}
        <View style={styles.quickGrid}>
          {(buyMode === 'Rupees' ? QUICK_AMOUNTS : QUICK_GRAMS).map((item) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.quickPill,
                String(item.value) === inputValue && styles.quickPillActive,
              ]}
              onPress={() => handleQuickSelect(item.value)}
            >
              <Text style={[
                styles.quickPillText,
                String(item.value) === inputValue && styles.quickPillTextActive,
              ]}>
                {item.label}
              </Text>
              {item.popular && (
                <Text style={styles.popularTag}>★ Popular</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flex: 1, minHeight: 60 }} />

        {/* ── CONTINUE BUTTON ── */}
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() =>
            router.push({
              pathname: '/feature/ordersummary',
              params: {
                metal: 'gold',
                mode: buyMode,
                value: inputValue,
              },
            })
          }
        >
          <Text style={styles.continueBtnText}>Continue</Text>
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
    backgroundColor: '#F5F6F9',
    paddingHorizontal: 16,
  },

  /* Header */
  header: {
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

  /* Hero */
  heroSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heroSub: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  heroBig: {
    fontSize: 30,
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
    fontSize: 13,
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
    fontSize: 13,
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

  /* Mode toggle */
  modeToggle: {
    flexDirection: 'row',
    backgroundColor: '#E6F9F7',
    borderRadius: 30,
    padding: 4,
    marginBottom: 16,
  },
  modeBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 26,
    alignItems: 'center',
  },
  modeBtnActive: {
    backgroundColor: TEAL,
  },
  modeBtnText: {
    fontSize: 14,
    color: TEAL,
    fontWeight: '600',
  },
  modeBtnTextActive: {
    color: '#fff',
  },

  /* Input card */
  inputCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: TEAL,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  currencySymbol: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111',
    marginRight: 4,
  },
  amountInput: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111',
    flex: 1,
    padding: 0,
  },
  convertedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
    marginLeft: 8,
  },
  convertedText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#795548',
  },
  warningText: {
    marginTop: 8,
    fontSize: 12,
    color: '#E53935',
    fontWeight: '500',
  },

  /* Quick grid */
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
    justifyContent: 'flex-start',
  },
  quickPill: {
    width: '30%',
    borderWidth: 1.5,
    borderColor: TEAL,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  quickPillActive: {
    backgroundColor: TEAL,
  },
  quickPillText: {
    fontSize: 15,
    fontWeight: '700',
    color: TEAL,
  },
  quickPillTextActive: {
    color: '#fff',
  },
  popularTag: {
    fontSize: 10,
    color: TEAL,
    fontWeight: '600',
    marginTop: 2,
  },

  /* Continue */
  continueBtn: {
    backgroundColor: TEAL,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 24,
  },
  continueBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});