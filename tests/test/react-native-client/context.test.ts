import assert from "node:assert/strict";
import { it } from "node:test";
import { drawReactNative } from "./drawReactNative.ts";

// A context made in a script, provided by one client component and read by
// another, as a theme is. In plain React, `createContext` runs once at module
// level, and the provider and the consumer share that one context. A script
// is that, one value for the bundle.
const source = (made: string) => `
import { cs } from "@backtickjs/core";
import { createContext, useContext } from "react" with { backtick: "client" };
import { Text, View } from "react-native" with { backtick: "client" };

const ThemeContext = ${made};

const Label = cs\`() => {
  const theme = $useContext($ThemeContext);
  return <$Text>{theme}</$Text>;
}\`;

const Screen = cs\`() => (
  <$View>
    <$ThemeContext.Provider value="dark">
      <$Label />
    </$ThemeContext.Provider>
  </$View>
)\`;

export const screen = cs\`<$Screen />\`;
`;

it("a context written as an expression reaches its consumers", async () => {
  const { container, unmount } = await drawReactNative(
    "context-expression",
    source('cs`$createContext("light")`'),
  );
  assert.equal(container.textContent, "dark");
  await unmount();
});
