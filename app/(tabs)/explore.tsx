import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import FeatureCards from '../../components/FeatureCards';
import Banner from '../../components/Banner';
import ProductTools from '../../components/ProductTools';
import TopMovers from '../../components/TopMovers';
import QuickActions from '../../components/QuickActions';

import { TOOLS, TOP_MOVERS, QUICK_ACTIONS } from '../../constants/data';

export default function Explore() {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <FeatureCards />
      <QuickActions actions={QUICK_ACTIONS} />
      <Banner />
      <ProductTools tools={TOOLS} />
      <TopMovers stocks={TOP_MOVERS} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});