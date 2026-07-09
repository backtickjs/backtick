import assert from "node:assert/strict";
import { test } from "node:test";
import type { SourceLocation, Visitor } from "../../dist/cs-runtime/index.js";
import { cs } from "../../dist/cs-runtime/index.js";
import { bundle } from "../../dist/jit-bundler/index.js";
import { jsx, jsxs } from "../../dist/jsx-runtime/index.js";

// Each call returns a fresh location so handcrafted scripts intern as distinct
// entries; a test that wants one shared body reuses a single location.
let nextLine = 0;
function loc(): SourceLocation {
  nextLine += 1;
  return {
    path: "bundle.test.tsx",
    start: { line: nextLine, character: 0 },
    end: { line: nextLine, character: 80 },
  };
}

test("a static JSX tree bundles as a JSON tree entry", () => {
  const element = jsxs("flexbox", {
    direction: "row",
    children: [jsx("label", { text: "hi" }, "a")],
  });
  const out = JSON.parse(bundle(element));
  assert.deepEqual(out, {
    functions: {},
    trees: {
      "#t0": {
        element: {
          type: "flexbox",
          key: null,
          props: {
            direction: "row",
            children: [{ type: "label", key: "a", props: { text: "hi" } }],
          },
        },
      },
    },
    root: { $call: "#t0", args: [] },
  });
});

test("a script prop calls the function table from the tree", () => {
  const l = loc();
  const handler = cs.create(
    l,
    { splices: [], captures: ["console"], declarations: [] },
    <U>(v: Visitor<U>) =>
      v.arrow(
        l,
        [],
        v.call(
          l,
          v.propertyAccess(l, v.identifier(l, "console", "console"), "log"),
          [v.string(l, "hi")],
        ),
      ),
  );
  const element = jsx("button", { onClick: handler });
  const out = JSON.parse(bundle(element));
  assert.deepEqual(out, {
    functions: { "#f0": '(console) => () => console.log("hi")' },
    trees: {
      "#t0": {
        element: {
          type: "button",
          key: null,
          props: {
            onClick: { $call: "#f0", args: [{ $global: "console" }] },
          },
        },
      },
    },
    root: { $call: "#t0", args: [] },
  });
});

test("a capture declared outside the tree threads through a slot", () => {
  const innerLoc = loc();
  const inner = cs.create(
    innerLoc,
    { splices: [], captures: ["x$test$1"], declarations: [] },
    <U>(v: Visitor<U>) =>
      v.arrow(innerLoc, [], v.identifier(innerLoc, "x", "x$test$1")),
  );
  const element = jsx("button", { onClick: inner });
  const outerLoc = loc();
  const outer = cs.create(
    outerLoc,
    { splices: [element], captures: [], declarations: ["x$test$1"] },
    <U>(v: Visitor<U>) =>
      v.arrow(
        outerLoc,
        [],
        v.block(outerLoc, [
          v.variableDeclaration(
            outerLoc,
            "const",
            v.identifier(outerLoc, "x", "x$test$1"),
            v.number(outerLoc, 1),
          ),
          v.return(outerLoc, v.splice(outerLoc, 0)),
        ]),
      ),
  );
  const out = JSON.parse(bundle(outer));
  assert.deepEqual(out, {
    functions: {
      "#f0": "() => () => { const x = 1; return #t0(x); }",
      "#f1": "(x) => () => x",
    },
    trees: {
      "#t0": {
        element: {
          type: "button",
          key: null,
          props: { onClick: { $call: "#f1", args: [{ $slot: 0 }] } },
        },
      },
    },
    root: { $call: "#f0", args: [] },
  });
});

test("a shared subtree hoists into its own entry", () => {
  const shared = jsx("label", { text: "hi" });
  const parent = jsxs("flexbox", { children: [shared, shared] });
  const out = JSON.parse(bundle(parent));
  assert.deepEqual(out.trees, {
    "#t0": { element: { type: "label", key: null, props: { text: "hi" } } },
    "#t1": {
      element: {
        type: "flexbox",
        key: null,
        props: {
          children: [
            { $call: "#t0", args: [] },
            { $call: "#t0", args: [] },
          ],
        },
      },
    },
  });
  assert.deepEqual(out.root, { $call: "#t1", args: [] });
});

test("a polymorphic script prop threads its splices as thunks", () => {
  const l = loc();
  const make = (n: number) =>
    cs.create(
      l,
      { splices: [n], captures: [], declarations: [] },
      <U>(v: Visitor<U>) => v.arrow(l, [], v.splice(l, 0)),
    );
  const element = jsx("button", { onA: make(1), onB: make(2) });
  const out = JSON.parse(bundle(element));
  assert.deepEqual(out.functions, { "#f0": "($0) => () => $0()" });
  assert.deepEqual(out.trees["#t0"].element.props, {
    onA: { $call: "#f0", args: [{ $thunk: 1 }] },
    onB: { $call: "#f0", args: [{ $thunk: 2 }] },
  });
});

test("a plain object prop can't use a reserved key", () => {
  const element = jsx("flexbox", { data: { $call: "#f0" } });
  assert.throws(() => bundle(element), /reserved/);
});

test("a plain object prop can't look like an element node", () => {
  const element = jsx("flexbox", { data: { type: "x", key: null, props: {} } });
  assert.throws(() => bundle(element), /element node/);
});
