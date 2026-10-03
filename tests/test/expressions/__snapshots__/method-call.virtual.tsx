import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

it("methodCall", async (t) => {
  await snapshotCase(
    t,
    "methodCall",
    cs.lift((() => {
      const __cs_greeting = "Hello";
      return __cs_greeting.concat(", ", "World").toUpperCase();
    })()),
  );
});
