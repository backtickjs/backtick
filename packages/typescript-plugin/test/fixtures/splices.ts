import { cs } from "@backtickjs/core";

const count = 1;
const Point = { x: 1 };

// Past the start of the script, where only the splice's own wrapper is
// mapped.
export const read = cs`1 + $count`;

export const braced = cs`1 + ${count}`;

export const first = cs`$count + 1`;

export const partial = cs`$Po`;

export { Point };
