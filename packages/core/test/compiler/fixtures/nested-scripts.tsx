import { cs } from "@backtick/core";
import { print } from "../print.ts";

const script = cs`{
  const x = 0;
  return ${cs`x`};
}`;

print(script);
