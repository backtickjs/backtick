import { cs } from "@backtickjs/core";

// The client view decides what may index a value, exactly as it decides what
// may be read off it with `.`: an array takes a number — `"0"` is a string, and
// no amount of it looking like a number changes that — and a plain object takes
// only a key its type names.
const point = { x: 1, y: 2 };

export default cs`(name: string) => {
  const coins = [5, 31, 7];
  const first = coins["0"];
  const wrong = coins[name];
  const which = $point[name];
  return first + wrong + which;
}`;
