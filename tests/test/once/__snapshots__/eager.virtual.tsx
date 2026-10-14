import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, once } from "@backtickjs/core";
import { render } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";

// A `once` script runs when the bundle does, at its top, as module-level code
// runs when its module loads: once, whether or not what reads it is reached.
// An expression written there would never run (`jsx/host-tag-evaluation`).
const counted = once(cs.lift((() => {
  const __cs_counter = globalThis as unknown as { onceRuns?: number };
  __cs_counter.onceRuns = (__cs_counter.onceRuns ?? 0) + 1;
  return "counted";
})()));

const unreached = cs.lift((() => <p>{false ? (cs.splice((counted))) : "ok"}</p>)());

describe("a once script", () => {
  it("runs once when the bundle does, reached or not", async () => {
    const counter = globalThis as unknown as { onceRuns?: number };
    counter.onceRuns = 0;
    const { container } = render(await evaluate(() => unreached));
    assert.equal(container.textContent, "ok");
    assert.equal(counter.onceRuns, 1);
  });
});

it("unreached", async (t) => {
  await snapshotCase(t, "unreached", unreached);
});
