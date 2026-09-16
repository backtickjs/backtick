import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `null` written in the script itself — bare, compared against, and as an
// argument — as opposed to a spliced host `null` (see `runtime-values.ts`).
const orDash: Client<(value: string | null) => string> = cs`(
  value: string | null,
) => {
  if (value === null) {
    return "-";
  }
  return value;
}`;

it("nullLiteral", async (t) => {
  await snapshotCase(
    t,
    "nullLiteral",
    cs`({
      missing: $orDash(null),
      present: $orDash("hi"),
      bare: null,
    })`,
  );
});
