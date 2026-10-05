import "global-jsdom/register";
import assert from "node:assert/strict";
import { rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { after, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { transpile } from "@backtickjs/compiler";
import { react } from "@backtickjs/react/plugin";
import * as React from "react";
import { act, createElement } from "react";
import * as JSXRuntime from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import * as ReactNativeWeb from "react-native-web";
import ts from "typescript";
import { Backtick } from "../dist/index.js";

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
  globalThis.fetch = async (url, init) => {
    assert.equal(url, "https://example.com/home");
    assert.equal(
      new Headers(init?.headers).get("backtick-package-versions"),
      '{"react":"19.2.3","react-native":"0.86.3"}',
    );
    return new Response(code);
  };

  // The app: its packages handed over, `react-native-web` standing in for
  // React Native.
  const errors: unknown[] = [];
  const error = console.error;
  console.error = (...args: unknown[]) => errors.push(String(args[0]));
  try {
    const container = document.createElement("div");
    const root = createRoot(container);
    await act(async () =>
      root.render(
        createElement(Backtick, {
          url: "https://example.com/home",
          modules: {
            react: React,
            "react/jsx-runtime": JSXRuntime,
            "react-native": ReactNativeWeb,
          },
          packageVersions: { react: "19.2.3", "react-native": "0.86.3" },
          fallback: "loading",
        }),
      ),
    );
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

// What an error boundary above it shows: why the screen couldn't be drawn.
class Boundary extends React.Component<
  { children: React.ReactNode },
  { error: unknown }
> {
  state = { error: null as unknown };
  static getDerivedStateFromError(error: unknown) {
    return { error };
  }
  render() {
    return this.state.error === null
      ? this.props.children
      : String((this.state.error as Error).message);
  }
}

it("throws, for an error boundary, a bundle the app can't run", async () => {
  globalThis.fetch = async () =>
    new Response('module.exports = require("react-native-maps");');
  const container = document.createElement("div");
  const root = createRoot(container);
  const error = console.error;
  console.error = () => {};
  try {
    await act(async () =>
      root.render(
        createElement(
          Boundary,
          null,
          createElement(Backtick, {
            url: "https://example.com/map",
            modules: { react: React },
            packageVersions: { react: "19.2.3" },
          }),
        ),
      ),
    );
  } finally {
    console.error = error;
  }
  assert.equal(
    container.textContent,
    'The bundle requires "react-native-maps", which this app doesn\'t provide.',
  );
  await act(() => root.unmount());
});
