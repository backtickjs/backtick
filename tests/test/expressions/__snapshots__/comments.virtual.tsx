import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Comments in a client script are trivia: they survive formatting but are
// dropped from the virtual code and the bundle.
it("comments", async (t) => {
  await snapshotCase(
    t,
    "comments",
    cs.lift((() => {
      // leading line comment
      const __cs_count = 1; // trailing line comment
      /* block comment */
      if (__cs_count === 1) {
        // branch comment
        return "one";
      }
      /**
       * doc comment
       */
      return "many";
    })()),
  );
});
