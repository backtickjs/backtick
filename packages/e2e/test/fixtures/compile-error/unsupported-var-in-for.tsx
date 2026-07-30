import { cs } from "@backtickjs/core";

const script = cs`{
  let total = 0;
  for (var i = 0; i < 3; i = i + 1) {
    total = total + i;
  }
  return total;
}`;
