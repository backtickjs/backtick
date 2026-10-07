import { rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { after } from "node:test";
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

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

const written: string[] = [];
after(() => written.forEach((file) => rmSync(file)));

// A screen written for React Native, from its source: compiled with React's
// plugin, its `screen` export bundled for the app, run with
// `react-native-web` in place of React Native, and drawn. `press` taps what
// has a `testID`.
export async function drawReactNative(name: string, source: string) {
  const host = transpile(
    ts,
    `${name}.tsx`,
    source,
    "@backtickjs/react",
    undefined,
    {
      plugins: [react()],
    },
  );
  const file = join(import.meta.dirname, `${name}.host.tmp.mjs`);
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
  await act(async () => root.render(drawn));
  return {
    container,
    press: (id: string) =>
      act(async () =>
        (
          container.querySelector(`[data-testid="${id}"]`) as HTMLElement
        ).click(),
      ),
    unmount: () => act(() => root.unmount()),
  };
}
