import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const TEAL = '#2EC4B6';

export default function MetalsScreen() {
  const router = useRouter();
  const [isGold, setIsGold] = useState(true);
  const [savingPlan, setSavingPlan] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');

  const handleLivePricePress = () => {
    if (isGold) {
      router.push('/feature/golddetail');
    } else {
      router.push('/feature/silverdetail');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* ── LIVE PRICE HEADER ── */}
      <View style={styles.liveHeader}>

        {/* Tappable live price badge */}
        <TouchableOpacity
          style={styles.liveBadge}
          onPress={handleLivePricePress}
          activeOpacity={0.8}
        >
          <View style={[
            styles.karatBadge,
            { backgroundColor: isGold ? '#F5C518' : '#C0C0C0' },
          ]}>
            <Text style={[
              styles.karatText,
              { color: isGold ? '#5C3D00' : '#2C2C2C' },
            ]}>
              {isGold ? '24KT' : '999'}
            </Text>
          </View>
          <View>
            <Text style={styles.livePriceLabel}>Live Price</Text>
            <Text style={styles.livePriceValue}>
              {isGold ? '₹19092.3/gm' : '₹105.66/gm'}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.headerIcons}>
         <TouchableOpacity onPress={() => router.push('/feature/metalnotifications')}>
  <View style={styles.bellWrapper}>
    <Ionicons name="notifications-outline" size={24} color="#222" />
    <View style={styles.notifDot} />
  </View>
</TouchableOpacity>
          <Ionicons
            name="search-outline"
            size={24}
            color="#222"
            style={{ marginLeft: 16 }}
          />
        </View>
      </View>

      {/* ── GOLD / SILVER CARD ── */}
      <View style={styles.card}>
        <View style={styles.cardTop}>

          {/* Safe image */}
          <Image
            source={require('../../assets/images/safe.png')}
            style={styles.safeImage}
            resizeMode="contain"
          />

          {/* Right side */}
          <View style={styles.cardRight}>

            {/* Toggle */}
            <View style={styles.toggleRow}>
              <Text style={[styles.toggleLabel, isGold && styles.toggleActive]}>
                Gold
              </Text>
              <Switch
                value={!isGold}
                onValueChange={(val) => setIsGold(!val)}
                trackColor={{ false: TEAL, true: TEAL }}
                thumbColor="#fff"
                style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
              />
              <Text style={[styles.toggleLabel, !isGold && styles.toggleActive]}>
                Silver
              </Text>
            </View>

            {/* Available */}
            <Text style={styles.availableLabel}>
              Available {isGold ? 'Gold' : 'Silver'}
            </Text>
            <Text style={styles.availableValue}>0.0000gm</Text>

            {/* Buy Now */}
            <TouchableOpacity
  style={styles.buyBtn}
  onPress={() => isGold
    ? router.push('/feature/buygold')
    : router.push('/feature/buysilver')
  }
>
  <Text style={styles.buyBtnText}>BUY NOW</Text>
  <Ionicons name="people-outline" size={16} color="#fff" style={{ marginLeft: 6 }} />
</TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.cardFooter}>
          <Text style={styles.cardFooterText}>
            {isGold ? '24K Pure Gold' : '999 Pure Silver'} | 100% Safe & Secured
          </Text>
        </View>
      </View>

      {/* ── AUTOMATE SAVINGS ── */}
      <View style={styles.savingsCard}>
        <View style={styles.savingsTitleRow}>
          <View style={styles.calendarIcon}>
            <Ionicons name="calendar-outline" size={22} color="#333" />
          </View>
          <Text style={styles.savingsTitle}>Automate your savings</Text>
        </View>

        <View style={styles.plansRow}>
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>★ Popular</Text>
          </View>
          {(['Daily', 'Weekly', 'Monthly'] as const).map((plan) => (
            <TouchableOpacity
              key={plan}
              style={[styles.planPill, savingPlan === plan && styles.planPillActive]}
              onPress={() => setSavingPlan(plan)}
            >
              <Text style={[styles.planText, savingPlan === plan && styles.planTextActive]}>
                {plan}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.savingsBtn}>
          <Text style={styles.savingsBtnText}>Start Savings</Text>
          <Ionicons
            name="trending-up-outline"
            size={18}
            color="#fff"
            style={{ marginLeft: 6 }}
          />
        </TouchableOpacity>
      </View>

      {/* ── SHOP COINS ── */}
      <View style={styles.shopCard}>
        <View style={styles.shopLeft}>
          <Text style={styles.shopTitle}>Shop Coins</Text>
          <Text style={styles.shopSubtitle}>
            Personalized Gold & Silver Coins –{'\n'}Add Your Name!
          </Text>
          <TouchableOpacity
  style={styles.shopBtn}
  onPress={() => router.push('/feature/shopcoins')}
>
  <Text style={styles.shopBtnText}>Shop Now</Text>
</TouchableOpacity>
        </View>

        <Image
          source={require('../../assets/images/coins.png')}
          style={styles.coinsImage}
          resizeMode="contain"
        />
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F9',
    paddingHorizontal: 16,
  },

  /* Live header */
  liveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 14,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    gap: 8,
  },
  karatBadge: {
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  karatText: {
    fontSize: 11,
    fontWeight: '700',
  },
  livePriceLabel: {
    fontSize: 11,
    color: '#888',
  },
  livePriceValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellWrapper: {
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4444',
    borderWidth: 1,
    borderColor: '#F5F6F9',
  },

  /* Gold/Silver card */
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  safeImage: {
    width: 120,
    height: 120,
    marginRight: 12,
  },
  cardRight: {
    flex: 1,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 8,
    gap: 4,
  },
  toggleLabel: {
    fontSize: 14,
    color: '#aaa',
    fontWeight: '500',
  },
  toggleActive: {
    color: '#111',
    fontWeight: '700',
  },
  availableLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  availableValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
  },
  buyBtn: {
    flexDirection: 'row',
    backgroundColor: TEAL,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderColor: '#F0F0F0',
    marginTop: 12,
    paddingTop: 10,
    alignItems: 'center',
  },
  cardFooterText: {
    fontSize: 12,
    color: '#999',
  },

  /* Automate savings */
  savingsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  savingsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  calendarIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F5F6F9',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  savingsTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
  },
  plansRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
    flexWrap: 'wrap',
  },
  popularBadge: {
    backgroundColor: '#E6F9F7',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  popularText: {
    fontSize: 12,
    color: TEAL,
    fontWeight: '600',
  },
  planPill: {
    borderWidth: 1.5,
    borderColor: TEAL,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  planPillActive: {
    backgroundColor: TEAL,
  },
  planText: {
    fontSize: 14,
    color: TEAL,
    fontWeight: '600',
  },
  planTextActive: {
    color: '#fff',
  },
  savingsBtn: {
    flexDirection: 'row',
    backgroundColor: TEAL,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savingsBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  /* Shop Coins */
  shopCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  shopLeft: {
    flex: 1,
    marginRight: 12,
  },
  shopTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111',
    marginBottom: 6,
  },
  shopSubtitle: {
    fontSize: 13,
    color: '#666',
    lineHeight: 19,
    marginBottom: 14,
  },
  shopBtn: {
    backgroundColor: TEAL,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  shopBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  coinsImage: {
    width: 110,
    height: 110,
  },
});