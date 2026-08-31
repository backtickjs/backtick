import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import type { Bundle } from "@backtickjs/core";
import { bundler } from "@backtickjs/bundler";
import { render } from "@backtickjs/js-interpreter";
import { createFixtureLoader, fixturesRoot } from "./importFixture.ts";
import { testHost } from "./test-client/index.ts";
import type { TestNode } from "./test-client/index.ts";

// Where a render draws, and what it may move.
//
// An anchor is one of the target's children: drawn in front of, and kept in
// front of. What the host holds on either side of it is the host's, so a target
// is never a render's to empty — the anchor is what says where the drawing ends.
//
// The web is what wants this — a bundle leaves a comment where it stood and draws
// in front of it, so a page's own markup keeps its order — but nothing here is
// the web's: an anchor is one of the host's own nodes, so this is the same claim
// on every target.
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
  return bundler.run(await importFixture(validDir, "root-list.tsx"));
}

// The handler a prop holds, as the host would invoke it.
function handler(on: TestNode): () => void {
  const onclick = on.props.onclick;
  assert.equal(typeof onclick, "function", "expected an onclick handler");
  return onclick as () => void;
}

describe("where a render draws", () => {
  it("draws in front of its anchor", async () => {
    const before = node("header");
    const ends = node("comment");
    const after = node("footer");
    const parent = parentOf(before, ends, after);

    render(await rootList(), { renderer: testHost }, parent, ends);

    assert.deepEqual(
      parent.children.map((child) => child.id),
      ["header", "span", "span", "span", "span", "comment", "footer"],
    );
  });

  it("leaves alone what the host holds on either side", async () => {
    // A root that is a list, emptied. A render that claimed its target would
    // take every child the target has, the host's own included; what is drawn
    // is what goes.
    const before = node("header");
    const ends = node("comment");
    const after = node("footer");
    const parent = parentOf(before, ends, after);
    render(await rootList(), { renderer: testHost }, parent, ends);

    const clear = parent.children[1];
    assert.ok(clear !== undefined);
    handler(clear)();

    assert.deepEqual(
      parent.children.map((child) => child.id),
      ["header", "span", "comment", "footer"],
    );
    assert.equal(parent.children[0], before);
    assert.equal(parent.children.at(-1), after);
  });

  it("never claims a target it was given nothing else of", async () => {
    // An anchor is always a node, so the path that empties a whole target is
    // one this cannot take — an empty target holding only the anchor included.
    const ends = node("comment");
    const parent = parentOf(ends);
    render(await rootList(), { renderer: testHost }, parent, ends);

    const clear = parent.children[0];
    assert.ok(clear !== undefined);
    handler(clear)();

    assert.deepEqual(
      parent.children.map((child) => child.id),
      ["span", "comment"],
    );
  });

  it("holds two drawings apart in one target", async () => {
    // One page, two drawings: each at its own anchor, and a write to one leaves
    // the other where it is.
    const first = node("comment-1");
    const second = node("comment-2");
    const parent = parentOf(first, second);

    render(await rootList(), { renderer: testHost }, parent, first);
    render(await rootList(), { renderer: testHost }, parent, second);

    assert.deepEqual(
      parent.children.map((child) => child.id),
      [
        "span",
        "span",
        "span",
        "span",
        "comment-1",
        "span",
        "span",
        "span",
        "span",
        "comment-2",
      ],
    );

    // Everything from the first anchor onwards, as the nodes it is.
    const tail = parent.children.slice(parent.children.indexOf(first));
    const clear = parent.children[0];
    assert.ok(clear !== undefined);
    handler(clear)();

    // The first drawing shrank and the second is the nodes it was, in order.
    assert.deepEqual(
      parent.children.map((child) => child.id),
      ["span", "comment-1", "span", "span", "span", "span", "comment-2"],
    );
    assert.deepEqual(
      parent.children.slice(parent.children.indexOf(first)),
      tail,
    );
  });
});
