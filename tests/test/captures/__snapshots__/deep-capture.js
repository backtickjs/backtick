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
                    "($capture0) => $capture0",
                    '{"version":3,"file":"deep-capture.test.jsx","sourceRoot":"","sources":["captures/deep-capture.test.tsx"],"names":[],"mappings":"AAqB2B,eAAA,SAAK"}',
                  ),
                  bindings: [],
                },
                { kind: "capture", key: "outer$22sufdxid1i7s$0" },
              ],
            },
            "($splice0, $capture1) => {\n    const middle = 10;\n    return middle + $splice0($capture1);\n}",
            '{"version":3,"file":"deep-capture.test.jsx","sourceRoot":"","sources":["captures/deep-capture.test.tsx"],"names":[],"mappings":"AAmBgB;IACV,MAAM,MAAM,GAAG,EAAE,CAAC;IAClB,OAAO,MAAM,GAAG,mBAAC,CAAY;AAC/B,CAAC"}',
          ),
          bindings: ["outer$22sufdxid1i7s$0"],
        },
      ],
    },
    "($splice0, $splice1) => {\n    const outer = $splice0();\n    return $splice1(outer);\n}",
    '{"version":3,"file":"deep-capture.test.jsx","sourceRoot":"","sources":["captures/deep-capture.test.tsx"],"names":[],"mappings":"AAiBY;IACR,MAAM,KAAK,GAAG,UAAM,CAAC;IACrB,OAAO,eAAC,CAGJ;AACN,CAAC"}',
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
                "() => 1",
                '{"version":3,"file":"deep-capture.test.jsx","sourceRoot":"","sources":["captures/deep-capture.test.tsx"],"names":[],"mappings":"AA2BoD,MAAA,CAAC"}',
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
                "() => 2",
                '{"version":3,"file":"deep-capture.test.jsx","sourceRoot":"","sources":["captures/deep-capture.test.tsx"],"names":[],"mappings":"AA2BqE,MAAA,CAAC"}',
              ),
            ),
            bindings: [],
          },
        ],
      },
      "($splice0, $splice1) => $splice0() + $splice1()",
      '{"version":3,"file":"deep-capture.test.jsx","sourceRoot":"","sources":["captures/deep-capture.test.tsx"],"names":[],"mappings":"AA2B0C,wBAAA,UAAC,GAAgB,UAAC"}',
    ),
  );
});
