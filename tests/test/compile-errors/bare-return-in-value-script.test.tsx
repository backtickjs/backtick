import { cs } from "@backtickjs/core";

// A bare `return` alongside a valued one returns nothing where a value is
// due.
const bare = cs`(b: boolean) => {
  if (b) {
    return "taken";
  }
  return;
}`;
