import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A nested script captures a variable's value, and an object's value is a
// reference: assigning to a member of a captured object writes the one object
// the enclosing script holds.
it("capturedObjectAssignment", async (t) => {
  await snapshotCase(
    t,
    "capturedObjectAssignment",
    cs`{
      const counter = { count: 0 };
      const bump = ${cs`() => {
        counter.count += 1;
      }`};
      bump();
      bump();
      return counter.count;
    }`,
  );
});
