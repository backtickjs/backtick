import { cs } from "@backtickjs/core";

// `undefined` doesn't exist in the language; `null` is the absent value.
const bare = cs`undefined`;

const returned = cs`{
  return undefined;
}`;

const declared = cs`{
  const undefined = 1;
  return 2;
}`;
