import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Svg, { Circle, Path, G } from 'react-native-svg';
import BottomTabs from '../../components/BottomTabs';

const TEAL = '#2EC4B6';
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;
const RATE_PER_GM = 9092.35;

/* ── Coin SVG illustration ── */
const CoinIllustration = ({ size = 100 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Circle cx="50" cy="50" r="44" fill="#F5C518" />
    <Circle cx="50" cy="50" r="36" fill="#E6A800" />
    <Circle cx="50" cy="50" r="28" fill="#F5C518" />
    {/* Crown shape */}
    <G fill="#E6A800">
      <Path d="M32 58 L32 42 L40 50 L50 38 L60 50 L68 42 L68 58 Z" />
      <Path d="M30 60 L70 60 L70 65 L30 65 Z" />
    </G>
  </Svg>
);

/* ── Coin products ── */
const COINS = [
  { id: '1', gm: 1,  price: 9092.35 },
  { id: '2', gm: 4,  price: 36353.4 },
  { id: '3', gm: 8,  price: 72706.8 },
  { id: '4', gm: 10, price: 90883.5 },
];

type CartMap = Record<string, number>;

export default function ShopCoinsScreen() {
  const router = useRouter();
  const [cart, setCart] = useState<CartMap>({});

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const increment = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrement = (id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });
  };

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

          {/* Cart badge */}
          <TouchableOpacity style={styles.cartBtn}>
            <Ionicons name="bag-outline" size={22} color={TEAL} />
            {totalItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{totalItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* ── IMAGE BANNER (placeholder carousel) ── */}
        <View style={styles.bannerBox}>
          <CoinIllustration size={120} />
          {/* Dots */}
          <View style={styles.dotsRow}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={[styles.dot, i === 0 && styles.dotActive]} />
            ))}
          </View>
        </View>

        {/* ── PRODUCT GRID ── */}
        <View style={styles.grid}>
          {COINS.map((coin) => {
            const qty = cart[coin.id] || 0;
            const inCart = qty > 0;

            return (
              <View key={coin.id} style={styles.productCard}>
                {/* Coin image */}
                <View style={styles.coinImageWrapper}>
                  <CoinIllustration size={90} />
                </View>

                {/* Weight & Price */}
                <Text style={styles.coinWeight}>{coin.gm} GM</Text>
                <Text style={styles.coinPrice}>
                  ₹{coin.price.toLocaleString('en-IN')}
                </Text>

                {/* Add to Cart / Qty Controls */}
                {!inCart ? (
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => addToCart(coin.id)}
                  >
                    <Text style={styles.addBtnText}>Add to Cart</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.qtyRow}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => decrement(coin.id)}
                    >
                      <Text style={styles.qtyBtnText}>−</Text>
                    </TouchableOpacity>

                    <Text style={styles.qtyValue}>{qty}</Text>

                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => increment(coin.id)}
                    >
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ── CONTINUE BUTTON (Shifted above tabs) ── */}
      <View style={[styles.footer, { bottom: 70, paddingBottom: 16 }]}>
        <TouchableOpacity style={styles.continueBtn}>
          <Text style={styles.continueBtnText}>Continue</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  cartBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E6F9F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: TEAL,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '700',
  },

  /* Banner */
  bannerBox: {
    width: '100%',
    height: 200,
    backgroundColor: '#E8F8F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C5E8E4',
  },
  dotActive: {
    backgroundColor: TEAL,
    width: 22,
  },

  /* Grid */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 16,
    justifyContent: 'space-between',
  },
  productCard: {
    width: CARD_WIDTH,
    alignItems: 'center',
    marginBottom: 8,
  },
  coinImageWrapper: {
    width: CARD_WIDTH,
    height: 130,
    backgroundColor: '#E6F9F7',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  coinWeight: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
    marginBottom: 4,
  },
  coinPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: TEAL,
    marginBottom: 12,
  },

  /* Add to Cart button */
  addBtn: {
    width: '100%',
    backgroundColor: TEAL,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },

  /* Qty controls */
  qtyRow: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: TEAL,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  qtyBtn: {
    flex: 1,
    paddingVertical: 13,
    alignItems: 'center',
  },
  qtyBtnText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    lineHeight: 22,
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    minWidth: 30,
    textAlign: 'center',
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
  continueBtn: {
    backgroundColor: TEAL,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
  },
  continueBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});