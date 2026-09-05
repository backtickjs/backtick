import { cs, type Client } from "@backtickjs/core";

// A host ascription putting `undefined` in a function's return, which is
// ordinary now that `undefined` is a value: the function stores, it calls, and
// what a call answers with is `string | undefined` on both sides of the
// boundary.
type Maybe = string | undefined;

const lying: Client<() => Maybe> = cs`() => "hi"`;

export default cs`{
  const stored = $lying;
  const caught = $lying();
  return 1;
}`;
