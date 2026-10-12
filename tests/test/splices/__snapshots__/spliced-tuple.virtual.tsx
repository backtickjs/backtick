import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A tuple crosses as a tuple, labels included, so a script can type it as the
// host did. A script member arrives as what it computes, in its position.
const position = [3, cs.lift((() => 4)())] as const;

it("splicedTuple", async (t) => {
  await snapshotCase(
    t,
    "splicedTuple",
    cs.lift((() => {
      const [__cs_x, __cs_z]: readonly [x: number, z: number] = (cs.splice((position)));
      return __cs_x + __cs_z;
    })()),
  );
});
