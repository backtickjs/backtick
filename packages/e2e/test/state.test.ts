import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import { bundle } from "@backtickjs/core";
import { createFixtureLoader, fixturesRoot } from "./importFixture.ts";
import { evaluate, TestElement } from "./test-client/index.ts";

// The behavior side of per-instance state: the `*.bundle` snapshots pin the
// wire shape, and these drive the reference client through it — a write has to
// persist, re-render the instance that owns the cell, and leave every other
// instance alone.
const validDir = join(fixturesRoot, "valid");
const importFixture = createFixtureLoader("state");

async function render(file: string): Promise<TestElement> {
  const script = await importFixture(validDir, file);
  const element = evaluate(await bundle(script));
  assert.ok(element instanceof TestElement, "expected a rendered element");
  return element;
}

// The handler a prop holds, as the host would invoke it.
function handler(element: TestElement): () => void {
  const onPress = element.props.onPress;
  assert.equal(typeof onPress, "function", "expected an onPress handler");
  return onPress as () => void;
}

function fontSize(element: TestElement): unknown {
  const style = element.props.style;
  assert.ok(style !== null && typeof style === "object", "expected a style");
  return (style as { fontSize?: unknown }).fontSize;
}

function children(element: TestElement): TestElement[] {
  const value = element.props.children;
  assert.ok(Array.isArray(value), "expected several children");
  return value.flat(Infinity) as TestElement[];
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
});
