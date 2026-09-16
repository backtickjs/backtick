import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

it("methodCall", async (t) => {
  await snapshotCase(
    t,
    "methodCall",
    cs`{
      const greeting = "Hello";
      return greeting.concat(", ", "World").toUpperCase();
    }`,
  );
});
