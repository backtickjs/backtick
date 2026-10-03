import { cs } from "@backtickjs/core";

// A step is checked as TypeScript checks one: a number, in a variable that
// isn't `const`.
export const constant = cs.lift((() => {
  const __cs_i = 0;
  // @ts-expect-error: Cannot assign to 'i' because it is a constant.
  __cs_i++;
  return __cs_i;
})());

export const text = cs.lift((() => {
  let __cs_s = "a";
  // @ts-expect-error: An arithmetic operand must be of type 'any', 'number', 'bigint' or an enum type.
  __cs_s++;
  return __cs_s;
})());
