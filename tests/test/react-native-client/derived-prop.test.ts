import assert from "node:assert/strict";
import { it } from "node:test";
import { drawReactNative } from "./drawReactNative.ts";

// `state/derived-prop.test.tsx` in React: a prop derived from state, handed to
// a server component drawn in the component that holds the state. As in
// React, `"Count: " + count` is read again each time the label is drawn, so it
// follows the count.
const source = `
import { type Client, cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import { Pressable, Text, View } from "@backtickjs/react-native";

async function Label({ text }: { text: Client<string> }) {
  return cs\`<$Text>{$text}</$Text>\`;
}

const Counter = cs\`() => {
  const [count, setCount] = $useState(0);
  return (
    <$View>
      <$Pressable testID="add" onPress={() => setCount(count + 1)}>
        <$Text>add</$Text>
      </$Pressable>
      {\${<Label text={cs\`"Count: " + count\`} />}}
    </$View>
  );
}\`;

export const screen = cs\`<$Counter />\`;
`;

it("a prop derived from state follows it", async () => {
  const { container, press, unmount } = await drawReactNative(
    "derived-prop",
    source,
  );
  assert.equal(container.textContent, "addCount: 0");
  await press("add");
  assert.equal(container.textContent, "addCount: 1");
  await unmount();
});
