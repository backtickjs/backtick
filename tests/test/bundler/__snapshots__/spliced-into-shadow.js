import assert from "node:assert/strict";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { transform } from "@backtickjs/solid-js/transform";
import { cs } from "@backtickjs/core";
// A fragment written under the outer `total`, carried by host code into a hole
// inside a block that shadows it.
//
// Refused. The binding is still in scope there, and the bundler could reach it
// by renaming the inner one — which is what it used to do, quietly returning 5
// where the fragment meant 4. But no JavaScript can name a shadowed binding
// from inside the scope that shadows it, and a bundle should not be able to say
// what its source cannot. The behaviour itself is ordinary — a closure written
// in the outer scope and called in the inner does exactly this — so the fix is
// to splice the fragment where its binding is not shadowed.
let carried;
const keep = (fragment) => {
  carried = fragment;
  return fragment;
};
const again = () => {
  if (carried === undefined) {
    throw new Error("the first hole runs first");
  }
  return carried;
};
it("refuses a capture spliced where it is shadowed", async () => {
  await assert.rejects(
    bundler.run(
      cs.create(
        "29bb93dza5nqb:34:6",
        {
          params: [
            {
              kind: "splice",
              value: keep(
                cs.create(
                  "29bb93dza5nqb:36:29",
                  {
                    params: [{ kind: "capture", key: "total$29bb93dza5nqb$0" }],
                  },
                  {
                    code: "export default ($0) => $0;",
                    map: '{"version":3,"file":"spliced-into-shadow.test.jsx","sourceRoot":"","sources":["spliced-into-shadow.test.tsx"],"names":[],"mappings":"eAmCgC,QAAA,EAAK"}',
                    imports: [],
                    exportAt: 0,
                  },
                ),
              ),
              bindings: ["total$29bb93dza5nqb$0"],
            },
            { kind: "splice", value: again(), bindings: [] },
          ],
        },
        {
          code: "export default ($0, $1) => {\n    const total = 1;\n    const first = $0(total);\n    {\n        const total = 2;\n        return first + total + $1();\n    }\n};",
          map: '{"version":3,"file":"spliced-into-shadow.test.jsx","sourceRoot":"","sources":["spliced-into-shadow.test.tsx"],"names":[],"mappings":"eAiCS;IACD,MAAM,KAAK,GAAG,CAAC,CAAC;IAChB,MAAM,KAAK,GAAG,SAAC,CAAkB;IACjC,CAAC;QACC,MAAM,KAAK,GAAG,CAAC,CAAC;QAChB,OAAO,KAAK,GAAG,KAAK,GAAG,IAAC,CAAU;IACpC,CAAC;AACH,CAAC"}',
          imports: [],
          exportAt: 0,
        },
      ),
      { transform },
    ),
    {
      message:
        "Can't thread the capture `total`: nothing encloses this reference to supply it. A fragment carries the bindings it was written under, so this is also what happens when one is spliced somewhere another `total` shadows it: the binding is still there, but no longer reachable by name, and naming it anyway would mean emitting what the source couldn't say.",
    },
  );
});
