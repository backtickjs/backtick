import { cs } from "@backtickjs/core";

// `...xs` where an element goes: it has no value of its own, it contributes
// however many the array it spreads has. An empty one contributes nothing, a
// list may hold several, and what it spreads is an ordinary expression.
export default cs`{
  const front = [1, 2];
  const back = [3];
  const none = [];
  const all = [0, ...front, ...none, ...back, 4];
  const twice = [...all, ...all];
  return all.join(",") + "|" + twice.length;
}`;
