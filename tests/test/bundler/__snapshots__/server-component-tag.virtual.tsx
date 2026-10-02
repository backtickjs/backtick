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
      // @ts-expect-error: not assignable to parameter of type 'Client<any>'.
      input: cs.lift(((__cs_Rule = cs.splice(Rule)) => <div>{<__cs_Rule />}</div>)()),
      external: {},
    }),
    {
      message:
        "`<Rule>` is a server component, so it can't be a tag in a script, whose tags are client components. Use it in a splice: `{${<Rule />}}`.",
    },
  );
});
