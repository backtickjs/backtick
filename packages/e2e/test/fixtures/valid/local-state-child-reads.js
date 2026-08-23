import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import { cs } from "@backtickjs/core";
// A child reading a cell it was handed, in all three positions at once: a prop,
// a text child, and a branch deciding which elements exist. The script that
// declares the cell never reads it, so a write reaches each `Row` with the
// arguments it already had — the same handle object, the same id.
//
// Nothing a `Row` was given is different, and everything it draws is. Skipping
// on the arguments alone leaves both rows stale, which is the bug this pins: a
// handle is one object whatever its cell holds. The branch is the half no
// amount of recomputing a prop can answer for.
const Row = async ({ id, selected }) =>
  _jsxs("div", {
    children: [
      _jsx("span", {
        style: cs.create(
          [22, 14, 22, 77],
          {
            version: "0.0.0",
            filePath: "local-state-child-reads.tsx",
            fileHash: "16bbrkwir8tx0",
            kind: "value",
            splices: { $selected: selected, $id: id },
            captures: [],
            spliceParams: { $selected: [], $id: [] },
          },
          () => ({
            kind: 227,
            loc: [22, 17, 22, 76],
            left: {
              kind: 227,
              loc: [22, 17, 22, 69],
              left: {
                kind: 11,
                loc: [22, 17, 22, 30],
                text: "font-size: ",
              },
              operatorToken: "+",
              right: {
                kind: 228,
                loc: [22, 34, 22, 68],
                condition: {
                  kind: 227,
                  loc: [22, 34, 22, 58],
                  left: {
                    kind: 214,
                    loc: [22, 34, 22, 50],
                    expression: {
                      kind: 212,
                      loc: [22, 34, 22, 48],
                      expression: {
                        kind: 1000,
                        loc: [22, 34, 22, 43],
                        key: "$selected",
                      },
                      questionDotToken: false,
                      name: "read",
                    },
                    questionDotToken: false,
                    arguments: [],
                  },
                  operatorToken: "===",
                  right: {
                    kind: 1000,
                    loc: [22, 55, 22, 58],
                    key: "$id",
                  },
                },
                whenTrue: {
                  kind: 9,
                  loc: [22, 61, 22, 63],
                  value: 20,
                },
                whenFalse: {
                  kind: 9,
                  loc: [22, 66, 22, 68],
                  value: 16,
                },
              },
            },
            operatorToken: "+",
            right: {
              kind: 11,
              loc: [22, 72, 22, 76],
              text: "px",
            },
          }),
        ),
        children: cs.create(
          [24, 8, 24, 52],
          {
            version: "0.0.0",
            filePath: "local-state-child-reads.tsx",
            fileHash: "16bbrkwir8tx0",
            kind: "value",
            splices: { $id: id, $selected: selected },
            captures: [],
            spliceParams: { $id: [], $selected: [] },
          },
          () => ({
            kind: 227,
            loc: [24, 11, 24, 51],
            left: {
              kind: 227,
              loc: [24, 11, 24, 32],
              left: {
                kind: 227,
                loc: [24, 11, 24, 23],
                left: {
                  kind: 11,
                  loc: [24, 11, 24, 17],
                  text: "row ",
                },
                operatorToken: "+",
                right: {
                  kind: 1000,
                  loc: [24, 20, 24, 23],
                  key: "$id",
                },
              },
              operatorToken: "+",
              right: {
                kind: 11,
                loc: [24, 26, 24, 32],
                text: " of ",
              },
            },
            operatorToken: "+",
            right: {
              kind: 214,
              loc: [24, 35, 24, 51],
              expression: {
                kind: 212,
                loc: [24, 35, 24, 49],
                expression: {
                  kind: 1000,
                  loc: [24, 35, 24, 44],
                  key: "$selected",
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
      cs.create(
        [26, 6, 26, 68],
        {
          version: "0.0.0",
          filePath: "local-state-child-reads.tsx",
          fileHash: "16bbrkwir8tx0",
          kind: "value",
          splices: {
            $selected: selected,
            $id: id,
            $0splice0: _jsx("span", { children: "marker" }),
          },
          captures: [],
          spliceParams: { $selected: [], $id: [], $0splice0: [] },
        },
        () => ({
          kind: 228,
          loc: [26, 9, 26, 67],
          condition: {
            kind: 227,
            loc: [26, 9, 26, 33],
            left: {
              kind: 214,
              loc: [26, 9, 26, 25],
              expression: {
                kind: 212,
                loc: [26, 9, 26, 23],
                expression: {
                  kind: 1000,
                  loc: [26, 9, 26, 18],
                  key: "$selected",
                },
                questionDotToken: false,
                name: "read",
              },
              questionDotToken: false,
              arguments: [],
            },
            operatorToken: "===",
            right: {
              kind: 1000,
              loc: [26, 30, 26, 33],
              key: "$id",
            },
          },
          whenTrue: {
            kind: 1000,
            loc: [26, 36, 26, 60],
            key: "$0splice0",
          },
          whenFalse: {
            kind: 106,
            loc: [26, 63, 26, 67],
          },
        }),
      ),
    ],
  });
async function Panel() {
  return cs.create(
    [31, 10, 40, 5],
    {
      version: "0.0.0",
      filePath: "local-state-child-reads.tsx",
      fileHash: "16bbrkwir8tx0",
      kind: "value",
      splices: { $Row: Row },
      captures: [],
      spliceParams: {},
    },
    () => ({
      kind: 242,
      loc: [31, 13, 40, 4],
      statements: [
        {
          kind: 244,
          loc: [32, 5, 32, 31],
          declarationList: {
            kind: 262,
            loc: [32, 5, 32, 30],
            declarations: [
              {
                kind: 261,
                loc: [32, 11, 32, 30],
                name: {
                  kind: 80,
                  loc: [32, 11, 32, 19],
                  text: "selected",
                  bindingKey: "selected$16bbrkwir8tx0$0",
                },
                initializer: {
                  kind: 214,
                  loc: [32, 22, 32, 30],
                  expression: {
                    kind: 1001,
                    loc: [32, 22, 32, 27],
                    name: "state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 9,
                      loc: [32, 28, 32, 29],
                      value: 0,
                    },
                  ],
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 254,
          loc: [33, 5, 39, 7],
          expression: {
            kind: 285,
            loc: [34, 7, 38, 13],
            type: {
              kind: 11,
              loc: [34, 8, 34, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: 285,
                loc: [35, 9, 35, 62],
                type: {
                  kind: 11,
                  loc: [35, 10, 35, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: 220,
                      loc: [35, 24, 35, 47],
                      parameters: [],
                      body: {
                        kind: 214,
                        loc: [35, 30, 35, 47],
                        expression: {
                          kind: 212,
                          loc: [35, 30, 35, 44],
                          expression: {
                            kind: 80,
                            loc: [35, 30, 35, 38],
                            text: "selected",
                            bindingKey: "selected$16bbrkwir8tx0$0",
                          },
                          questionDotToken: false,
                          name: "write",
                        },
                        questionDotToken: false,
                        arguments: [
                          {
                            kind: 9,
                            loc: [35, 45, 35, 46],
                            value: 1,
                          },
                        ],
                      },
                    },
                  },
                ],
                children: [
                  {
                    kind: 11,
                    loc: [35, 49, 35, 55],
                    text: "select",
                  },
                ],
              },
              {
                kind: 285,
                loc: [36, 9, 36, 43],
                type: {
                  kind: 1000,
                  loc: [36, 10, 36, 13],
                  key: "$Row",
                },
                attributes: [
                  {
                    name: "id",
                    initializer: {
                      kind: 9,
                      loc: [36, 18, 36, 19],
                      value: 0,
                    },
                  },
                  {
                    name: "selected",
                    initializer: {
                      kind: 80,
                      loc: [36, 31, 36, 39],
                      text: "selected",
                      bindingKey: "selected$16bbrkwir8tx0$0",
                    },
                  },
                ],
                children: [],
              },
              {
                kind: 285,
                loc: [37, 9, 37, 43],
                type: {
                  kind: 1000,
                  loc: [37, 10, 37, 13],
                  key: "$Row",
                },
                attributes: [
                  {
                    name: "id",
                    initializer: {
                      kind: 9,
                      loc: [37, 18, 37, 19],
                      value: 1,
                    },
                  },
                  {
                    name: "selected",
                    initializer: {
                      kind: 80,
                      loc: [37, 31, 37, 39],
                      text: "selected",
                      bindingKey: "selected$16bbrkwir8tx0$0",
                    },
                  },
                ],
                children: [],
              },
            ],
          },
        },
      ],
    }),
  );
}
export default _jsx(Panel, {});
