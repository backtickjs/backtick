import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "3amzui83z49rq:19:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const page = JSON.parse($splice0());\n    return page.rows[0] + " of " + page.count;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkBOA,QAAA;IACD,MAAMC,IAAI,GAAGC,IAAI,CAACC,KAAK,CAACH,QAAA,EAAS,CAAsC;IAEvE,OAAOC,IAAI,CAACG,IAAI,CAAC,CAAC,CAAC,GAAG,MAAM,GAAGH,IAAI,CAACI,KAAK;AAC3C,CAAC","names":["$splice0","page","JSON","parse","rows","count"],"ignoreList":[],"sources":["expressions/type-assertion.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "block",
};
const answered = '{"rows":["one","two"],"count":2}';
// An assertion is the checker's alone. It is erased on the way to a bundle —
// the runtime here is the expression and nothing else — so a host reading one
// never learns an assertion was written.
//
// `JSON.parse` is why the language has one at all. It answers with
// `ClientValue`, the union of everything a client can hold, and a script that
// means to read `.rows` off what came back has no other way to say what it is
// looking at.
it("typeAssertion", async (t) => {
  await snapshotCase(t, "typeAssertion", cs.create($module0, [answered]));
});
