import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A namespace static taking a rest parameter, so the whole of the call crosses
// as one name and a list of arguments — `String` is the front of the name and
// never a value read off. Called with none, which the schema says answers with
// the empty string rather than refusing the way an empty `Math.min` does.
async function Written() {
  return cs.create(
    "7lcft72v2y3x:10:9",
    { params: [] },
    {
      code: "export default () => {\n    return (<span>{String.fromCodePoint(72, 105) + String.fromCodePoint()}</span>);\n};",
      map: '{"version":3,"file":"string-from-code-point.test.jsx","sourceRoot":"","sources":["stdlib/string-from-code-point.test.tsx"],"names":[],"mappings":"eASY;IACR,OAAO,CACL,CAAC,IAAI,CAAC,CAAC,MAAM,CAAC,aAAa,CAAC,EAAE,EAAE,GAAG,CAAC,GAAG,MAAM,CAAC,aAAa,EAAE,CAAC,EAAE,IAAI,CAAC,CACtE,CAAC;AACJ,CAAC"}',
    },
  );
}
it("Written", async (t) => {
  await snapshotCase(t, "Written", _jsx(Written, {}));
});
