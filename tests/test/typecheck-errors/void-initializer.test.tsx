import { cs } from "@backtickjs/core";

// An action call produces no value: its `void` result can't initialize a
// variable — in a value script or an action.
const ping = cs`() => {
  let n = 0;
  n = 1;
}`;

const script = cs`{
  const x = $ping();
  return 1;
}`;

const action = cs`{
  const x = $ping();
}`;

// An error inside a checked initializer reports once: the duplicate copy
// the check sequences is shielded.
const label = cs`(text: string) => {
  return text;
}`;

const wrongArgument = cs`{
  // @ts-expect-error: Argument of type 'boolean' is not assignable to parameter of type 'string'.
  const x = $label(true);
  return 1;
}`;
