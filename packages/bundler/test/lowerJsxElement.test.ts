import assert from "node:assert/strict";
import { test } from "node:test";
import type {
  ClientScriptExpression,
  ClientScriptJsxAttribute,
  ClientScriptJsxElement,
  ClientScriptStringLiteral,
} from "@backtickjs/boundary";
import { buildBundle } from "../dist/bundle/buildBundle.js";
import type { AstScript } from "../dist/ast/Ast.js";

// An element a script writes lowers to the node a tree entry builds. Nothing
// emits one yet — the compiler rewrites a script's JSX to unsupported syntax —
// so the node is written here by hand, which is what makes the lowering
// provable ahead of the rewrite that will produce it.

const loc = [1, 0, 1, 1] as const;

const text = (value: string): ClientScriptStringLiteral => ({
  kind: "string",
  loc: [...loc],
  text: value,
});

const element = (
  tag: string,
  attributes: readonly ClientScriptJsxAttribute[],
  children: readonly ClientScriptExpression[],
): ClientScriptJsxElement => ({
  kind: "jsx",
  loc: [...loc],
  type: text(tag),
  attributes,
  children,
});

// The body of the one script in a bundle, lowered.
const lower = (body: ClientScriptExpression) => {
  const script: AstScript = {
    kind: "AstScript",
    loc: [...loc],
    fileHash: "abc",
    splices: {},
    captures: [],
    expression: body,
  };
  // An entry is an arrow under a wrapper, and this one takes no parameters.
  return buildBundle(script).functions["0"][0][2];
};

test("an element lowers to the format's own element node", () => {
  assert.deepEqual(lower(element("br", [], [])), [
    "el",
    "br",
    {},
    null,
  ]);
});

test("an attribute lowers to a prop under its own name", () => {
  assert.deepEqual(
    lower(element("td", [{ name: "class", initializer: text("col") }], [])),
    ["el", "td", { class: "col" }, null],
  );
});

test("one child stands in the children slot itself", () => {
  assert.deepEqual(lower(element("td", [], [text("one")])), [
    "el",
    "td",
    {},
    "one",
  ]);
});

test("several children travel under a `ArrayLiteralExpression`", () => {
  assert.deepEqual(lower(element("tr", [], [text("one"), text("two")])), [
    "el",
    "tr",
    {},
    ["arr", ["one", "two"]],
  ]);
});

test("an element holds an element, as a child is an expression", () => {
  assert.deepEqual(lower(element("tr", [], [element("td", [], [])])), [
    "el",
    "tr",
    {},
    ["el", "td", {}, null],
  ]);
});
