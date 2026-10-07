import assert from "node:assert/strict";
import { it } from "node:test";
import { drawReactNative } from "./drawReactNative.ts";

// A server component handed its parent's state, drawing a client component
// with state of its own: the title follows the parent, and the child keeps
// its count across the parent's renders, as React keeps any child's.
// `state/section-state.test.tsx` is the same in Solid.
const source = `
import { type Client, cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import { Pressable, Text, View } from "@backtickjs/react-native";

const CounterButton = cs\`() => {
  const [count, setCount] = $useState(0);
  return (
    <$Pressable testID="child" onPress={() => setCount(count + 1)}>
      <$Text>child {count}</$Text>
    </$Pressable>
  );
}\`;

async function Section({ title }: { title: Client<string> }) {
  return cs\`(
    <$View>
      <$Text>{$title}</$Text>
      <$CounterButton />
    </$View>
  )\`;
}

const Parent = cs\`() => {
  const [count, setCount] = $useState(0);
  return (
    <$View>
      <$Pressable testID="parent" onPress={() => setCount(count + 1)}>
        <$Text>parent {count}</$Text>
      </$Pressable>
      {\${<Section title={cs\`"Section " + count\`} />}}
    </$View>
  );
}\`;

export const screen = cs\`<$Parent />\`;
`;

// A known bug: each render of the parent reads the section's splice anew,
// which makes the child's component anew, and React remounts it. A todo until
// it's fixed, when the runner reports it passing.
it(
  "a server component's client child keeps its state",
  { todo: "remounted on every render of its parent" },
  async () => {
    const { container, press, unmount } = await drawReactNative(
      "section-state",
      source,
    );
    await press("child");
    await press("parent");
    assert.equal(container.textContent, "parent 1Section 1child 1");
    await unmount();
  },
);
