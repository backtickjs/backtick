import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { bundler } from "@backtickjs/bundler";
import { cs, vm } from "@backtickjs/core";
// A bundle evaluated among siblings. What it draws goes where the call stands,
// and nothing of its own does: the spans either side keep their order.
async function Other() {
  return cs.create(
    [7, 10, 7, 46],
    {
      version: "0.0.0",
      filePath: "vmEvalSiblings.tsx",
      fileHash: "217rj2ma2wmt3",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "jsx",
      loc: [7, 13, 7, 45],
      type: {
        kind: "string",
        loc: [7, 14, 7, 16],
        text: "em",
      },
      attributes: [],
      children: [
        {
          kind: "string",
          loc: [7, 18, 7, 39],
          text: "from another bundle",
        },
      ],
    }),
  );
}
const otherBundle = await bundler.run(_jsx(Other, {}));
const vmEvalSiblings = cs.create(
  [12, 24, 16, 8],
  {
    version: "0.0.0",
    filePath: "vmEvalSiblings.tsx",
    fileHash: "217rj2ma2wmt3",
    splices: {
      $vm: { value: vm, params: [] },
      $otherBundle: { value: otherBundle, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "jsx",
    loc: [12, 27, 16, 7],
    type: {
      kind: "string",
      loc: [12, 28, 12, 31],
      text: "div",
    },
    attributes: [],
    children: [
      {
        kind: "jsx",
        loc: [13, 3, 13, 22],
        type: {
          kind: "string",
          loc: [13, 4, 13, 8],
          text: "span",
        },
        attributes: [],
        children: [
          {
            kind: "string",
            loc: [13, 9, 13, 15],
            text: "before",
          },
        ],
      },
      {
        kind: "()",
        loc: [14, 4, 14, 26],
        expression: {
          kind: ".",
          loc: [14, 4, 14, 12],
          expression: {
            kind: "splice",
            loc: [14, 4, 14, 7],
            key: "$vm",
          },
          name: "eval",
        },
        arguments: [
          {
            kind: "splice",
            loc: [14, 13, 14, 25],
            key: "$otherBundle",
          },
        ],
      },
      {
        kind: "jsx",
        loc: [15, 3, 15, 21],
        type: {
          kind: "string",
          loc: [15, 4, 15, 8],
          text: "span",
        },
        attributes: [],
        children: [
          {
            kind: "string",
            loc: [15, 9, 15, 14],
            text: "after",
          },
        ],
      },
    ],
  }),
);
