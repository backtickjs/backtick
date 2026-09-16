import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Splices that arrive through host code — the case a hole can never be resolved
// from source, because what the compiler sees at the hole is a call expression
// and not a template.
//
// Two shapes, and the second is the one that matters. `foo` builds a new
// script, written at its own location outside the enclosing one, so nothing
// about it looks lexical. `same` hands back the template it was given: the
// script that lands at the hole *is* written inside the enclosing script's
// span, and still can't be read off that span, because only running `same` says
// it goes there. Anything that resolves a hole by comparing spans gets this one
// wrong.
function wrap(start: Client<number>): Client<number> {
  return cs`{
    const outer = $start;
    return ${foo(cs`{
      const middle = 10;
      return middle + ${same(cs`outer`)};
    }`)};
  }`;
}

function foo(start: Client<number>): Client<number> {
  return cs`$start + 1`;
}

function same(script: Client<number>): Client<number> {
  return script;
}

it("hostWrappedSplice", async (t) => {
  await snapshotCase(
    t,
    "hostWrappedSplice",
    cs`${wrap(cs`1`)} + ${wrap(cs`2`)}`,
  );
});
