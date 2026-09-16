import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, fontSize } from "./dom.ts";
// A cell crossing a component boundary: declared once by the script that draws
// the pair, handed to each child as a prop, so both read one storage. The cell
// is an ordinary client value — the prop takes it the way it takes any other —
// which is what makes a write through either child reach the same storage.
const SharedCounter = async ({ size }) =>
  _jsx("span", {
    style: cs.create(
      [15, 12, 15, 51],
      {
        version: "0.0.0",
        filePath: "state/local-state-prop.test.tsx",
        fileHash: "1rx4ylseg7d72",
        splices: { $size: { value: size, params: [] } },
        captures: [],
      },
      () => ({
        kind: "binop",
        loc: [15, 15, 15, 50],
        left: {
          kind: "binop",
          loc: [15, 15, 15, 43],
          left: {
            kind: "string",
            loc: [15, 15, 15, 28],
            text: "font-size: ",
          },
          operatorToken: "+",
          right: {
            kind: "()",
            loc: [15, 31, 15, 43],
            expression: {
              kind: ".",
              loc: [15, 31, 15, 41],
              expression: {
                kind: "splice",
                loc: [15, 31, 15, 36],
                key: "$size",
              },
              name: "read",
            },
            arguments: [],
          },
        },
        operatorToken: "+",
        right: {
          kind: "string",
          loc: [15, 46, 15, 50],
          text: "px",
        },
      }),
    ),
    onclick: cs.create(
      [16, 14, 18, 7],
      {
        version: "0.0.0",
        filePath: "state/local-state-prop.test.tsx",
        fileHash: "1rx4ylseg7d72",
        splices: { $size: { value: size, params: [] } },
        captures: [],
      },
      () => ({
        kind: "=>",
        loc: [16, 17, 18, 6],
        parameters: [],
        body: {
          kind: "{}",
          loc: [16, 23, 18, 6],
          statements: [
            {
              kind: "()",
              loc: [17, 7, 17, 36],
              expression: {
                kind: ".",
                loc: [17, 7, 17, 18],
                expression: {
                  kind: "splice",
                  loc: [17, 7, 17, 12],
                  key: "$size",
                },
                name: "write",
              },
              arguments: [
                {
                  kind: "binop",
                  loc: [17, 19, 17, 35],
                  left: {
                    kind: "()",
                    loc: [17, 19, 17, 31],
                    expression: {
                      kind: ".",
                      loc: [17, 19, 17, 29],
                      expression: {
                        kind: "splice",
                        loc: [17, 19, 17, 24],
                        key: "$size",
                      },
                      name: "read",
                    },
                    arguments: [],
                  },
                  operatorToken: "+",
                  right: {
                    kind: "number",
                    loc: [17, 34, 17, 35],
                    value: 1,
                  },
                },
              ],
            },
          ],
        },
      }),
    ),
    children: "press",
  });
async function SharingPanel() {
  return cs.create(
    [25, 10, 33, 5],
    {
      version: "0.0.0",
      filePath: "state/local-state-prop.test.tsx",
      fileHash: "1rx4ylseg7d72",
      splices: {
        $state: { value: state, params: [] },
        $SharedCounter: { value: SharedCounter, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [25, 13, 33, 4],
      statements: [
        {
          kind: "const",
          loc: [26, 5, 26, 29],
          name: {
            kind: "id",
            loc: [26, 11, 26, 15],
            text: "size",
            bindingKey: "size$1rx4ylseg7d72$0",
          },
          initializer: {
            kind: "()",
            loc: [26, 18, 26, 28],
            expression: {
              kind: "splice",
              loc: [26, 18, 26, 24],
              key: "$state",
            },
            arguments: [
              {
                kind: "number",
                loc: [26, 25, 26, 27],
                value: 16,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [27, 5, 32, 7],
          expression: {
            kind: "jsx",
            loc: [28, 7, 31, 13],
            type: {
              kind: "string",
              loc: [28, 8, 28, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [29, 9, 29, 38],
                type: {
                  kind: "splice",
                  loc: [29, 10, 29, 23],
                  key: "$SharedCounter",
                },
                attributes: [
                  {
                    name: "size",
                    initializer: {
                      kind: "id",
                      loc: [29, 30, 29, 34],
                      text: "size",
                      bindingKey: "size$1rx4ylseg7d72$0",
                    },
                  },
                ],
                children: [],
              },
              {
                kind: "jsx",
                loc: [30, 9, 30, 38],
                type: {
                  kind: "splice",
                  loc: [30, 10, 30, 23],
                  key: "$SharedCounter",
                },
                attributes: [
                  {
                    name: "size",
                    initializer: {
                      kind: "id",
                      loc: [30, 30, 30, 34],
                      text: "size",
                      bindingKey: "size$1rx4ylseg7d72$0",
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
describe("local state", () => {
  it("a cell passed as a prop is one storage, shared by both children", async () => {
    const view = await drawn(_jsx(SharingPanel, {}));
    const [first, second] = children(view);
    assert.ok(first !== undefined && second !== undefined);
    assert.equal(fontSize(first), 16);
    assert.equal(fontSize(second), 16);
    // The parent declared the cell and handed it to both, so a write through
    // one child's handle moves the other's display too.
    await userEvent.click(first);
    assert.equal(fontSize(first), 17);
    assert.equal(fontSize(second), 17);
  });
});
it("SharingPanel", async (t) => {
  await snapshotCase(t, "SharingPanel", _jsx(SharingPanel, {}));
});
