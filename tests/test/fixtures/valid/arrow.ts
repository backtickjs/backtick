import { cs } from "@backtickjs/core";

export default cs`{
  const base = 10;
  return (one: number, two: number) => one + two + base;
}`;
