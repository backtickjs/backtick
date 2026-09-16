import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

function outerBase(inner: Client<number>): Client<number> {
  return cs`{
    const base = 1;
    return base + ${middleBase(inner)};
  }`;
}

function middleBase(inner: Client<number>): Client<number> {
  return cs`{
    const base = 2;
    return base * $inner;
  }`;
}

// `cs`base`` is written under the outer `base`, but is threaded through two
// host functions that each shadow `base` with their own binding. The captured
// value must reach the leaf untouched, so the threaded channel is renamed
// away from every `base` it passes through.
it("deepShadowing", async (t) => {
  await snapshotCase(
    t,
    "deepShadowing",
    cs`{
      const base = 10;
      return ${outerBase(cs`base`)};
    }`,
  );
});
