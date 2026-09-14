import { jsx as _jsx } from "@backtickjs/web-client/jsx-runtime";
import { bundler } from "@backtickjs/bundler";
import { cs, vm } from "@backtickjs/core";
// A bundle evaluated among siblings. What it draws goes where the call stands,
// and nothing of its own does: the spans either side keep their order.
async function Other() {
  return cs.create(
    [7, 10, 7, 46],
    {
      version: "0.0.0",
      filePath: "vm-eval-siblings.tsx",
      fileHash: "1l845ykqu8sf6",
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
const held = await bundler.run(_jsx(Other, {}));
export default cs.create(
  [12, 16, 18, 2],
  {
    version: "0.0.0",
    filePath: "vm-eval-siblings.tsx",
    fileHash: "1l845ykqu8sf6",
    splices: {
      $vm: { value: vm, params: [] },
      $held: { value: held, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "jsx",
    loc: [13, 3, 17, 9],
    type: {
      kind: "string",
      loc: [13, 4, 13, 7],
      text: "div",
    },
    attributes: [],
    children: [
      {
        kind: "jsx",
        loc: [14, 5, 14, 24],
        type: {
          kind: "string",
          loc: [14, 6, 14, 10],
          text: "span",
        },
        attributes: [],
        children: [
          {
            kind: "string",
            loc: [14, 11, 14, 17],
            text: "before",
          },
        ],
      },
      {
        kind: "()",
        loc: [15, 6, 15, 21],
        expression: {
          kind: ".",
          loc: [15, 6, 15, 14],
          expression: {
            kind: "splice",
            loc: [15, 6, 15, 9],
            key: "$vm",
          },
          name: "eval",
        },
        arguments: [
          {
            kind: "splice",
            loc: [15, 15, 15, 20],
            key: "$held",
          },
        ],
      },
      {
        kind: "jsx",
        loc: [16, 5, 16, 23],
        type: {
          kind: "string",
          loc: [16, 6, 16, 10],
          text: "span",
        },
        attributes: [],
        children: [
          {
            kind: "string",
            loc: [16, 11, 16, 16],
            text: "after",
          },
        ],
      },
    ],
  }),
);
