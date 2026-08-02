import { cs } from "@backtickjs/core";

// A name is a script's own variable, a splice, or one of the globals this
// language provides itself — which is `Math` and nothing else. A lib global is
// not in scope here whatever JavaScript would say, because there is no scope
// for it to be in.
const lib = cs`String(1)`;

const object = cs`JSON.stringify(1)`;

const hostValue = 5;

const host = cs`{
  return hostValue + 1;
}`;

const assigned = cs`{
  count = 1;
}`;
