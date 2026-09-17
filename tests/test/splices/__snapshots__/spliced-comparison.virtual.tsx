import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A splice prints as an expression ending in a type, and a `<` after a type is
// where type arguments start — so a spliced value to the left of `<` is the
// one place the virtual file could stop being the program it stands for.
const low = 3;
const high = 9;

it("splicedComparison", async (t) => {
  await snapshotCase(
    t,
    "splicedComparison",
    cs.lift(cs.const({ under: (cs.splice((low)) satisfies typeof cs.ClientUnknown) < (cs.splice((high)) satisfies typeof cs.ClientUnknown), atMost: (cs.splice((low)) satisfies typeof cs.ClientUnknown) <= (cs.splice((high)) satisfies typeof cs.ClientUnknown), over: (cs.splice((high)) satisfies typeof cs.ClientUnknown) > (cs.splice((low)) satisfies typeof cs.ClientUnknown), between: (cs.splice((low)) satisfies typeof cs.ClientUnknown) < (cs.splice((high)) satisfies typeof cs.ClientUnknown) && (cs.splice((high)) satisfies typeof cs.ClientUnknown) > (cs.splice((low)) satisfies typeof cs.ClientUnknown) })),
  );
});
