import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/core";
import { createFixtureLoader, fixturesRoot } from "./importFixture.ts";
import { evaluate, isTestNode, recordingHost } from "./test-client/index.ts";
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
  const node = evaluate(await bundler.run(script));
  assert.ok(isTestNode(node), "expected a rendered node");
  return node;
}

// The handler a prop holds, as the host would invoke it.
function handler(node: TestNode): () => void {
  const onclick = node.props.onclick;
  assert.equal(typeof onclick, "function", "expected an onclick handler");
  return onclick as () => void;
}

// The size a node's style names. The web's `style` is the attribute HTML has —
// a string — so what a cell holds is read back out of the CSS rather than off
// a member, which is what these fixtures wrote before the vocabulary moved.
function fontSize(node: TestNode): unknown {
  const style = node.props.style;
  assert.equal(typeof style, "string", "expected a style");
  const found = /font-size:\s*(\d+)px/.exec(style as string);
  return found === null ? undefined : Number(found[1]);
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

  // A list is declared, so the client walks the array itself and a member is
  // named by its own identity. What that has to buy is node identity: a row
  // that moved is the node it was, and a row that went took its own node with
  // it — neither is anything a snapshot of the drawn markup can see, so both
  // are asserted on the nodes these hold across the write.
  it("a reordered list moves the rows it already built", async () => {
    const view = await render("keyed-rows.tsx");
    const [swap, , list] = children(view);
    assert.ok(swap !== undefined && list !== undefined);
    assert.deepEqual(list.children.map(text), ["row 1", "row 2", "row 3"]);
    const [first, , third] = list.children;
    handler(swap)();
    assert.deepEqual(list.children.map(text), ["row 3", "row 2", "row 1"]);
    // The two that swapped are the nodes they were, at each other's places.
    assert.equal(list.children[0], third);
    assert.equal(list.children[2], first);
  });

  it("a list a row was dropped from draws the rest", async () => {
    const view = await render("keyed-rows.tsx");
    const [, drop, list] = children(view);
    assert.ok(drop !== undefined && list !== undefined);
    const [first, , third] = list.children;
    handler(drop)();
    assert.deepEqual(list.children.map(text), ["row 1", "row 3"]);
    // Only the row that went was touched; the rest kept their nodes.
    assert.deepEqual(list.children, [first, third]);
  });

  it("a moved row keeps its node and reads its new index", async () => {
    const view = await render("for-index.tsx");
    const [rotate, list] = children(view);
    assert.ok(rotate !== undefined && list !== undefined);
    assert.deepEqual(list.children.map(text), ["a at 0", "b at 1", "c at 2"]);
    const held = list.children[0];
    handler(rotate)();
    // Nothing about a member changed, so every row is the node it was — and
    // the index each one draws is the position it now sits at.
    assert.deepEqual(list.children.map(text), ["c at 0", "a at 1", "b at 2"]);
    assert.equal(list.children[1], held);
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

  // A prop re-runs when something it read was written, which is not the same as
  // holding anything new: a cell a whole list reads decides one row's prop, and
  // every other row recomputes the value it already had. The host hears about
  // the two that moved and nothing else — a write per row per selection is what
  // a list of any size would otherwise cost.
  it("a prop that recomputed to what it held is not set again", async () => {
    const script = await importFixture(validDir, "unmoved-prop.tsx");
    const { options, writes } = recordingHost();
    const view = evaluate(await bundler.run(script), options);
    assert.ok(isTestNode(view), "expected a rendered node");
    const [select, list] = children(view);
    assert.ok(select !== undefined && list !== undefined);
    const href = (): unknown[] => list.children.map((row) => row.props["href"]);
    assert.deepEqual(href(), ["#open", "#closed", "#closed"]);
    writes.length = 0;
    handler(select)();
    assert.deepEqual(href(), ["#closed", "#open", "#closed"]);
    // The row that was selected and the row now selected, in the order they
    // were built. The third row read the cell too, and had nothing to say.
    assert.deepEqual(
      writes.map(({ node, prop, value }) => [
        list.children.indexOf(node),
        prop,
        value,
      ]),
      [
        [0, "href", "#closed"],
        [1, "href", "#open"],
      ],
    );
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
