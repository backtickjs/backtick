import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A host helper reused with different splices makes its script polymorphic:
// every call site passes its splice as a thunk, and the body reads it at the
// hole. A script is one value, made at load, so code that must not run until
// it's reached is a function, called where it's reached, as in TypeScript:
// `guard(broken)(false)` never calls `broken`.
function guard(
  fragment: Client<() => string>,
): Client<(flag: boolean) => string> {
  return cs`(flag: boolean) => {
    if (flag) {
      return $fragment();
    }
    return "skipped";
  }`;
}

const ok = cs`() => "evaluated"`;

const broken = cs`() => {
  throw "the guarded fragment must never evaluate";
}`;

it("spliceLaziness", async (t) => {
  await snapshotCase(
    t,
    "spliceLaziness",
    cs`({
      taken: ${guard(ok)}(true),
      skipped: ${guard(broken)}(false),
    })`,
  );
});
