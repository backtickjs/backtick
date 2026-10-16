import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { render, screen } from "@solidjs/testing-library";
import * as Acme from "acme-ui" with { backtick: "client" };
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";

// The library whole, its components read from it on the client.
const saved = cs`(
  <$Acme.Button variant="ghost" onClick={() => {}}>
    Save
  </$Acme.Button>
)`;

// A component the library doesn't export, caught at its name.
export const missing = cs`(
  // @ts-expect-error: Property 'Link' does not exist on type 'typeof import("acme-ui")'.
  <$Acme.Link />
)`;

it("libraryNamespace", async (t) => {
  await snapshotCase(t, "libraryNamespace", saved);
});

describe("a library's namespace in a script", () => {
  it("draws the component read from it", async () => {
    render(await evaluate(() => saved));
    assert.equal(screen.getByRole("button").className, "ghost");
  });
});
