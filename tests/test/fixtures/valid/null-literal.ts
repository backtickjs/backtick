import { cs, type Client } from "@backtickjs/core";

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

export default cs`({
  missing: $orDash(null),
  present: $orDash("hi"),
  bare: null,
})`;
