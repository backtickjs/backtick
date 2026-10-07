import { cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "@backtickjs/react-native";
import { getMenu } from "./menu.js";

// A client component: it runs on the phone, with state of its own.
const AddButton = cs`() => {
  const [count, setCount] = $useState(0);
  return (
    <$Pressable onPress={() => setCount(count + 1)}>
      <$Text style={{ fontSize: 18, color: "#0a7ea4" }}>
        {count === 0 ? "Add" : "Added " + count}
      </$Text>
    </$Pressable>
  );
}`;

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
            <$AddButton />
          </$View>
        ))}
      </$ScrollView>
    );
  }`;
}
