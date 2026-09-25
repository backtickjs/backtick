import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Handlers — action arrows — are values: an object carries them, and
// storing one is not calling it.
const beep = cs.create(
  "1dqhax1do6u08:8:27",
  { params: [] },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 8, column: 30 }, end: { line: 11, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 9, column: 2 }, end: { line: 9, column: 12 } },
        kind: "let",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 9, column: 6 },
              end: { line: 9, column: 11 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 9, column: 6 },
                end: { line: 9, column: 7 },
              },
              name: "n",
              key: "n$1dqhax1do6u08$0",
            },
            init: {
              type: "Literal",
              loc: {
                start: { line: 9, column: 10 },
                end: { line: 9, column: 11 },
              },
              value: 0,
            },
          },
        ],
      },
      {
        type: "ExpressionStatement",
        loc: { start: { line: 10, column: 2 }, end: { line: 10, column: 8 } },
        expression: {
          type: "AssignmentExpression",
          loc: { start: { line: 10, column: 2 }, end: { line: 10, column: 7 } },
          operator: "=",
          left: {
            type: "Identifier",
            loc: {
              start: { line: 10, column: 2 },
              end: { line: 10, column: 3 },
            },
            name: "n",
            key: "n$1dqhax1do6u08$0",
          },
          right: {
            type: "Literal",
            loc: {
              start: { line: 10, column: 6 },
              end: { line: 10, column: 7 },
            },
            value: 1,
          },
        },
      },
    ],
  }),
  "() => {\n    let n = 0;\n    n = 1;\n}",
  '{"version":3,"file":"handler-object.test.jsx","sourceRoot":"","sources":["handler-object.test.tsx"],"names":[],"mappings":"AAO8B;IAC5B,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,CAAC,GAAG,CAAC,CAAC;AACR,CAAC,CAAA"}',
);
const onTap = cs.create(
  "1dqhax1do6u08:13:44",
  { params: [{ kind: "splice", value: beep, bindings: [] }] },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 13, column: 47 }, end: { line: 15, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 13, column: 48 }, end: { line: 13, column: 50 } },
        name: "id",
        key: "id$1dqhax1do6u08$1",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 13, column: 63 }, end: { line: 15, column: 1 } },
      body: [
        {
          type: "ExpressionStatement",
          loc: { start: { line: 14, column: 2 }, end: { line: 14, column: 8 } },
          expression: {
            type: "Splice",
            loc: {
              start: { line: 14, column: 2 },
              end: { line: 14, column: 7 },
            },
            param: 0,
          },
        },
      ],
    },
    expression: false,
  }),
  "$0 => (id) => {\n    $0();\n}",
  '{"version":3,"file":"handler-object.test.jsx","sourceRoot":"","sources":["handler-object.test.tsx"],"names":[],"mappings":"AAY+C,MAAA,CAAC,EAAU,EAAE,EAAE;IAC5D,IAAK,CAAC;AACR,CAAC,CAAA"}',
);
it("handlerObject", async (t) => {
  await snapshotCase(
    t,
    "handlerObject",
    cs.create(
      "1dqhax1do6u08:21:4",
      { params: [{ kind: "splice", value: onTap, bindings: [] }] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 21, column: 7 }, end: { line: 27, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 22, column: 6 },
              end: { line: 25, column: 8 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 22, column: 12 },
                  end: { line: 25, column: 7 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 22, column: 12 },
                    end: { line: 22, column: 20 },
                  },
                  name: "handlers",
                  key: "handlers$1dqhax1do6u08$2",
                },
                init: {
                  type: "ObjectExpression",
                  loc: {
                    start: { line: 22, column: 23 },
                    end: { line: 25, column: 7 },
                  },
                  properties: [
                    {
                      type: "Property",
                      loc: {
                        start: { line: 23, column: 8 },
                        end: { line: 23, column: 19 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 23, column: 8 },
                          end: { line: 23, column: 11 },
                        },
                        name: "tap",
                      },
                      value: {
                        type: "Splice",
                        loc: {
                          start: { line: 23, column: 13 },
                          end: { line: 23, column: 19 },
                        },
                        param: 0,
                      },
                      kind: "init",
                      computed: false,
                      method: false,
                      shorthand: false,
                    },
                    {
                      type: "Property",
                      loc: {
                        start: { line: 24, column: 8 },
                        end: { line: 24, column: 20 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 24, column: 8 },
                          end: { line: 24, column: 12 },
                        },
                        name: "hold",
                      },
                      value: {
                        type: "Splice",
                        loc: {
                          start: { line: 24, column: 14 },
                          end: { line: 24, column: 20 },
                        },
                        param: 0,
                      },
                      kind: "init",
                      computed: false,
                      method: false,
                      shorthand: false,
                    },
                  ],
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 26, column: 6 },
              end: { line: 26, column: 22 },
            },
            argument: {
              type: "Identifier",
              loc: {
                start: { line: 26, column: 13 },
                end: { line: 26, column: 21 },
              },
              name: "handlers",
              key: "handlers$1dqhax1do6u08$2",
            },
          },
        ],
      }),
      "$0 => {\n    const handlers = {\n        tap: $0(),\n        hold: $0(),\n    };\n    return handlers;\n}",
      '{"version":3,"file":"handler-object.test.jsx","sourceRoot":"","sources":["handler-object.test.tsx"],"names":[],"mappings":"AAoBO;IACD,MAAM,QAAQ,GAAG;QACf,GAAG,EAAE,IAAM;QACX,IAAI,EAAE,IAAM;KACb,CAAC;IACF,OAAO,QAAQ,CAAC;AAClB,CAAC,CAAA"}',
    ),
  );
});
