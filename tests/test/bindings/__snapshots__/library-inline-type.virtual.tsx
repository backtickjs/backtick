import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { render, screen } from "@solidjs/testing-library";
declare const { Button }: import("@backtickjs/core").ClientModule<typeof import("acme-ui")>; import type { ButtonVariant as ButtonVariant } from "acme-ui"; import type { ButtonVariant as Variant } from "acme-ui";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";

// The types an import names beside its values are the library's own, for host
// code: they reach no client.
const variant: ButtonVariant = "ghost";
// @ts-expect-error: Type '"large"' is not assignable to type 'ButtonVariant'.
export const large: Variant = "large";

const saved = cs.lift((() => (
  (void (Button), (($Button) => <$Button variant={(cs.splice((variant)))} onClick={() => {}}>
    Save
  </$Button>)(cs.splice((Button))))
))());

it("libraryInlineType", async (t) => {
  await snapshotCase(t, "libraryInlineType", saved);
});

describe("a type imported beside a library component", () => {
  it("types the host value the script splices", async () => {
    render(await evaluate(() => saved));
    assert.equal(screen.getByRole("button").className, "ghost");
  });
});
