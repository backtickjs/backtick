import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `null` written in the script itself — bare, compared against, and as an
// argument — as opposed to a spliced host `null` (see `runtime-values.ts`).
const orDash: Client<(value: string | null) => string> = cs.lift((() => (
  __cs_value: string | null,
) => {
  if (__cs_value === null) {
    return "-";
  }
  return __cs_value;
})());

it("nullLiteral", async (t) => {
  await snapshotCase(
    t,
    "nullLiteral",
    cs.lift((() => ({
      missing: cs.splice((orDash))(null),
      present: cs.splice((orDash))("hi"),
      bare: null,
    }))()),
  );
});
