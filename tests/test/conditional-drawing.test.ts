import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { createFixtureLoader, fixturesRoot } from "./importFixture.ts";
import { evaluate, isTestNode } from "@backtickjs/test-vm";
import type { TestNode } from "@backtickjs/test-vm";

// A block whose drawing is a conditional, and a write that answers it.
//
// Two claims, because a fix that only meets one is worse than none: the
// component is built once, and what it draws changes. Stopping the rebuild by
// never running the block again would pass the first and leave the page on the
// branch it started with.
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

describe("a component whose drawing is a conditional", () => {
  it("is built once, and draws the branch the write chose", async () => {
    const script = await importFixture(validDir, "conditional-drawing.tsx");
    const drawn = evaluate(await bundler.run(script));
    assert.ok(isTestNode(drawn), "expected a rendered node");

    // Nothing has answered the condition yet: the count is of blocks that have
    // reached their timer, and the first has not.
    assert.equal(text(find(drawn, "span")), "builds 0");
    assert.equal(text(find(drawn, "i")), "waiting");

    // Long enough for the timer the component set, and for a component built
    // again to have set another.
    await new Promise((settle) => setTimeout(settle, 100));

    assert.equal(
      text(find(drawn, "span")),
      "builds 1",
      "the component was built again for what it drew",
    );
    assert.equal(
      text(find(drawn, "em")),
      "shown",
      "the conditional did not draw the branch the write chose",
    );
    assert.equal(find(drawn, "i"), undefined);
  });
});
