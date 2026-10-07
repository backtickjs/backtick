import assert from "node:assert/strict";
import { it } from "node:test";
import { drawReactNative } from "./drawReactNative.ts";

// A footgun, though sound: a component made by a block, which sets something
// up and returns the component. A block is code, run at each read, as
// `$log; $log;` logs twice, so each render of the parent makes a new
// component, and React remounts it. Written as a function, `cs\`() => …\``,
// it keeps its state. A lint could flag a block that returns a component.
const source = `
import { cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import { Pressable, Text, View } from "@backtickjs/react-native";

const Counter = cs\`{
  const color = "#0a7ea4";
  return () => {
    const [count, setCount] = $useState(0);
    return (
      <$Pressable testID="counter" onPress={() => setCount(count + 1)}>
        <$Text style={{ color }}>counter {count};</$Text>
      </$Pressable>
    );
  };
}\`;

const Parent = cs\`() => {
  const [count, setCount] = $useState(0);
  return (
    <$View>
      <$Pressable testID="parent" onPress={() => setCount(count + 1)}>
        <$Text>parent {count};</$Text>
      </$Pressable>
      <$Counter />
    </$View>
  );
}\`;

export const screen = cs\`<$Parent />\`;
`;

it("a component made by a block is made again on every render", async () => {
  const { container, press, unmount } = await drawReactNative(
    "block-component",
    source,
  );
  await press("counter");
  assert.equal(container.textContent, "parent 0;counter 1;");
  await press("parent");
  assert.equal(container.textContent, "parent 1;counter 0;");
  await unmount();
});
