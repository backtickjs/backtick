import assert from "node:assert/strict";
import { test } from "node:test";
import * as estree from "../dist/estree.js";
import { generate } from "astring";

// An element lowers to a call of the client's `jsx`, read back as the
// JavaScript it prints as.

const text = (value: string) => estree.stringLiteral(value);

const element = (
  tag: string,
  attributes: Parameters<typeof estree.jsxElement>[2],
  children: ReturnType<typeof estree.jsxElement> | null,
): string =>
  generate(estree.jsxElement(null, tag, attributes, children)).replace(
    /\s+/g,
    " ",
  );

test("an element lowers to a call of jsx", () => {
  assert.equal(element("br", [], null), 'jsx("br", {})');
});

test("an attribute lowers to a prop under its own name", () => {
  assert.equal(
    element("td", [["class", text("col")]], null),
    'jsx("td", { class: "col" })',
  );
});

test("one literal child stands in the children prop itself", () => {
  assert.equal(
    element("td", [], text("one")),
    'jsx("td", { children: "one" })',
  );
});

test("several children are an array", () => {
  assert.equal(
    element("tr", [], {
      type: "ArrayExpression",
      elements: [text("one"), estree.identifier("two")],
    }),
    'jsx("tr", { children: ["one", () => two] })',
  );
});

test("a prop that can change is a function that reads it", () => {
  assert.equal(
    element("td", [["class", estree.identifier("name")]], null),
    'jsx("td", { class: () => name })',
  );
});

test("a function that is the value is marked fixed", () => {
  assert.equal(
    element("a", [["onclick", estree.thunk(text("go"))]], null),
    'jsx("a", { onclick: fixed(() => "go") })',
  );
});

test("an element holds an element as it is", () => {
  assert.equal(
    element("tr", [], estree.jsxElement(null, "td", [], null)),
    'jsx("tr", { children: jsx("td", {}) })',
  );
});
