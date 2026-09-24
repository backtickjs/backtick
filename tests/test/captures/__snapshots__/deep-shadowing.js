import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
function outerBase(inner) {
  return cs.create(
    { start: { line: 7, column: 9 }, end: { line: 10, column: 4 } },
    {
      filePath: "captures/deep-shadowing.test.tsx",
      fileHash: "8up2nb5o0inm",
      splices: { $0splice0: { value: middleBase(inner), params: [] } },
      captures: [],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 7, column: 12 }, end: { line: 10, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: { start: { line: 8, column: 4 }, end: { line: 8, column: 19 } },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 8, column: 10 },
                end: { line: 8, column: 18 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 8, column: 10 },
                  end: { line: 8, column: 14 },
                },
                name: "base",
                key: "base$8up2nb5o0inm$0",
              },
              init: {
                type: "Literal",
                loc: {
                  start: { line: 8, column: 17 },
                  end: { line: 8, column: 18 },
                },
                value: 1,
              },
            },
          ],
        },
        {
          type: "ReturnStatement",
          loc: { start: { line: 9, column: 4 }, end: { line: 9, column: 39 } },
          argument: {
            type: "BinaryExpression",
            loc: {
              start: { line: 9, column: 11 },
              end: { line: 9, column: 38 },
            },
            operator: "+",
            left: {
              type: "Identifier",
              loc: {
                start: { line: 9, column: 11 },
                end: { line: 9, column: 15 },
              },
              name: "base",
              key: "base$8up2nb5o0inm$0",
            },
            right: {
              type: "Splice",
              loc: {
                start: { line: 9, column: 18 },
                end: { line: 9, column: 38 },
              },
              key: "$0splice0",
            },
          },
        },
      ],
    }),
  );
}
function middleBase(inner) {
  return cs.create(
    { start: { line: 14, column: 9 }, end: { line: 17, column: 4 } },
    {
      filePath: "captures/deep-shadowing.test.tsx",
      fileHash: "8up2nb5o0inm",
      splices: { $inner: { value: inner, params: [] } },
      captures: [],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 14, column: 12 }, end: { line: 17, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 15, column: 4 },
            end: { line: 15, column: 19 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 15, column: 10 },
                end: { line: 15, column: 18 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 15, column: 10 },
                  end: { line: 15, column: 14 },
                },
                name: "base",
                key: "base$8up2nb5o0inm$1",
              },
              init: {
                type: "Literal",
                loc: {
                  start: { line: 15, column: 17 },
                  end: { line: 15, column: 18 },
                },
                value: 2,
              },
            },
          ],
        },
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 16, column: 4 },
            end: { line: 16, column: 25 },
          },
          argument: {
            type: "BinaryExpression",
            loc: {
              start: { line: 16, column: 11 },
              end: { line: 16, column: 24 },
            },
            operator: "*",
            left: {
              type: "Identifier",
              loc: {
                start: { line: 16, column: 11 },
                end: { line: 16, column: 15 },
              },
              name: "base",
              key: "base$8up2nb5o0inm$1",
            },
            right: {
              type: "Splice",
              loc: {
                start: { line: 16, column: 18 },
                end: { line: 16, column: 24 },
              },
              key: "$inner",
            },
          },
        },
      ],
    }),
  );
}
// `cs`base`` is written under the outer `base`, but is threaded through two
// host functions that each shadow `base` with their own binding. The captured
// value must reach the leaf untouched, so the threaded channel is renamed
// away from every `base` it passes through.
it("deepShadowing", async (t) => {
  await snapshotCase(
    t,
    "deepShadowing",
    cs.create(
      { start: { line: 28, column: 4 }, end: { line: 31, column: 6 } },
      {
        filePath: "captures/deep-shadowing.test.tsx",
        fileHash: "8up2nb5o0inm",
        splices: {
          $0splice0: {
            value: outerBase(
              cs.create(
                {
                  start: { line: 30, column: 25 },
                  end: { line: 30, column: 33 },
                },
                {
                  filePath: "captures/deep-shadowing.test.tsx",
                  fileHash: "8up2nb5o0inm",
                  splices: {},
                  captures: ["base$8up2nb5o0inm$2"],
                },
                () => ({
                  type: "Identifier",
                  loc: {
                    start: { line: 30, column: 28 },
                    end: { line: 30, column: 32 },
                  },
                  name: "base",
                  key: "base$8up2nb5o0inm$2",
                }),
              ),
            ),
            params: ["base$8up2nb5o0inm$2"],
          },
        },
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 28, column: 7 }, end: { line: 31, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 29, column: 6 },
              end: { line: 29, column: 22 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 29, column: 12 },
                  end: { line: 29, column: 21 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 29, column: 12 },
                    end: { line: 29, column: 16 },
                  },
                  name: "base",
                  key: "base$8up2nb5o0inm$2",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 29, column: 19 },
                    end: { line: 29, column: 21 },
                  },
                  value: 10,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 30, column: 6 },
              end: { line: 30, column: 36 },
            },
            argument: {
              type: "Splice",
              loc: {
                start: { line: 30, column: 13 },
                end: { line: 30, column: 35 },
              },
              key: "$0splice0",
            },
          },
        ],
      }),
    ),
  );
});
