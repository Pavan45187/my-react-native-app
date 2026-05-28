import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import BottomTabs from '../../components/BottomTabs';
import Header from '../../components/Header';
import HorizontalMenu from '../../components/HorizontalMenu';
import { TOP_MENU } from '../../constants/data';

import Explore from './explore';
import Holdings from './holdings';
import OrdersScreen from './orders';
import PositionsScreen from './positions';
import WatchlistsScreen from './watchlist';
import Stocks from './stocks';
import FAndOScreen from './F&O';
import MutualFundsScreen from './mutualfunds';
import MetalsScreen from './metals';

const userAvatar = require('../../assets/images/user.jpg');

export default function TabsLayout() {
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  // ✅ DEFAULT LANDING PAGE AFTER LOGIN
  const [selected, setSelected] = useState('Explore');

  useEffect(() => {
    if (tab) {
      if (tab === 'Home') {
        setSelected('Explore');
      } else {
        setSelected(tab);
      }
    }
  }, [tab]);

  const handleTabSelect = (tabName: string) => {
    if (tabName === 'Home') {
      setSelected('Explore');
    } else {
      setSelected(tabName);
    }
  };

  const renderContent = () => {
    switch (selected) {
      case 'Explore':
        return <Explore />;
      case 'Holdings':
        return <Holdings />;
      case 'Positions':
        return <PositionsScreen />;
      case 'Orders':
        return <OrdersScreen />;
      case 'Watchlist':
        return <WatchlistsScreen />;
      case 'Stocks':
        return <Stocks />;
      case 'F&O':
        return <FAndOScreen />;
      case 'Mutual Funds':
        return <MutualFundsScreen />;
      case 'Metals':
        return <MetalsScreen />;
      default:
        return <Explore />; // fallback safety
    }
  };

  const handleBellPress = () => {
    Alert.alert('Notifications', 'You tapped the bell!');
  };

  const handleSearchPress = () => {
    Alert.alert('Search', 'You tapped the search icon!');
  };

  return (
    <View style={styles.container}>
      <Header
        username="User"
        avatar={userAvatar}
        onSearchPress={handleSearchPress}
        onBellPress={handleBellPress}
      />

      <HorizontalMenu
        items={TOP_MENU}
        selected={selected}
        onSelect={setSelected}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderContent()}
      </ScrollView>

      <BottomTabs
        selected={selected}
        onSelect={handleTabSelect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingBottom: 90 },
});