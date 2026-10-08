import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createRoot } from "@backtickjs/solid-js";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";

it("spliceNumeric", async (t) => {
  await snapshotCase(t, "spliceNumeric", cs`${1}`);
});

// A number without a literal arrives as itself: written as what computes it,
// `0 / 0` for NaN, `1 / 0` and `-1 / 0` for the infinities, `-0` for negative
// zero.
it("non-finite numbers and negative zero arrive as themselves", async () => {
  const numbers = [NaN, Infinity, -Infinity, -0];
  const arrived = (await evaluate(cs`$createRoot(() => $numbers)`)) as number[];
  assert.ok(Number.isNaN(arrived[0]));
  assert.equal(arrived[1], Infinity);
  assert.equal(arrived[2], -Infinity);
  assert.ok(Object.is(arrived[3], -0));
});

it("nonFiniteNumbers", async (t) => {
  const numbers = [NaN, Infinity, -Infinity, -0];
  await snapshotCase(t, "nonFiniteNumbers", cs`$numbers`);
});
