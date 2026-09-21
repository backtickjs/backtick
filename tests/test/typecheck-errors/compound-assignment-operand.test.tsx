import { cs } from "@backtickjs/core";

// Checked as TypeScript checks one: a variable that isn't `const`, and operands
// the operator takes.
export const constant = cs`{
  const n = 0;
  // @ts-expect-error: Cannot assign to 'n' because it is a constant.
  n += 1;
  return n;
}`;

export const mixed = cs`{
  let n = 1;
  // @ts-expect-error: The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
  n -= "a";
  return n;
}`;
