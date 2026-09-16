import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import { render, screen } from "@backtickjs/web-testing";
import { createFixtureLoader, fixturesRoot } from "./importFixture.ts";

// A component is built once, however what it drew changes afterwards.
//
// `insert` reads what it was given inside the computation it makes, so a member
// that answers with a way of asking used to tie the two together: what it drew
// changing ran the expression that made it, which was the component again —
// with new cells, and whatever it did on the way in done over.
//
// Two of them answer that way, and both are here: a bundle drawn where it
// stands, and a list. The list is the one that says where the fault was — a
// drawn bundle is not special, so neither is the fix.
//
// Driven rather than snapshotted, because what is wrong is not what was drawn
// but how many times it was: a drawing that settles and one that never does
// look the same in a snapshot of either.
const validDir = join(fixturesRoot, "valid");
const importFixture = createFixtureLoader("backtick");

// Long enough for the timer the component set, and for a component built
// again to have set another.
const settled = () => new Promise((settle) => setTimeout(settle, 100));

describe("a component that draws a bundle", () => {
  it("is built once, and draws what arrives", async () => {
    await render(await importFixture(validDir, "vm-eval-builds-once.tsx"));

    // Nothing to draw yet, and the wait has not been made twice.
    assert.ok(screen.getByText("asked 0"));
    assert.equal(screen.queryByText("answered"), null);

    await settled();

    assert.ok(screen.getByText("answered"));
    assert.ok(
      screen.queryByText("asked 1"),
      "the component was built again for what it drew",
    );
  });
});

describe("a component that draws a list", () => {
  // The same claim with no bundle in it: `<For />` answers with a way of asking
  // too, so a fault in what draws a bundle would leave this alone.
  it("is built once, and draws what arrives", async () => {
    const { container } = await render(
      await importFixture(validDir, "for-builds-once.tsx"),
    );

    assert.ok(screen.getByText("asked 0"));

    await settled();

    assert.equal(container.querySelectorAll("em").length, 2);
    assert.ok(
      screen.queryByText("asked 1"),
      "the component was built again for what it drew",
    );
  });
});
