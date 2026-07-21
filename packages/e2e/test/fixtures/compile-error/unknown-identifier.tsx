import { cs } from "@backtickjs/core";

// There are no globals: a name is a script's own variable or a splice.
const lib = cs`String(1)`;

const method = cs`Math.floor(1.5)`;

const hostValue = 5;

const host = cs`{
  return hostValue + 1;
}`;

const assigned = cs`{
  count = 1;
}`;
