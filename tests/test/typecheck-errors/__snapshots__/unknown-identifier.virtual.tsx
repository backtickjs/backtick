import { cs } from "@backtickjs/core";

// A name a script didn't bind is the client's global, read off `globalThis`:
// one the project declares — `window`, from the DOM's lib — reads as it is. A
// host binding is no global, however it is in scope around the script, so it
// is reported where it is written: it has to be spliced.
const hostValue = 5;

export const host = cs.lift((() => {
  // @ts-expect-error: Property 'hostValue' does not exist on type 'GlobalThis'.
  return cs.globalThis.hostValue + 1;
})());

export const assigned = cs.lift((() => {
  // @ts-expect-error: Property 'count' does not exist on type 'GlobalThis'.
  cs.globalThis.count = 1;
})());

export const global = cs.lift((() => cs.globalThis.window.location.href)());
