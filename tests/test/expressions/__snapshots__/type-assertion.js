import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
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
  await snapshotCase(
    t,
    "typeAssertion",
    cs.create(
      "3amzui83z49rq:19:4",
      { params: [{ kind: "splice", value: answered, bindings: [] }] },
      {
        code: 'export default ($0) => {\n    const page = JSON.parse($0());\n    return page.rows[0] + " of " + page.count;\n};',
        map: '{"version":3,"file":"type-assertion.test.jsx","sourceRoot":"","sources":["type-assertion.test.tsx"],"names":[],"mappings":"eAkBO;IACD,MAAM,IAAI,GAAG,IAAI,CAAC,KAAK,CAAC,IAAS,CAAsC,CAAC;IAExE,OAAO,IAAI,CAAC,IAAI,CAAC,CAAC,CAAC,GAAG,MAAM,GAAG,IAAI,CAAC,KAAK,CAAC;AAC5C,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
