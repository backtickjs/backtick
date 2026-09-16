import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Two distinct captures of one entry that want the same name.
//
// An entry's own free variables can never collide — within one script `base`
// resolves outward to exactly one binding. But an entry also receives whatever
// the arguments it inlines capture, and a fragment written under the outer
// `base` can be carried by host code into a script written under the inner one.
// Both then land in the same environment, under the same source name.
//
// Everything stays nested so both bindings are actually in scope where they are
// threaded to — carrying the fragment somewhere the outer `base` does not
// enclose is a different error.
function innerBase(carried: Client<number>): Client<number> {
  return cs`{
    const base = 100;
    return ${cs`base + $carried`};
  }`;
}

it("foreignCaptureShadow", async (t) => {
  await snapshotCase(
    t,
    "foreignCaptureShadow",
    cs`{
      const base = 1;
      return ${innerBase(cs`base`)};
    }`,
  );
});
