import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A script splicing another is made after it, as every constant is made after
// what it reads; one at the root is the root; a function is one value too.
const inner = cs.lift((() => ({ n: 1 }))());
const outer = cs.lift((() => ({ inner: (cs.splice((inner))), same: (cs.splice((inner))) === (cs.splice((inner))) }))());

it("nested", async (t) => {
  await snapshotCase(
    t,
    "nested",
    cs.lift((() => ({ outer: (cs.splice((outer))), shared: (cs.splice((outer))).inner === (cs.splice((inner))) }))()),
  );
});

it("atRoot", async (t) => {
  await snapshotCase(t, "atRoot", cs.lift((() => "root")()));
});

const double = cs.lift((() => (__cs_n: number) => __cs_n * 2)());

it("ofFunction", async (t) => {
  await snapshotCase(t, "ofFunction", cs.lift((() => (cs.splice((double)))(21))()));
});
