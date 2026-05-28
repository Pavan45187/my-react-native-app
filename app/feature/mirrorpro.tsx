import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import BottomTabs from "../../components/BottomTabs";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MirrorPro() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/user.jpg")}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.name}>User</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <Ionicons name="notifications-outline" size={24} color="#000" />
            <Ionicons name="search-outline" size={24} color="#000" />
          </View>
        </View>

        {/* Title Row */}
        <View style={styles.titleRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>

          <Text style={styles.pageTitle}>Mirror Pro</Text>
        </View>

        {/* Performance Card */}
        <View style={styles.performanceCard}>
          <Text style={styles.performanceTitle}>
            Credora’s Performance ✓
          </Text>

          <View style={styles.metricsRow}>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Avg. returns</Text>
              <Text style={styles.metricValue}>12.58%</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Avg. duration</Text>
              <Text style={styles.metricValue}>47 days</Text>
            </View>
          </View>

          <Text style={styles.accuracy}>
            Trades Hits Accuracy:{" "}
            <Text style={styles.accuracyValue}>93.98%</Text>
          </Text>

          <TouchableOpacity style={styles.subscribeBtn}>
            <Text style={styles.subscribeText}>Subscribe Now →</Text>
          </TouchableOpacity>
        </View>

        {/* Ideas */}
        <Text style={styles.sectionTitle}>Ideas</Text>

        <View style={styles.grid}>
          <IdeaCard
            image={require("../../assets/images/stocks.png")}
            title="Stocks"
            live="81 Live"
            onPress={() => router.push("/(tabs)/stocks")}
          />
          <IdeaCard
            image={require("../../assets/images/futures.png")}
            title="Futures"
            live="8 Live"
            onPress={() => router.push("/feature/futures")}
          />
          <IdeaCard
            image={require("../../assets/images/options.png")}
            title="Options"
            live="3 Live"
            onPress={() => router.push("/feature/options")}
          />
          <IdeaCard
            image={require("../../assets/images/commodity.png")}
            title="Commodity"
            live="0 Live"
            onPress={() => router.push("/feature/commodity")}
          />
        </View>
      </ScrollView>
      <BottomTabs
        selected="Home"
        onSelect={(tab) => router.push({ pathname: '/(tabs)', params: { tab } })}
      />
    </SafeAreaView>
  );
}

interface IdeaCardProps {
  image: any;
  title: string;
  live: string;
  onPress: () => void;
}

const IdeaCard = ({ image, title, live, onPress }: IdeaCardProps) => (
  <TouchableOpacity
    style={styles.ideaCard}
    activeOpacity={0.8}
    onPress={onPress}
  >
    <Image source={image} style={styles.ideaImage} resizeMode="contain" />
    <Text style={styles.ideaTitle}>{title}</Text>
    <Text style={styles.ideaLive}>{live}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7F9",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },

  hello: {
    fontSize: 13,
    color: "#666",
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
  },

  headerRight: {
    flexDirection: "row",
    gap: 16,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 20,
  },

  performanceCard: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },

  performanceTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
  },

  metricsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 10,
  },

  metric: {
    flex: 1,
    alignItems: "center",
  },

  metricLabel: {
    fontSize: 13,
    color: "#666",
  },

  metricValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1BB38A",
    marginTop: 4,
  },

  divider: {
    width: 1,
    height: 40,
    backgroundColor: "#E5E5E5",
  },

  accuracy: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 14,
  },

  accuracyValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1BB38A",
  },

  subscribeBtn: {
    backgroundColor: "#222",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
  },

  subscribeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 16,
    marginBottom: 12,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 30,
  },

  ideaCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },

  ideaImage: {
    width: 70,
    height: 70,
    marginBottom: 8,
  },

  ideaTitle: {
    fontSize: 15,
    fontWeight: "600",
  },

  ideaLive: {
    fontSize: 14,
    color: "#1BB38A",
    marginTop: 4,
    fontWeight: "600",
  },
});
