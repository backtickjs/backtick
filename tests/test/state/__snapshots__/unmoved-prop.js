import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn } from "./dom.ts";
// A list whose every row reads the cell the selection is held in. A write
// re-runs the `href` of all three rows and moves it on two of them — the row
// selected, and the row that no longer is. The third recomputes the href it
// already had, and the host must not hear about it.
async function SelectableRows() {
  return cs.create(
    [13, 10, 29, 5],
    {
      version: "0.0.0",
      filePath: "state/unmoved-prop.test.tsx",
      fileHash: "10sk3wfrc0dvh",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [13, 13, 29, 4],
      statements: [
        {
          kind: "const",
          loc: [14, 5, 14, 32],
          name: {
            kind: "id",
            loc: [14, 11, 14, 19],
            text: "selected",
            bindingKey: "selected$10sk3wfrc0dvh$0",
          },
          initializer: {
            kind: "()",
            loc: [14, 22, 14, 31],
            expression: {
              kind: "splice",
              loc: [14, 22, 14, 28],
              key: "$state",
            },
            arguments: [
              {
                kind: "number",
                loc: [14, 29, 14, 30],
                value: 0,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [15, 5, 28, 7],
          expression: {
            kind: "jsx",
            loc: [16, 7, 27, 13],
            type: {
              kind: "string",
              loc: [16, 8, 16, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [17, 9, 17, 62],
                type: {
                  kind: "string",
                  loc: [17, 10, 17, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "=>",
                      loc: [17, 24, 17, 47],
                      parameters: [],
                      body: {
                        kind: "()",
                        loc: [17, 30, 17, 47],
                        expression: {
                          kind: ".",
                          loc: [17, 30, 17, 44],
                          expression: {
                            kind: "id",
                            loc: [17, 30, 17, 38],
                            text: "selected",
                            bindingKey: "selected$10sk3wfrc0dvh$0",
                          },
                          name: "write",
                        },
                        arguments: [
                          {
                            kind: "number",
                            loc: [17, 45, 17, 46],
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
                    loc: [17, 49, 17, 55],
                    text: "select",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [18, 9, 26, 15],
                type: {
                  kind: "string",
                  loc: [18, 10, 18, 13],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [19, 11, 25, 17],
                    type: {
                      kind: "splice",
                      loc: [19, 12, 19, 15],
                      key: "$For",
                    },
                    attributes: [
                      {
                        name: "each",
                        initializer: {
                          kind: "arr",
                          loc: [19, 22, 19, 31],
                          elements: [
                            {
                              kind: "number",
                              loc: [19, 23, 19, 24],
                              value: 0,
                            },
                            {
                              kind: "number",
                              loc: [19, 26, 19, 27],
                              value: 1,
                            },
                            {
                              kind: "number",
                              loc: [19, 29, 19, 30],
                              value: 2,
                            },
                          ],
                        },
                      },
                    ],
                    children: [
                      {
                        kind: "=>",
                        loc: [20, 14, 24, 14],
                        parameters: [
                          {
                            kind: "param",
                            loc: [20, 15, 20, 25],
                            name: {
                              kind: "id",
                              loc: [20, 15, 20, 17],
                              text: "id",
                              bindingKey: "id$10sk3wfrc0dvh$1",
                            },
                          },
                        ],
                        body: {
                          kind: "jsx",
                          loc: [21, 15, 23, 19],
                          type: {
                            kind: "string",
                            loc: [21, 16, 21, 17],
                            text: "a",
                          },
                          attributes: [
                            {
                              name: "href",
                              initializer: {
                                kind: "?:",
                                loc: [21, 24, 21, 68],
                                condition: {
                                  kind: "binop",
                                  loc: [21, 24, 21, 46],
                                  left: {
                                    kind: "()",
                                    loc: [21, 24, 21, 39],
                                    expression: {
                                      kind: ".",
                                      loc: [21, 24, 21, 37],
                                      expression: {
                                        kind: "id",
                                        loc: [21, 24, 21, 32],
                                        text: "selected",
                                        bindingKey: "selected$10sk3wfrc0dvh$0",
                                      },
                                      name: "read",
                                    },
                                    arguments: [],
                                  },
                                  operatorToken: "===",
                                  right: {
                                    kind: "id",
                                    loc: [21, 44, 21, 46],
                                    text: "id",
                                    bindingKey: "id$10sk3wfrc0dvh$1",
                                  },
                                },
                                whenTrue: {
                                  kind: "string",
                                  loc: [21, 49, 21, 56],
                                  text: "#open",
                                },
                                whenFalse: {
                                  kind: "string",
                                  loc: [21, 59, 21, 68],
                                  text: "#closed",
                                },
                              },
                            },
                          ],
                          children: [
                            {
                              kind: "binop",
                              loc: [22, 18, 22, 29],
                              left: {
                                kind: "string",
                                loc: [22, 18, 22, 24],
                                text: "row ",
                              },
                              operatorToken: "+",
                              right: {
                                kind: "id",
                                loc: [22, 27, 22, 29],
                                text: "id",
                                bindingKey: "id$10sk3wfrc0dvh$1",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
  );
}
describe("local state", () => {
  // A prop re-runs when something it read was written, which is not the same as
  // holding anything new: a cell a whole list reads decides one row's prop, and
  // every other row recomputes the value it already had. The host hears about
  // the two that moved and nothing else — a write per row per selection is what
  // a list of any size would otherwise cost.
  it("a prop that recomputed to what it held is not set again", async () => {
    const view = await drawn(_jsx(SelectableRows, {}));
    const [select, list] = children(view);
    assert.ok(select !== undefined && list !== undefined);
    // What the drawing wrote, watched the way a page watches itself: an
    // observer reports a write even where what it wrote is what the attribute
    // already held, which is the whole question here. Records are kept as
    // they arrive, since a click is awaited and the observer reports meanwhile.
    const records = [];
    const watching = new MutationObserver((arrived) =>
      records.push(...arrived),
    );
    watching.observe(view, { attributes: true, subtree: true });
    const written = () =>
      [...records.splice(0), ...watching.takeRecords()].map((record) => [
        [...list.children].indexOf(record.target),
        record.attributeName,
        record.target.getAttribute(record.attributeName),
      ]);
    const href = () =>
      [...list.children].map((row) => row.getAttribute("href"));
    assert.deepEqual(href(), ["#open", "#closed", "#closed"]);
    written();
    await userEvent.click(select);
    assert.deepEqual(href(), ["#closed", "#open", "#closed"]);
    // The row that was selected and the row now selected, in the order they
    // were built. The third row read the cell too, and had nothing to say.
    assert.deepEqual(written(), [
      [0, "href", "#closed"],
      [1, "href", "#open"],
    ]);
  });
});
it("SelectableRows", async (t) => {
  await snapshotCase(t, "SelectableRows", _jsx(SelectableRows, {}));
});
