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
  assert.deepEqual(element.props, { style: { padding: 8 } });
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
