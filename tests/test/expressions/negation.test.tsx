import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A negative literal is written as one, and reaches the wire as one: `-1` is
// a prefix operator on `1` in TypeScript's AST and in this one, and a number
// on the wire, where every literal carries itself.
//
// Negating something computed is the same operator with nothing to fold.
it("negation", async (t) => {
  await snapshotCase(
    t,
    "negation",
    cs`(count: number) => {
      const floor = -1;
      const step = -count;
      return floor + step + -2;
    }`,
  );
});
