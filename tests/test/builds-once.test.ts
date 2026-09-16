import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { createFixtureLoader, fixturesRoot } from "./importFixture.ts";
import { evaluate, isNode } from "@backtickjs/test-vm";
import type { Element, Node } from "@backtickjs/test-vm";

// A component is built once, however what it drew changes afterwards.
//
// `insert` reads what it was given inside the computation it makes, so a member
// that answers with a way of asking used to tie the two together: what it drew
// changing ran the expression that made it, which was the component again —
// with new cells, and whatever it did on the way in done over.
//
// Two of them answer that way, and both are here: a bundle drawn where it
// stands, and a list. The list is the one that says where the fault was — a
// drawn bundle is not special, so neither is the fix.
//
// Driven rather than snapshotted, because what is wrong is not what was drawn
// but how many times it was: a drawing that settles and one that never does
// look the same in a snapshot of either.
const validDir = join(fixturesRoot, "valid");
const importFixture = createFixtureLoader("backtick");

// Read off the drawing the way a page would: by tag, in document order.
function find(node: Node, tag: string): Element | undefined {
  return all(node, tag)[0];
}

function all(node: Node, tag: string): Element[] {
  const element = node as unknown as Element;
  return [
    ...(element.tagName?.toLowerCase() === tag ? [element] : []),
    ...[...node.childNodes].flatMap((child) => all(child, tag)),
  ];
}

function text(node: Node | undefined): unknown {
  return node?.firstChild?.nodeValue;
}

function count(node: Node, tag: string): number {
  return all(node, tag).length;
}

describe("a component that draws a bundle", () => {
  it("is built once, and draws what arrives", async () => {
    const script = await importFixture(validDir, "vm-eval-builds-once.tsx");
    const drawn = evaluate(await bundler.run(script));
    assert.ok(isNode(drawn), "expected a rendered node");

    // Nothing to draw yet, and the wait has not been made twice.
    assert.equal(text(find(drawn, "span")), "asked 0");
    assert.equal(find(drawn, "em"), undefined);

    // Long enough for the timer the component set, and for a component built
    // again to have set another.
    await new Promise((settle) => setTimeout(settle, 100));

    assert.equal(text(find(drawn, "em")), "answered");
    assert.equal(
      text(find(drawn, "span")),
      "asked 1",
      "the component was built again for what it drew",
    );
  });
});

describe("a component that draws a list", () => {
  // The same claim with no bundle in it: `<For />` answers with a way of asking
  // too, so a fault in what draws a bundle would leave this alone.
  it("is built once, and draws what arrives", async () => {
    const script = await importFixture(validDir, "for-builds-once.tsx");
    const drawn = evaluate(await bundler.run(script));
    assert.ok(isNode(drawn), "expected a rendered node");

    assert.equal(text(find(drawn, "span")), "asked 0");

    await new Promise((settle) => setTimeout(settle, 100));

    assert.equal(count(drawn, "em"), 2);
    assert.equal(
      text(find(drawn, "span")),
      "asked 1",
      "the component was built again for what it drew",
    );
  });
});
