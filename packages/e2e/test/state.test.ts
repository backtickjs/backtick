import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import { bundle } from "@backtickjs/core";
import { createFixtureLoader, fixturesRoot } from "./importFixture.ts";
import { evaluate, isElement } from "./test-client/index.ts";
import type { Change, Element } from "./test-client/index.ts";

// The behavior side of per-instance state: the `*.bundle` snapshots pin the
// wire shape, and these drive the reference client through it — a write has to
// persist, re-render the instance that owns the cell, and leave every other
// instance alone.
const validDir = join(fixturesRoot, "valid");
const importFixture = createFixtureLoader("state");

async function render(file: string, changes?: Change[]): Promise<Element> {
  const script = await importFixture(validDir, file);
  const element = evaluate(await bundle(script), (change) =>
    changes?.push(change),
  );
  assert.ok(isElement(element), "expected a rendered element");
  return element;
}

// The handler a prop holds, as the host would invoke it.
function handler(element: Element): () => void {
  const onPress = element.props.onPress;
  assert.equal(typeof onPress, "function", "expected an onPress handler");
  return onPress as () => void;
}

function fontSize(element: Element): unknown {
  const style = element.props.style;
  assert.ok(style !== null && typeof style === "object", "expected a style");
  return (style as { fontSize?: unknown }).fontSize;
}

function children(element: Element): Element[] {
  const value = element.props.children;
  assert.ok(Array.isArray(value), "expected several children");
  return value.flat(Infinity) as Element[];
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

  it("one write is one shape, however many instances redrew for it", async () => {
    const changes: Change[] = [];
    const view = await render("local-state-child-reads.tsx", changes);
    const [button] = children(view);
    assert.ok(button !== undefined);
    // Both rows re-render — each read the cell in a branch, and each is its own
    // computation. The host re-reads the tree from the root either way, so
    // being told twice is one redraw of a tree that is already right.
    handler(button)();
    assert.deepEqual(
      changes.filter((change) => change.kind === "shape").length,
      1,
    );
  });
});

// What one row of `local-state-child-reads.tsx` draws, in the three positions
// it read the cell from: a prop, a text child, and a branch.
function readRow(row: Element): {
  size: unknown;
  text: unknown;
  marked: boolean;
} {
  const [label, marker] = children(row);
  assert.ok(label !== undefined, "expected a label");
  return {
    size: fontSize(label),
    text: label.props.children,
    marked: marker !== null && marker !== undefined,
  };
}
