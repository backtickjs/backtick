import assert from "node:assert/strict";
import { it } from "node:test";
import { drawReactNative } from "./drawReactNative.ts";

// A footgun, though sound: a component made by an expression, `memo(…)`,
// with state of its own, drawn by a parent that re-renders. An expression is
// code, run at each read, so each render makes a new `memo` component, as
// `memo(…)` written inside a render function would, and React remounts it.
// Written as a function, `cs\`() => …\``, it keeps its state. A lint could
// flag a call that returns a component.
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

// The same row, kept: written as a function, it's one function, and `memo(…)`
// runs once per parent, in `useMemo`, as React makes a component once when it
// can't be made at module level.
const kept = `
import { cs } from "@backtickjs/core";
import { memo, useMemo, useState } from "@backtickjs/react";
import { Pressable, Text, View } from "@backtickjs/react-native";

const Row = cs\`() => {
  const [count, setCount] = $useState(0);
  return (
    <$Pressable testID="row" onPress={() => setCount(count + 1)}>
      <$Text>row {count}</$Text>
    </$Pressable>
  );
}\`;

const Parent = cs\`() => {
  const MemoRow = $useMemo(() => $memo($Row), []);
  const [count, setCount] = $useState(0);
  return (
    <$View>
      <$Pressable testID="parent" onPress={() => setCount(count + 1)}>
        <$Text>parent {count}</$Text>
      </$Pressable>
      <MemoRow />
    </$View>
  );
}\`;

export const screen = cs\`<$Parent />\`;
`;

it("a memo component made once per parent keeps its state", async () => {
  const { container, press, unmount } = await drawReactNative(
    "memo-state-kept",
    kept,
  );
  await press("row");
  await press("parent");
  assert.equal(container.textContent, "parent 1row 1");
  await unmount();
});
