import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import BottomTabs from '../../components/BottomTabs';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const TEAL = '#2EC4B6';
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

/* ── Types ── */
interface NotifItem {
  id: string;
  title: string;
  message: string;
}

interface OngoingItem {
  id: string;
  metal: string;
  notifyType: string;
  targetPrice: string;
}

/* ── Data ── */
const NOTIFICATIONS: NotifItem[] = [
  { id: '1', title: 'Gold Target Reached!', message: 'Your ₹9,200 goal is met. Buy now to maximize your gains!' },
  { id: '2', title: 'Gold Target Reached!', message: 'Your ₹9,200 goal is met. Buy now to maximize your gains!' },
  { id: '3', title: 'Gold Target Reached!', message: 'Your ₹9,200 goal is met. Buy now to maximize your gains!' },
  { id: '4', title: 'Gold Target Reached!', message: 'Your ₹9,200 goal is met. Buy now to maximize your gains!' },
];

const ONGOING: OngoingItem[] = [
  { id: '1', metal: 'GOLD', notifyType: 'Notify: once', targetPrice: '₹9092.3' },
  { id: '2', metal: 'GOLD', notifyType: 'Notify: once', targetPrice: '₹9092.3' },
  { id: '3', metal: 'GOLD', notifyType: 'Notify: once', targetPrice: '₹9092.3' },
  { id: '4', metal: 'GOLD', notifyType: 'Notify: once', targetPrice: '₹9092.3' },
  { id: '5', metal: 'GOLD', notifyType: 'Notify: once', targetPrice: '₹9092.3' },
  { id: '6', metal: 'SILVER', notifyType: 'Notify: once', targetPrice: '₹9092.3' },
];

/* ── Main Screen ── */
export default function MetalNotificationsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Notifications' | 'Ongoing'>('Notifications');
  const [dismissedNotifs, setDismissedNotifs] = useState<string[]>([]);
  const [deletedOngoing, setDeletedOngoing] = useState<string[]>([]);

  const dismissNotif = (id: string) => setDismissedNotifs((prev) => [...prev, id]);
  const deleteOngoing = (id: string) => setDeletedOngoing((prev) => [...prev, id]);

  const visibleNotifs = NOTIFICATIONS.filter((n) => !dismissedNotifs.includes(n.id));
  const visibleOngoing = ONGOING.filter((o) => !deletedOngoing.includes(o.id));

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >

        {/* ── HEADER ── */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={22} color="#333" />
          </TouchableOpacity>
        </View>

        {/* ── TITLE ── */}
        <Text style={styles.pageTitle}>Select Metal</Text>

        {/* ── METAL CARDS ── */}
        <View style={styles.metalRow}>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push('/feature/setpricealert')}
          >
            <Image
              source={require('../../assets/images/24kgold.png')}
              style={styles.metalImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push('/feature/setpricealertsilver')}
          >
            <Image
              source={require('../../assets/images/999silver.png')}
              style={styles.metalImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

        </View>

        {/* ── TABS ── */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'Notifications' && styles.tabBtnActive]}
            onPress={() => setActiveTab('Notifications')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'Notifications' && styles.tabBtnTextActive]}>
              Notifications
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'Ongoing' && styles.tabBtnActive]}
            onPress={() => setActiveTab('Ongoing')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'Ongoing' && styles.tabBtnTextActive]}>
              Ongoing
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* ── NOTIFICATIONS TAB ── */}
        {activeTab === 'Notifications' && (
          <View style={styles.listSection}>
            {visibleNotifs.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="notifications-off-outline" size={48} color="#ccc" />
                <Text style={styles.emptyText}>No notifications yet</Text>
              </View>
            ) : (
              visibleNotifs.map((item) => (
                <View key={item.id} style={styles.notifCard}>
                  <View style={styles.notifIconWrapper}>
                    <Ionicons name="checkmark-circle" size={26} color={TEAL} />
                  </View>
                  <View style={styles.notifContent}>
                    <Text style={styles.notifTitle}>{item.title}</Text>
                    <Text style={styles.notifMessage}>{item.message}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.dismissBtn}
                    onPress={() => dismissNotif(item.id)}
                  >
                    <Ionicons name="close" size={18} color="#aaa" />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        )}

        {/* ── ONGOING TAB ── */}
        {activeTab === 'Ongoing' && (
          <View style={styles.listSection}>
            {visibleOngoing.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="notifications-off-outline" size={48} color="#ccc" />
                <Text style={styles.emptyText}>No ongoing alerts</Text>
              </View>
            ) : (
              visibleOngoing.map((item) => (
                <View key={item.id} style={styles.ongoingCard}>
                  <View style={styles.ongoingLeft}>
                    <Text style={styles.ongoingMetal}>{item.metal}</Text>
                    <Text style={styles.ongoingNotify}>{item.notifyType}</Text>
                  </View>
                  <View style={styles.ongoingDivider} />
                  <View style={styles.ongoingCenter}>
                    <Text style={styles.targetLabel}>Target Price</Text>
                    <Text style={styles.targetPrice}>{item.targetPrice}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => deleteOngoing(item.id)}
                  >
                    <Ionicons name="trash-outline" size={20} color="#555" />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        )}

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
    marginBottom: 16,
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
  filterBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Title */
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111',
    textAlign: 'center',
    marginBottom: 20,
  },

  /* Metal cards */
  metalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 16,
  },
  metalImage: {
    width: CARD_WIDTH,
    height: 180,
    borderRadius: 20,
  },
  metalCard: {
    width: CARD_WIDTH,
    backgroundColor: '#2C2C2C',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 16,
    alignItems: 'center',
    minHeight: 190,
    justifyContent: 'space-between',
  },
  metalLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.30)',
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  metalKarat: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },

  /* Tabs */
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  tabBtn: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
    backgroundColor: '#C8F4F0',
  },
  tabBtnActive: {
    backgroundColor: TEAL,
  },
  tabBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: TEAL,
  },
  tabBtnTextActive: {
    color: '#fff',
  },

  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginTop: 16,
    marginBottom: 16,
  },

  /* List section */
  listSection: {
    paddingHorizontal: 16,
  },

  /* Notification cards */
  notifCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 14,
    padding: 14,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  notifIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E6F9F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notifContent: {
    flex: 1,
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  notifMessage: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  dismissBtn: {
    padding: 4,
    marginLeft: 8,
  },

  /* Ongoing cards */
  ongoingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  ongoingLeft: {
    flex: 1,
  },
  ongoingMetal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
    marginBottom: 4,
  },
  ongoingNotify: {
    fontSize: 13,
    color: '#888',
  },
  ongoingDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 16,
  },
  ongoingCenter: {
    alignItems: 'flex-end',
    marginRight: 16,
  },
  targetLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  targetPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: TEAL,
  },
  deleteBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Empty state */
  emptyState: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 15,
    color: '#aaa',
  },
});