import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A fragment a script writes: its children where it stands, and no node of its
// own — the same `Fragment` element the tree path writes for `<>`.
//
// And text as JSX reads it, which is not `trim()`. Across lines it is one
// sentence; on one line its spaces are its own; and the space between two
// expressions survives, where trimming would take it.
const listed = cs.create(
  [11, 16, 18, 3],
  {
    version: "0.0.0",
    filePath: "jsx/script-fragment.test.tsx",
    fileHash: "3pjkiwnta5gua",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [11, 19, 18, 2],
    parameters: [
      {
        kind: "param",
        loc: [11, 20, 11, 32],
        name: {
          kind: "id",
          loc: [11, 20, 11, 24],
          text: "name",
          bindingKey: "name$3pjkiwnta5gua$0",
        },
      },
    ],
    body: {
      kind: "jsx",
      loc: [12, 3, 17, 6],
      type: {
        kind: "string",
        loc: [12, 3, 17, 6],
        text: "Fragment",
      },
      attributes: [],
      children: [
        {
          kind: "jsx",
          loc: [13, 5, 13, 41],
          type: {
            kind: "string",
            loc: [13, 6, 13, 10],
            text: "span",
          },
          attributes: [],
          children: [
            {
              kind: "string",
              loc: [13, 11, 13, 34],
              text: "a sentence across lines",
            },
          ],
        },
        {
          kind: "jsx",
          loc: [14, 5, 16, 12],
          type: {
            kind: "string",
            loc: [14, 6, 14, 10],
            text: "span",
          },
          attributes: [],
          children: [
            {
              kind: "id",
              loc: [15, 8, 15, 12],
              text: "name",
              bindingKey: "name$3pjkiwnta5gua$0",
            },
            {
              kind: "string",
              loc: [15, 14, 15, 14],
              text: " ",
            },
            {
              kind: "id",
              loc: [15, 15, 15, 19],
              text: "name",
              bindingKey: "name$3pjkiwnta5gua$0",
            },
          ],
        },
      ],
    },
  }),
);
it("scriptFragment", async (t) => {
  await snapshotCase(
    t,
    "scriptFragment",
    _jsx("div", {
      children: cs.create(
        [21, 49, 21, 65],
        {
          version: "0.0.0",
          filePath: "jsx/script-fragment.test.tsx",
          fileHash: "3pjkiwnta5gua",
          splices: { $listed: { value: listed, params: [] } },
          captures: [],
        },
        () => ({
          kind: "()",
          loc: [21, 52, 21, 64],
          expression: {
            kind: "splice",
            loc: [21, 52, 21, 59],
            key: "$listed",
          },
          arguments: [
            {
              kind: "string",
              loc: [21, 60, 21, 63],
              text: "x",
            },
          ],
        }),
      ),
    }),
  );
});
