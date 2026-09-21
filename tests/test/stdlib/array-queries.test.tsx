import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Array members that answer a question about an array or build a new one,
// leaving it as it was. `reduceRight` takes its starting value, as `reduce`
// does.
it("arrayQueries", async (t) => {
  await snapshotCase(
    t,
    "arrayQueries",
    cs`{
      const coins = [1, 2, 3, 4];
      return {
        at: [coins.at(0), coins.at(-1), coins.at(9)],
        every: coins.every((n) => n > 0),
        some: coins.some((n) => n > 3),
        findLast: coins.findLast((n) => n < 3),
        findLastIndex: coins.findLastIndex((n) => n < 3),
        flatMap: coins.flatMap((n) => [n, n * 10]),
        reduceRight: coins.reduceRight((text, n) => text + n, ""),
        unchanged: coins,
      };
    }`,
  );
});
