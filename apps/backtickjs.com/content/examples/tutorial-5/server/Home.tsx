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
import { type Counts, lastOrder } from "./orders.js";

// The screen's styles: a script too, one the components below share.
const styles = cs`$StyleSheet.create({
  screen: {
    padding: 24,
    paddingTop: ($StatusBar.currentHeight ?? 0) + 24,
    gap: 16,
  },
  title: { fontSize: 32, fontWeight: "bold" },
  usual: { fontSize: 16, color: "#666" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  name: { fontSize: 18 },
  add: { fontSize: 18, color: "#0a7ea4" },
  total: { fontSize: 18, fontWeight: "600", marginTop: 8 },
  button: {
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#0a7ea4",
  },
  buttonText: { fontSize: 18, fontWeight: "600", color: "#fff" },
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

// The order: how many of each coffee, kept on the phone until it's placed.
// It starts as the order the server gives it.
const Order = cs`(props: {
  menu: Coffee[];
  ordersUrl: string;
  initialCounts: Counts;
}) => {
  const [counts, setCounts] = $useState(props.initialCounts);
  const [placed, setPlaced] = $useState(false);
  const add = (id: string) =>
    setCounts({ ...counts, [id]: (counts[id] ?? 0) + 1 });
  const place = async () => {
    await fetch(props.ordersUrl, {
      method: "POST",
      body: JSON.stringify(counts),
    });
    setPlaced(true);
  };

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
      {items > 0 && (
        <$Pressable style={$styles.button} onPress={place} disabled={placed}>
          <$Text style={$styles.buttonText}>
            {placed ? "Ordered ✓" : "Place order"}
          </$Text>
        </$Pressable>
      )}
    </$View>
  );
}`;

// A server component, drawn inside the script below: your last order, in
// words.
async function Usual({ counts, menu }: { counts: Counts; menu: Coffee[] }) {
  const summary = menu
    .filter((coffee) => counts[coffee.id])
    .map((coffee) => `${counts[coffee.id]} × ${coffee.name}`)
    .join(", ");
  return cs`<$Text style={$styles.usual}>Your usual: {$summary}</$Text>`;
}

export async function Home({ origin }: { origin: string }) {
  const menu = await getMenu();
  const ordersUrl = origin + "/orders";
  const usual = await lastOrder();

  return cs`(
    <$ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={$styles.screen}
    >
      <$Text style={$styles.title}>Menu</$Text>
      {${usual === null ? null : <Usual counts={usual} menu={menu} />}}
      <$Order
        menu={$menu}
        ordersUrl={$ordersUrl}
        initialCounts={${usual ?? {}}}
      />
    </$ScrollView>
  )`;
}
