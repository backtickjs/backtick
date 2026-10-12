import { it } from "node:test";
import { cs, once } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A `once` script splicing another is made after it, as every constant is
// made after what it reads; one at the root is the root; a function made once
// is the function it already was, under `$value` rather than `$function`.
const inner = once(cs`({ n: 1 })`);
const outer = once(cs`({ inner: $inner, same: $inner === $inner })`);

it("nested", async (t) => {
  await snapshotCase(
    t,
    "nested",
    cs`({ outer: $outer, shared: $outer.inner === $inner })`,
  );
});

it("atRoot", async (t) => {
  await snapshotCase(t, "atRoot", once(cs`"root"`));
});

const double = once(cs`(n: number) => n * 2`);

it("ofFunction", async (t) => {
  await snapshotCase(t, "ofFunction", cs`$double(21)`);
});
