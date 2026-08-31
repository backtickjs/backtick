import { cs } from "@backtickjs/core";

// The key is an expression, which is the point: a loop reaches every element
// without one script per position.
export default cs`{
  const coins = [5, 31, 7];
  let total = 0;
  for (let i = 0; i < coins.length; i = i + 1) {
    total = total + coins[i];
  }
  return total;
}`;
