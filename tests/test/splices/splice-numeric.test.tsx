import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createRoot } from "@backtickjs/solid-js";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";

it("spliceNumeric", async (t) => {
  await snapshotCase(t, "spliceNumeric", cs`${1}`);
});

// NaN, the infinities, -0 and bigints arrive as themselves, written as in
// source.
it("non-finite numbers, negative zero and bigints arrive as themselves", async () => {
  const numbers = [NaN, Infinity, -Infinity, -0];
  const arrived = (await evaluate(cs`$createRoot(() => $numbers)`)) as number[];
  assert.ok(Number.isNaN(arrived[0]));
  assert.equal(arrived[1], Infinity);
  assert.equal(arrived[2], -Infinity);
  assert.ok(Object.is(arrived[3], -0));
  const bigints = [12345678901234567890n, -1n];
  assert.deepEqual(await evaluate(cs`$createRoot(() => $bigints)`), bigints);
});

it("nonFiniteNumbers", async (t) => {
  const numbers = [NaN, Infinity, -Infinity, -0, 12345678901234567890n, -1n];
  await snapshotCase(t, "nonFiniteNumbers", cs`$numbers`);
});
