import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Three scripts, and the binding skips the middle one.
//
// The outer script declares `outer`; the innermost references it. The script
// between them neither declares nor mentions it, so it has no capture of its
// own — the binding still has to reach through it, and the outer script has to
// know its declaration escaped even though the script that took it is two
// levels down.
//
// Two call sites make the outer script polymorphic, so its splice arrives as a
// thunk: `captured` is what the hole hands that thunk, which is the only place
// a wrong answer would show up.
function wrap(start) {
  return cs.create(
    "22sufdxid1i7s:18:9",
    {
      params: [
        { kind: "splice", value: start, bindings: [] },
        {
          kind: "splice",
          value: cs.create(
            "22sufdxid1i7s:20:13",
            {
              params: [
                {
                  kind: "splice",
                  value: cs.create(
                    "22sufdxid1i7s:22:24",
                    {
                      params: [
                        { kind: "capture", key: "outer$22sufdxid1i7s$0" },
                      ],
                    },
                    {
                      code: "export default ($0) => $0;",
                      map: '{"version":3,"file":"deep-capture.test.jsx","sourceRoot":"","sources":["deep-capture.test.tsx"],"names":[],"mappings":"eAqB2B,QAAA,EAAK"}',
                    },
                  ),
                  bindings: [],
                },
                { kind: "capture", key: "outer$22sufdxid1i7s$0" },
              ],
            },
            {
              code: "export default ($0, $1) => {\n    const middle = 10;\n    return middle + $0($1);\n};",
              map: '{"version":3,"file":"deep-capture.test.jsx","sourceRoot":"","sources":["deep-capture.test.tsx"],"names":[],"mappings":"eAmBgB;IACV,MAAM,MAAM,GAAG,EAAE,CAAC;IAClB,OAAO,MAAM,GAAG,MAAC,CAAY;AAC/B,CAAC"}',
            },
          ),
          bindings: ["outer$22sufdxid1i7s$0"],
        },
      ],
    },
    {
      code: "export default ($0, $1) => {\n    const outer = $0();\n    return $1(outer);\n};",
      map: '{"version":3,"file":"deep-capture.test.jsx","sourceRoot":"","sources":["deep-capture.test.tsx"],"names":[],"mappings":"eAiBY;IACR,MAAM,KAAK,GAAG,IAAM,CAAC;IACrB,OAAO,SAAC,CAGJ;AACN,CAAC"}',
    },
  );
}
it("deepCapture", async (t) => {
  await snapshotCase(
    t,
    "deepCapture",
    cs.create(
      "22sufdxid1i7s:28:39",
      {
        params: [
          {
            kind: "splice",
            value: wrap(
              cs.create(
                "22sufdxid1i7s:28:49",
                { params: [] },
                {
                  code: "export default () => 1;",
                  map: '{"version":3,"file":"deep-capture.test.jsx","sourceRoot":"","sources":["deep-capture.test.tsx"],"names":[],"mappings":"eA2BoD,MAAA,CAAC"}',
                },
              ),
            ),
            bindings: [],
          },
          {
            kind: "splice",
            value: wrap(
              cs.create(
                "22sufdxid1i7s:28:66",
                { params: [] },
                {
                  code: "export default () => 2;",
                  map: '{"version":3,"file":"deep-capture.test.jsx","sourceRoot":"","sources":["deep-capture.test.tsx"],"names":[],"mappings":"eA2BqE,MAAA,CAAC"}',
                },
              ),
            ),
            bindings: [],
          },
        ],
      },
      {
        code: "export default ($0, $1) => $0() + $1();",
        map: '{"version":3,"file":"deep-capture.test.jsx","sourceRoot":"","sources":["deep-capture.test.tsx"],"names":[],"mappings":"eA2B0C,YAAA,IAAC,GAAgB,IAAC"}',
      },
    ),
  );
});
