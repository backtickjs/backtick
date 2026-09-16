import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

it("arrow", async (t) => {
  await snapshotCase(
    t,
    "arrow",
    cs`{
      const base = 10;
      return (one: number, two: number) => one + two + base;
    }`,
  );
});
