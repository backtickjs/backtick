import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A tree spliced into a body and bound to a name before it is used. Nothing
// applies it at the hole and nothing draws it there — it is a value, held and
// handed back, and the position that receives it is what draws it.
//
// The shape this pins is that an entry reached from a body is *applied*: the
// value says which entry and what to hand it, and that is the whole of what an
// instance-to-be is. There was once a second way to say it — naming the entry,
// and calling what that named — and this is the case it existed for.
const HeldRow = async () => _jsx("span", { children: "x" });
const heldElement = cs.create(
  [15, 21, 18, 3],
  {
    version: "0.0.0",
    filePath: "jsx/tree-in-variable.test.tsx",
    fileHash: "224cj4eht1o03",
    splices: { $0splice0: { value: _jsx("div", {}), params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [15, 24, 18, 2],
    parameters: [],
    body: {
      kind: "{}",
      loc: [15, 30, 18, 2],
      statements: [
        {
          kind: "const",
          loc: [16, 3, 16, 29],
          name: {
            kind: "id",
            loc: [16, 9, 16, 13],
            text: "tree",
            bindingKey: "tree$224cj4eht1o03$0",
          },
          initializer: {
            kind: "splice",
            loc: [16, 16, 16, 28],
            key: "$0splice0",
          },
        },
        {
          kind: "return",
          loc: [17, 3, 17, 15],
          expression: {
            kind: "id",
            loc: [17, 10, 17, 14],
            text: "tree",
            bindingKey: "tree$224cj4eht1o03$0",
          },
        },
      ],
    },
  }),
);
const heldComponent = cs.create(
  [20, 23, 23, 3],
  {
    version: "0.0.0",
    filePath: "jsx/tree-in-variable.test.tsx",
    fileHash: "224cj4eht1o03",
    splices: { $0splice0: { value: _jsx(HeldRow, {}), params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [20, 26, 23, 2],
    parameters: [],
    body: {
      kind: "{}",
      loc: [20, 32, 23, 2],
      statements: [
        {
          kind: "const",
          loc: [21, 3, 21, 33],
          name: {
            kind: "id",
            loc: [21, 9, 21, 13],
            text: "tree",
            bindingKey: "tree$224cj4eht1o03$1",
          },
          initializer: {
            kind: "splice",
            loc: [21, 16, 21, 32],
            key: "$0splice0",
          },
        },
        {
          kind: "return",
          loc: [22, 3, 22, 15],
          expression: {
            kind: "id",
            loc: [22, 10, 22, 14],
            text: "tree",
            bindingKey: "tree$224cj4eht1o03$1",
          },
        },
      ],
    },
  }),
);
it("treeInVariable", async (t) => {
  await snapshotCase(
    t,
    "treeInVariable",
    _jsxs("div", {
      children: [
        cs.create(
          [30, 8, 30, 26],
          {
            version: "0.0.0",
            filePath: "jsx/tree-in-variable.test.tsx",
            fileHash: "224cj4eht1o03",
            splices: { $heldElement: { value: heldElement, params: [] } },
            captures: [],
          },
          () => ({
            kind: "()",
            loc: [30, 11, 30, 25],
            expression: {
              kind: "splice",
              loc: [30, 11, 30, 23],
              key: "$heldElement",
            },
            arguments: [],
          }),
        ),
        cs.create(
          [31, 8, 31, 28],
          {
            version: "0.0.0",
            filePath: "jsx/tree-in-variable.test.tsx",
            fileHash: "224cj4eht1o03",
            splices: { $heldComponent: { value: heldComponent, params: [] } },
            captures: [],
          },
          () => ({
            kind: "()",
            loc: [31, 11, 31, 27],
            expression: {
              kind: "splice",
              loc: [31, 11, 31, 25],
              key: "$heldComponent",
            },
            arguments: [],
          }),
        ),
      ],
    }),
  );
});
