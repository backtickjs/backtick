import assert from "node:assert/strict";
import { it } from "node:test";
import { drawReactNative } from "./drawReactNative.ts";

// A client component with state of its own, drawn by another that re-renders.
// React keeps a child's state while its type stays the same function, so the
// child's count must survive the parent's.
const source = `
import { cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import { Pressable, Text, View } from "@backtickjs/react-native";

const Child = cs\`() => {
  const [count, setCount] = $useState(0);
  return (
    <$Pressable testID="child" onPress={() => setCount(count + 1)}>
      <$Text>child {count}</$Text>
    </$Pressable>
  );
}\`;

const Parent = cs\`() => {
  const [count, setCount] = $useState(0);
  return (
    <$View>
      <$Pressable testID="parent" onPress={() => setCount(count + 1)}>
        <$Text>parent {count}</$Text>
      </$Pressable>
      <$Child />
    </$View>
  );
}\`;

export const screen = cs\`<$Parent />\`;
`;

it("keeps a client component's state when its parent re-renders", async () => {
  const { container, press, unmount } = await drawReactNative(
    "child-state",
    source,
  );
  await press("child");
  assert.equal(container.textContent, "parent 0child 1");
  await press("parent");
  assert.equal(container.textContent, "parent 1child 1");
  await unmount();
});
