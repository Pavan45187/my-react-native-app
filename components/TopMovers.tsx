import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";

interface Stock {
  id: number;
  name: string;
  logo: any;
  price: string;
  change: string;
}

interface Props {
  stocks: Stock[];
}

export default function TopMovers({ stocks }: Props) {
  const [selectedType, setSelectedType] = useState<"Gainers" | "Losers">("Gainers");
  const [selectedCap, setSelectedCap] = useState("Large Cap");

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Top Movers</Text>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedType === "Gainers" && styles.toggleActive,
            ]}
            onPress={() => setSelectedType("Gainers")}
          >
            <Text
              style={[
                styles.toggleText,
                selectedType === "Gainers" && styles.toggleTextActive,
              ]}
            >
              Gainers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedType === "Losers" && styles.toggleActive,
            ]}
            onPress={() => setSelectedType("Losers")}
          >
            <Text
              style={[
                styles.toggleText,
                selectedType === "Losers" && styles.toggleTextActive,
              ]}
            >
              Losers
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Market Cap Tabs */}
      <View style={styles.capRow}>
        {["Large Cap", "Mid Cap", "Small Cap"].map((cap) => (
          <TouchableOpacity
            key={cap}
            style={[styles.capButton, selectedCap === cap && styles.capButtonActive]}
            onPress={() => setSelectedCap(cap)}
          >
            <Text
              style={[
                styles.capText,
                selectedCap === cap && styles.capTextActive,
              ]}
            >
              {cap}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stock Cards */}
      <FlatList
        data={stocks}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const isPositive = typeof item.change === "string" && item.change.startsWith("+");
          return (
            <View style={styles.stockCard}>
              <Image source={item.logo} style={styles.stockLogo} resizeMode="contain" />
              <Text style={styles.stockName}>{item.name}</Text>
              <Text style={styles.stockPrice}>{item.price}</Text>
              <Text style={[styles.stockChange, isPositive ? styles.positive : styles.negative]}>
                {item.change}
              </Text>
            </View>
          );
        }}
      />

      {/* See More */}
      <TouchableOpacity style={styles.seeMore}>
        <Text style={styles.seeMoreText}>See more ⭢</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F3F3",
    borderRadius: 20,
  },
  toggleButton: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  toggleActive: {
    backgroundColor: "#000",
  },
  toggleText: {
    fontSize: 13,
    color: "#555",
  },
  toggleTextActive: {
    color: "#fff",
  },
  capRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  capButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#F3F3F3",
  },
  capButtonActive: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
  },
  capText: {
    color: "#888",
    fontWeight: "500",
  },
  capTextActive: {
    color: "#000",
  },
  stockCard: {
    width: 120,
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
    alignItems: "center",
  },
  stockLogo: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  stockName: {
    fontWeight: "600",
    fontSize: 14,
    color: "#000",
  },
  stockPrice: {
    fontSize: 14,
    color: "#333",
    marginTop: 3,
  },
  stockChange: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 3,
  },
  positive: {
    color: "#00B386",
  },
  negative: {
    color: "#E63946",
  },
  seeMore: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  seeMoreText: {
    color: "#666",
    fontSize: 13,
  },
});
