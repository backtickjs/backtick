import assert from "node:assert/strict";
import { it } from "node:test";
import { drawReactNative } from "./drawReactNative.ts";

// A component made by a server function, from the label it's handed. Handed a
// server value, it reads nothing of the parent's, so it's one component, as at
// module level, and keeps its count. Handed one of the parent's locals, it
// depends on that render, so it's made again each render, as a component
// defined inside a render function is, and React remounts it.
const source = `
import { type Client, cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import { Pressable, Text, View } from "@backtickjs/react-native";

function counter(id: string, label: Client<string>) {
  return cs\`() => {
    const [count, setCount] = $useState(0);
    return (
      <$Pressable testID={$id} onPress={() => setCount(count + 1)}>
        <$Text>{$label} {count};</$Text>
      </$Pressable>
    );
  }\`;
}

async function Labelled({ id, label }: { id: string; label: Client<string> }) {
  const Counter = counter(id, label);
  return cs\`<$Counter />\`;
}

const Parent = cs\`() => {
  const [count, setCount] = $useState(0);
  return (
    <$View>
      <$Pressable testID="parent" onPress={() => setCount(count + 1)}>
        <$Text>parent {count};</$Text>
      </$Pressable>
      {\${<Labelled id="fixed" label="fixed" />}}
      {\${<Labelled id="live" label={cs\`"live " + count\`} />}}
    </$View>
  );
}\`;

export const screen = cs\`<$Parent />\`;
`;

// A known bug: each render reads the fixed counter's splice anew, which makes
// it anew, and React remounts it. A todo until it's fixed, when the runner
// reports it passing.
it(
  "a component made from a server value keeps its state",
  { todo: "remounted on every render of its parent" },
  async () => {
    const { container, press, unmount } = await drawReactNative(
      "made-component-fixed",
      source,
    );
    await press("fixed");
    await press("parent");
    assert.equal(container.textContent, "parent 1;fixed 1;live 1 0;");
    await unmount();
  },
);

it("a component made from a client local is made again", async () => {
  const { container, press, unmount } = await drawReactNative(
    "made-component-live",
    source,
  );
  await press("live");
  assert.equal(container.textContent, "parent 0;fixed 0;live 0 1;");
  await press("parent");
  assert.equal(container.textContent, "parent 1;fixed 0;live 1 0;");
  await unmount();
});
