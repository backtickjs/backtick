import assert from "node:assert/strict";
import { test } from "node:test";
import { buildIr } from "../dist/ir/buildIr.js";
import type { IrArray, IrElement } from "../dist/ir/Ir.js";

// One element the host bound and used twice, which is what `lowerElement`
// memoizes: the `Ast` is already a DAG (see `expandJsxElement`), and without
// the memo lowering would walk it as a tree.
const leaf = { kind: "AstElement", id: "span", props: {} } as const;
const root = {
  kind: "AstElement",
  id: "div",
  props: { children: { kind: "AstArray", elements: [leaf, leaf] } },
} as const;

test("an element reached twice lowers once", () => {
  const ir = buildIr(root);
  assert.equal(ir.root.kind, "IrElement");
  const children = (ir.root as IrElement).props.children as IrArray;

  // Identity, not equality: two equal nodes would mean the shared arm was
  // lowered twice, which is what fans out exponentially when sharing nests.
  assert.equal(children.elements.length, 2);
  assert.equal(children.elements[0], children.elements[1]);
});
