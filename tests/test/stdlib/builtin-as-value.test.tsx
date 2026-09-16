import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A builtin is a value, not only a callee. The compiler folds `Math.floor`
// into one whole name the client answers — there is no `Math` for a read to
// yield — and that name stands wherever a value does: bound to a variable,
// and handed to something that calls it.
//
// The `math` case reads `Math.PI` as a value too, but a constant is the easy
// half of this. What a builtin *function* is read as has to arrive callable.
it("builtinAsValue", async (t) => {
  await snapshotCase(
    t,
    "builtinAsValue",
    cs`{
      const floor = Math.floor;
      const apply = (f: (n: number) => number, n: number) => f(n);
      return floor(3.5) + apply(Math.ceil, 3.5);
    }`,
  );
});
