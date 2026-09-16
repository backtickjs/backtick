import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import { render, userEvent } from "@backtickjs/test-vm";
import { createFixtureLoader, fixturesRoot } from "./importFixture.ts";

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

// What a fixture drew, as the one element it put in the page.
async function drawn(file: string): Promise<Element> {
  const { container } = await render(await importFixture(validDir, file));
  const node = container.firstElementChild;
  assert.ok(node !== null, "expected a rendered element");
  return node;
}

// The size a node's style names. The web's `style` is the attribute HTML has —
// a string — so what a cell holds is read back out of the CSS rather than off
// a member, which is what these fixtures wrote before the vocabulary moved.
function fontSize(node: Element): unknown {
  const style = node.getAttribute("style");
  assert.equal(typeof style, "string", "expected a style");
  const found = /font-size:\s*(\d+)px/.exec(style as string);
  return found === null ? undefined : Number(found[1]);
}

// What a node says, as the document holds it.
function text(node: Node): unknown {
  return node.firstChild?.nodeValue;
}

function children(node: Element): Element[] {
  const held = [...node.children];
  assert.ok(held.length > 0, "expected several children");
  return held;
}

describe("local state", () => {
  it("renders the cell's initial value", async () => {
    const text = await drawn("local-state.tsx");
    assert.equal(fontSize(text), 16);
  });

  it("a write persists and re-renders the instance", async () => {
    const text = await drawn("local-state.tsx");
    await userEvent.click(text);
    assert.equal(fontSize(text), 17);
  });

  it("the display and the handler share one cell", async () => {
    const text = await drawn("local-state.tsx");
    // Each write reads the value the previous one stored — the handler's
    // `read()` and the display's are the same cell, not two snapshots.
    await userEvent.click(text);
    await userEvent.click(text);
    await userEvent.click(text);
    assert.equal(fontSize(text), 19);
  });

  it("a handle captured before a write keeps working after it", async () => {
    const text = await drawn("local-state.tsx");
    // The host holds the handler across re-renders; the handle resolves its
    // cell by name at call time, so the stale closure still writes the
    // instance's live storage.
    // One registration per event, reading whatever the prop holds now — so the
    // click after a write runs the handler the write left behind, not the one
    // that was registered first.
    await userEvent.click(text);
    await userEvent.click(text);
    assert.equal(fontSize(text), 18);
  });

  it("two invocations of one component hold independent cells", async () => {
    const view = await drawn("local-state-instances.tsx");
    const [first, second] = children(view);
    assert.ok(first !== undefined && second !== undefined);
    assert.equal(fontSize(first), 16);
    assert.equal(fontSize(second), 16);
    await userEvent.click(first);
    assert.equal(fontSize(first), 17);
    assert.equal(fontSize(second), 16);
  });

  it("a cell passed as a prop is one storage, shared by both children", async () => {
    const view = await drawn("local-state-prop.tsx");
    const [first, second] = children(view);
    assert.ok(first !== undefined && second !== undefined);
    assert.equal(fontSize(first), 16);
    assert.equal(fontSize(second), 16);
    // The parent declared the cell and handed it to both, so a write through
    // one child's handle moves the other's display too.
    await userEvent.click(first);
    assert.equal(fontSize(first), 17);
    assert.equal(fontSize(second), 17);
  });

  it("`update` derives the next value from the current one", async () => {
    const text = await drawn("local-state-update.tsx");
    assert.equal(fontSize(text), 16);
    await userEvent.click(text);
    assert.equal(fontSize(text), 17);
    await userEvent.click(text);
    assert.equal(fontSize(text), 18);
  });

  // A list is declared, so the client walks the array itself and a member is
  // named by its own identity. What that has to buy is node identity: a row
  // that moved is the node it was, and a row that went took its own node with
  // it — neither is anything a snapshot of the drawn markup can see, so both
  // are asserted on the nodes these hold across the write.
  it("a reordered list moves the rows it already built", async () => {
    const view = await drawn("keyed-rows.tsx");
    const [swap, , list] = children(view);
    assert.ok(swap !== undefined && list !== undefined);
    assert.deepEqual([...list.children].map(text), ["row 1", "row 2", "row 3"]);
    const [first, , third] = [...list.children];
    await userEvent.click(swap);
    assert.deepEqual([...list.children].map(text), ["row 3", "row 2", "row 1"]);
    // The two that swapped are the nodes they were, at each other's places.
    assert.equal([...list.children][0], third);
    assert.equal([...list.children][2], first);
  });

  it("a list a row was dropped from draws the rest", async () => {
    const view = await drawn("keyed-rows.tsx");
    const [, drop, list] = children(view);
    assert.ok(drop !== undefined && list !== undefined);
    const [first, , third] = [...list.children];
    await userEvent.click(drop);
    assert.deepEqual([...list.children].map(text), ["row 1", "row 3"]);
    // Only the row that went was touched; the rest kept their nodes.
    assert.deepEqual([...list.children], [first, third]);
  });

  it("a moved row keeps its node and reads its new index", async () => {
    const view = await drawn("for-index.tsx");
    const [rotate, list] = children(view);
    assert.ok(rotate !== undefined && list !== undefined);
    assert.deepEqual([...list.children].map(text), [
      "a at 0",
      "b at 1",
      "c at 2",
    ]);
    const held = [...list.children][0];
    await userEvent.click(rotate);
    // Nothing about a member changed, so every row is the node it was — and
    // the index each one draws is the position it now sits at.
    assert.deepEqual([...list.children].map(text), [
      "c at 0",
      "a at 1",
      "b at 2",
    ]);
    assert.equal(list.children[1], held);
  });

  it("a child redraws everything it read of a cell it was handed", async () => {
    const view = await drawn("local-state-child-reads.tsx");
    const [button, ...rows] = children(view);
    assert.ok(button !== undefined && rows.length === 2);
    // Nothing either row was given changes across the write — the same handle
    // object and the same id — so every assertion here is one the arguments
    // alone cannot answer. A prop, a text child, and a branch, per row.
    assert.deepEqual(rows.map(readRow), [
      { size: 20, text: "row 0 of 0", marked: true },
      { size: 16, text: "row 1 of 0", marked: false },
    ]);
    await userEvent.click(button);
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
    const view = await drawn("unmoved-prop.tsx");
    const [select, list] = children(view);
    assert.ok(select !== undefined && list !== undefined);

    // What the drawing wrote, watched the way a page watches itself: an
    // observer reports a write even where what it wrote is what the attribute
    // already held, which is the whole question here. Records are kept as
    // they arrive, since a click is awaited and the observer reports meanwhile.
    const records: MutationRecord[] = [];
    const watching = new view.ownerDocument.defaultView!.MutationObserver(
      (arrived) => records.push(...arrived),
    );
    watching.observe(view, { attributes: true, subtree: true });
    const written = (): unknown[][] =>
      [...records.splice(0), ...watching.takeRecords()].map((record) => [
        [...list.children].indexOf(record.target as Element),
        record.attributeName,
        (record.target as Element).getAttribute(record.attributeName!),
      ]);

    const href = (): unknown[] =>
      [...list.children].map((row) => row.getAttribute("href"));
    assert.deepEqual(href(), ["#open", "#closed", "#closed"]);
    written();
    await userEvent.click(select);
    assert.deepEqual(href(), ["#closed", "#open", "#closed"]);
    // The row that was selected and the row now selected, in the order they
    // were built. The third row read the cell too, and had nothing to say.
    assert.deepEqual(written(), [
      [0, "href", "#closed"],
      [1, "href", "#open"],
    ]);
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
    text: label.firstChild?.nodeValue,
    marked: marker !== undefined,
  };
}
