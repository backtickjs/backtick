import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createRoot } from "@backtickjs/solid-js";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";

it("spliceNumeric", async (t) => {
  await snapshotCase(t, "spliceNumeric", cs.lift((() => (cs.splice(1)))()));
});

// NaN, the infinities and -0 arrive as themselves, written as in source.
it("non-finite numbers and negative zero arrive as themselves", async () => {
  const numbers = [NaN, Infinity, -Infinity, -0];
  const arrived = (await evaluate(cs.lift((() => (cs.splice((createRoot)))(() => (cs.splice((numbers)))))()))) as number[];
  assert.ok(Number.isNaN(arrived[0]));
  assert.equal(arrived[1], Infinity);
  assert.equal(arrived[2], -Infinity);
  assert.ok(Object.is(arrived[3], -0));
});

it("nonFiniteNumbers", async (t) => {
  const numbers = [NaN, Infinity, -Infinity, -0];
  await snapshotCase(t, "nonFiniteNumbers", cs.lift((() => (cs.splice((numbers))))()));
});
