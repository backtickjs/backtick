import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, fontSize } from "./dom.ts";
// A child reading a cell it was handed, in all three positions at once: a prop,
// a text child, and a branch deciding which elements exist. The script that
// declares the cell never reads it, so a write reaches each `ReadingRow` with
// the arguments it already had — the same handle object, the same id.
//
// Nothing a row was given is different, and everything it draws is. Skipping
// on the arguments alone leaves both rows stale: a handle is one object
// whatever its cell holds. The branch is the half no amount of recomputing a
// prop can answer for.
const ReadingRow = async ({ id, selected }) =>
  _jsxs("div", {
    children: [
      _jsx("span", {
        style: cs.create(
          [27, 14, 27, 77],
          {
            version: "0.0.0",
            filePath: "state/local-state-child-reads.test.tsx",
            fileHash: "2u1y4xp6zos4q",
            splices: {
              $selected: { value: selected, params: [] },
              $id: { value: id, params: [] },
            },
            captures: [],
          },
          () => ({
            kind: "binop",
            loc: [27, 17, 27, 76],
            left: {
              kind: "binop",
              loc: [27, 17, 27, 69],
              left: {
                kind: "string",
                loc: [27, 17, 27, 30],
                text: "font-size: ",
              },
              operatorToken: "+",
              right: {
                kind: "?:",
                loc: [27, 34, 27, 68],
                condition: {
                  kind: "binop",
                  loc: [27, 34, 27, 58],
                  left: {
                    kind: "()",
                    loc: [27, 34, 27, 50],
                    expression: {
                      kind: ".",
                      loc: [27, 34, 27, 48],
                      expression: {
                        kind: "splice",
                        loc: [27, 34, 27, 43],
                        key: "$selected",
                      },
                      name: "read",
                    },
                    arguments: [],
                  },
                  operatorToken: "===",
                  right: {
                    kind: "splice",
                    loc: [27, 55, 27, 58],
                    key: "$id",
                  },
                },
                whenTrue: {
                  kind: "number",
                  loc: [27, 61, 27, 63],
                  value: 20,
                },
                whenFalse: {
                  kind: "number",
                  loc: [27, 66, 27, 68],
                  value: 16,
                },
              },
            },
            operatorToken: "+",
            right: {
              kind: "string",
              loc: [27, 72, 27, 76],
              text: "px",
            },
          }),
        ),
        children: cs.create(
          [29, 8, 29, 52],
          {
            version: "0.0.0",
            filePath: "state/local-state-child-reads.test.tsx",
            fileHash: "2u1y4xp6zos4q",
            splices: {
              $id: { value: id, params: [] },
              $selected: { value: selected, params: [] },
            },
            captures: [],
          },
          () => ({
            kind: "binop",
            loc: [29, 11, 29, 51],
            left: {
              kind: "binop",
              loc: [29, 11, 29, 32],
              left: {
                kind: "binop",
                loc: [29, 11, 29, 23],
                left: {
                  kind: "string",
                  loc: [29, 11, 29, 17],
                  text: "row ",
                },
                operatorToken: "+",
                right: {
                  kind: "splice",
                  loc: [29, 20, 29, 23],
                  key: "$id",
                },
              },
              operatorToken: "+",
              right: {
                kind: "string",
                loc: [29, 26, 29, 32],
                text: " of ",
              },
            },
            operatorToken: "+",
            right: {
              kind: "()",
              loc: [29, 35, 29, 51],
              expression: {
                kind: ".",
                loc: [29, 35, 29, 49],
                expression: {
                  kind: "splice",
                  loc: [29, 35, 29, 44],
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
        [31, 6, 31, 68],
        {
          version: "0.0.0",
          filePath: "state/local-state-child-reads.test.tsx",
          fileHash: "2u1y4xp6zos4q",
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
          loc: [31, 9, 31, 67],
          condition: {
            kind: "binop",
            loc: [31, 9, 31, 33],
            left: {
              kind: "()",
              loc: [31, 9, 31, 25],
              expression: {
                kind: ".",
                loc: [31, 9, 31, 23],
                expression: {
                  kind: "splice",
                  loc: [31, 9, 31, 18],
                  key: "$selected",
                },
                name: "read",
              },
              arguments: [],
            },
            operatorToken: "===",
            right: {
              kind: "splice",
              loc: [31, 30, 31, 33],
              key: "$id",
            },
          },
          whenTrue: {
            kind: "splice",
            loc: [31, 36, 31, 60],
            key: "$0splice0",
          },
          whenFalse: {
            kind: "null",
            loc: [31, 63, 31, 67],
          },
        }),
      ),
    ],
  });
async function ReadingPanel() {
  return cs.create(
    [36, 10, 45, 5],
    {
      version: "0.0.0",
      filePath: "state/local-state-child-reads.test.tsx",
      fileHash: "2u1y4xp6zos4q",
      splices: {
        $state: { value: state, params: [] },
        $ReadingRow: { value: ReadingRow, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [36, 13, 45, 4],
      statements: [
        {
          kind: "const",
          loc: [37, 5, 37, 32],
          name: {
            kind: "id",
            loc: [37, 11, 37, 19],
            text: "selected",
            bindingKey: "selected$2u1y4xp6zos4q$0",
          },
          initializer: {
            kind: "()",
            loc: [37, 22, 37, 31],
            expression: {
              kind: "splice",
              loc: [37, 22, 37, 28],
              key: "$state",
            },
            arguments: [
              {
                kind: "number",
                loc: [37, 29, 37, 30],
                value: 0,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [38, 5, 44, 7],
          expression: {
            kind: "jsx",
            loc: [39, 7, 43, 13],
            type: {
              kind: "string",
              loc: [39, 8, 39, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [40, 9, 40, 62],
                type: {
                  kind: "string",
                  loc: [40, 10, 40, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "=>",
                      loc: [40, 24, 40, 47],
                      parameters: [],
                      body: {
                        kind: "()",
                        loc: [40, 30, 40, 47],
                        expression: {
                          kind: ".",
                          loc: [40, 30, 40, 44],
                          expression: {
                            kind: "id",
                            loc: [40, 30, 40, 38],
                            text: "selected",
                            bindingKey: "selected$2u1y4xp6zos4q$0",
                          },
                          name: "write",
                        },
                        arguments: [
                          {
                            kind: "number",
                            loc: [40, 45, 40, 46],
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
                    loc: [40, 49, 40, 55],
                    text: "select",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [41, 9, 41, 50],
                type: {
                  kind: "splice",
                  loc: [41, 10, 41, 20],
                  key: "$ReadingRow",
                },
                attributes: [
                  {
                    name: "id",
                    initializer: {
                      kind: "number",
                      loc: [41, 25, 41, 26],
                      value: 0,
                    },
                  },
                  {
                    name: "selected",
                    initializer: {
                      kind: "id",
                      loc: [41, 38, 41, 46],
                      text: "selected",
                      bindingKey: "selected$2u1y4xp6zos4q$0",
                    },
                  },
                ],
                children: [],
              },
              {
                kind: "jsx",
                loc: [42, 9, 42, 50],
                type: {
                  kind: "splice",
                  loc: [42, 10, 42, 20],
                  key: "$ReadingRow",
                },
                attributes: [
                  {
                    name: "id",
                    initializer: {
                      kind: "number",
                      loc: [42, 25, 42, 26],
                      value: 1,
                    },
                  },
                  {
                    name: "selected",
                    initializer: {
                      kind: "id",
                      loc: [42, 38, 42, 46],
                      text: "selected",
                      bindingKey: "selected$2u1y4xp6zos4q$0",
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
// What one `ReadingRow` draws, in the three positions it read the cell from: a
// prop, a text child, and a branch.
function readRow(row) {
  const [label, marker] = children(row);
  assert.ok(label !== undefined, "expected a label");
  return {
    size: fontSize(label),
    text: label.firstChild?.nodeValue,
    marked: marker !== undefined,
  };
}
describe("local state", () => {
  it("a child redraws everything it read of a cell it was handed", async () => {
    const view = await drawn(_jsx(ReadingPanel, {}));
    const [button, ...rows] = children(view);
    assert.ok(button !== undefined && rows.length === 2);
    // Nothing either row was given changes across the write — the same handle
    // object and the same id — so every assertion here is one the arguments
    // alone cannot answer. A prop, a text child, and a branch, per row.
    assert.deepEqual(rows.map(readRow), [
      { size: 20, text: "row 0 of 0", marked: true },
      { size: 16, text: "row 1 of 0", marked: false },
    ]);
    await userEvent.click(button);
    assert.deepEqual(rows.map(readRow), [
      { size: 16, text: "row 0 of 1", marked: false },
      { size: 20, text: "row 1 of 1", marked: true },
    ]);
  });
});
it("ReadingPanel", async (t) => {
  await snapshotCase(t, "ReadingPanel", _jsx(ReadingPanel, {}));
});
