import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/core/jsx-runtime";
import { cs, state, Text, View } from "@backtickjs/core";
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
  _jsxs(View, {
    children: [
      _jsx(Text, {
        style: {
          fontSize: cs.create(
            [21, 30, 21, 68],
            {
              version: "0.0.0",
              filePath: "local-state-child-reads.tsx",
              fileHash: "13oclx3uze35q",
              kind: "value",
              splices: { $selected: selected, $id: id },
              captures: [],
              spliceParams: { $selected: [], $id: [] },
            },
            () => ({
              kind: 228,
              loc: [21, 33, 21, 67],
              condition: {
                kind: 227,
                loc: [21, 33, 21, 57],
                left: {
                  kind: 214,
                  loc: [21, 33, 21, 49],
                  expression: {
                    kind: 212,
                    loc: [21, 33, 21, 47],
                    expression: {
                      kind: 1000,
                      loc: [21, 33, 21, 42],
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
                  loc: [21, 54, 21, 57],
                  key: "$id",
                },
              },
              whenTrue: {
                kind: 9,
                loc: [21, 60, 21, 62],
                value: 20,
              },
              whenFalse: {
                kind: 9,
                loc: [21, 65, 21, 67],
                value: 16,
              },
            }),
          ),
        },
        children: cs.create(
          [22, 8, 22, 52],
          {
            version: "0.0.0",
            filePath: "local-state-child-reads.tsx",
            fileHash: "13oclx3uze35q",
            kind: "value",
            splices: { $id: id, $selected: selected },
            captures: [],
            spliceParams: { $id: [], $selected: [] },
          },
          () => ({
            kind: 227,
            loc: [22, 11, 22, 51],
            left: {
              kind: 227,
              loc: [22, 11, 22, 32],
              left: {
                kind: 227,
                loc: [22, 11, 22, 23],
                left: {
                  kind: 11,
                  loc: [22, 11, 22, 17],
                  text: "row ",
                },
                operatorToken: "+",
                right: {
                  kind: 1000,
                  loc: [22, 20, 22, 23],
                  key: "$id",
                },
              },
              operatorToken: "+",
              right: {
                kind: 11,
                loc: [22, 26, 22, 32],
                text: " of ",
              },
            },
            operatorToken: "+",
            right: {
              kind: 214,
              loc: [22, 35, 22, 51],
              expression: {
                kind: 212,
                loc: [22, 35, 22, 49],
                expression: {
                  kind: 1000,
                  loc: [22, 35, 22, 44],
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
        [24, 6, 24, 68],
        {
          version: "0.0.0",
          filePath: "local-state-child-reads.tsx",
          fileHash: "13oclx3uze35q",
          kind: "value",
          splices: {
            $selected: selected,
            $id: id,
            $0splice0: _jsx(Text, { children: "marker" }),
          },
          captures: [],
          spliceParams: { $selected: [], $id: [], $0splice0: [] },
        },
        () => ({
          kind: 228,
          loc: [24, 9, 24, 67],
          condition: {
            kind: 227,
            loc: [24, 9, 24, 33],
            left: {
              kind: 214,
              loc: [24, 9, 24, 25],
              expression: {
                kind: 212,
                loc: [24, 9, 24, 23],
                expression: {
                  kind: 1000,
                  loc: [24, 9, 24, 18],
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
              loc: [24, 30, 24, 33],
              key: "$id",
            },
          },
          whenTrue: {
            kind: 210,
            loc: [24, 36, 24, 62],
            elements: [
              {
                kind: 1000,
                loc: [24, 37, 24, 61],
                key: "$0splice0",
              },
            ],
          },
          whenFalse: {
            kind: 210,
            loc: [24, 65, 24, 67],
            elements: [],
          },
        }),
      ),
    ],
  });
async function Panel() {
  const selected = state(0);
  return _jsxs(View, {
    children: [
      _jsx(Text, {
        onPress: cs.create(
          [32, 22, 32, 50],
          {
            version: "0.0.0",
            filePath: "local-state-child-reads.tsx",
            fileHash: "13oclx3uze35q",
            kind: "value",
            splices: { $selected: selected },
            captures: [],
            spliceParams: { $selected: [] },
          },
          () => ({
            kind: 220,
            loc: [32, 25, 32, 49],
            parameters: [],
            body: {
              kind: 214,
              loc: [32, 31, 32, 49],
              expression: {
                kind: 212,
                loc: [32, 31, 32, 46],
                expression: {
                  kind: 1000,
                  loc: [32, 31, 32, 40],
                  key: "$selected",
                },
                questionDotToken: false,
                name: "write",
              },
              questionDotToken: false,
              arguments: [
                {
                  kind: 9,
                  loc: [32, 47, 32, 48],
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
          [33, 16, 33, 21],
          {
            version: "0.0.0",
            filePath: "local-state-child-reads.tsx",
            fileHash: "13oclx3uze35q",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: 9,
            loc: [33, 19, 33, 20],
            value: 0,
          }),
        ),
        selected: selected,
      }),
      _jsx(Row, {
        id: cs.create(
          [34, 16, 34, 21],
          {
            version: "0.0.0",
            filePath: "local-state-child-reads.tsx",
            fileHash: "13oclx3uze35q",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: 9,
            loc: [34, 19, 34, 20],
            value: 1,
          }),
        ),
        selected: selected,
      }),
    ],
  });
}
export default _jsx(Panel, {});
