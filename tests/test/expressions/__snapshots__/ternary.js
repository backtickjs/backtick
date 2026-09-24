import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `?:` evaluates only the taken branch, and its condition narrows like an
// `if`'s.
const pick = cs.create(
  "uekyc2sf8mzc:7:13",
  { splices: {}, captures: [] },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 7, column: 16 }, end: { line: 9, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 7, column: 17 }, end: { line: 7, column: 18 } },
        name: "n",
        key: "n$uekyc2sf8mzc$0",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 7, column: 38 }, end: { line: 9, column: 1 } },
      body: [
        {
          type: "ReturnStatement",
          loc: { start: { line: 8, column: 2 }, end: { line: 8, column: 32 } },
          argument: {
            type: "ConditionalExpression",
            loc: {
              start: { line: 8, column: 9 },
              end: { line: 8, column: 31 },
            },
            test: {
              type: "BinaryExpression",
              loc: {
                start: { line: 8, column: 9 },
                end: { line: 8, column: 19 },
              },
              operator: "===",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 8, column: 9 },
                  end: { line: 8, column: 10 },
                },
                name: "n",
                key: "n$uekyc2sf8mzc$0",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 8, column: 15 },
                  end: { line: 8, column: 19 },
                },
                value: null,
              },
            },
            consequent: {
              type: "Literal",
              loc: {
                start: { line: 8, column: 22 },
                end: { line: 8, column: 23 },
              },
              value: 0,
            },
            alternate: {
              type: "BinaryExpression",
              loc: {
                start: { line: 8, column: 26 },
                end: { line: 8, column: 31 },
              },
              operator: "+",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 8, column: 26 },
                  end: { line: 8, column: 27 },
                },
                name: "n",
                key: "n$uekyc2sf8mzc$0",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 8, column: 30 },
                  end: { line: 8, column: 31 },
                },
                value: 1,
              },
            },
          },
        },
      ],
    },
    expression: false,
  }),
  "() => (n) => {\n    return n === null ? 0 : n + 1;\n}",
  '{"version":3,"file":"ternary.test.jsx","sourceRoot":"","sources":["ternary.test.tsx"],"names":[],"mappings":"AAMgB,MAAA,CAAC,CAAgB,EAAE,EAAE;IACnC,OAAO,CAAC,KAAK,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC;AAChC,CAAC,CAAA"}',
);
it("ternary", async (t) => {
  await snapshotCase(
    t,
    "ternary",
    cs.create(
      "uekyc2sf8mzc:15:4",
      { splices: { $pick: { value: pick, params: [] } }, captures: [] },
      () => ({
        type: "ObjectExpression",
        loc: { start: { line: 15, column: 8 }, end: { line: 18, column: 5 } },
        properties: [
          {
            type: "Property",
            loc: {
              start: { line: 16, column: 6 },
              end: { line: 16, column: 25 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 16, column: 6 },
                end: { line: 16, column: 12 },
              },
              name: "absent",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 16, column: 14 },
                end: { line: 16, column: 25 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 16, column: 14 },
                  end: { line: 16, column: 19 },
                },
                key: "$pick",
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 16, column: 20 },
                    end: { line: 16, column: 24 },
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
              start: { line: 17, column: 6 },
              end: { line: 17, column: 23 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 17, column: 6 },
                end: { line: 17, column: 13 },
              },
              name: "present",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 17, column: 15 },
                end: { line: 17, column: 23 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 17, column: 15 },
                  end: { line: 17, column: 20 },
                },
                key: "$pick",
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 17, column: 21 },
                    end: { line: 17, column: 22 },
                  },
                  value: 4,
                },
              ],
              optional: false,
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
        ],
      }),
      "$0 => ({\n    absent: $0()(null),\n    present: $0()(4),\n})",
      '{"version":3,"file":"ternary.test.jsx","sourceRoot":"","sources":["ternary.test.tsx"],"names":[],"mappings":"AAcO,MAAA,CAAC;IACF,MAAM,EAAE,IAAK,CAAC,IAAI,CAAC;IACnB,OAAO,EAAE,IAAK,CAAC,CAAC,CAAC;CAClB,CAAC,CAAA"}',
    ),
  );
});
