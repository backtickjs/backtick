import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, once } from "@backtickjs/core";
declare const createRoot: import("@backtickjs/core").Client<(typeof import("solid-js"))["createRoot"]>; declare const createSignal: import("@backtickjs/core").Client<(typeof import("solid-js"))["createSignal"]>;
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";

// A `once` script is one value for the bundle, made at its top: every read is
// that value, as a module-level `const` is in plain TypeScript. A signal made
// once is one signal, which every component reading it shares.
const count = once(cs.lift((() => (cs.splice((createSignal)))(0))()));

const Shown = cs.lift((() => () => <span>{"count " + (cs.splice((count)))[0]()}</span>)());
const Bump = cs.lift((() => () => (
  <button onclick={() => (cs.splice((count)))[1]((cs.splice((count)))[0]() + 1)}>bump</button>
))());

const shared = cs.lift((() => (
  <div>
    {(($Shown) => <$Shown />)(cs.splice((Shown)))}
    {(($Shown) => <$Shown />)(cs.splice((Shown)))}
    {(($Bump) => <$Bump />)(cs.splice((Bump)))}
  </div>
))());

describe("a once script", () => {
  it("is one value at every read", async () => {
    assert.equal(
      await evaluate(cs.lift((() => (cs.splice((createRoot)))(() => {
        const __cs_pair = [(cs.splice((count))), (cs.splice((count)))];
        return __cs_pair[0] === __cs_pair[1];
      }))())),
      true,
    );
  });

  it("is shared by every component that reads it", async () => {
    render(await evaluate(() => shared));
    await userEvent.click(screen.getByRole("button"));
    assert.deepEqual(
      screen.getAllByText(/count/).map((node) => node.textContent),
      ["count 1", "count 1"],
    );
  });
});

it("shared", async (t) => {
  await snapshotCase(t, "shared", shared);
});
