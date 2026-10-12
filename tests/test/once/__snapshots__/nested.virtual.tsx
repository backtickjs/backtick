import { it } from "node:test";
import { cs, once } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A `once` script splicing another is made after it, as every constant is
// made after what it reads; one at the root is the root; a function made once
// is the function it already was, under `$value` rather than `$function`.
const inner = once(cs.lift((() => ({ n: 1 }))()));
const outer = once(cs.lift((() => ({ inner: (cs.splice((inner))), same: (cs.splice((inner))) === (cs.splice((inner))) }))()));

it("nested", async (t) => {
  await snapshotCase(
    t,
    "nested",
    cs.lift((() => ({ outer: (cs.splice((outer))), shared: (cs.splice((outer))).inner === (cs.splice((inner))) }))()),
  );
});

it("atRoot", async (t) => {
  await snapshotCase(t, "atRoot", once(cs.lift((() => "root")())));
});

const double = once(cs.lift((() => (__cs_n: number) => __cs_n * 2)()));

it("ofFunction", async (t) => {
  await snapshotCase(t, "ofFunction", cs.lift((() => (cs.splice((double)))(21))()));
});
