import "global-jsdom/register";
import assert from "node:assert/strict";
import { rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { after, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { transpile } from "@backtickjs/compiler";
import { act } from "react";
import { createRoot } from "react-dom/client";
import ts from "typescript";
import { react } from "../dist/plugin.js";

// A page's own code: a client component, whose state is React's, used as a tag
// by a server component, twice over in a host fragment.
const source = `
import { cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";

const Counter = cs\`(props: { name: string }) => {
  const [count, setCount] = $useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Hello {props.name}! Clicked {count} times
    </button>
  );
}\`;

function Greeting({ name }: { name: string }) {
  return cs\`<p><$Counter name={$name} /></p>\`;
}

export const page = (
  <>
    <Greeting name="world" />
    <Greeting name="React" />
  </>
);
`;

// Written beside this file, so what they import resolves as a page's import
// map would resolve it: to the installed React.
const written: string[] = [];
const write = (name: string, code: string) => {
  const file = join(import.meta.dirname, name);
  writeFileSync(file, code);
  written.push(file);
  return file;
};
after(() => written.forEach((file) => rmSync(file)));

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

// A list of server components, each keyed on the host: React takes each key
// from what the component draws, so a list asks for none.
const listSource = `
import { cs } from "@backtickjs/core";

function Row({ name }: { name: string }) {
  return cs\`<li>{$name}</li>\`;
}

export const list = cs\`<ul>{\${["a", "b"].map((name) => <Row key={name} name={name} />)}}</ul>\`;
`;

it("keys what a keyed server component draws", async () => {
  const host = transpile(
    ts,
    "list.tsx",
    listSource,
    "@backtickjs/react",
    undefined,
    { plugins: [react()] },
  );
  const { list } = await import(write("list.host.tmp.mjs", host));
  const built = await bundler.build({
    input: list,
    external: { react: "19.3.0", "react-dom": "19.3.0" },
  });
  const { code } = built.generate({ format: "es" });
  const { default: drawn } = await import(write("list.client.tmp.mjs", code));

  const errors: unknown[] = [];
  const error = console.error;
  console.error = (...args: unknown[]) => errors.push(String(args[0]));
  try {
    const container = document.createElement("div");
    const root = createRoot(container);
    await act(() => root.render(drawn));
    assert.equal(container.innerHTML, "<ul><li>a</li><li>b</li></ul>");
    await act(() => root.unmount());
  } finally {
    console.error = error;
  }
  assert.deepEqual(errors, []);
});

it("draws a page with React, its state React's", async () => {
  const host = transpile(
    ts,
    "page.tsx",
    source,
    "@backtickjs/react",
    undefined,
    { plugins: [react()] },
  );
  const { page } = await import(write("page.host.tmp.mjs", host));
  const built = await bundler.build({
    input: page,
    external: { react: "19.3.0", "react-dom": "19.3.0" },
  });
  const { code } = built.generate({ format: "es" });
  const { default: drawn } = await import(write("page.client.tmp.mjs", code));

  const errors: unknown[] = [];
  const error = console.error;
  console.error = (...args: unknown[]) => errors.push(args);
  try {
    const container = document.createElement("div");
    const root = createRoot(container);
    await act(() => root.render(drawn));
    const buttons = () => [...container.querySelectorAll("button")];
    assert.deepEqual(
      buttons().map((button) => button.textContent),
      ["Hello world! Clicked 0 times", "Hello React! Clicked 0 times"],
    );
    await act(() => buttons()[1]!.click());
    await act(() => buttons()[1]!.click());
    assert.deepEqual(
      buttons().map((button) => button.textContent),
      ["Hello world! Clicked 0 times", "Hello React! Clicked 2 times"],
    );
    await act(() => root.unmount());
  } finally {
    console.error = error;
  }
  assert.deepEqual(errors, []);
});
