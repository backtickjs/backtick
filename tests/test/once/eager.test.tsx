import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, once } from "@backtickjs/core";
import { render } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";

// A `once` script runs when the bundle does, at its top, as module-level code
// runs when its module loads: once, whether or not what reads it is reached.
// An expression written there would never run (`jsx/host-tag-evaluation`).
const counted = once(cs`{
  const counter = globalThis as unknown as { onceRuns?: number };
  counter.onceRuns = (counter.onceRuns ?? 0) + 1;
  return "counted";
}`);

const unreached = cs`<p>{false ? $counted : "ok"}</p>`;

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
