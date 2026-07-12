import assert from "node:assert/strict";
import { test } from "node:test";
import { isClientElement } from "../dist/cs-runtime/index.js";
import { jsx, jsxs } from "../dist/jsx-runtime/index.js";

test("jsx builds a flexbox element", () => {
  const element = jsx("flexbox", { direction: "row" });
  assert.ok(isClientElement(element));
  assert.equal(element.type, "flexbox");
  assert.equal(element.key, null);
  assert.deepEqual(element.props, { direction: "row" });
});

test("jsx carries an element key", () => {
  assert.equal(jsx("flexbox", {}, "a").key, "a");
  assert.equal(jsx("flexbox", {}, 0).key, 0);
});

test("jsx keeps children as a prop", () => {
  const child = jsx("flexbox", {});
  const element = jsx("flexbox", { children: child });
  assert.deepEqual(element.props, { children: child });
});

test("jsxs keeps a static children array", () => {
  const one = jsx("flexbox", {});
  const two = jsx("flexbox", {});
  const element = jsxs("flexbox", { children: [one, two] });
  assert.deepEqual(element.props.children, [one, two]);
});

test("jsx rejects a key that isn't a string or number", () => {
  assert.throws(
    // @ts-expect-error -- deliberately bypasses the key type to hit the runtime check
    () => jsx("flexbox", {}, {}),
    /Key must be a string or a number/,
  );
});
