import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A hole inside a block that shadows an outer name. Two call sites make the
// script polymorphic, so the splice arrives as a thunk rather than inlined.
//
// Both `total` bindings are the entry's own, and both render under their source
// name — the inner one shadows the outer exactly as it does in the source, and
// a block frames its declarations, so nothing has to tell them apart. What an
// entry captures cannot collide with either: a capture is a parameter, numbered
// `$0` upward, and `$` starts no name a script can write.
function wrapShadowed(fragment: Client<number>): Client<number> {
  return cs`{
    const total = 1;
    {
      const total = 2;
      return total + $fragment;
    }
  }`;
}

it("shadowedHole", async (t) => {
  await snapshotCase(
    t,
    "shadowedHole",
    cs`${wrapShadowed(cs`10`)} + ${wrapShadowed(cs`20`)}`,
  );
});
