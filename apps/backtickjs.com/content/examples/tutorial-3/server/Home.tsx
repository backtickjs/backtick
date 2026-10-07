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
import { type Coffee, getMenu } from "./menu.js";

// The screen's styles: a script too, one the components below share.
const styles = cs`$StyleSheet.create({
  screen: {
    padding: 24,
    paddingTop: ($StatusBar.currentHeight ?? 0) + 24,
    gap: 16,
  },
  title: { fontSize: 32, fontWeight: "bold" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  name: { fontSize: 18 },
  add: { fontSize: 18, color: "#0a7ea4" },
  total: { fontSize: 18, fontWeight: "600", marginTop: 8 },
})`;

// A client function, which any script can call.
const formatPrice = cs`(price: number) =>
  price.toLocaleString("en-US", { style: "currency", currency: "USD" })`;

// One coffee, its price until it's in the order, then how many are.
const CoffeeRow = cs`(props: {
  coffee: Coffee;
  count: number;
  onAdd: () => void;
}) => (
  <$View style={$styles.row}>
    <$Text style={$styles.name}>{props.coffee.name}</$Text>
    <$Pressable onPress={props.onAdd}>
      <$Text style={$styles.add}>
        {props.count === 0
          ? $formatPrice(props.coffee.price)
          : props.count + " ×"}
      </$Text>
    </$Pressable>
  </$View>
)`;

// The order: how many of each coffee, kept on the phone.
const Order = cs`(props: { menu: Coffee[] }) => {
  const [counts, setCounts] = $useState<Record<string, number>>({});
  const add = (id: string) =>
    setCounts({ ...counts, [id]: (counts[id] ?? 0) + 1 });

  const items = Object.values(counts).reduce((sum, n) => sum + n, 0);
  const total = props.menu.reduce(
    (sum, coffee) => sum + (counts[coffee.id] ?? 0) * coffee.price,
    0,
  );

  return (
    <$View>
      {props.menu.map((coffee) => (
        <$CoffeeRow
          key={coffee.id}
          coffee={coffee}
          count={counts[coffee.id] ?? 0}
          onAdd={() => add(coffee.id)}
        />
      ))}
      <$Text style={$styles.total}>
        {items === 0
          ? "Tap a price to add it."
          : items + " in your order · " + $formatPrice(total)}
      </$Text>
    </$View>
  );
}`;

export async function Home() {
  const menu = await getMenu();

  return cs`(
    <$ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={$styles.screen}
    >
      <$Text style={$styles.title}>Menu</$Text>
      <$Order menu={$menu} />
    </$ScrollView>
  )`;
}
