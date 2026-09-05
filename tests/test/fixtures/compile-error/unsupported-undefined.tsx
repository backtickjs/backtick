import { cs } from "@backtickjs/core";

const bare = cs`undefined`;

const returned = cs`{
  return undefined;
}`;

const declared = cs`{
  const undefined = 1;
  return 2;
}`;

const parameter = cs`(undefined: number) => 3`;

const caught = cs`{
  try {
    return 4;
  } catch (undefined) {
    return 5;
  }
}`;
