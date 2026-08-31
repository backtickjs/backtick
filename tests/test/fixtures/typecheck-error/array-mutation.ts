import { cs } from "@backtickjs/core";

// Mutators aren't part of the client array API: an array is a value, and
// `pop` would also produce `undefined`, which the language doesn't have.
const script = cs`{
  const coins = [1, 2, 3];
  const last = coins.pop();
  return 1;
}`;

const action = cs`{
  const coins = [1, 2];
  coins.push(3);
}`;
