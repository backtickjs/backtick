import assert from "node:assert/strict";
import { it } from "node:test";
import { drawReactNative } from "./drawReactNative.ts";

// A component made by an expression, `memo(…)`, with state of its own, drawn
// by a parent that re-renders. A splice of an expression runs it at each
// read, so each render makes a new `memo` component, as `memo(…)` written
// inside a render function would, and React remounts it: a component that
// keeps its state across renders is written as a function, `cs\`() => …\``.
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

it("a memo component is made again when its parent re-renders", async () => {
  const { container, press, unmount } = await drawReactNative(
    "memo-state",
    source,
  );
  await press("row");
  assert.equal(container.textContent, "parent 0row 1");
  await press("parent");
  assert.equal(container.textContent, "parent 1row 0");
  await unmount();
});
