import { cs } from "@backtickjs/core";
import { print } from "../print.ts";

const script = cs`{
  var x = 0;
  return x;
}`;

print(script);
