import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const TEAL = '#2EC4B6';

interface BottomTabsProps {
  selected: string;
  onSelect: (tab: string) => void;
}

const TABS = [
  {
    label: 'Home',
    active: require('../assets/images/home_active.png'),
    inactive: require('../assets/images/home_inactive.png'),
  },
  {
    label: 'Stocks',
    active: require('../assets/images/stocks_active.png'),
    inactive: require('../assets/images/stocks_inactive.png'),
  },
  {
    label: 'F&O',
    active: require('../assets/images/fno_active.png'),
    inactive: require('../assets/images/fno_inactive.png'),
  },
  {
    label: 'Mutual Funds',
    active: require('../assets/images/mutualfunds_active.png'),
    inactive: require('../assets/images/mutualfunds_inactive.png'),
  },
  {
    label: 'Metals',
    active: require('../assets/images/metals_active.png'),
    inactive: require('../assets/images/metals_inactive.png'),
  },
];

export default function BottomTabs({ selected, onSelect }: BottomTabsProps) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = selected === tab.label || (tab.label === 'Home' && selected === 'Explore');
        return (
          <TouchableOpacity
            key={tab.label}
            style={styles.tabItem}
            onPress={() => onSelect(tab.label)}
            activeOpacity={0.7}
          >
            <Image
              source={isActive ? tab.active : tab.inactive}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    width: 26,
    height: 26,
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    color: '#888',
  },
  labelActive: {
    color: TEAL,
    fontWeight: '700',
  },
});