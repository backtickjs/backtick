import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

it("tryCatch", async (t) => {
  await snapshotCase(
    t,
    "tryCatch",
    cs`{
      const message = "boom";
      try {
        throw message;
      } catch (error) {
        if (error === message) {
          return "caught boom";
        }
        return "caught something else";
      }
    }`,
  );
});
