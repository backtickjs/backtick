import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import { bundle } from "@backtickjs/core";
import { createFixtureLoader, fixturesRoot } from "./importFixture.ts";
import { evaluate, isTestNode } from "./test-client/index.ts";
import type { TestNode } from "./test-client/index.ts";

// The behavior side of per-instance state: the `*.bundle` snapshots pin the
// wire shape, and these drive the reference client through it — a write has to
// persist, move everything that read the cell, and leave every other instance
// alone.
//
// The nodes are built once and never rebuilt, so the ones these tests hold are
// the ones a write moves: reading a prop again after a write is reading what
// the host was told, which is the whole of what a host would have drawn.
const validDir = join(fixturesRoot, "valid");
const importFixture = createFixtureLoader("state");

async function render(file: string): Promise<TestNode> {
  const script = await importFixture(validDir, file);
  const node = evaluate(await bundle(script));
  assert.ok(isTestNode(node), "expected a rendered node");
  return node;
}

// The handler a prop holds, as the host would invoke it.
function handler(node: TestNode): () => void {
  const onPress = node.props.onPress;
  assert.equal(typeof onPress, "function", "expected an onPress handler");
  return onPress as () => void;
}

function fontSize(node: TestNode): unknown {
  const style = node.props.style;
  assert.ok(style !== null && typeof style === "object", "expected a style");
  return (style as { fontSize?: unknown }).fontSize;
}

// What a node says, as its text child holds it.
function text(node: TestNode): unknown {
  return node.children[0]?.text;
}

function children(node: TestNode): TestNode[] {
  assert.ok(node.children.length > 0, "expected several children");
  return node.children;
}

describe("local state", () => {
  it("renders the cell's initial value", async () => {
    const text = await render("local-state.tsx");
    assert.equal(fontSize(text), 16);
  });

  it("a write persists and re-renders the instance", async () => {
    const text = await render("local-state.tsx");
    handler(text)();
    assert.equal(fontSize(text), 17);
  });

  it("the display and the handler share one cell", async () => {
    const text = await render("local-state.tsx");
    // Each write reads the value the previous one stored — the handler's
    // `read()` and the display's are the same cell, not two snapshots.
    handler(text)();
    handler(text)();
    handler(text)();
    assert.equal(fontSize(text), 19);
  });

  it("a handle captured before a write keeps working after it", async () => {
    const text = await render("local-state.tsx");
    // The host holds the handler across re-renders; the handle resolves its
    // cell by name at call time, so the stale closure still writes the
    // instance's live storage.
    const stale = handler(text);
    handler(text)();
    stale();
    assert.equal(fontSize(text), 18);
  });

  it("two invocations of one component hold independent cells", async () => {
    const view = await render("local-state-instances.tsx");
    const [first, second] = children(view);
    assert.ok(first !== undefined && second !== undefined);
    assert.equal(fontSize(first), 16);
    assert.equal(fontSize(second), 16);
    handler(first)();
    assert.equal(fontSize(first), 17);
    assert.equal(fontSize(second), 16);
  });

  it("a cell passed as a prop is one storage, shared by both children", async () => {
    const view = await render("local-state-prop.tsx");
    const [first, second] = children(view);
    assert.ok(first !== undefined && second !== undefined);
    assert.equal(fontSize(first), 16);
    assert.equal(fontSize(second), 16);
    // The parent declared the cell and handed it to both, so a write through
    // one child's handle moves the other's display too.
    handler(first)();
    assert.equal(fontSize(first), 17);
    assert.equal(fontSize(second), 17);
  });

  it("`update` derives the next value from the current one", async () => {
    const text = await render("local-state-update.tsx");
    assert.equal(fontSize(text), 16);
    handler(text)();
    assert.equal(fontSize(text), 17);
    handler(text)();
    assert.equal(fontSize(text), 18);
  });

  // A list is drawn again from nothing whenever what it was built from
  // changes: there is no node in the format saying a children position is a
  // list, so a client is handed a finished one and has nothing to match it
  // against. What that costs is written down in `PLAN.md`; what it has to keep
  // is that the list is right afterwards, which is what these two check.
  //
  // The assertions a `For` would add back are about identity — that a row which
  // moved is the node it was, and that a row which went took its own node with
  // it. Neither holds here, and neither is asserted.
  it("a reordered list draws the rows it was left with", async () => {
    const view = await render("keyed-rows.tsx");
    const [swap, , list] = children(view);
    assert.ok(swap !== undefined && list !== undefined);
    assert.deepEqual(list.children.map(text), ["row 1", "row 2", "row 3"]);
    handler(swap)();
    assert.deepEqual(list.children.map(text), ["row 3", "row 2", "row 1"]);
  });

  it("a list a row was dropped from draws the rest", async () => {
    const view = await render("keyed-rows.tsx");
    const [, drop, list] = children(view);
    assert.ok(drop !== undefined && list !== undefined);
    handler(drop)();
    assert.deepEqual(list.children.map(text), ["row 1", "row 3"]);
  });

  it("a child redraws everything it read of a cell it was handed", async () => {
    const view = await render("local-state-child-reads.tsx");
    const [button, ...rows] = children(view);
    assert.ok(button !== undefined && rows.length === 2);
    // Nothing either row was given changes across the write — the same handle
    // object and the same id — so every assertion here is one the arguments
    // alone cannot answer. A prop, a text child, and a branch, per row.
    assert.deepEqual(rows.map(readRow), [
      { size: 20, text: "row 0 of 0", marked: true },
      { size: 16, text: "row 1 of 0", marked: false },
    ]);
    handler(button)();
    assert.deepEqual(rows.map(readRow), [
      { size: 16, text: "row 0 of 1", marked: false },
      { size: 20, text: "row 1 of 1", marked: true },
    ]);
  });
});

// What one row of `local-state-child-reads.tsx` draws, in the three positions
// it read the cell from: a prop, a text child, and a branch.
function readRow(row: TestNode): {
  size: unknown;
  text: unknown;
  marked: boolean;
} {
  const [label, marker] = children(row);
  assert.ok(label !== undefined, "expected a label");
  return {
    size: fontSize(label),
    text: label.children[0]?.text,
    marked: marker !== undefined,
  };
}
