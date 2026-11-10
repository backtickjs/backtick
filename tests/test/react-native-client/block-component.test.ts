import assert from "node:assert/strict";
import { it } from "node:test";
import { drawReactNative } from "./drawReactNative.ts";

// A component made by a block, which sets something up and returns the
// component. A block is a value, as a module-level const is: made once for the
// bundle, so the component it returns is one component, and keeps its state
// when the parent renders again.
const source = `
import { cs } from "@backtickjs/core";
import { useState } from "react" with { backtick: "client" };
import { Pressable, Text, View } from "react-native" with { backtick: "client" };

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

it("a component made by a block keeps its state", async () => {
  const { container, press, unmount } = await drawReactNative(
    "block-component",
    source,
  );
  await press("counter");
  assert.equal(container.textContent, "parent 0;counter 1;");
  await press("parent");
  assert.equal(container.textContent, "parent 1;counter 1;");
  await unmount();
});
