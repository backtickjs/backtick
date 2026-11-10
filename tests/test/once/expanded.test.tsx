import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createRoot } from "solid-js" with { backtick: "client" };
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";

// A server component spliced into a script: the script is one value, so the
// component runs once however many places read the value.
let runs = 0;

async function Default() {
  runs = runs + 1;
  return cs`"default"`;
}

const theme = cs`({ fallback: ${(<Default />)} })`;
const twice = cs`[$theme, $theme]`;

describe("a server component in a script", () => {
  it("runs once for the bundle", async () => {
    runs = 0;
    const pair = (await evaluate(cs`$createRoot(() => $twice)`)) as unknown as [
      { fallback: string },
      { fallback: string },
    ];
    assert.equal(runs, 1);
    assert.equal(pair[0], pair[1]);
    assert.equal(pair[0].fallback, "default");
  });
});

it("expanded", async (t) => {
  await snapshotCase(t, "expanded", twice);
});
