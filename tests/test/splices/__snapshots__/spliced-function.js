import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A host function has no data form — client code is written in `cs`...` — so
// the bundler expands it rather than carrying it: run once against one opaque
// hole per parameter, and what it answered is what crosses.
//
// Nothing here is about components. A component is a function of one argument
// it reads fields off, which is why a tag written inside a script works at
// all.
//
// The cast is because `Spliceable` does not admit a function yet: the rule is
// the bundler's, and the type has still to catch up — until it does, a script
// cannot call one by name either.
it("splicedFunction", async (t) => {
  await snapshotCase(
    t,
    "splicedFunction",
    cs.create(
      "1pdv8x4hbo6de:21:4",
      { params: [{ kind: "splice", value: (n) => n, bindings: [] }] },
      {
        code: "export default $0 => () => $0();",
        map: '{"version":3,"mappings":"eAoBOA,EAAA,UAAMA,EAAA,EAAC","names":["$0"],"ignoreList":[],"sources":["spliced-function.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
