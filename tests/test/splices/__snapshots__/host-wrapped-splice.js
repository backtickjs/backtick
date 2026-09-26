import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Splices that arrive through host code — the case a hole can never be resolved
// from source, because what the compiler sees at the hole is a call expression
// and not a template.
//
// Two shapes, and the second is the one that matters. `foo` builds a new
// script, written at its own location outside the enclosing one, so nothing
// about it looks lexical. `same` hands back the template it was given: the
// script that lands at the hole *is* written inside the enclosing script's
// span, and still can't be read off that span, because only running `same` says
// it goes there. Anything that resolves a hole by comparing spans gets this one
// wrong.
function wrap(start) {
  return cs.create(
    "zqr0jsdf8ub6:17:9",
    {
      params: [
        { kind: "splice", value: start, bindings: [] },
        {
          kind: "splice",
          value: foo(
            cs.create(
              "zqr0jsdf8ub6:19:17",
              {
                params: [
                  {
                    kind: "splice",
                    value: same(
                      cs.create(
                        "zqr0jsdf8ub6:21:29",
                        {
                          params: [
                            { kind: "capture", key: "outer$zqr0jsdf8ub6$0" },
                          ],
                        },
                        {
                          code: "export default ($0) => $0;",
                          map: '{"version":3,"file":"host-wrapped-splice.test.jsx","sourceRoot":"","sources":["host-wrapped-splice.test.tsx"],"names":[],"mappings":"eAoBgC,QAAA,EAAK"}',
                        },
                      ),
                    ),
                    bindings: [],
                  },
                  { kind: "capture", key: "outer$zqr0jsdf8ub6$0" },
                ],
              },
              {
                code: "export default ($0, $1) => {\n    const middle = 10;\n    return middle + $0($1);\n};",
                map: '{"version":3,"file":"host-wrapped-splice.test.jsx","sourceRoot":"","sources":["host-wrapped-splice.test.tsx"],"names":[],"mappings":"eAkBoB;IACd,MAAM,MAAM,GAAG,EAAE,CAAC;IAClB,OAAO,MAAM,GAAG,MAAC,CAAkB;AACrC,CAAC"}',
              },
            ),
          ),
          bindings: ["outer$zqr0jsdf8ub6$0"],
        },
      ],
    },
    {
      code: "export default ($0, $1) => {\n    const outer = $0();\n    return $1(outer);\n};",
      map: '{"version":3,"file":"host-wrapped-splice.test.jsx","sourceRoot":"","sources":["host-wrapped-splice.test.tsx"],"names":[],"mappings":"eAgBY;IACR,MAAM,KAAK,GAAG,IAAM,CAAC;IACrB,OAAO,SAAC,CAGH;AACP,CAAC"}',
    },
  );
}
function foo(start) {
  return cs.create(
    "zqr0jsdf8ub6:27:9",
    { params: [{ kind: "splice", value: start, bindings: [] }] },
    {
      code: "export default ($0) => $0() + 1;",
      map: '{"version":3,"file":"host-wrapped-splice.test.jsx","sourceRoot":"","sources":["host-wrapped-splice.test.tsx"],"names":[],"mappings":"eA0BY,QAAA,IAAM,GAAG,CAAC"}',
    },
  );
}
function same(script) {
  return script;
}
it("hostWrappedSplice", async (t) => {
  await snapshotCase(
    t,
    "hostWrappedSplice",
    cs.create(
      "zqr0jsdf8ub6:38:4",
      {
        params: [
          {
            kind: "splice",
            value: wrap(
              cs.create(
                "zqr0jsdf8ub6:38:14",
                { params: [] },
                {
                  code: "export default () => 1;",
                  map: '{"version":3,"file":"host-wrapped-splice.test.jsx","sourceRoot":"","sources":["host-wrapped-splice.test.tsx"],"names":[],"mappings":"eAqCiB,MAAA,CAAC"}',
                },
              ),
            ),
            bindings: [],
          },
          {
            kind: "splice",
            value: wrap(
              cs.create(
                "zqr0jsdf8ub6:38:31",
                { params: [] },
                {
                  code: "export default () => 2;",
                  map: '{"version":3,"file":"host-wrapped-splice.test.jsx","sourceRoot":"","sources":["host-wrapped-splice.test.tsx"],"names":[],"mappings":"eAqCkC,MAAA,CAAC"}',
                },
              ),
            ),
            bindings: [],
          },
        ],
      },
      {
        code: "export default ($0, $1) => $0() + $1();",
        map: '{"version":3,"file":"host-wrapped-splice.test.jsx","sourceRoot":"","sources":["host-wrapped-splice.test.tsx"],"names":[],"mappings":"eAqCO,YAAA,IAAC,GAAgB,IAAC"}',
      },
    ),
  );
});
