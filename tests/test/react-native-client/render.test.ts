import assert from "node:assert/strict";
import { rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { after, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { transpile } from "@backtickjs/compiler";
import { react } from "@backtickjs/react/plugin";
import * as React from "react";
import { act, createElement, Suspense } from "react";
import * as JSXRuntime from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import * as ReactNativeWeb from "react-native-web";
import ts from "typescript";
import { Backtick, invalidate, preload } from "@backtickjs/react-native-client";

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

// Every test file shares one process, so the `fetch` each test stands in is
// put back once these are done.
const fetch = globalThis.fetch;
after(() => {
  globalThis.fetch = fetch;
});

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
        createElement(
          Suspense,
          { fallback: "loading" },
          createElement(Backtick, {
            url: "https://example.com/home",
            modules: {
              react: React,
              "react/jsx-runtime": JSXRuntime,
              "react-native": ReactNativeWeb,
            },
            packageVersions: { react: "19.2.3", "react-native": "0.86.3" },
          }),
        ),
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
          createElement(
            Suspense,
            { fallback: "loading" },
            createElement(Backtick, {
              url: "https://example.com/map",
              modules: { react: React },
              packageVersions: { react: "19.2.3" },
            }),
          ),
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

it("fetches every screen drawn, and keeps a failure until it's invalidated", async () => {
  const props = {
    url: "https://example.com/each",
    modules: { react: React },
    packageVersions: { react: "19.2.3" },
  };
  let requests = 0;
  let status = 200;
  globalThis.fetch = async () => {
    requests += 1;
    return new Response('module.exports = "drawn";', { status });
  };
  const draw = async () => {
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
            createElement(
              Suspense,
              { fallback: "loading" },
              createElement(Backtick, props),
            ),
          ),
        ),
      );
    } finally {
      console.error = error;
    }
    const text = container.textContent;
    await act(() => root.unmount());
    return text;
  };

  // Nothing is cached: each screen drawn fetches its own.
  assert.equal(await draw(), "drawn");
  assert.equal(await draw(), "drawn");
  assert.equal(requests, 2);

  // A failure is kept until it's invalidated, as an error boundary's reset
  // would, and the next screen drawn retries.
  status = 500;
  assert.equal(await draw(), "https://example.com/each answered 500.");
  status = 200;
  assert.equal(await draw(), "https://example.com/each answered 500.");
  invalidate(props.url);
  assert.equal(await draw(), "drawn");
  assert.equal(requests, 4);

  // A preload and the screen drawn after it share one request.
  preload(props);
  assert.equal(await draw(), "drawn");
  assert.equal(requests, 5);
});

it("keeps a screen while it's shown, and fetches when its url changes", async () => {
  let requests = 0;
  globalThis.fetch = async (url) => {
    requests += 1;
    return new Response(`module.exports = ${JSON.stringify(String(url))};`);
  };
  const screen = (url: string) =>
    createElement(
      Suspense,
      { fallback: "loading" },
      createElement(Backtick, {
        url,
        modules: { react: React },
        packageVersions: { react: "19.2.3" },
      }),
    );
  const container = document.createElement("div");
  const root = createRoot(container);
  await act(async () => root.render(screen("https://example.com/a")));
  await act(async () => root.render(screen("https://example.com/a")));
  assert.equal(container.textContent, "https://example.com/a");
  assert.equal(requests, 1);
  await act(async () => root.render(screen("https://example.com/b")));
  assert.equal(container.textContent, "https://example.com/b");
  assert.equal(requests, 2);
  await act(() => root.unmount());
});

it("preloads a screen before it's drawn, and never rejects on its own", async () => {
  const props = {
    url: "https://example.com/preloaded",
    modules: { react: React },
    packageVersions: { react: "19.2.3" },
  };
  let requests = 0;
  let status = 200;
  globalThis.fetch = async () => {
    requests += 1;
    return new Response('module.exports = "drawn";', { status });
  };

  // The request starts with the preload, and the screen drawn later reuses it.
  preload(props);
  assert.equal(requests, 1);
  const container = document.createElement("div");
  const root = createRoot(container);
  await act(async () =>
    root.render(
      createElement(
        Suspense,
        { fallback: "loading" },
        createElement(Backtick, props),
      ),
    ),
  );
  assert.equal(container.textContent, "drawn");
  assert.equal(requests, 1);
  await act(() => root.unmount());

  // A preload that fails reports nothing itself: the `<Backtick>` that draws
  // the screen throws it.
  const rejections: unknown[] = [];
  const onRejection = (reason: unknown) => rejections.push(reason);
  process.on("unhandledRejection", onRejection);
  try {
    status = 500;
    preload(props);
    await new Promise((resolve) => setTimeout(resolve, 10));
  } finally {
    process.off("unhandledRejection", onRejection);
  }
  assert.equal(requests, 2);
  assert.deepEqual(rejections, []);
});
