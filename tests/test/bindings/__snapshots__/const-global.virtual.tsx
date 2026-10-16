import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
declare const { createRoot }: import("@backtickjs/core").ClientModule<typeof import("solid-js")>;
import { evaluate } from "../evaluate.ts";

// A global the project declares with `const`, as React Native declares
// `__DEV__`: no property of `typeof globalThis`, so a script reads it by its
// bare name, as the host would.
declare global {
  const CLIENT_FLAG: boolean;
}
Object.assign(globalThis, { CLIENT_FLAG: true });

// A host binding of the same name hides the global only where it is in scope.
export function elsewhere(CLIENT_FLAG: string): string {
  return CLIENT_FLAG;
}

it("reads a global the project declares with const", async () => {
  assert.equal(await evaluate(cs.lift((() => (cs.splice((createRoot)))(() => CLIENT_FLAG))())), true);
});
