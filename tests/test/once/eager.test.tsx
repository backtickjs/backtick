import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { render } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";

// A script runs when the bundle does, at its top, as module-level code runs
// when its module loads: once, whether or not what reads it is reached.
const counted = cs`{
  const counter = globalThis as unknown as { scriptRuns?: number };
  counter.scriptRuns = (counter.scriptRuns ?? 0) + 1;
  return "counted";
}`;

const unreached = cs`<p>{false ? $counted : "ok"}</p>`;

describe("a script", () => {
  it("runs once when the bundle does, reached or not", async () => {
    const counter = globalThis as unknown as { scriptRuns?: number };
    counter.scriptRuns = 0;
    const { container } = render(await evaluate(() => unreached));
    assert.equal(container.textContent, "ok");
    assert.equal(counter.scriptRuns, 1);
  });
});

it("unreached", async (t) => {
  await snapshotCase(t, "unreached", unreached);
});
