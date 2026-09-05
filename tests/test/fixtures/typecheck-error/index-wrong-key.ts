import { cs } from "@backtickjs/core";

// The client view decides what may index a value, exactly as it decides what
// may be read off it with `.`: an array takes a number, and a plain object
// takes only a key its type names.
//
// `coins["0"]` is the one TypeScript lets through — it reads a numeric string
// literal as a numeric index — and the runtime, which takes only a number,
// answers `undefined`. Left here beside the two that are caught so the gap is
// visible where it lives.
const point = { x: 1, y: 2 };

export default cs`(name: string) => {
  const coins = [5, 31, 7];
  const first = coins["0"];
  const wrong = coins[name];
  const which = $point[name];
  return first + wrong + which;
}`;
