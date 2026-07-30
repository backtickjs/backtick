import { cs } from "@backtickjs/core";

// The client view decides what may index a value, exactly as it decides what
// may be read off it with `.`: an array takes a number, and a plain object only
// a key its type names.
const point = { x: 1, y: 2 };

export default cs`(name: string) => {
  const coins = [5, 31, 7];
  const first = coins[name];
  const which = $point[name];
  return first + which;
}`;
