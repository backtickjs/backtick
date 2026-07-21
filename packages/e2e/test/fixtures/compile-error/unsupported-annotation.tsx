import { cs } from "@backtickjs/core";

// `undefined` and `void` name no client value; `null` is the absent value.
const explicit = cs`(x: string | undefined) => {
  return 1;
}`;

const voided = cs`(x: void) => {
  return 2;
}`;

const nested = cs`(o: { a: number | undefined }) => {
  return 3;
}`;
