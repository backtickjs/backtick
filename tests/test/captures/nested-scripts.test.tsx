import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

it("nestedScripts", async (t) => {
  await snapshotCase(
    t,
    "nestedScripts",
    cs`{
      const x = 0;
      return ${cs`x`};
    }`,
  );
});
