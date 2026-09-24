import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Handlers — action arrows — are values: an object carries them, and
// storing one is not calling it.
const beep = cs.create(
  { start: { line: 8, column: 27 }, end: { line: 11, column: 2 } },
  {
    filePath: "control-flow/handler-object.test.tsx",
    fileHash: "1dqhax1do6u08",
    splices: {},
    captures: [],
  },
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
);
const onTap = cs.create(
  { start: { line: 13, column: 44 }, end: { line: 15, column: 2 } },
  {
    filePath: "control-flow/handler-object.test.tsx",
    fileHash: "1dqhax1do6u08",
    splices: { $beep: { value: beep, params: [] } },
    captures: [],
  },
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
            key: "$beep",
          },
        },
      ],
    },
    expression: false,
  }),
);
it("handlerObject", async (t) => {
  await snapshotCase(
    t,
    "handlerObject",
    cs.create(
      { start: { line: 21, column: 4 }, end: { line: 27, column: 6 } },
      {
        filePath: "control-flow/handler-object.test.tsx",
        fileHash: "1dqhax1do6u08",
        splices: { $onTap: { value: onTap, params: [] } },
        captures: [],
      },
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
                        key: "$onTap",
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
                        key: "$onTap",
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
    ),
  );
});
