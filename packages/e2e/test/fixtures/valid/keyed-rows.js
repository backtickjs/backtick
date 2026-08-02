import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/core/jsx-runtime";
import { cs, state, Text, View } from "@backtickjs/core";
// A keyed list driven by a cell. Every write hands back a new array of new
// rows, so nothing about the list is the object it was — the keys are the only
// thing saying which row is which.
//
// What that has to buy is node identity: a reorder moves the nodes already
// built, and a removal takes one node with it and leaves the rest alone.
// `state.test.ts` holds the nodes across a write and checks exactly that,
// which is the half a snapshot of the drawn markup cannot see.
async function Rows() {
  const ids = state([1, 2, 3]);
  const swap = cs.create(
    [13, 16, 15, 5],
    {
      version: "0.0.0",
      filePath: "keyed-rows.tsx",
      fileHash: "1vdw1skun2s6b",
      kind: "value",
      splices: { $ids: ids },
      captures: [],
      spliceParams: { $ids: [] },
    },
    () => ({
      kind: 220,
      loc: [13, 19, 15, 4],
      parameters: [],
      body: {
        kind: 242,
        loc: [13, 25, 15, 4],
        statements: [
          {
            kind: 214,
            loc: [14, 5, 14, 66],
            expression: {
              kind: 212,
              loc: [14, 5, 14, 16],
              expression: {
                kind: 1000,
                loc: [14, 5, 14, 9],
                key: "$ids",
              },
              questionDotToken: false,
              name: "update",
            },
            questionDotToken: false,
            arguments: [
              {
                kind: 220,
                loc: [14, 17, 14, 65],
                parameters: [
                  {
                    kind: 170,
                    loc: [14, 18, 14, 22],
                    name: {
                      kind: 80,
                      loc: [14, 18, 14, 22],
                      text: "held",
                      bindingKey: "held$1vdw1skun2s6b$0",
                    },
                  },
                ],
                body: {
                  kind: 214,
                  loc: [14, 27, 14, 65],
                  expression: {
                    kind: 212,
                    loc: [14, 27, 14, 53],
                    expression: {
                      kind: 214,
                      loc: [14, 27, 14, 48],
                      expression: {
                        kind: 212,
                        loc: [14, 27, 14, 36],
                        expression: {
                          kind: 80,
                          loc: [14, 27, 14, 31],
                          text: "held",
                          bindingKey: "held$1vdw1skun2s6b$0",
                        },
                        questionDotToken: false,
                        name: "with",
                      },
                      questionDotToken: false,
                      arguments: [
                        {
                          kind: 9,
                          loc: [14, 37, 14, 38],
                          value: 0,
                        },
                        {
                          kind: 213,
                          loc: [14, 40, 14, 47],
                          expression: {
                            kind: 80,
                            loc: [14, 40, 14, 44],
                            text: "held",
                            bindingKey: "held$1vdw1skun2s6b$0",
                          },
                          argumentExpression: {
                            kind: 9,
                            loc: [14, 45, 14, 46],
                            value: 2,
                          },
                        },
                      ],
                    },
                    questionDotToken: false,
                    name: "with",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 9,
                      loc: [14, 54, 14, 55],
                      value: 2,
                    },
                    {
                      kind: 213,
                      loc: [14, 57, 14, 64],
                      expression: {
                        kind: 80,
                        loc: [14, 57, 14, 61],
                        text: "held",
                        bindingKey: "held$1vdw1skun2s6b$0",
                      },
                      argumentExpression: {
                        kind: 9,
                        loc: [14, 62, 14, 63],
                        value: 0,
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    }),
  );
  const drop = cs.create(
    [16, 16, 18, 5],
    {
      version: "0.0.0",
      filePath: "keyed-rows.tsx",
      fileHash: "1vdw1skun2s6b",
      kind: "value",
      splices: { $ids: ids },
      captures: [],
      spliceParams: { $ids: [] },
    },
    () => ({
      kind: 220,
      loc: [16, 19, 18, 4],
      parameters: [],
      body: {
        kind: 242,
        loc: [16, 25, 18, 4],
        statements: [
          {
            kind: 214,
            loc: [17, 5, 17, 57],
            expression: {
              kind: 212,
              loc: [17, 5, 17, 16],
              expression: {
                kind: 1000,
                loc: [17, 5, 17, 9],
                key: "$ids",
              },
              questionDotToken: false,
              name: "update",
            },
            questionDotToken: false,
            arguments: [
              {
                kind: 220,
                loc: [17, 17, 17, 56],
                parameters: [
                  {
                    kind: 170,
                    loc: [17, 18, 17, 22],
                    name: {
                      kind: 80,
                      loc: [17, 18, 17, 22],
                      text: "held",
                      bindingKey: "held$1vdw1skun2s6b$1",
                    },
                  },
                ],
                body: {
                  kind: 214,
                  loc: [17, 27, 17, 56],
                  expression: {
                    kind: 212,
                    loc: [17, 27, 17, 38],
                    expression: {
                      kind: 80,
                      loc: [17, 27, 17, 31],
                      text: "held",
                      bindingKey: "held$1vdw1skun2s6b$1",
                    },
                    questionDotToken: false,
                    name: "filter",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 220,
                      loc: [17, 39, 17, 55],
                      parameters: [
                        {
                          kind: 170,
                          loc: [17, 40, 17, 42],
                          name: {
                            kind: 80,
                            loc: [17, 40, 17, 42],
                            text: "id",
                            bindingKey: "id$1vdw1skun2s6b$2",
                          },
                        },
                      ],
                      body: {
                        kind: 227,
                        loc: [17, 47, 17, 55],
                        left: {
                          kind: 80,
                          loc: [17, 47, 17, 49],
                          text: "id",
                          bindingKey: "id$1vdw1skun2s6b$2",
                        },
                        operatorToken: "!==",
                        right: {
                          kind: 9,
                          loc: [17, 54, 17, 55],
                          value: 2,
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    }),
  );
  return _jsxs(View, {
    children: [
      _jsx(Text, { onPress: swap, children: "swap" }),
      _jsx(Text, { onPress: drop, children: "drop" }),
      _jsx(View, {
        children: cs.create(
          [24, 10, 26, 74],
          {
            version: "0.0.0",
            filePath: "keyed-rows.tsx",
            fileHash: "1vdw1skun2s6b",
            kind: "value",
            splices: {
              $ids: ids,
              $0splice0: _jsx(
                Text,
                {
                  children: cs.create(
                    [26, 47, 26, 62],
                    {
                      version: "0.0.0",
                      filePath: "keyed-rows.tsx",
                      fileHash: "1vdw1skun2s6b",
                      kind: "value",
                      splices: {},
                      captures: ["id$1vdw1skun2s6b$3"],
                      spliceParams: {},
                    },
                    () => ({
                      kind: 227,
                      loc: [26, 50, 26, 61],
                      left: {
                        kind: 11,
                        loc: [26, 50, 26, 56],
                        text: "row ",
                      },
                      operatorToken: "+",
                      right: {
                        kind: 80,
                        loc: [26, 59, 26, 61],
                        text: "id",
                        bindingKey: "id$1vdw1skun2s6b$3",
                      },
                    }),
                  ),
                },
                cs.create(
                  [26, 38, 26, 44],
                  {
                    version: "0.0.0",
                    filePath: "keyed-rows.tsx",
                    fileHash: "1vdw1skun2s6b",
                    kind: "value",
                    splices: {},
                    captures: ["id$1vdw1skun2s6b$3"],
                    spliceParams: {},
                  },
                  () => ({
                    kind: 80,
                    loc: [26, 41, 26, 43],
                    text: "id",
                    bindingKey: "id$1vdw1skun2s6b$3",
                  }),
                ),
              ),
            },
            captures: [],
            spliceParams: { $ids: [], $0splice0: ["id$1vdw1skun2s6b$3"] },
          },
          () => ({
            kind: 214,
            loc: [24, 13, 26, 73],
            expression: {
              kind: 212,
              loc: [24, 13, 26, 15],
              expression: {
                kind: 214,
                loc: [24, 13, 25, 18],
                expression: {
                  kind: 212,
                  loc: [24, 13, 25, 16],
                  expression: {
                    kind: 1000,
                    loc: [24, 13, 24, 17],
                    key: "$ids",
                  },
                  questionDotToken: false,
                  name: "read",
                },
                questionDotToken: false,
                arguments: [],
              },
              questionDotToken: false,
              name: "map",
            },
            questionDotToken: false,
            arguments: [
              {
                kind: 220,
                loc: [26, 16, 26, 72],
                parameters: [
                  {
                    kind: 170,
                    loc: [26, 17, 26, 19],
                    name: {
                      kind: 80,
                      loc: [26, 17, 26, 19],
                      text: "id",
                      bindingKey: "id$1vdw1skun2s6b$3",
                    },
                  },
                ],
                body: {
                  kind: 1000,
                  loc: [26, 24, 26, 72],
                  key: "$0splice0",
                },
              },
            ],
          }),
        ),
      }),
    ],
  });
}
export default _jsx(Rows, {});
