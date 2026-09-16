import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { createFixtureLoader, fixturesRoot } from "./importFixture.ts";
import { evaluate, isNode } from "@backtickjs/test-vm";
import type { Element, Node } from "@backtickjs/test-vm";

// A block whose drawing is a conditional, and a write that answers it.
//
// Two claims, because a fix that only meets one is worse than none: the
// component is built once, and what it draws changes. Stopping the rebuild by
// never running the block again would pass the first and leave the page on the
// branch it started with.
const validDir = join(fixturesRoot, "valid");
const importFixture = createFixtureLoader("backtick");

// Read off the drawing the way a page would: by tag, in document order.
function find(node: Node, tag: string): Element | undefined {
  const element = node as unknown as Element;
  if (element.tagName?.toLowerCase() === tag) {
    return element;
  }
  for (const child of node.childNodes) {
    const found = find(child, tag);
    if (found !== undefined) {
      return found;
    }
  }
  return undefined;
}

function text(node: Node | undefined): unknown {
  return node?.firstChild?.nodeValue;
}

describe("a component whose drawing is a conditional", () => {
  it("is built once, and draws the branch the write chose", async () => {
    const script = await importFixture(validDir, "conditional-drawing.tsx");
    const drawn = evaluate(await bundler.run(script));
    assert.ok(isNode(drawn), "expected a rendered node");

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
