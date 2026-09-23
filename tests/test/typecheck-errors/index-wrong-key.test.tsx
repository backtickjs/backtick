import { cs } from "@backtickjs/core";

// TypeScript decides what may index a value: an array takes a number, and a
// plain object takes only a key its type names. `coins["0"]` passes, because
// TypeScript reads a numeric string literal as a numeric index.
const point = { x: 1, y: 2 };

export default cs`(name: string) => {
  const coins = [5, 31, 7];
  const first = coins["0"];
  // @ts-expect-error: Element implicitly has an 'any' type because index expression is not of type 'number'.
  const wrong = coins[name];
  // @ts-expect-error: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ x: number; y: number; }'.
  const which = $point[name];
  return first + wrong + which;
}`;
