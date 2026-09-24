import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const make = (f) =>
  cs.create(
    "3vatah1osfcoe:7:2",
    { splices: { $f: { value: f, params: [] } }, captures: [] },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 7, column: 5 }, end: { line: 9, column: 3 } },
      body: [
        {
          type: "ReturnStatement",
          loc: { start: { line: 8, column: 4 }, end: { line: 8, column: 23 } },
          argument: {
            type: "CallExpression",
            loc: {
              start: { line: 8, column: 11 },
              end: { line: 8, column: 22 },
            },
            callee: {
              type: "MemberExpression",
              loc: {
                start: { line: 8, column: 11 },
                end: { line: 8, column: 20 },
              },
              object: {
                type: "CallExpression",
                loc: {
                  start: { line: 8, column: 11 },
                  end: { line: 8, column: 16 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 8, column: 11 },
                    end: { line: 8, column: 13 },
                  },
                  key: "$f",
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 8, column: 14 },
                      end: { line: 8, column: 15 },
                    },
                    value: 1,
                  },
                ],
                optional: false,
              },
              property: {
                type: "Identifier",
                loc: {
                  start: { line: 8, column: 17 },
                  end: { line: 8, column: 20 },
                },
                name: "get",
              },
              computed: false,
              optional: false,
            },
            arguments: [],
            optional: false,
          },
        },
      ],
    }),
    "$0 => {\n    return $0()(1).get();\n}",
    '{"version":3,"file":"builtin-hole-sharing.test.jsx","sourceRoot":"","sources":["builtin-hole-sharing.test.tsx"],"names":[],"mappings":"AAMK;IACD,OAAO,IAAE,CAAC,CAAC,CAAC,CAAC,GAAG,EAAE,CAAC;AACrB,CAAC,CAAA"}',
  );
const wrapped = cs.create(
  "3vatah1osfcoe:11:16",
  { splices: { $state: { value: state, params: [] } }, captures: [] },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 11, column: 19 }, end: { line: 11, column: 48 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 11, column: 20 }, end: { line: 11, column: 21 } },
        name: "n",
        key: "n$3vatah1osfcoe$0",
      },
    ],
    body: {
      type: "CallExpression",
      loc: { start: { line: 11, column: 34 }, end: { line: 11, column: 48 } },
      callee: {
        type: "Splice",
        loc: { start: { line: 11, column: 34 }, end: { line: 11, column: 40 } },
        key: "$state",
      },
      arguments: [
        {
          type: "BinaryExpression",
          loc: {
            start: { line: 11, column: 41 },
            end: { line: 11, column: 47 },
          },
          operator: "+",
          left: {
            type: "Identifier",
            loc: {
              start: { line: 11, column: 41 },
              end: { line: 11, column: 42 },
            },
            name: "n",
            key: "n$3vatah1osfcoe$0",
          },
          right: {
            type: "Literal",
            loc: {
              start: { line: 11, column: 45 },
              end: { line: 11, column: 47 },
            },
            value: 10,
          },
        },
      ],
      optional: false,
    },
    expression: true,
  }),
  "$0 => (n) => $0()(n + 10)",
  '{"version":3,"file":"builtin-hole-sharing.test.jsx","sourceRoot":"","sources":["builtin-hole-sharing.test.tsx"],"names":[],"mappings":"AAUmB,MAAA,CAAC,CAAS,EAAE,EAAE,CAAC,IAAM,CAAC,CAAC,GAAG,EAAE,CAAC,CAAA"}',
);
it("builtinHoleSharing", async (t) => {
  await snapshotCase(
    t,
    "builtinHoleSharing",
    cs.create(
      "3vatah1osfcoe:17:4",
      {
        splices: {
          $0splice0: { value: make(state), params: [] },
          $0splice1: { value: make(wrapped), params: [] },
        },
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 17, column: 7 }, end: { line: 19, column: 5 } },
        body: [
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 18, column: 6 },
              end: { line: 18, column: 47 },
            },
            argument: {
              type: "BinaryExpression",
              loc: {
                start: { line: 18, column: 13 },
                end: { line: 18, column: 46 },
              },
              operator: "+",
              left: {
                type: "Splice",
                loc: {
                  start: { line: 18, column: 13 },
                  end: { line: 18, column: 27 },
                },
                key: "$0splice0",
              },
              right: {
                type: "Splice",
                loc: {
                  start: { line: 18, column: 30 },
                  end: { line: 18, column: 46 },
                },
                key: "$0splice1",
              },
            },
          },
        ],
      }),
      "($0, $1) => {\n    return $0() + $1();\n}",
      '{"version":3,"file":"builtin-hole-sharing.test.jsx","sourceRoot":"","sources":["builtin-hole-sharing.test.tsx"],"names":[],"mappings":"AAgBO;IACD,OAAO,IAAC,GAAgB,IAAC,CAAgB;AAC3C,CAAC,CAAA"}',
    ),
  );
});
