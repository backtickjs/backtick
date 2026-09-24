import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `?:` evaluates only the taken branch, and its condition narrows like an
// `if`'s.
const pick = cs`(n: number | null) => {
  return n === null ? 0 : n + 1;
}`;

it("ternary", async (t) => {
  await snapshotCase(
    t,
    "ternary",
    cs`({
      absent: $pick(null),
      present: $pick(4),
    })`,
  );
});
