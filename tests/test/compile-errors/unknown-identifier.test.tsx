import { cs } from "@backtickjs/core";

// A name is a script's own variable, a splice, or an ECMAScript global. A host
// binding is none of these, however it is in scope around the script.
const hostValue = 5;

const host = cs`{
  return hostValue + 1;
}`;

const assigned = cs`{
  count = 1;
}`;
