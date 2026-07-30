import { cs } from "@backtickjs/core";

const script = cs`{
  let i = 0;
  while (i < 3) {
    break outer;
  }
  return i;
}`;
