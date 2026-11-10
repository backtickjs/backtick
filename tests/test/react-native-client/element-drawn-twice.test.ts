import assert from "node:assert/strict";
import { it } from "node:test";
import { drawReactNative } from "./drawReactNative.ts";

// A server component's element, held in a variable and drawn in two places,
// as React's server renderer runs one: one element runs its component once,
// and React draws what it answered in each place. Two elements run twice.
const source = (stamps: string) => `
import { cs } from "@backtickjs/core";
import { Text, View } from "react-native" with { backtick: "client" };

let runs = 0;

async function Stamp() {
  runs = runs + 1;
  return cs\`<$Text>{$runs}</$Text>\`;
}

const stamp = <Stamp />;

export const screen = cs\`<$View>${stamps}</$View>\`;
`;

it("one element drawn twice runs its component once", async () => {
  const { container, unmount } = await drawReactNative(
    "element-drawn-twice",
    source("{$stamp}{$stamp}"),
  );
  assert.equal(container.textContent, "11");
  await unmount();
});

it("two elements run their component twice", async () => {
  const { container, unmount } = await drawReactNative(
    "elements-drawn-twice",
    source("{${<Stamp />}}{${<Stamp />}}"),
  );
  assert.equal(container.textContent, "12");
  await unmount();
});
