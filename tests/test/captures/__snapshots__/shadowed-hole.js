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
    "($0) => {\n    const total = 1;\n    {\n        const total = 2;\n        return total + $0();\n    }\n}",
    '{"version":3,"file":"shadowed-hole.test.jsx","sourceRoot":"","sources":["captures/shadowed-hole.test.tsx"],"names":[],"mappings":"AAcY;IACR,MAAM,KAAK,GAAG,CAAC,CAAC;IAChB,CAAC;QACC,MAAM,KAAK,GAAG,CAAC,CAAC;QAChB,OAAO,KAAK,GAAG,IAAS,CAAC;IAC3B,CAAC;AACH,CAAC"}',
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
                "() => 10",
                '{"version":3,"file":"shadowed-hole.test.jsx","sourceRoot":"","sources":["captures/shadowed-hole.test.tsx"],"names":[],"mappings":"AA2ByB,MAAA,EAAE"}',
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
                "() => 20",
                '{"version":3,"file":"shadowed-hole.test.jsx","sourceRoot":"","sources":["captures/shadowed-hole.test.tsx"],"names":[],"mappings":"AA2BmD,MAAA,EAAE"}',
              ),
            ),
            bindings: [],
          },
        ],
      },
      "($0, $1) => $0() + $1()",
      '{"version":3,"file":"shadowed-hole.test.jsx","sourceRoot":"","sources":["captures/shadowed-hole.test.tsx"],"names":[],"mappings":"AA2BO,YAAA,IAAC,GAAyB,IAAC"}',
    ),
  );
});
