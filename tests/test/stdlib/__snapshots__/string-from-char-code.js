import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// UTF-16 code units rather than code points: a surrogate pair is two
// arguments, where `String.fromCodePoint` takes the one code point.
async function Written() {
  return cs.create(
    "rfc8jtzlhm6q:8:9",
    { params: [] },
    {
      code: "export default () => {\n    return (<span>\n        {String.fromCharCode(72, 105) + String.fromCharCode(0xd83d, 0xde00)}\n      </span>);\n};",
      map: '{"version":3,"file":"string-from-char-code.test.jsx","sourceRoot":"","sources":["stdlib/string-from-char-code.test.tsx"],"names":[],"mappings":"eAOY;IACR,OAAO,CACL,CAAC,IAAI,CACH;QAAA,CAAC,MAAM,CAAC,YAAY,CAAC,EAAE,EAAE,GAAG,CAAC,GAAG,MAAM,CAAC,YAAY,CAAC,MAAM,EAAE,MAAM,CAAC,CACrE;MAAA,EAAE,IAAI,CAAC,CACR,CAAC;AACJ,CAAC"}',
    },
  );
}
it("Written", async (t) => {
  await snapshotCase(t, "Written", _jsx(Written, {}));
});
