import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A checker directive written in a script covers the statement below it, as it
// does in TypeScript. The typecheck of this file is the assertion: it passes
// only while the error is there and the directive suppresses it.
it("tsExpectError", async (t) => {
  await snapshotCase(
    t,
    "tsExpectError",
    cs`{
      // @ts-expect-error: a string is not a number
      const count: number = "one";
      return count;
    }`,
  );
});
