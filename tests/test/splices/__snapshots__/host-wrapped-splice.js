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
                          code: "export default $0 => $0;",
                          map: '{"version":3,"mappings":"eAoBgCA,EAAA,IAAAA,EAAK","names":["$0"],"ignoreList":[],"sources":["host-wrapped-splice.test.tsx"]}',
                          imports: [],
                          exportAt: 0,
                        },
                      ),
                    ),
                    bindings: [],
                  },
                  { kind: "capture", key: "outer$zqr0jsdf8ub6$0" },
                ],
              },
              {
                code: "export default ($0, $1) => {\n  const middle = 10;\n  return middle + $0($1);\n};",
                map: '{"version":3,"mappings":"eAkBoB,CAAAA,EAAA,EAAAC,EAAA;EACd,MAAMC,MAAM,GAAG,EAAE;EACjB,OAAOA,MAAM,GAAGF,EAAA,CAAAC,EAAA,CAAC;AACnB,CAAC","names":["$0","$1","middle"],"ignoreList":[],"sources":["host-wrapped-splice.test.tsx"]}',
                imports: [],
                exportAt: 0,
              },
            ),
          ),
          bindings: ["outer$zqr0jsdf8ub6$0"],
        },
      ],
    },
    {
      code: "export default ($0, $1) => {\n  const outer = $0();\n  return $1(outer);\n};",
      map: '{"version":3,"mappings":"eAgBY,CAAAA,EAAA,EAAAC,EAAA;EACR,MAAMC,KAAK,GAAGF,EAAA,EAAM;EACpB,OAAOC,EAAA,CAAAC,KAAA,CAAC;AAIV,CAAC","names":["$0","$1","outer"],"ignoreList":[],"sources":["host-wrapped-splice.test.tsx"]}',
      imports: [],
      exportAt: 0,
    },
  );
}
function foo(start) {
  return cs.create(
    "zqr0jsdf8ub6:27:9",
    { params: [{ kind: "splice", value: start, bindings: [] }] },
    {
      code: "export default $0 => $0() + 1;",
      map: '{"version":3,"mappings":"eA0BYA,EAAA,IAAAA,EAAA,EAAM,GAAG,CAAC","names":["$0"],"ignoreList":[],"sources":["host-wrapped-splice.test.tsx"]}',
      imports: [],
      exportAt: 0,
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
                  map: '{"version":3,"mappings":"eAqCiB,OAAC","names":[],"ignoreList":[],"sources":["host-wrapped-splice.test.tsx"]}',
                  imports: [],
                  exportAt: 0,
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
                  map: '{"version":3,"mappings":"eAqCkC,OAAC","names":[],"ignoreList":[],"sources":["host-wrapped-splice.test.tsx"]}',
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
        map: '{"version":3,"mappings":"eAqCO,CAAAA,EAAA,EAAAC,EAAA,KAAAD,EAAA,EAAC,GAAgBC,EAAA,EAAC","names":["$0","$1"],"ignoreList":[],"sources":["host-wrapped-splice.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
