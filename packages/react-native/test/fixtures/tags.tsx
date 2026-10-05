import { cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "@backtickjs/react-native";

export const Counter = cs`(props: { label: string }) => {
  const [count, setCount] = $useState(0);
  const styles = $StyleSheet.create({ row: { flexDirection: "row", gap: 8 } });
  return (
    <$View style={styles.row}>
      <$Text>
        {props.label}: {count}
      </$Text>
      <$Pressable onPress={() => setCount(count + 1)}>
        <$Text>Add</$Text>
      </$Pressable>
    </$View>
  );
}`;

export const list = cs`<$FlatList
  data={["a", "b"]}
  keyExtractor={(item) => item}
  renderItem={({ item }) => <$Text>{item.toUpperCase()}</$Text>}
/>`;

// A member of a host value as a tag, and constructed: `Animated`'s.
export const fading = cs`{
  const opacity = new $Animated.Value(0);
  return (
    <$Animated.View style={{ opacity }}>
      <$Text>Hi</$Text>
    </$Animated.View>
  );
}`;

// @ts-expect-error: `opacity` takes a number or an animated value
export const wrongOpacity = cs`<$Animated.View style={{ opacity: "none" }} />`;

// @ts-expect-error: `pointerEvents` is one of React Native's four
export const wrong = cs`<$View pointerEvents="sideways" />`;
