import assert from "node:assert/strict";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";

// A server component written as a tag in a script, past the typechecker:
// refused when bundling, pointing at the splice it belongs in.
function Rule() {
  return cs.lift((() => <hr />)());
}

it("refuses a server component as a tag in a script", async () => {
  await assert.rejects(
    bundler.build({
      input: cs.lift((() => (
        <div>
          {/* @ts-expect-error: not assignable to parameter of type 'Spliceable'. */}
          {(($Rule) => <$Rule />)(cs.splice((Rule)))}
        </div>
      ))()),
      packageVersions: {},
    }),
    {
      message:
        "Can't splice the host function `Rule`: it's host code, and only runs on the host. Write a client function as a script instead: cs`(n: number) => ...`. If it's a server component, draw it with a tag in a braced splice: `{${<Rule />}}`.",
    },
  );
});
