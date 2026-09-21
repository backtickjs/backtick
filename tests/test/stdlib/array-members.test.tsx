import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Arrays expose the curated `ClientArray` API: pure members only, none
// producing `undefined`. Callback parameters are contextually typed.
it("arrayMembers", async (t) => {
  await snapshotCase(
    t,
    "arrayMembers",
    cs`{
      const coins = [1, 2, 3];
      const four = 4;
      return {
        count: coins.length,
        all: coins.concat([four]),
        part: coins.slice(0, 2),
        where: coins.indexOf(2),
        lastWhere: coins.concat([2]).lastIndexOf(2),
        has: coins.includes(3),
        text: coins.join("-"),
        doubled: coins.map((n) => n * 2),
        small: coins.filter((n) => n < 3),
      };
    }`,
  );
});
