import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { QUICK_ACTIONS } from '../constants/data';

const screenWidth = Dimensions.get('window').width;
const ICONS_PER_ROW = 4;
const ITEM_WIDTH = screenWidth / ICONS_PER_ROW;

type QuickAction = {
  id?: string | number;
  name?: string;
  icon?: any;
};

const QuickActionItem = ({ action }: { action: QuickAction }) => (
  <TouchableOpacity style={styles.actionItem} activeOpacity={0.8}>
    <View style={styles.iconWrapper}>
      <Image source={action.icon} style={styles.icon} resizeMode="contain" />
    </View>
    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.actionText}>
      {action.name}
    </Text>
  </TouchableOpacity>
);

export default function QuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {actions.map((action, index) => (
          <QuickActionItem key={action.id ?? index} action={action} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingHorizontal: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  actionItem: {
    width: ITEM_WIDTH - 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  iconWrapper: {
    width: 65,
    height: 65,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    width: 35,
    height: 35,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1E1E1E',
    textAlign: 'center',
    marginTop: 6,
    letterSpacing: 0.1,
  },
});
