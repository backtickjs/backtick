import assert from "node:assert/strict";
import { test } from "node:test";
import { isJsxElement } from "@backtickjs/cs-runtime";
import { View } from "../dist/index.js";
import { jsx, jsxs } from "../dist/jsx-runtime/index.js";

test("jsx builds an element from a component", () => {
  const element = jsx(View, { style: { padding: 8 } });
  assert.ok(isJsxElement(element));
  // the tag is stored as written; bundling is what resolves it to a name
  assert.equal(element.type, View);
  assert.equal(element.key, null);
  assert.deepEqual(element.props, { style: { padding: 8 } });
});

test("jsx carries an element key", () => {
  assert.equal(jsx(View, {}, "a").key, "a");
  assert.equal(jsx(View, {}, 0).key, 0);
});

test("jsx keeps children as a prop", () => {
  const child = jsx(View, {});
  const element = jsx(View, { children: child });
  assert.deepEqual(element.props, { children: child });
});

test("jsxs keeps a static children array", () => {
  const one = jsx(View, {});
  const two = jsx(View, {});
  const element = jsxs(View, { children: [one, two] });
  assert.deepEqual(element.props.children, [one, two]);
});

test("jsx rejects a key that isn't a string, number, or client value", () => {
  assert.throws(
    // @ts-expect-error -- a symbol is neither a primitive key nor spliceable
    () => jsx(View, {}, Symbol("nope")),
    /Key must be a string, a number, or a client value/,
  );
});
