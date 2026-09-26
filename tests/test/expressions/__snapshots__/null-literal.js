import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `null` written in the script itself — bare, compared against, and as an
// argument — as opposed to a spliced host `null` (see `runtime-values.ts`).
const orDash = cs.create(
  "2nnj6ebvkk8vj:7:57",
  { params: [] },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 7, column: 60 }, end: { line: 14, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 8, column: 2 }, end: { line: 8, column: 7 } },
        name: "value",
        key: "value$2nnj6ebvkk8vj$0",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 9, column: 5 }, end: { line: 14, column: 1 } },
      body: [
        {
          type: "IfStatement",
          loc: { start: { line: 10, column: 2 }, end: { line: 12, column: 3 } },
          test: {
            type: "BinaryExpression",
            loc: {
              start: { line: 10, column: 6 },
              end: { line: 10, column: 20 },
            },
            operator: "===",
            left: {
              type: "Identifier",
              loc: {
                start: { line: 10, column: 6 },
                end: { line: 10, column: 11 },
              },
              name: "value",
              key: "value$2nnj6ebvkk8vj$0",
            },
            right: {
              type: "Literal",
              loc: {
                start: { line: 10, column: 16 },
                end: { line: 10, column: 20 },
              },
              value: null,
            },
          },
          consequent: {
            type: "BlockStatement",
            loc: {
              start: { line: 10, column: 22 },
              end: { line: 12, column: 3 },
            },
            body: [
              {
                type: "ReturnStatement",
                loc: {
                  start: { line: 11, column: 4 },
                  end: { line: 11, column: 15 },
                },
                argument: {
                  type: "Literal",
                  loc: {
                    start: { line: 11, column: 11 },
                    end: { line: 11, column: 14 },
                  },
                  value: "-",
                },
              },
            ],
          },
          alternate: null,
        },
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 13, column: 2 },
            end: { line: 13, column: 15 },
          },
          argument: {
            type: "Identifier",
            loc: {
              start: { line: 13, column: 9 },
              end: { line: 13, column: 14 },
            },
            name: "value",
            key: "value$2nnj6ebvkk8vj$0",
          },
        },
      ],
    },
    expression: false,
  }),
  {
    code: 'export default () => (value) => {\n    if (value === null) {\n        return "-";\n    }\n    return value;\n};',
    map: '{"version":3,"file":"null-literal.test.jsx","sourceRoot":"","sources":["null-literal.test.tsx"],"names":[],"mappings":"eAM4D,MAAA,CAC1D,KAAoB,EACpB,EAAE;IACF,IAAI,KAAK,KAAK,IAAI,EAAE,CAAC;QACnB,OAAO,GAAG,CAAC;IACb,CAAC;IACD,OAAO,KAAK,CAAC;AACf,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
it("nullLiteral", async (t) => {
  await snapshotCase(
    t,
    "nullLiteral",
    cs.create(
      "2nnj6ebvkk8vj:20:4",
      { params: [{ kind: "splice", value: orDash, bindings: [] }] },
      () => ({
        type: "ObjectExpression",
        loc: { start: { line: 20, column: 8 }, end: { line: 24, column: 5 } },
        properties: [
          {
            type: "Property",
            loc: {
              start: { line: 21, column: 6 },
              end: { line: 21, column: 28 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 21, column: 6 },
                end: { line: 21, column: 13 },
              },
              name: "missing",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 21, column: 15 },
                end: { line: 21, column: 28 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 21, column: 15 },
                  end: { line: 21, column: 22 },
                },
                param: 0,
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 21, column: 23 },
                    end: { line: 21, column: 27 },
                  },
                  value: null,
                },
              ],
              optional: false,
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
          {
            type: "Property",
            loc: {
              start: { line: 22, column: 6 },
              end: { line: 22, column: 28 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 22, column: 6 },
                end: { line: 22, column: 13 },
              },
              name: "present",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 22, column: 15 },
                end: { line: 22, column: 28 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 22, column: 15 },
                  end: { line: 22, column: 22 },
                },
                param: 0,
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 22, column: 23 },
                    end: { line: 22, column: 27 },
                  },
                  value: "hi",
                },
              ],
              optional: false,
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
          {
            type: "Property",
            loc: {
              start: { line: 23, column: 6 },
              end: { line: 23, column: 16 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 23, column: 6 },
                end: { line: 23, column: 10 },
              },
              name: "bare",
            },
            value: {
              type: "Literal",
              loc: {
                start: { line: 23, column: 12 },
                end: { line: 23, column: 16 },
              },
              value: null,
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
        ],
      }),
      {
        code: 'export default ($0) => ({\n    missing: $0()(null),\n    present: $0()("hi"),\n    bare: null,\n});',
        map: '{"version":3,"file":"null-literal.test.jsx","sourceRoot":"","sources":["null-literal.test.tsx"],"names":[],"mappings":"eAmBO,QAAA,CAAC;IACF,OAAO,EAAE,IAAO,CAAC,IAAI,CAAC;IACtB,OAAO,EAAE,IAAO,CAAC,IAAI,CAAC;IACtB,IAAI,EAAE,IAAI;CACX,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
