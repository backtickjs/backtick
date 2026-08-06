import assert from "node:assert/strict";
import { test } from "node:test";
import { SyntaxKind } from "@backtickjs/cs-runtime";
import type {
  ClientScriptExpression,
  ClientScriptJsxAttribute,
  ClientScriptJsxElement,
} from "@backtickjs/cs-runtime";
import { NodeKind } from "../dist/bundle/Bundle.js";
import { buildBundle } from "../dist/bundle/buildBundle.js";
import type { Ir, IrScriptEntry } from "../dist/ir/Ir.js";

// An element a script writes lowers to the node a tree entry builds. Nothing
// emits one yet — the compiler rewrites a script's JSX to unsupported syntax —
// so the node is written here by hand, which is what makes the lowering
// provable ahead of the rewrite that will produce it.

const loc = [1, 0, 1, 1] as const;

const element = (
  tagName: string,
  attributes: readonly ClientScriptJsxAttribute[],
  children: readonly ClientScriptExpression[],
): ClientScriptJsxElement => ({
  kind: SyntaxKind.JsxElement,
  loc: [...loc],
  tagName,
  attributes,
  children,
});

const text = (value: string): ClientScriptExpression => ({
  kind: SyntaxKind.StringLiteral,
  loc: [...loc],
  text: value,
});

// The body of the one script in a bundle, lowered.
const lower = (body: ClientScriptExpression) => {
  const entry: IrScriptEntry = {
    kind: "IrScriptEntry",
    loc: [...loc],
    fileHash: "abc",
    splices: [],
    captures: [],
    spliceParams: {},
    body,
  };
  const ir: Ir = {
    scripts: [entry],
    trees: [],
    root: { kind: "IrScriptRef", target: entry, args: [] },
  };
  // An entry is an arrow under a wrapper, and this one takes no parameters.
  return buildBundle(ir).functions["0"][0][2];
};

test("an element lowers to the format's own element node", () => {
  assert.deepEqual(lower(element("br", [], [])), [
    NodeKind.Element,
    "br",
    {},
    null,
  ]);
});

test("an attribute lowers to a prop under its own name", () => {
  assert.deepEqual(
    lower(element("td", [{ name: "class", initializer: text("col") }], [])),
    [NodeKind.Element, "td", { class: "col" }, null],
  );
});

test("one child stands in the children slot itself", () => {
  assert.deepEqual(lower(element("td", [], [text("one")])), [
    NodeKind.Element,
    "td",
    {},
    "one",
  ]);
});

test("several children travel under a `DataArray`", () => {
  assert.deepEqual(lower(element("tr", [], [text("one"), text("two")])), [
    NodeKind.Element,
    "tr",
    {},
    [NodeKind.DataArray, ["one", "two"]],
  ]);
});

test("an element holds an element, as a child is an expression", () => {
  assert.deepEqual(lower(element("tr", [], [element("td", [], [])])), [
    NodeKind.Element,
    "tr",
    {},
    [NodeKind.Element, "td", {}, null],
  ]);
});
