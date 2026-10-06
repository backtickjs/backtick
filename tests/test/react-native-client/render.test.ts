import assert from "node:assert/strict";
import { rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { after, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { transpile } from "@backtickjs/compiler";
import { react } from "@backtickjs/react/plugin";
import * as React from "react";
import { act } from "react";
import * as JSXRuntime from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import * as ReactNativeWeb from "react-native-web";
import ts from "typescript";
import { evaluate } from "@backtickjs/react-native-client";

// A server's screen: a client component of React Native's components, its
// state React's, drawn by a server component.
const source = `
import { cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import { Pressable, Text, View } from "@backtickjs/react-native";

const Counter = cs\`(props: { label: string }) => {
  const [count, setCount] = $useState(0);
  return (
    <$Pressable testID={props.label} onPress={() => setCount(count + 1)}>
      <$Text>{props.label}: {count}</$Text>
    </$Pressable>
  );
}\`;

function Home({ labels }: { labels: string[] }) {
  return cs\`<$View>{$labels.map((label) => <$Counter key={label} label={label} />)}</$View>\`;
}

export const screen = <Home labels={["Apples", "Pears"]} />;
`;

const written: string[] = [];
after(() => written.forEach((file) => rmSync(file)));

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

it("draws a server's screen with the app's React Native", async () => {
  // The server: the screen compiled, run, and bundled for the app.
  const host = transpile(
    ts,
    "screen.tsx",
    source,
    "@backtickjs/react",
    undefined,
    { plugins: [react()] },
  );
  const file = join(import.meta.dirname, "screen.host.tmp.mjs");
  writeFileSync(file, host);
  written.push(file);
  const { screen } = await import(file);
  const built = await bundler.build({
    input: screen,
    packageVersions: { react: "19.2.3", "react-native": "0.86.3" },
  });
  const { code } = built.generate({ format: "cjs" });

  // The app: the bundle run with its packages, `react-native-web` standing in
  // for React Native, and drawn.
  const drawn = evaluate(code, {
    react: React,
    "react/jsx-runtime": JSXRuntime,
    "react-native": ReactNativeWeb,
  }) as React.ReactNode;
  const errors: unknown[] = [];
  const error = console.error;
  console.error = (...args: unknown[]) => errors.push(String(args[0]));
  try {
    const container = document.createElement("div");
    const root = createRoot(container);
    await act(async () => root.render(drawn));
    assert.equal(container.textContent, "Apples: 0Pears: 0");
    await act(async () =>
      (container.querySelector('[data-testid="Pears"]') as HTMLElement).click(),
    );
    assert.equal(container.textContent, "Apples: 0Pears: 1");
    await act(() => root.unmount());
  } finally {
    console.error = error;
  }
  assert.deepEqual(errors, []);
});

it("refuses a bundle that requires what the app doesn't provide", () => {
  assert.throws(
    () =>
      evaluate('module.exports = require("react-native-maps");', {
        react: React,
      }),
    {
      message:
        'The bundle requires "react-native-maps", which this app doesn\'t provide.',
    },
  );
});
