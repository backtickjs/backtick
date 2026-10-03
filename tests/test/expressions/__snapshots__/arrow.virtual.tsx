import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

it("arrow", async (t) => {
  await snapshotCase(
    t,
    "arrow",
    cs.lift((() => {
      const __cs_base = 10;
      return (__cs_one: number, __cs_two: number) => __cs_one + __cs_two + __cs_base;
    })()),
  );
});
