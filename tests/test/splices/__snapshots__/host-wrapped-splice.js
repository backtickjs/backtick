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
                        () => ({
                          type: "Identifier",
                          loc: {
                            start: { line: 21, column: 32 },
                            end: { line: 21, column: 37 },
                          },
                          name: "outer",
                          key: "outer$zqr0jsdf8ub6$0",
                        }),
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
              () => ({
                type: "BlockStatement",
                loc: {
                  start: { line: 19, column: 20 },
                  end: { line: 22, column: 5 },
                },
                body: [
                  {
                    type: "VariableDeclaration",
                    loc: {
                      start: { line: 20, column: 6 },
                      end: { line: 20, column: 24 },
                    },
                    kind: "const",
                    declarations: [
                      {
                        type: "VariableDeclarator",
                        loc: {
                          start: { line: 20, column: 12 },
                          end: { line: 20, column: 23 },
                        },
                        id: {
                          type: "Identifier",
                          loc: {
                            start: { line: 20, column: 12 },
                            end: { line: 20, column: 18 },
                          },
                          name: "middle",
                          key: "middle$zqr0jsdf8ub6$1",
                        },
                        init: {
                          type: "Literal",
                          loc: {
                            start: { line: 20, column: 21 },
                            end: { line: 20, column: 23 },
                          },
                          value: 10,
                        },
                      },
                    ],
                  },
                  {
                    type: "ReturnStatement",
                    loc: {
                      start: { line: 21, column: 6 },
                      end: { line: 21, column: 41 },
                    },
                    argument: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 21, column: 13 },
                        end: { line: 21, column: 40 },
                      },
                      operator: "+",
                      left: {
                        type: "Identifier",
                        loc: {
                          start: { line: 21, column: 13 },
                          end: { line: 21, column: 19 },
                        },
                        name: "middle",
                        key: "middle$zqr0jsdf8ub6$1",
                      },
                      right: {
                        type: "Splice",
                        loc: {
                          start: { line: 21, column: 22 },
                          end: { line: 21, column: 40 },
                        },
                        param: 0,
                      },
                    },
                  },
                ],
              }),
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
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 17, column: 12 }, end: { line: 23, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 18, column: 4 },
            end: { line: 18, column: 25 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 18, column: 10 },
                end: { line: 18, column: 24 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 18, column: 10 },
                  end: { line: 18, column: 15 },
                },
                name: "outer",
                key: "outer$zqr0jsdf8ub6$0",
              },
              init: {
                type: "Splice",
                loc: {
                  start: { line: 18, column: 18 },
                  end: { line: 18, column: 24 },
                },
                param: 0,
              },
            },
          ],
        },
        {
          type: "ReturnStatement",
          loc: { start: { line: 19, column: 4 }, end: { line: 22, column: 9 } },
          argument: {
            type: "Splice",
            loc: {
              start: { line: 19, column: 11 },
              end: { line: 22, column: 8 },
            },
            param: 1,
          },
        },
      ],
    }),
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
    () => ({
      type: "BinaryExpression",
      loc: { start: { line: 27, column: 12 }, end: { line: 27, column: 22 } },
      operator: "+",
      left: {
        type: "Splice",
        loc: { start: { line: 27, column: 12 }, end: { line: 27, column: 18 } },
        param: 0,
      },
      right: {
        type: "Literal",
        loc: { start: { line: 27, column: 21 }, end: { line: 27, column: 22 } },
        value: 1,
      },
    }),
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
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 38, column: 17 },
                    end: { line: 38, column: 18 },
                  },
                  value: 1,
                }),
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
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 38, column: 34 },
                    end: { line: 38, column: 35 },
                  },
                  value: 2,
                }),
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
      () => ({
        type: "BinaryExpression",
        loc: { start: { line: 38, column: 7 }, end: { line: 38, column: 38 } },
        operator: "+",
        left: {
          type: "Splice",
          loc: {
            start: { line: 38, column: 7 },
            end: { line: 38, column: 21 },
          },
          param: 0,
        },
        right: {
          type: "Splice",
          loc: {
            start: { line: 38, column: 24 },
            end: { line: 38, column: 38 },
          },
          param: 1,
        },
      }),
      {
        code: "export default ($0, $1) => $0() + $1();",
        map: '{"version":3,"file":"host-wrapped-splice.test.jsx","sourceRoot":"","sources":["host-wrapped-splice.test.tsx"],"names":[],"mappings":"eAqCO,YAAA,IAAC,GAAgB,IAAC"}',
      },
    ),
  );
});
