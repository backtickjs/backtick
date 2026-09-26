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
      code: "export default $0 => {\n  const total = 1;\n  {\n    const total = 2;\n    return total + $0();\n  }\n};",
      map: '{"version":3,"mappings":"eAcYA,EAAA;EACR,MAAMC,KAAK,GAAG,CAAC;EACf;IACE,MAAMA,KAAK,GAAG,CAAC;IACf,OAAOA,KAAK,GAAGD,EAAA,EAAS;EAC1B;AACF,CAAC","names":["$0","total"],"ignoreList":[],"sources":["shadowed-hole.test.tsx"]}',
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
                  map: '{"version":3,"mappings":"eA2ByB,QAAE","names":[],"ignoreList":[],"sources":["shadowed-hole.test.tsx"]}',
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
                  map: '{"version":3,"mappings":"eA2BmD,QAAE","names":[],"ignoreList":[],"sources":["shadowed-hole.test.tsx"]}',
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
        map: '{"version":3,"mappings":"eA2BO,CAAAA,EAAA,EAAAC,EAAA,KAAAD,EAAA,EAAC,GAAyBC,EAAA,EAAC","names":["$0","$1"],"ignoreList":[],"sources":["shadowed-hole.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
