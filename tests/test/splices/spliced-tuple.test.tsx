import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A tuple crosses as a tuple, labels included, so a script can type it as the
// host did. A script member arrives as what it computes, in its position.
const position = [3, cs`4`] as const;

it("splicedTuple", async (t) => {
  await snapshotCase(
    t,
    "splicedTuple",
    cs`{
      const [x, z]: readonly [x: number, z: number] = $position;
      return x + z;
    }`,
  );
});
