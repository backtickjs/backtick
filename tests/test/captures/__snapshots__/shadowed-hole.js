import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A hole inside a block that shadows an outer name. Two call sites make the
// script polymorphic, so the splice arrives as a thunk rather than inlined.
//
// Both `total` bindings are the entry's own, and both render under their source
// name — the inner one shadows the outer exactly as it does in the source, and
// a block frames its declarations, so nothing has to tell them apart. What an
// entry captures cannot collide with either: a capture is a parameter, numbered
// `$0` upward, and `$` starts no name a script can write.
function wrapShadowed(fragment) {
  return cs.create(
    "1wiy7dknp0llv:15:9",
    { params: [{ kind: "splice", value: fragment, bindings: [] }] },
    {
      code: "export default ($0) => {\n    const total = 1;\n    {\n        const total = 2;\n        return total + $0();\n    }\n};",
      map: '{"version":3,"file":"shadowed-hole.test.jsx","sourceRoot":"","sources":["shadowed-hole.test.tsx"],"names":[],"mappings":"eAcY;IACR,MAAM,KAAK,GAAG,CAAC,CAAC;IAChB,CAAC;QACC,MAAM,KAAK,GAAG,CAAC,CAAC;QAChB,OAAO,KAAK,GAAG,IAAS,CAAC;IAC3B,CAAC;AACH,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
}
it("shadowedHole", async (t) => {
  await snapshotCase(
    t,
    "shadowedHole",
    cs.create(
      "1wiy7dknp0llv:28:4",
      {
        params: [
          {
            kind: "splice",
            value: wrapShadowed(
              cs.create(
                "1wiy7dknp0llv:28:22",
                { params: [] },
                {
                  code: "export default () => 10;",
                  map: '{"version":3,"file":"shadowed-hole.test.jsx","sourceRoot":"","sources":["shadowed-hole.test.tsx"],"names":[],"mappings":"eA2ByB,MAAA,EAAE"}',
                  imports: [],
                  exportAt: 0,
                },
              ),
            ),
            bindings: [],
          },
          {
            kind: "splice",
            value: wrapShadowed(
              cs.create(
                "1wiy7dknp0llv:28:48",
                { params: [] },
                {
                  code: "export default () => 20;",
                  map: '{"version":3,"file":"shadowed-hole.test.jsx","sourceRoot":"","sources":["shadowed-hole.test.tsx"],"names":[],"mappings":"eA2BmD,MAAA,EAAE"}',
                  imports: [],
                  exportAt: 0,
                },
              ),
            ),
            bindings: [],
          },
        ],
      },
      {
        code: "export default ($0, $1) => $0() + $1();",
        map: '{"version":3,"file":"shadowed-hole.test.jsx","sourceRoot":"","sources":["shadowed-hole.test.tsx"],"names":[],"mappings":"eA2BO,YAAA,IAAC,GAAyB,IAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
