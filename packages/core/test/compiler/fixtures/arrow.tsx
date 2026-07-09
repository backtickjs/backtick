import { cs } from "@backtickjs/core";

const script = cs`{
  const base = 10;
  return (one: number, two: number) => one + two + base;
}`;
