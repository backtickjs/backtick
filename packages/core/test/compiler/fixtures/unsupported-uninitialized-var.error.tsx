import { cs } from "@backtickjs/core";
import { print } from "../print.ts";

const script = cs`{
  let x;
  return x;
}`;

print(script);
