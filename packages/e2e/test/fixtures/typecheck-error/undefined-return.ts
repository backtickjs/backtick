import { cs, type Client } from "@backtickjs/core";

// The recorded residual `undefined` door (PLAN.md Step 0): a host
// ascription smuggles `undefined` into a function's *return*, riding
// `undefined ≤ void` through the function arm's `ClientUnknown` return —
// so storing the function draws no error. The door admits the lying type,
// never a value: no script expression can construct `undefined`, and
// every position where the result could land still checks.
type Maybe = string | undefined;

const lying: Client<() => Maybe> = cs`() => "hi"`;

export default cs`{
  const stored = $lying;
  const caught = $lying();
  return 1;
}`;
