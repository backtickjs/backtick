import { cs } from "@backtickjs/core";

// A step is checked as TypeScript checks one: a number, in a variable that
// isn't `const`.
export const constant = cs`{
  const i = 0;
  // @ts-expect-error: Cannot assign to 'i' because it is a constant.
  i++;
  return i;
}`;

export const text = cs`{
  let s = "a";
  // @ts-expect-error: An arithmetic operand must be of type 'any', 'number', 'bigint' or an enum type.
  s++;
  return s;
}`;
