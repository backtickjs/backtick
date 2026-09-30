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
it("splicedFunction", async (t) => {
  await snapshotCase(
    t,
    "splicedFunction",
    cs.create(
      "3291w7nz039gu:16:4",
      { params: [{ kind: "splice", value: (n) => n, bindings: [] }] },
      "($splice0) => () => $splice0()",
      '{"version":3,"file":"spliced-function.test.jsx","sourceRoot":"","sources":["splices/spliced-function.test.tsx"],"names":[],"mappings":"AAeO,cAAA,GAAG,EAAE,CAAC,UAAC"}',
    ),
  );
});
