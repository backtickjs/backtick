import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

it("tryCatch", async (t) => {
  await snapshotCase(
    t,
    "tryCatch",
    cs.lift((() => {
    const __cs_message = "boom";
    try {
        throw __cs_message;
    }
    catch (__cs_error) {
        if (__cs_error === __cs_message) {
            return "caught boom";
        }
        return "caught something else";
    }
})()),
  );
});
