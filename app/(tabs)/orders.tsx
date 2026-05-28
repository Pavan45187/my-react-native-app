import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';

// --- Local Image ---
const EMPTY_ORDERS_ILLUSTRATION = require('../../assets/images/orders.png');

// --- Empty State ---
const EmptyOrdersView = () => {
  return (
    <View style={styles.illustrationContainer}>
      <Image
        source={EMPTY_ORDERS_ILLUSTRATION}
        style={styles.illustrationImage}
        resizeMode="contain"
      />

      <Text style={styles.mainText}>You have no open orders</Text>

      <TouchableOpacity style={styles.allOrdersButton}>
        <Text style={styles.allOrdersText}>All orders</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- Main Screen ---
export default function Orders() {
  const hasOpenOrders = false;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {hasOpenOrders ? (
          <Text>Orders List Here</Text>
        ) : (
          <EmptyOrdersView />
        )}
      </View>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },
  illustrationImage: {
    width: 250,
    height: 200,
    marginBottom: 30,
    borderRadius: 15,
  },
  mainText: {
    marginTop: 10,
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 10,
  },
  allOrdersButton: {
    padding: 8,
  },
  allOrdersText: {
    fontSize: 16,
    color: '#00A676',
    fontWeight: '700',
  },
});