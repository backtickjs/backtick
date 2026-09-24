import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A bundle evaluated among siblings. What it draws goes where the call stands,
// and nothing of its own does: the spans either side keep their order.
async function Other() {
  return cs.create(
    [9, 10, 9, 46],
    {
      version: "0.0.0",
      filePath: "eval/eval-siblings.test.tsx",
      fileHash: "1re1jas6fqiey",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "jsx",
      loc: [9, 13, 9, 45],
      type: {
        kind: "string",
        loc: [9, 14, 9, 16],
        text: "em",
      },
      attributes: [],
      children: [
        {
          kind: "string",
          loc: [9, 18, 9, 39],
          text: "from another bundle",
        },
      ],
    }),
  );
}
const otherBundle = await bundler.run(_jsx(Other, {}));
it("evalSiblings", async (t) => {
  await snapshotCase(
    t,
    "evalSiblings",
    cs.create(
      [18, 5, 22, 12],
      {
        version: "0.0.0",
        filePath: "eval/eval-siblings.test.tsx",
        fileHash: "1re1jas6fqiey",
        splices: { $otherBundle: { value: otherBundle, params: [] } },
        captures: [],
      },
      () => ({
        kind: "jsx",
        loc: [18, 8, 22, 11],
        type: {
          kind: "string",
          loc: [18, 9, 18, 12],
          text: "div",
        },
        attributes: [],
        children: [
          {
            kind: "jsx",
            loc: [19, 7, 19, 26],
            type: {
              kind: "string",
              loc: [19, 8, 19, 12],
              text: "span",
            },
            attributes: [],
            children: [
              {
                kind: "string",
                loc: [19, 13, 19, 19],
                text: "before",
              },
            ],
          },
          {
            kind: "()",
            loc: [20, 8, 20, 26],
            expression: {
              kind: "bltn",
              loc: [20, 8, 20, 12],
              name: "eval",
            },
            arguments: [
              {
                kind: "splice",
                loc: [20, 13, 20, 25],
                key: "$otherBundle",
              },
            ],
          },
          {
            kind: "jsx",
            loc: [21, 7, 21, 25],
            type: {
              kind: "string",
              loc: [21, 8, 21, 12],
              text: "span",
            },
            attributes: [],
            children: [
              {
                kind: "string",
                loc: [21, 13, 21, 18],
                text: "after",
              },
            ],
          },
        ],
      }),
    ),
  );
});
