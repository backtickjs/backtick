import assert from "node:assert/strict";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
const $module0 = {
  id: "qfjmdn3bl9zp:33:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => {\n    const total = 1;\n    const first = $splice0(total);\n    {\n        const total = 2;\n        return first + total + $splice1();\n    }\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAgCgB,CAAAA,QAAA,EAAAC,QAAA;IACR,MAAMC,KAAK,GAAG,CAAC;IACf,MAAMC,KAAK,GAAGH,QAAA,CAAAE,KAAA,CAAkB;IAChC;QACE,MAAMA,KAAK,GAAG,CAAC;QACf,OAAOC,KAAK,GAAGD,KAAK,GAAGD,QAAA,EAAU;IACnC;AACF,CAAC","names":["$splice0","$splice1","total","first"],"ignoreList":[],"sources":["bundler/spliced-into-shadow.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: ["total$qfjmdn3bl9zp$0"] },
    { kind: "splice", bindings: [] },
  ],
};
const $module1 = {
  id: "qfjmdn3bl9zp:35:29",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => $capture0;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkCgCA,SAAA,IAAAA,SAAK","names":["$capture0"],"ignoreList":[],"sources":["bundler/spliced-into-shadow.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "capture", key: "total$qfjmdn3bl9zp$0" }],
};
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
    bundler.build({
      input: cs.create($module0, [keep(cs.create($module1, [])), again()]),
      external: {},
    }),
    {
      message:
        "Can't thread the capture `total`: nothing encloses this reference to supply it. A fragment carries the bindings it was written under, so this is also what happens when one is spliced somewhere another `total` shadows it: the binding is still there, but no longer reachable by name, and naming it anyway would mean emitting what the source couldn't say.",
    },
  );
});
