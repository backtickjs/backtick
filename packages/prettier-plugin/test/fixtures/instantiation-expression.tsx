import { cs } from "@backtickjs/core";

const wrapped = cs`{
  function wrap<T>(value: T): T[] { return [value] }
  const wrapNumber = wrap<number>;
  return wrapNumber(1)
}`;

const pairString = cs`$pair<string>`;
