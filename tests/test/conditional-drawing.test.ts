import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import { render, screen } from "@backtickjs/web-testing";
import { createFixtureLoader, fixturesRoot } from "./importFixture.ts";
import type { BacktickElement } from "@backtickjs/core";

// A block whose drawing is a conditional, and a write that answers it.
//
// Two claims, because a fix that only meets one is worse than none: the
// component is built once, and what it draws changes. Stopping the rebuild by
// never running the block again would pass the first and leave the page on the
// branch it started with.
const validDir = join(fixturesRoot, "valid");
const importFixture = createFixtureLoader("backtick");

describe("a component whose drawing is a conditional", () => {
  it("is built once, and draws the branch the write chose", async () => {
    await render(
      await importFixture<BacktickElement>(validDir, "conditional-drawing.tsx"),
    );

    // Nothing has answered the condition yet: the count is of blocks that have
    // reached their timer, and the first has not.
    assert.ok(screen.getByText("builds 0"));
    assert.ok(screen.getByText("waiting"));

    // Long enough for the timer the component set, and for a component built
    // again to have set another.
    await new Promise((settle) => setTimeout(settle, 100));

    assert.ok(
      screen.queryByText("builds 1"),
      "the component was built again for what it drew",
    );
    assert.ok(
      screen.queryByText("shown"),
      "the conditional did not draw the branch the write chose",
    );
    assert.equal(screen.queryByText("waiting"), null);
  });
});
