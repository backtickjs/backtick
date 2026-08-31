import { cs } from "@backtickjs/core";

// A value body must return on every path.
const script = cs`{
  let n = 1;
  if (n === 2) {
    return "some";
  }
}`;

const arrow = cs`(b: boolean) => {
  if (b) {
    return "taken";
  }
}`;

// A bare `return` alongside a valued one returns nothing where a value is
// due.
const bare = cs`(b: boolean) => {
  if (b) {
    return "taken";
  }
  return;
}`;
