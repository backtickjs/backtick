import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, state, For } from "@backtickjs/core";
// A list whose every row reads the cell the selection is held in. A write
// re-runs the `href` of all three rows and moves it on two of them — the row
// selected, and the row that no longer is. The third recomputes the href it
// already had.
//
// What that has to buy is silence: `state.test.ts` records what the host was
// told and checks the row that did not move was not written to. A host told
// about it anyway would be setting a prop per row per selection, in a list of
// any size, and no snapshot of the drawn markup could see it.
async function Rows() {
  const selected = state(0);
  return _jsxs("div", {
    children: [
      _jsx("span", {
        onclick: cs.create(
          [16, 22, 16, 50],
          {
            version: "0.0.0",
            filePath: "unmoved-prop.tsx",
            fileHash: "3lx9bfa62m6pl",
            kind: "value",
            splices: { $selected: selected },
            captures: [],
            spliceParams: { $selected: [] },
          },
          () => ({
            kind: 220,
            loc: [16, 25, 16, 49],
            parameters: [],
            body: {
              kind: 214,
              loc: [16, 31, 16, 49],
              expression: {
                kind: 212,
                loc: [16, 31, 16, 46],
                expression: {
                  kind: 1000,
                  loc: [16, 31, 16, 40],
                  key: "$selected",
                },
                questionDotToken: false,
                name: "write",
              },
              questionDotToken: false,
              arguments: [
                {
                  kind: 9,
                  loc: [16, 47, 16, 48],
                  value: 1,
                },
              ],
            },
          }),
        ),
        children: "select",
      }),
      _jsx("div", {
        children: _jsx(For, {
          each: cs.create(
            [18, 20, 18, 33],
            {
              version: "0.0.0",
              filePath: "unmoved-prop.tsx",
              fileHash: "3lx9bfa62m6pl",
              kind: "value",
              splices: {},
              captures: [],
              spliceParams: {},
            },
            () => ({
              kind: 210,
              loc: [18, 23, 18, 32],
              elements: [
                {
                  kind: 9,
                  loc: [18, 24, 18, 25],
                  value: 0,
                },
                {
                  kind: 9,
                  loc: [18, 27, 18, 28],
                  value: 1,
                },
                {
                  kind: 9,
                  loc: [18, 30, 18, 31],
                  value: 2,
                },
              ],
            }),
          ),
          children: cs.create(
            [19, 12, 24, 16],
            {
              version: "0.0.0",
              filePath: "unmoved-prop.tsx",
              fileHash: "3lx9bfa62m6pl",
              kind: "value",
              splices: {
                $0splice0: _jsx("a", {
                  href: cs.create(
                    [21, 24, 21, 73],
                    {
                      version: "0.0.0",
                      filePath: "unmoved-prop.tsx",
                      fileHash: "3lx9bfa62m6pl",
                      kind: "value",
                      splices: { $selected: selected },
                      captures: ["id$3lx9bfa62m6pl$0"],
                      spliceParams: { $selected: [] },
                    },
                    () => ({
                      kind: 228,
                      loc: [21, 27, 21, 72],
                      condition: {
                        kind: 227,
                        loc: [21, 27, 21, 50],
                        left: {
                          kind: 214,
                          loc: [21, 27, 21, 43],
                          expression: {
                            kind: 212,
                            loc: [21, 27, 21, 41],
                            expression: {
                              kind: 1000,
                              loc: [21, 27, 21, 36],
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
                          kind: 80,
                          loc: [21, 48, 21, 50],
                          text: "id",
                          bindingKey: "id$3lx9bfa62m6pl$0",
                        },
                      },
                      whenTrue: {
                        kind: 11,
                        loc: [21, 53, 21, 60],
                        text: "#open",
                      },
                      whenFalse: {
                        kind: 11,
                        loc: [21, 63, 21, 72],
                        text: "#closed",
                      },
                    }),
                  ),
                  children: cs.create(
                    [22, 18, 22, 33],
                    {
                      version: "0.0.0",
                      filePath: "unmoved-prop.tsx",
                      fileHash: "3lx9bfa62m6pl",
                      kind: "value",
                      splices: {},
                      captures: ["id$3lx9bfa62m6pl$0"],
                      spliceParams: {},
                    },
                    () => ({
                      kind: 227,
                      loc: [22, 21, 22, 32],
                      left: {
                        kind: 11,
                        loc: [22, 21, 22, 27],
                        text: "row ",
                      },
                      operatorToken: "+",
                      right: {
                        kind: 80,
                        loc: [22, 30, 22, 32],
                        text: "id",
                        bindingKey: "id$3lx9bfa62m6pl$0",
                      },
                    }),
                  ),
                }),
              },
              captures: [],
              spliceParams: { $0splice0: ["id$3lx9bfa62m6pl$0"] },
            },
            () => ({
              kind: 220,
              loc: [19, 15, 24, 15],
              parameters: [
                {
                  kind: 170,
                  loc: [19, 16, 19, 26],
                  name: {
                    kind: 80,
                    loc: [19, 16, 19, 18],
                    text: "id",
                    bindingKey: "id$3lx9bfa62m6pl$0",
                  },
                },
              ],
              body: {
                kind: 1000,
                loc: [20, 13, 24, 15],
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
