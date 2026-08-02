import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/core/jsx-runtime";
import { cs, Text, View } from "@backtickjs/core";
// A tree spliced into a body and bound to a name before it is used. Nothing
// applies it at the hole and nothing draws it there — it is a value, held and
// handed back, and the position that receives it is what draws it.
//
// The shape this pins is that an entry reached from a body is *applied*: the
// value says which entry and what to hand it, and that is the whole of what an
// instance-to-be is. There was once a second way to say it — naming the entry,
// and calling what that named — and this is the case it existed for.
const Row = async () => _jsx(Text, { children: "x" });
const held = cs.create(
  [13, 14, 16, 3],
  {
    version: "0.0.0",
    filePath: "tree-in-variable.tsx",
    fileHash: "2c9mrlrfdrw72",
    kind: "value",
    splices: { $0splice0: _jsx(View, {}) },
    captures: [],
    spliceParams: { $0splice0: [] },
  },
  () => ({
    kind: 220,
    loc: [13, 17, 16, 2],
    parameters: [],
    body: {
      kind: 242,
      loc: [13, 23, 16, 2],
      statements: [
        {
          kind: 244,
          loc: [14, 3, 14, 30],
          declarationList: {
            kind: 262,
            loc: [14, 3, 14, 29],
            declarations: [
              {
                kind: 261,
                loc: [14, 9, 14, 29],
                name: {
                  kind: 80,
                  loc: [14, 9, 14, 13],
                  text: "tree",
                  bindingKey: "tree$2c9mrlrfdrw72$0",
                },
                initializer: {
                  kind: 1000,
                  loc: [14, 16, 14, 29],
                  key: "$0splice0",
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 254,
          loc: [15, 3, 15, 15],
          expression: {
            kind: 80,
            loc: [15, 10, 15, 14],
            text: "tree",
            bindingKey: "tree$2c9mrlrfdrw72$0",
          },
        },
      ],
    },
  }),
);
const heldComponent = cs.create(
  [18, 23, 21, 3],
  {
    version: "0.0.0",
    filePath: "tree-in-variable.tsx",
    fileHash: "2c9mrlrfdrw72",
    kind: "value",
    splices: { $0splice0: _jsx(Row, {}) },
    captures: [],
    spliceParams: { $0splice0: [] },
  },
  () => ({
    kind: 220,
    loc: [18, 26, 21, 2],
    parameters: [],
    body: {
      kind: 242,
      loc: [18, 32, 21, 2],
      statements: [
        {
          kind: 244,
          loc: [19, 3, 19, 29],
          declarationList: {
            kind: 262,
            loc: [19, 3, 19, 28],
            declarations: [
              {
                kind: 261,
                loc: [19, 9, 19, 28],
                name: {
                  kind: 80,
                  loc: [19, 9, 19, 13],
                  text: "tree",
                  bindingKey: "tree$2c9mrlrfdrw72$1",
                },
                initializer: {
                  kind: 1000,
                  loc: [19, 16, 19, 28],
                  key: "$0splice0",
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 254,
          loc: [20, 3, 20, 15],
          expression: {
            kind: 80,
            loc: [20, 10, 20, 14],
            text: "tree",
            bindingKey: "tree$2c9mrlrfdrw72$1",
          },
        },
      ],
    },
  }),
);
export default _jsxs(View, {
  children: [
    cs.create(
      [25, 6, 25, 17],
      {
        version: "0.0.0",
        filePath: "tree-in-variable.tsx",
        fileHash: "2c9mrlrfdrw72",
        kind: "value",
        splices: { $held: held },
        captures: [],
        spliceParams: { $held: [] },
      },
      () => ({
        kind: 214,
        loc: [25, 9, 25, 16],
        expression: {
          kind: 1000,
          loc: [25, 9, 25, 14],
          key: "$held",
        },
        questionDotToken: false,
        arguments: [],
      }),
    ),
    cs.create(
      [26, 6, 26, 26],
      {
        version: "0.0.0",
        filePath: "tree-in-variable.tsx",
        fileHash: "2c9mrlrfdrw72",
        kind: "value",
        splices: { $heldComponent: heldComponent },
        captures: [],
        spliceParams: { $heldComponent: [] },
      },
      () => ({
        kind: 214,
        loc: [26, 9, 26, 25],
        expression: {
          kind: 1000,
          loc: [26, 9, 26, 23],
          key: "$heldComponent",
        },
        questionDotToken: false,
        arguments: [],
      }),
    ),
  ],
});
