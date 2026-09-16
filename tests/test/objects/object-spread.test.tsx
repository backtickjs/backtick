import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A spread in an object literal, which is the one place the format cannot
// ship an object as the data it spells: an object in a value slot *is* its
// own keys and none of them is reserved, so there is nowhere to write "and
// every key of that one". A literal a spread runs through is a node instead —
// a name slot of `null` marking the spread — and a literal without one is
// data still.
//
// Later wins, both ways round, the way it does in the language this mirrors.
it("objectSpread", async (t) => {
  await snapshotCase(
    t,
    "objectSpread",
    cs`{
      const base = { a: 1, b: 2 };
      const over = { b: 9 };
      return {
        ...base,
        ...over,
        c: 3,
      };
    }`,
  );
});
