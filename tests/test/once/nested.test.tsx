import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A script splicing another is made after it, as every constant is made after
// what it reads; one at the root is the root; a function is one value too.
const inner = cs`({ n: 1 })`;
const outer = cs`({ inner: $inner, same: $inner === $inner })`;

it("nested", async (t) => {
  await snapshotCase(
    t,
    "nested",
    cs`({ outer: $outer, shared: $outer.inner === $inner })`,
  );
});

it("atRoot", async (t) => {
  await snapshotCase(t, "atRoot", cs`"root"`);
});

const double = cs`(n: number) => n * 2`;

it("ofFunction", async (t) => {
  await snapshotCase(t, "ofFunction", cs`$double(21)`);
});
