import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const make = (f) =>
  cs.create(
    { start: { line: 7, column: 2 }, end: { line: 9, column: 4 } },
    {
      version: "0.0.0",
      filePath: "stdlib/builtin-hole-sharing.test.tsx",
      fileHash: "3vatah1osfcoe",
      splices: { $f: { value: f, params: [] } },
      captures: [],
    },
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
  );
const wrapped = cs.create(
  { start: { line: 11, column: 16 }, end: { line: 11, column: 49 } },
  {
    version: "0.0.0",
    filePath: "stdlib/builtin-hole-sharing.test.tsx",
    fileHash: "3vatah1osfcoe",
    splices: { $state: { value: state, params: [] } },
    captures: [],
  },
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
);
it("builtinHoleSharing", async (t) => {
  await snapshotCase(
    t,
    "builtinHoleSharing",
    cs.create(
      { start: { line: 17, column: 4 }, end: { line: 19, column: 6 } },
      {
        version: "0.0.0",
        filePath: "stdlib/builtin-hole-sharing.test.tsx",
        fileHash: "3vatah1osfcoe",
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
    ),
  );
});
