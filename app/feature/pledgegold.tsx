import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomTabs from '../../components/BottomTabs';

const TEAL = '#2EC4B6';

export default function PledgeGold() {
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

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroSub}>Unlock Instant Liquidity</Text>
          <Text style={styles.heroBig}>PLEDGE MY GOLD</Text>
          <Text style={styles.heroDesc}>
            Get instant funds against your 24K digital gold holdings at the lowest interest rates.
          </Text>
        </View>

        {/* Feature Cards */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="flash-outline" size={24} color={TEAL} />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Instant Disbursal</Text>
              <Text style={styles.infoSubtitle}>Funds credited to your bank account within minutes.</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="trending-down-outline" size={24} color={TEAL} />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Low Interest Rates</Text>
              <Text style={styles.infoSubtitle}>Starting at just 0.89% per month with flexible tenure.</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="shield-checkmark-outline" size={24} color={TEAL} />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>100% Safe & Secure</Text>
              <Text style={styles.infoSubtitle}>Your assets are securely locked in insured vaults.</Text>
            </View>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>Apply for Gold Loan</Text>
        </TouchableOpacity>
      </ScrollView>

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
  infoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    gap: 20,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  infoText: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },
  infoSubtitle: {
    fontSize: 13,
    color: '#888',
    lineHeight: 18,
  },
  actionBtn: {
    backgroundColor: TEAL,
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
