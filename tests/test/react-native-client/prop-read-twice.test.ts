import assert from "node:assert/strict";
import { it } from "node:test";
import { drawReactNative } from "./drawReactNative.ts";

// A prop built from the parent's state, read twice by the server component
// it's handed to. A splice of code runs it at each read, so the two reads
// build two objects. `state/prop-read-twice.test.tsx` is the same in Solid.
const source = `
import { type Client, cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import { Text } from "@backtickjs/react-native";

async function Compare({ value }: { value: Client<{ count: number }> }) {
  return cs\`<$Text>{$value === $value ? "same" : "different"}</$Text>\`;
}

const Parent = cs\`() => {
  const [count] = $useState(0);
  return <>{\${<Compare value={cs\`({ count })\`} />}}</>;
}\`;

export const screen = cs\`<$Parent />\`;
`;

it("a prop read twice is evaluated twice", async () => {
  const { container, unmount } = await drawReactNative(
    "prop-read-twice",
    source,
  );
  assert.equal(container.textContent, "different");
  await unmount();
});
