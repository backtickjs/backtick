import assert from "node:assert/strict";
import { rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { after, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { transpile } from "@backtickjs/compiler";
import { react } from "@backtickjs/react/plugin";
import { evaluate } from "@backtickjs/react-native-client";
import * as React from "react";
import { act } from "react";
import * as JSXRuntime from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import * as ReactNativeWeb from "react-native-web";
import ts from "typescript";

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

const written: string[] = [];
after(() => written.forEach((file) => rmSync(file)));

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

// A known bug: each render reads the child's script anew, as a new function,
// so React remounts it and its count is lost. A todo until it's fixed, when
// the runner reports it passing.
it(
  "keeps a client component's state when its parent re-renders",
  { todo: "remounted on every render of its parent" },
  async () => {
    const host = transpile(
      ts,
      "screen.tsx",
      source,
      "@backtickjs/react",
      undefined,
      { plugins: [react()] },
    );
    const file = join(import.meta.dirname, "child-state.host.tmp.mjs");
    writeFileSync(file, host);
    written.push(file);
    const { screen } = await import(file);
    const built = await bundler.build({
      input: screen,
      packageVersions: { react: "19.2.3", "react-native": "0.86.3" },
    });
    const drawn = evaluate(built.generate({ format: "cjs" }).code, {
      react: React,
      "react/jsx-runtime": JSXRuntime,
      "react-native": ReactNativeWeb,
    }) as React.ReactNode;

    const container = document.createElement("div");
    const root = createRoot(container);
    const press = (id: string) =>
      act(async () =>
        (
          container.querySelector(`[data-testid="${id}"]`) as HTMLElement
        ).click(),
      );
    await act(async () => root.render(drawn));
    await press("child");
    assert.equal(container.textContent, "parent 0child 1");
    await press("parent");
    assert.equal(container.textContent, "parent 1child 1");
    await act(() => root.unmount());
  },
);
