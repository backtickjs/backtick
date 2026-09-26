import { cs } from "@backtickjs/core";

// A name a script didn't bind is the client's global, read off `globalThis`:
// one the project declares — `window`, from the DOM's lib — reads as it is. A
// host binding is no global, however it is in scope around the script, so it
// is reported where it is written: it has to be spliced.
const hostValue = 5;

export const host = cs`{
  // @ts-expect-error: Property 'hostValue' does not exist on type 'GlobalThis'.
  return hostValue + 1;
}`;

export const assigned = cs`{
  // @ts-expect-error: Property 'count' does not exist on type 'GlobalThis'.
  count = 1;
}`;

export const global = cs`window.location.href`;
