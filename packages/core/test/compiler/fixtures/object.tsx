import { cs } from "@backtickjs/core";
import { print } from "../print.ts";

const obj = cs`({ a: 4 })`;
const script = cs`{
  const obj = ${obj};
  return ${cs`obj.a`};
}`;

print(script);
