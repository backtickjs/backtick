import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, For } from "@backtickjs/core";
import { render } from "@backtickjs/web-testing";
import { snapshotCase } from "../snapshotCase.ts";
// A bundle evaluated where a script stands, and used by its type: a drawing
// whose root is a list, placed as a child, and a number, added to.
async function Items() {
  return cs.create(
    [11, 10, 13, 10],
    {
      version: "0.0.0",
      filePath: "eval/eval.test.tsx",
      fileHash: "3crw4saj766qu",
      splices: { $For: { value: For, params: [] } },
      captures: [],
    },
    () => ({
      kind: "jsx",
      loc: [11, 13, 13, 9],
      type: {
        kind: "splice",
        loc: [11, 14, 11, 17],
        key: "$For",
      },
      attributes: [
        {
          name: "each",
          initializer: {
            kind: "arr",
            loc: [11, 24, 11, 33],
            elements: [
              {
                kind: "number",
                loc: [11, 25, 11, 26],
                value: 1,
              },
              {
                kind: "number",
                loc: [11, 28, 11, 29],
                value: 2,
              },
              {
                kind: "number",
                loc: [11, 31, 11, 32],
                value: 3,
              },
            ],
          },
        },
      ],
      children: [
        {
          kind: "=>",
          loc: [12, 6, 12, 47],
          parameters: [
            {
              kind: "param",
              loc: [12, 7, 12, 16],
              name: {
                kind: "id",
                loc: [12, 7, 12, 8],
                text: "n",
                bindingKey: "n$3crw4saj766qu$0",
              },
            },
          ],
          body: {
            kind: "jsx",
            loc: [12, 21, 12, 47],
            type: {
              kind: "string",
              loc: [12, 22, 12, 26],
              text: "span",
            },
            attributes: [],
            children: [
              {
                kind: "binop",
                loc: [12, 28, 12, 39],
                left: {
                  kind: "string",
                  loc: [12, 28, 12, 35],
                  text: "item ",
                },
                operatorToken: "+",
                right: {
                  kind: "id",
                  loc: [12, 38, 12, 39],
                  text: "n",
                  bindingKey: "n$3crw4saj766qu$0",
                },
              },
            ],
          },
        },
      ],
    }),
  );
}
const items = await bundler.run(_jsx(Items, {}));
const total = await bundler.run(41);
const evaluated = cs.create(
  [19, 19, 22, 8],
  {
    version: "0.0.0",
    filePath: "eval/eval.test.tsx",
    fileHash: "3crw4saj766qu",
    splices: {
      $items: { value: items, params: [] },
      $total: { value: total, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "jsx",
    loc: [19, 22, 22, 7],
    type: {
      kind: "string",
      loc: [19, 23, 19, 26],
      text: "div",
    },
    attributes: [],
    children: [
      {
        kind: "()",
        loc: [20, 4, 20, 16],
        expression: {
          kind: "bltn",
          loc: [20, 4, 20, 8],
          name: "eval",
        },
        arguments: [
          {
            kind: "splice",
            loc: [20, 9, 20, 15],
            key: "$items",
          },
        ],
      },
      {
        kind: "jsx",
        loc: [21, 3, 21, 28],
        type: {
          kind: "string",
          loc: [21, 4, 21, 5],
          text: "b",
        },
        attributes: [],
        children: [
          {
            kind: "binop",
            loc: [21, 7, 21, 23],
            left: {
              kind: "()",
              loc: [21, 7, 21, 19],
              expression: {
                kind: "bltn",
                loc: [21, 7, 21, 11],
                name: "eval",
              },
              arguments: [
                {
                  kind: "splice",
                  loc: [21, 12, 21, 18],
                  key: "$total",
                },
              ],
            },
            operatorToken: "+",
            right: {
              kind: "number",
              loc: [21, 22, 21, 23],
              value: 1,
            },
          },
        ],
      },
    ],
  }),
);
it("eval", async (t) => {
  await snapshotCase(t, "eval", evaluated);
});
describe("a bundle a script runs with eval", () => {
  it("draws one whose root is a <For />, and answers one that is a value", async () => {
    const { container } = await render(evaluated);
    const div = container.firstElementChild;
    assert.deepEqual(
      [...div.childNodes].map((child) => child.textContent),
      ["item 1", "item 2", "item 3", "42"],
    );
  });
});
