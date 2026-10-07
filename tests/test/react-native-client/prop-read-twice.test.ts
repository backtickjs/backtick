import assert from "node:assert/strict";
import { it } from "node:test";
import { drawReactNative } from "./drawReactNative.ts";

// A prop built from the parent's state, read twice by the server component
// it's handed to. In React, a prop's expression runs once, in the parent's
// render, so both reads are the same object.
// `state/prop-read-twice.test.tsx` is the same in Solid, where a prop is a
// getter.
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

// A known bug: each read evaluates the prop again, making a new object. A todo
// until it's fixed, when the runner reports it passing.
it(
  "a prop read twice is the same value",
  { todo: "evaluated at each read" },
  async () => {
    const { container, unmount } = await drawReactNative(
      "prop-read-twice",
      source,
    );
    assert.equal(container.textContent, "same");
    await unmount();
  },
);
