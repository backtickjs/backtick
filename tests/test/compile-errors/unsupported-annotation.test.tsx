import { cs } from "@backtickjs/core";

// `void` names no client value — an action answers with nothing, which is the
// boundary's word and not a script's. `undefined` is a value and annotates.
const explicit = cs`(x: string | undefined) => {
  return 1;
}`;

const voided = cs`(x: void) => {
  return 2;
}`;

const nested = cs`(o: { a: number | undefined }) => {
  return 3;
}`;
