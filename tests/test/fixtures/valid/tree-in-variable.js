import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import { cs } from "@backtickjs/core";
// A tree spliced into a body and bound to a name before it is used. Nothing
// applies it at the hole and nothing draws it there — it is a value, held and
// handed back, and the position that receives it is what draws it.
//
// The shape this pins is that an entry reached from a body is *applied*: the
// value says which entry and what to hand it, and that is the whole of what an
// instance-to-be is. There was once a second way to say it — naming the entry,
// and calling what that named — and this is the case it existed for.
const Row = async () => _jsx("span", { children: "x" });
const held = cs.create(
  [13, 14, 16, 3],
  {
    version: "0.0.0",
    filePath: "tree-in-variable.tsx",
    fileHash: "3ravx23kvqohc",
    splices: { $0splice0: { value: _jsx("div", {}), params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [13, 17, 16, 2],
    parameters: [],
    body: {
      kind: "{}",
      loc: [13, 23, 16, 2],
      statements: [
        {
          kind: "const",
          loc: [14, 3, 14, 29],
          name: {
            kind: "id",
            loc: [14, 9, 14, 13],
            text: "tree",
            bindingKey: "tree$3ravx23kvqohc$0",
          },
          initializer: {
            kind: "splice",
            loc: [14, 16, 14, 28],
            key: "$0splice0",
          },
        },
        {
          kind: "return",
          loc: [15, 3, 15, 15],
          expression: {
            kind: "id",
            loc: [15, 10, 15, 14],
            text: "tree",
            bindingKey: "tree$3ravx23kvqohc$0",
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
    fileHash: "3ravx23kvqohc",
    splices: { $0splice0: { value: _jsx(Row, {}), params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [18, 26, 21, 2],
    parameters: [],
    body: {
      kind: "{}",
      loc: [18, 32, 21, 2],
      statements: [
        {
          kind: "const",
          loc: [19, 3, 19, 29],
          name: {
            kind: "id",
            loc: [19, 9, 19, 13],
            text: "tree",
            bindingKey: "tree$3ravx23kvqohc$1",
          },
          initializer: {
            kind: "splice",
            loc: [19, 16, 19, 28],
            key: "$0splice0",
          },
        },
        {
          kind: "return",
          loc: [20, 3, 20, 15],
          expression: {
            kind: "id",
            loc: [20, 10, 20, 14],
            text: "tree",
            bindingKey: "tree$3ravx23kvqohc$1",
          },
        },
      ],
    },
  }),
);
export default _jsxs("div", {
  children: [
    cs.create(
      [25, 6, 25, 17],
      {
        version: "0.0.0",
        filePath: "tree-in-variable.tsx",
        fileHash: "3ravx23kvqohc",
        splices: { $held: { value: held, params: [] } },
        captures: [],
      },
      () => ({
        kind: "()",
        loc: [25, 9, 25, 16],
        expression: {
          kind: "splice",
          loc: [25, 9, 25, 14],
          key: "$held",
        },
        arguments: [],
      }),
    ),
    cs.create(
      [26, 6, 26, 26],
      {
        version: "0.0.0",
        filePath: "tree-in-variable.tsx",
        fileHash: "3ravx23kvqohc",
        splices: { $heldComponent: { value: heldComponent, params: [] } },
        captures: [],
      },
      () => ({
        kind: "()",
        loc: [26, 9, 26, 25],
        expression: {
          kind: "splice",
          loc: [26, 9, 26, 23],
          key: "$heldComponent",
        },
        arguments: [],
      }),
    ),
  ],
});
