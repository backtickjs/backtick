import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, createImport } from "@backtickjs/core";
import { createRoot } from "@backtickjs/solid-js";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";

// A class reached through a member of a spliced value, as `Animated.Value`
// is. `new` takes the member, not the splice: the splice reads as one value.
const geometry = createImport<{
  Circle: new (radius: number) => { radius: number; diameter: number };
}>({ name: "geometry", from: "app", version: "^1.0.0" });

const diameter = cs`$createRoot(() => new $geometry.Circle(2).diameter)`;

it("constructedMember", async (t) => {
  await snapshotCase(t, "constructedMember", diameter);
});

describe("a class constructed through a spliced value's member", () => {
  it("is constructed on the client", async () => {
    assert.equal(await evaluate(diameter), 4);
  });
});
