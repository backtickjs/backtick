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
      splices: {
        $start: { value: start, params: [] },
        $0splice0: {
          value: foo(
            cs.create(
              "zqr0jsdf8ub6:19:17",
              {
                splices: {
                  $0splice0: {
                    value: same(
                      cs.create(
                        "zqr0jsdf8ub6:21:29",
                        { splices: {}, captures: ["outer$zqr0jsdf8ub6$0"] },
                        () => ({
                          type: "Identifier",
                          loc: {
                            start: { line: 21, column: 32 },
                            end: { line: 21, column: 37 },
                          },
                          name: "outer",
                          key: "outer$zqr0jsdf8ub6$0",
                        }),
                        "$0 => $0",
                        '{"version":3,"file":"host-wrapped-splice.test.jsx","sourceRoot":"","sources":["host-wrapped-splice.test.tsx"],"names":[],"mappings":"AAoBgC,MAAA,EAAK,CAAA"}',
                      ),
                    ),
                    params: [],
                  },
                },
                captures: ["outer$zqr0jsdf8ub6$0"],
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
                        key: "$0splice0",
                      },
                    },
                  },
                ],
              }),
              "($0, $1) => {\n    const middle = 10;\n    return middle + $0($1);\n}",
              '{"version":3,"file":"host-wrapped-splice.test.jsx","sourceRoot":"","sources":["host-wrapped-splice.test.tsx"],"names":[],"mappings":"AAkBoB;IACd,MAAM,MAAM,GAAG,EAAE,CAAC;IAClB,OAAO,MAAM,GAAG,MAAC,CAAkB;AACrC,CAAC,CAAA"}',
            ),
          ),
          params: ["outer$zqr0jsdf8ub6$0"],
        },
      },
      captures: [],
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
                key: "$start",
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
            key: "$0splice0",
          },
        },
      ],
    }),
    "($0, $1) => {\n    const outer = $0();\n    return $1(outer);\n}",
    '{"version":3,"file":"host-wrapped-splice.test.jsx","sourceRoot":"","sources":["host-wrapped-splice.test.tsx"],"names":[],"mappings":"AAgBY;IACR,MAAM,KAAK,GAAG,IAAM,CAAC;IACrB,OAAO,SAAC,CAGH;AACP,CAAC,CAAA"}',
  );
}
function foo(start) {
  return cs.create(
    "zqr0jsdf8ub6:27:9",
    { splices: { $start: { value: start, params: [] } }, captures: [] },
    () => ({
      type: "BinaryExpression",
      loc: { start: { line: 27, column: 12 }, end: { line: 27, column: 22 } },
      operator: "+",
      left: {
        type: "Splice",
        loc: { start: { line: 27, column: 12 }, end: { line: 27, column: 18 } },
        key: "$start",
      },
      right: {
        type: "Literal",
        loc: { start: { line: 27, column: 21 }, end: { line: 27, column: 22 } },
        value: 1,
      },
    }),
    "$0 => $0() + 1",
    '{"version":3,"file":"host-wrapped-splice.test.jsx","sourceRoot":"","sources":["host-wrapped-splice.test.tsx"],"names":[],"mappings":"AA0BY,MAAA,IAAM,GAAG,CAAC,CAAA"}',
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
        splices: {
          $0splice0: {
            value: wrap(
              cs.create(
                "zqr0jsdf8ub6:38:14",
                { splices: {}, captures: [] },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 38, column: 17 },
                    end: { line: 38, column: 18 },
                  },
                  value: 1,
                }),
                "() => 1",
                '{"version":3,"file":"host-wrapped-splice.test.jsx","sourceRoot":"","sources":["host-wrapped-splice.test.tsx"],"names":[],"mappings":"AAqCiB,MAAA,CAAC,CAAA"}',
              ),
            ),
            params: [],
          },
          $0splice1: {
            value: wrap(
              cs.create(
                "zqr0jsdf8ub6:38:31",
                { splices: {}, captures: [] },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 38, column: 34 },
                    end: { line: 38, column: 35 },
                  },
                  value: 2,
                }),
                "() => 2",
                '{"version":3,"file":"host-wrapped-splice.test.jsx","sourceRoot":"","sources":["host-wrapped-splice.test.tsx"],"names":[],"mappings":"AAqCkC,MAAA,CAAC,CAAA"}',
              ),
            ),
            params: [],
          },
        },
        captures: [],
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
          key: "$0splice0",
        },
        right: {
          type: "Splice",
          loc: {
            start: { line: 38, column: 24 },
            end: { line: 38, column: 38 },
          },
          key: "$0splice1",
        },
      }),
      "($0, $1) => $0() + $1()",
      '{"version":3,"file":"host-wrapped-splice.test.jsx","sourceRoot":"","sources":["host-wrapped-splice.test.tsx"],"names":[],"mappings":"AAqCO,YAAA,IAAC,GAAgB,IAAC,CAAA"}',
    ),
  );
});
