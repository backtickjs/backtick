import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, state } from "@backtickjs/core";
// A child reading a cell it was handed, in all three positions at once: a prop,
// a text child, and a branch deciding which elements exist. `Panel` owns the
// cell and never reads it, so a write re-renders `Panel` and reaches each `Row`
// with the arguments it already had — the same handle object, the same id.
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
            fileHash: "1xxq1a0w43eq",
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
            fileHash: "1xxq1a0w43eq",
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
          fileHash: "1xxq1a0w43eq",
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
  const selected = state(0);
  return _jsxs("div", {
    children: [
      _jsx("span", {
        onclick: cs.create(
          [34, 22, 34, 50],
          {
            version: "0.0.0",
            filePath: "local-state-child-reads.tsx",
            fileHash: "1xxq1a0w43eq",
            kind: "value",
            splices: { $selected: selected },
            captures: [],
            spliceParams: { $selected: [] },
          },
          () => ({
            kind: 220,
            loc: [34, 25, 34, 49],
            parameters: [],
            body: {
              kind: 214,
              loc: [34, 31, 34, 49],
              expression: {
                kind: 212,
                loc: [34, 31, 34, 46],
                expression: {
                  kind: 1000,
                  loc: [34, 31, 34, 40],
                  key: "$selected",
                },
                questionDotToken: false,
                name: "write",
              },
              questionDotToken: false,
              arguments: [
                {
                  kind: 9,
                  loc: [34, 47, 34, 48],
                  value: 1,
                },
              ],
            },
          }),
        ),
        children: "select",
      }),
      _jsx(Row, {
        id: cs.create(
          [35, 16, 35, 21],
          {
            version: "0.0.0",
            filePath: "local-state-child-reads.tsx",
            fileHash: "1xxq1a0w43eq",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: 9,
            loc: [35, 19, 35, 20],
            value: 0,
          }),
        ),
        selected: selected,
      }),
      _jsx(Row, {
        id: cs.create(
          [36, 16, 36, 21],
          {
            version: "0.0.0",
            filePath: "local-state-child-reads.tsx",
            fileHash: "1xxq1a0w43eq",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: 9,
            loc: [36, 19, 36, 20],
            value: 1,
          }),
        ),
        selected: selected,
      }),
    ],
  });
}
export default _jsx(Panel, {});
