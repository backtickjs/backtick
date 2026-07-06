import { cs } from "@backtickjs/core";
import { print } from "../print.ts";

const script = cs`{
  const a = 1, b = 2;
  return a;
}`;

print(script);
