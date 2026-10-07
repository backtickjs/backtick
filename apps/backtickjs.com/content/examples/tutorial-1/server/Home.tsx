import { cs } from "@backtickjs/core";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "@backtickjs/react-native";
import { getMenu } from "./menu.js";

export async function Home() {
  const menu = await getMenu();

  return cs`{
    const styles = $StyleSheet.create({
      screen: {
        padding: 24,
        paddingTop: ($StatusBar.currentHeight ?? 0) + 24,
        gap: 16,
      },
      title: { fontSize: 32, fontWeight: "bold" },
      row: { flexDirection: "row", justifyContent: "space-between" },
      name: { fontSize: 18 },
      price: { fontSize: 18, color: "#666" },
    });

    return (
      <$ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.screen}
      >
        <$Text style={styles.title}>Menu</$Text>
        {$menu.map((coffee) => (
          <$View key={coffee.id} style={styles.row}>
            <$Text style={styles.name}>{coffee.name}</$Text>
            <$Text style={styles.price}>
              {coffee.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </$Text>
          </$View>
        ))}
      </$ScrollView>
    );
  }`;
}
