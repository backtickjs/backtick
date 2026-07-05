import { cs } from "@backtickjs/core";
import { print } from "../print.ts";

const script = cs`{
  const base = 10;
  return (one: number, two: number) => one + two + base;
}`;

print(script);
