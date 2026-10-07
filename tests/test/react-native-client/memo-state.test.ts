import assert from "node:assert/strict";
import { it } from "node:test";
import { drawReactNative } from "./drawReactNative.ts";

// A component made by an expression, `memo(…)`, with state of its own, drawn
// by a parent that re-renders. As `const Row = memo(…)` at module level is one
// component, the row keeps its count.
const source = `
import { cs } from "@backtickjs/core";
import { memo, useState } from "@backtickjs/react";
import { Pressable, Text, View } from "@backtickjs/react-native";

const Row = cs\`$memo(() => {
  const [count, setCount] = $useState(0);
  return (
    <$Pressable testID="row" onPress={() => setCount(count + 1)}>
      <$Text>row {count}</$Text>
    </$Pressable>
  );
})\`;

const Parent = cs\`() => {
  const [count, setCount] = $useState(0);
  return (
    <$View>
      <$Pressable testID="parent" onPress={() => setCount(count + 1)}>
        <$Text>parent {count}</$Text>
      </$Pressable>
      <$Row />
    </$View>
  );
}\`;

export const screen = cs\`<$Parent />\`;
`;

// A known bug: each render reads the row's splice anew, which makes a new
// `memo` component, and React remounts it. A todo until it's fixed, when the
// runner reports it passing.
it(
  "a memo component keeps its state when its parent re-renders",
  { todo: "remounted on every render of its parent" },
  async () => {
    const { container, press, unmount } = await drawReactNative(
      "memo-state",
      source,
    );
    await press("row");
    await press("parent");
    assert.equal(container.textContent, "parent 1row 1");
    await unmount();
  },
);
