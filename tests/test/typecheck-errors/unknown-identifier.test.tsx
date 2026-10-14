import { cs } from "@backtickjs/core";

// A name a script didn't bind is the client's global: one the project
// declares — `window`, from the DOM's lib — reads as it is, and one it
// doesn't is reported as TypeScript reports it. A host binding is no global,
// however it is in scope around the script, so it is not found where it is
// written: it has to be spliced.
const hostValue = 5;

export const host = cs`{
  // @ts-expect-error: Cannot find name 'hostValue'.
  return hostValue + 1;
}`;

export const assigned = cs`{
  // @ts-expect-error: Cannot find name 'count'.
  count = 1;
}`;

// However deep the host binding is declared, if the script is in its scope.
export const scoped = (hostParam: number) => cs`{
  // @ts-expect-error: Cannot find name 'hostParam'.
  return hostParam;
}`;

export const global = cs`window.location.href`;
