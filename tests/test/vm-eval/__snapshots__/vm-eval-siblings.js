import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, vm } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A bundle evaluated among siblings. What it draws goes where the call stands,
// and nothing of its own does: the spans either side keep their order.
async function Other() {
  return cs.create(
    [9, 10, 9, 46],
    {
      version: "0.0.0",
      filePath: "vm-eval/vm-eval-siblings.test.tsx",
      fileHash: "16v7i20put7e4",
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
it("vmEvalSiblings", async (t) => {
  await snapshotCase(
    t,
    "vmEvalSiblings",
    cs.create(
      [18, 5, 22, 12],
      {
        version: "0.0.0",
        filePath: "vm-eval/vm-eval-siblings.test.tsx",
        fileHash: "16v7i20put7e4",
        splices: {
          $vm: { value: vm, params: [] },
          $otherBundle: { value: otherBundle, params: [] },
        },
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
            loc: [20, 8, 20, 30],
            expression: {
              kind: ".",
              loc: [20, 8, 20, 16],
              expression: {
                kind: "splice",
                loc: [20, 8, 20, 11],
                key: "$vm",
              },
              name: "eval",
            },
            arguments: [
              {
                kind: "splice",
                loc: [20, 17, 20, 29],
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
