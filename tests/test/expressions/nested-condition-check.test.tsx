import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A checked condition containing its own tested positions: `keep(a && b)` is
// checked (a call), and inside it `a` and `b` are checked (identifiers). The
// check's trailing bare duplicate must stay check-free and suppressed — a
// duplicate that re-checked its operands would grow by a copy per nesting
// level and re-report every operand mismatch at a second virtual position —
// so the virtual code and mappings pin the duplicate staying bare.
const gate: Client<(a: boolean, b: boolean) => string> = cs`(
  a: boolean,
  b: boolean,
) => {
  const keep = (on: boolean) => on;
  if (keep(a && b)) {
    return "kept";
  }
  return "dropped";
}`;

it("nestedConditionCheck", async (t) => {
  await snapshotCase(
    t,
    "nestedConditionCheck",
    cs`({
      both: $gate(true, true),
      one: $gate(true, false),
    })`,
  );
});
