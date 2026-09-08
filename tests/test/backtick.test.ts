import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { createFixtureLoader, fixturesRoot } from "./importFixture.ts";
import { evaluate, isTestNode } from "./test-client/index.ts";
import type { TestNode } from "./test-client/index.ts";

// A component is built once, however what it drew changes afterwards.
//
// The one that catches this is a component drawing a bundle it is still waiting
// for: `insert` reads what it was given inside the computation it makes, so a
// drawing that watches itself used to tie the two together — the answer
// arriving ran the expression that made the drawing, which was the component
// again, with new cells and the wait started over.
//
// Driven rather than snapshotted, because what is wrong is not what was drawn
// but how many times it was: a drawing that settles and one that never does
// look the same in a snapshot of either.
const validDir = join(fixturesRoot, "valid");
const importFixture = createFixtureLoader("backtick");

function find(node: TestNode, id: string): TestNode | undefined {
  if (node.id === id) {
    return node;
  }
  for (const child of node.children) {
    const found = find(child, id);
    if (found !== undefined) {
      return found;
    }
  }
  return undefined;
}

function text(node: TestNode | undefined): unknown {
  return node?.children[0]?.text;
}

describe("a component that draws a bundle", () => {
  it("is built once, and draws what arrives", async () => {
    const script = await importFixture(validDir, "backtick-builds-once.tsx");
    const drawn = evaluate(await bundler.run(script));
    assert.ok(isTestNode(drawn), "expected a rendered node");

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
