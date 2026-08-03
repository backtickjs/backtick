import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/core/jsx-runtime";
import { cs, state, For, Text, View } from "@backtickjs/core";
// A list whose drawing reads where a member sits as well as what it is.
//
// The index is storage, not a number, and this is the case that says why: a
// rotation moves every member without changing any of them, so a row keeps the
// node it had and only what read `index` runs again. Reading it eagerly — the
// number at the moment the row was drawn — leaves all three stale, which is the
// bug this pins.
async function Rows() {
  const names = state(["a", "b", "c"]);
  const rotate = cs.create(
    [13, 18, 15, 5],
    {
      version: "0.0.0",
      filePath: "for-index.tsx",
      fileHash: "3na2qej9qen26",
      kind: "value",
      splices: { $names: names },
      captures: [],
      spliceParams: { $names: [] },
    },
    () => ({
      kind: 220,
      loc: [13, 21, 15, 4],
      parameters: [],
      body: {
        kind: 242,
        loc: [13, 27, 15, 4],
        statements: [
          {
            kind: 214,
            loc: [14, 5, 14, 57],
            expression: {
              kind: 212,
              loc: [14, 5, 14, 18],
              expression: {
                kind: 1000,
                loc: [14, 5, 14, 11],
                key: "$names",
              },
              questionDotToken: false,
              name: "update",
            },
            questionDotToken: false,
            arguments: [
              {
                kind: 220,
                loc: [14, 19, 14, 56],
                parameters: [
                  {
                    kind: 170,
                    loc: [14, 20, 14, 24],
                    name: {
                      kind: 80,
                      loc: [14, 20, 14, 24],
                      text: "held",
                      bindingKey: "held$3na2qej9qen26$0",
                    },
                  },
                ],
                body: {
                  kind: 210,
                  loc: [14, 29, 14, 56],
                  elements: [
                    {
                      kind: 213,
                      loc: [14, 30, 14, 37],
                      expression: {
                        kind: 80,
                        loc: [14, 30, 14, 34],
                        text: "held",
                        bindingKey: "held$3na2qej9qen26$0",
                      },
                      argumentExpression: {
                        kind: 9,
                        loc: [14, 35, 14, 36],
                        value: 2,
                      },
                    },
                    {
                      kind: 213,
                      loc: [14, 39, 14, 46],
                      expression: {
                        kind: 80,
                        loc: [14, 39, 14, 43],
                        text: "held",
                        bindingKey: "held$3na2qej9qen26$0",
                      },
                      argumentExpression: {
                        kind: 9,
                        loc: [14, 44, 14, 45],
                        value: 0,
                      },
                    },
                    {
                      kind: 213,
                      loc: [14, 48, 14, 55],
                      expression: {
                        kind: 80,
                        loc: [14, 48, 14, 52],
                        text: "held",
                        bindingKey: "held$3na2qej9qen26$0",
                      },
                      argumentExpression: {
                        kind: 9,
                        loc: [14, 53, 14, 54],
                        value: 1,
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
      _jsx(Text, { onPress: rotate, children: "rotate" }),
      _jsx(View, {
        children: _jsx(For, {
          each: cs.create(
            [20, 20, 20, 37],
            {
              version: "0.0.0",
              filePath: "for-index.tsx",
              fileHash: "3na2qej9qen26",
              kind: "value",
              splices: { $names: names },
              captures: [],
              spliceParams: { $names: [] },
            },
            () => ({
              kind: 214,
              loc: [20, 23, 20, 36],
              expression: {
                kind: 212,
                loc: [20, 23, 20, 34],
                expression: {
                  kind: 1000,
                  loc: [20, 23, 20, 29],
                  key: "$names",
                },
                questionDotToken: false,
                name: "read",
              },
              questionDotToken: false,
              arguments: [],
            }),
          ),
          children: cs.create(
            [21, 12, 22, 66],
            {
              version: "0.0.0",
              filePath: "for-index.tsx",
              fileHash: "3na2qej9qen26",
              kind: "value",
              splices: {
                $0splice0: _jsx(Text, {
                  children: cs.create(
                    [22, 23, 22, 55],
                    {
                      version: "0.0.0",
                      filePath: "for-index.tsx",
                      fileHash: "3na2qej9qen26",
                      kind: "value",
                      splices: {},
                      captures: [
                        "name$3na2qej9qen26$1",
                        "index$3na2qej9qen26$2",
                      ],
                      spliceParams: {},
                    },
                    () => ({
                      kind: 227,
                      loc: [22, 26, 22, 54],
                      left: {
                        kind: 227,
                        loc: [22, 26, 22, 39],
                        left: {
                          kind: 80,
                          loc: [22, 26, 22, 30],
                          text: "name",
                          bindingKey: "name$3na2qej9qen26$1",
                        },
                        operatorToken: "+",
                        right: {
                          kind: 11,
                          loc: [22, 33, 22, 39],
                          text: " at ",
                        },
                      },
                      operatorToken: "+",
                      right: {
                        kind: 214,
                        loc: [22, 42, 22, 54],
                        expression: {
                          kind: 212,
                          loc: [22, 42, 22, 52],
                          expression: {
                            kind: 80,
                            loc: [22, 42, 22, 47],
                            text: "index",
                            bindingKey: "index$3na2qej9qen26$2",
                          },
                          questionDotToken: false,
                          name: "read",
                        },
                        questionDotToken: false,
                        arguments: [],
                      },
                    }),
                  ),
                }),
              },
              captures: [],
              spliceParams: {
                $0splice0: ["name$3na2qej9qen26$1", "index$3na2qej9qen26$2"],
              },
            },
            () => ({
              kind: 220,
              loc: [21, 15, 22, 65],
              parameters: [
                {
                  kind: 170,
                  loc: [21, 16, 21, 28],
                  name: {
                    kind: 80,
                    loc: [21, 16, 21, 20],
                    text: "name",
                    bindingKey: "name$3na2qej9qen26$1",
                  },
                },
                {
                  kind: 170,
                  loc: [21, 30, 21, 58],
                  name: {
                    kind: 80,
                    loc: [21, 30, 21, 35],
                    text: "index",
                    bindingKey: "index$3na2qej9qen26$2",
                  },
                },
              ],
              body: {
                kind: 1000,
                loc: [22, 13, 22, 65],
                key: "$0splice0",
              },
            }),
          ),
        }),
      }),
    ],
  });
}
export default _jsx(Rows, {});
