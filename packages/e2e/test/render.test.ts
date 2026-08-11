import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import { bundle, type Bundle } from "@backtickjs/core";
import { render } from "@backtickjs/js-interpreter";
import { createFixtureLoader, fixturesRoot } from "./importFixture.ts";
import { testHost } from "./test-client/index.ts";
import type { TestNode } from "./test-client/index.ts";

// What a render claims of the target it is given.
//
// A target with nothing in it is this one's to fill, and claiming it is the
// cheaper path. A target the host is already holding something in is not: what
// was drawn is what may be moved, and the rest stays.
//
// The web is what wants this — an island draws into an element of the page's
// own, beside whatever else the page put there — but nothing here is the web's:
// the target is one of the host's own nodes, so this is the same claim on every
// target.
const validDir = join(fixturesRoot, "valid");
const importFixture = createFixtureLoader("render");

function node(id: string): TestNode {
  return { id, props: {}, children: [], parent: null, text: null };
}

// A target holding the nodes named, in that order, as a parsed document would.
function parentOf(...held: TestNode[]): TestNode {
  const parent = node("main");
  for (const child of held) {
    child.parent = parent;
    parent.children.push(child);
  }
  return parent;
}

// A list at the root, so a write moves children of the target itself.
async function rootList(): Promise<Bundle> {
  return bundle(await importFixture(validDir, "root-list.tsx"));
}

// The handler a prop holds, as the host would invoke it.
function handler(on: TestNode): () => void {
  const onclick = on.props.onclick;
  assert.equal(typeof onclick, "function", "expected an onclick handler");
  return onclick as () => void;
}

describe("what a render claims of its target", () => {
  it("draws into the back of what the host is holding", async () => {
    const before = node("header");
    const parent = parentOf(before);
    render(await rootList(), testHost, parent);
    assert.deepEqual(
      parent.children.map((child) => child.id),
      ["header", "span", "span", "span", "span"],
    );
  });

  it("leaves alone what the target was already holding", async () => {
    // A root that is a list, emptied: with a claim to the whole target this
    // takes every child the target has, the host's own included. What is drawn
    // is what goes.
    const before = node("header");
    const parent = parentOf(before);
    render(await rootList(), testHost, parent);

    const clear = parent.children[1];
    assert.ok(clear !== undefined);
    handler(clear)();

    assert.deepEqual(
      parent.children.map((child) => child.id),
      ["header", "span"],
    );
    assert.equal(parent.children[0], before);
  });

  it("claims the target when it is holding nothing", async () => {
    // Nothing to protect, so the cheaper path: what is drawn is every child
    // there is, and emptying the list leaves the target empty.
    const parent = parentOf();
    render(await rootList(), testHost, parent);
    assert.deepEqual(
      parent.children.map((child) => child.id),
      ["span", "span", "span", "span"],
    );

    const clear = parent.children[0];
    assert.ok(clear !== undefined);
    handler(clear)();

    assert.deepEqual(
      parent.children.map((child) => child.id),
      ["span"],
    );
  });
});
