import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-schema/jsx-runtime";
import { cs, state } from "@backtickjs/core";
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
            fileHash: "kiq2x3i0lhh3",
            splices: {
              $selected: { value: selected, params: [] },
              $id: { value: id, params: [] },
            },
            captures: [],
          },
          () => ({
            kind: "binop",
            loc: [22, 17, 22, 76],
            left: {
              kind: "binop",
              loc: [22, 17, 22, 69],
              left: {
                kind: "string",
                loc: [22, 17, 22, 30],
                text: "font-size: ",
              },
              operatorToken: "+",
              right: {
                kind: "?:",
                loc: [22, 34, 22, 68],
                condition: {
                  kind: "binop",
                  loc: [22, 34, 22, 58],
                  left: {
                    kind: "()",
                    loc: [22, 34, 22, 50],
                    expression: {
                      kind: ".",
                      loc: [22, 34, 22, 48],
                      expression: {
                        kind: "splice",
                        loc: [22, 34, 22, 43],
                        key: "$selected",
                      },
                      name: "read",
                    },
                    arguments: [],
                  },
                  operatorToken: "===",
                  right: {
                    kind: "splice",
                    loc: [22, 55, 22, 58],
                    key: "$id",
                  },
                },
                whenTrue: {
                  kind: "number",
                  loc: [22, 61, 22, 63],
                  value: 20,
                },
                whenFalse: {
                  kind: "number",
                  loc: [22, 66, 22, 68],
                  value: 16,
                },
              },
            },
            operatorToken: "+",
            right: {
              kind: "string",
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
            fileHash: "kiq2x3i0lhh3",
            splices: {
              $id: { value: id, params: [] },
              $selected: { value: selected, params: [] },
            },
            captures: [],
          },
          () => ({
            kind: "binop",
            loc: [24, 11, 24, 51],
            left: {
              kind: "binop",
              loc: [24, 11, 24, 32],
              left: {
                kind: "binop",
                loc: [24, 11, 24, 23],
                left: {
                  kind: "string",
                  loc: [24, 11, 24, 17],
                  text: "row ",
                },
                operatorToken: "+",
                right: {
                  kind: "splice",
                  loc: [24, 20, 24, 23],
                  key: "$id",
                },
              },
              operatorToken: "+",
              right: {
                kind: "string",
                loc: [24, 26, 24, 32],
                text: " of ",
              },
            },
            operatorToken: "+",
            right: {
              kind: "()",
              loc: [24, 35, 24, 51],
              expression: {
                kind: ".",
                loc: [24, 35, 24, 49],
                expression: {
                  kind: "splice",
                  loc: [24, 35, 24, 44],
                  key: "$selected",
                },
                name: "read",
              },
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
          fileHash: "kiq2x3i0lhh3",
          splices: {
            $selected: { value: selected, params: [] },
            $id: { value: id, params: [] },
            $0splice0: {
              value: _jsx("span", { children: "marker" }),
              params: [],
            },
          },
          captures: [],
        },
        () => ({
          kind: "?:",
          loc: [26, 9, 26, 67],
          condition: {
            kind: "binop",
            loc: [26, 9, 26, 33],
            left: {
              kind: "()",
              loc: [26, 9, 26, 25],
              expression: {
                kind: ".",
                loc: [26, 9, 26, 23],
                expression: {
                  kind: "splice",
                  loc: [26, 9, 26, 18],
                  key: "$selected",
                },
                name: "read",
              },
              arguments: [],
            },
            operatorToken: "===",
            right: {
              kind: "splice",
              loc: [26, 30, 26, 33],
              key: "$id",
            },
          },
          whenTrue: {
            kind: "splice",
            loc: [26, 36, 26, 60],
            key: "$0splice0",
          },
          whenFalse: {
            kind: "null",
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
      fileHash: "kiq2x3i0lhh3",
      splices: {
        $state: { value: state, params: [] },
        $Row: { value: Row, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [31, 13, 40, 4],
      statements: [
        {
          kind: "const",
          loc: [32, 5, 32, 32],
          name: {
            kind: "id",
            loc: [32, 11, 32, 19],
            text: "selected",
            bindingKey: "selected$kiq2x3i0lhh3$0",
          },
          initializer: {
            kind: "()",
            loc: [32, 22, 32, 31],
            expression: {
              kind: "splice",
              loc: [32, 22, 32, 28],
              key: "$state",
            },
            arguments: [
              {
                kind: "number",
                loc: [32, 29, 32, 30],
                value: 0,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [33, 5, 39, 7],
          expression: {
            kind: "jsx",
            loc: [34, 7, 38, 13],
            type: {
              kind: "string",
              loc: [34, 8, 34, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [35, 9, 35, 62],
                type: {
                  kind: "string",
                  loc: [35, 10, 35, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "=>",
                      loc: [35, 24, 35, 47],
                      parameters: [],
                      body: {
                        kind: "()",
                        loc: [35, 30, 35, 47],
                        expression: {
                          kind: ".",
                          loc: [35, 30, 35, 44],
                          expression: {
                            kind: "id",
                            loc: [35, 30, 35, 38],
                            text: "selected",
                            bindingKey: "selected$kiq2x3i0lhh3$0",
                          },
                          name: "write",
                        },
                        arguments: [
                          {
                            kind: "number",
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
                    kind: "string",
                    loc: [35, 49, 35, 55],
                    text: "select",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [36, 9, 36, 43],
                type: {
                  kind: "splice",
                  loc: [36, 10, 36, 13],
                  key: "$Row",
                },
                attributes: [
                  {
                    name: "id",
                    initializer: {
                      kind: "number",
                      loc: [36, 18, 36, 19],
                      value: 0,
                    },
                  },
                  {
                    name: "selected",
                    initializer: {
                      kind: "id",
                      loc: [36, 31, 36, 39],
                      text: "selected",
                      bindingKey: "selected$kiq2x3i0lhh3$0",
                    },
                  },
                ],
                children: [],
              },
              {
                kind: "jsx",
                loc: [37, 9, 37, 43],
                type: {
                  kind: "splice",
                  loc: [37, 10, 37, 13],
                  key: "$Row",
                },
                attributes: [
                  {
                    name: "id",
                    initializer: {
                      kind: "number",
                      loc: [37, 18, 37, 19],
                      value: 1,
                    },
                  },
                  {
                    name: "selected",
                    initializer: {
                      kind: "id",
                      loc: [37, 31, 37, 39],
                      text: "selected",
                      bindingKey: "selected$kiq2x3i0lhh3$0",
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
