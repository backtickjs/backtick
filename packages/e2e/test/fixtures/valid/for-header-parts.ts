import { cs } from "@backtickjs/core";

// Every part of the header is optional: this one declares nothing and updates
// nothing, leaving both to the block around it and the body.
export default cs`{
  let i = 0;
  let seen = "";
  for (; i < 3; ) {
    seen = seen + i;
    i = i + 1;
  }
  return seen;
}`;
