import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import { render, screen, userEvent } from "@backtickjs/web-testing";
import { createFixtureLoader, fixturesRoot } from "./importFixture.ts";

// A drawing read the way Testing Library reads one: by role and by text, with
// a click a user would make.
const validDir = join(fixturesRoot, "valid");
const importFixture = createFixtureLoader("screen");

describe("screen", () => {
  it("increments the counter", async () => {
    await render(await importFixture(validDir, "pressable.tsx"));
    await userEvent.click(screen.getByRole("button", { name: /pressed/ }));
    assert.ok(screen.getByText("pressed 1 times"));
  });

  it("reads a fresh page in each test", async () => {
    await render(await importFixture(validDir, "pressable.tsx"));
    assert.ok(screen.getByText("pressed 0 times"));
  });
});
