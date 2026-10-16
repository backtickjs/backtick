import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { render, screen } from "@solidjs/testing-library";
declare const Acme: import("@backtickjs/core").Client<typeof import("acme-ui")>;
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";

// The library whole, its components read from it on the client.
const saved = cs.lift((() => (
  (void (Acme), (($Acme) => <$Acme.Button variant="ghost" onClick={() => {}}>
    Save
  </$Acme.Button>)(cs.splice((Acme))))
))());

// A component the library doesn't export, caught at its name.
export const missing = cs.lift((() => (
  // @ts-expect-error: Property 'Link' does not exist on type 'typeof import("acme-ui")'.
  (($Acme) => <$Acme.Link />)(cs.splice((Acme)))
))());

it("libraryNamespace", async (t) => {
  await snapshotCase(t, "libraryNamespace", saved);
});

describe("a library's namespace in a script", () => {
  it("draws the component read from it", async () => {
    render(await evaluate(() => saved));
    assert.equal(screen.getByRole("button").className, "ghost");
  });
});
