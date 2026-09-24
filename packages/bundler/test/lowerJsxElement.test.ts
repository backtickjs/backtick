import assert from "node:assert/strict";
import { test } from "node:test";
import type {
  ClientScriptExpression,
  ClientScriptJsxAttribute,
  ClientScriptJsxElement,
  ClientScriptStringLiteral,
} from "@backtickjs/client-script";
import { generate } from "astring";
import { buildBundle } from "../dist/bundle/buildBundle.js";
import type { AstScript } from "../dist/ast/Ast.js";

// An element a script writes lowers to a call of the client's `jsx`, written
// here by hand, and read back as the JavaScript it prints as.

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
  // An entry is an arrow, and this one takes no parameters.
  const [[, entry]] = buildBundle(script).functions;
  return generate(entry.body).replace(/\s+/g, " ");
};

test("an element lowers to a call of jsx", () => {
  assert.equal(lower(element("br", [], [])), 'jsx("br", {})');
});

test("an attribute lowers to a prop under its own name", () => {
  assert.equal(
    lower(element("td", [{ name: "class", initializer: text("col") }], [])),
    'jsx("td", { class: "col" })',
  );
});

test("one child stands in the children prop itself", () => {
  assert.equal(
    lower(element("td", [], [text("one")])),
    'jsx("td", { children: "one" })',
  );
});

test("several children are an array, read when the client asks", () => {
  assert.equal(
    lower(element("tr", [], [text("one"), text("two")])),
    'jsx("tr", { get children() { return ["one", "two"]; } })',
  );
});

test("an element holds an element, as a child is an expression", () => {
  assert.equal(
    lower(element("tr", [], [element("td", [], [])])),
    'jsx("tr", { get children() { return jsx("td", {}); } })',
  );
});
