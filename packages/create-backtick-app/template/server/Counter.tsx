import { cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import { Pressable, StyleSheet, Text } from "@backtickjs/react-native";

// A client component: drawn on the phone, its state kept there.
export const Counter = cs`(props: { label: string }) => {
  const [count, setCount] = $useState(0);
  const styles = $StyleSheet.create({
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 14,
      paddingHorizontal: 18,
      marginVertical: 4,
      borderRadius: 12,
      backgroundColor: count > 0 ? "#dcfce7" : "#f4f4f5",
    },
    label: { fontSize: 18 },
    count: { fontSize: 18, fontWeight: "600" },
  });
  return (
    <$Pressable style={styles.row} onPress={() => setCount(count + 1)}>
      <$Text style={styles.label}>{props.label}</$Text>
      <$Text style={styles.count}>{count}</$Text>
    </$Pressable>
  );
}`;
