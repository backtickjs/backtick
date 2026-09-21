import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A value body that falls off the end completes with `undefined`.
it("partialReturnScript", async (t) => {
  await snapshotCase(
    t,
    "partialReturnScript",
    cs`{
      let n = 1;
      if (n === 2) {
        return "some";
      }
    }`,
  );
});

it("partialReturnArrow", async (t) => {
  await snapshotCase(
    t,
    "partialReturnArrow",
    cs`{
      const pick = (b: boolean) => {
        if (b) {
          return "taken";
        }
      };
      return [pick(true), pick(false)];
    }`,
  );
});
