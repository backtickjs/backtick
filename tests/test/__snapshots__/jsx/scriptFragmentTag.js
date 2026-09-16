import { cs } from "@backtickjs/core";
import { Fragment } from "@backtickjs/web-sdk";
// `<Fragment>` written out inside a script, where `<>` is the shorthand. A
// fragment is a component — it answers with its children — so a tag naming one
// splices it and is a call of it, like any other component tag.
//
// The shorthand is not: the compiler reads an absent opening tag as a fragment
// and lowers it to its children, so nothing of it reaches the host at all.
const scriptFragmentTag = cs.create(
  [10, 27, 26, 3],
  {
    version: "0.0.0",
    filePath: "scriptFragmentTag.tsx",
    fileHash: "eztl0esfaivs",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [10, 30, 26, 2],
    statements: [
      {
        kind: "return",
        loc: [11, 3, 25, 5],
        expression: {
          kind: "jsx",
          loc: [12, 5, 24, 11],
          type: {
            kind: "string",
            loc: [12, 6, 12, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [14, 9, 17, 20],
              type: {
                kind: "string",
                loc: [14, 10, 14, 18],
                text: "Fragment",
              },
              attributes: [],
              children: [
                {
                  kind: "jsx",
                  loc: [15, 11, 15, 25],
                  type: {
                    kind: "string",
                    loc: [15, 12, 15, 16],
                    text: "span",
                  },
                  attributes: [],
                  children: [
                    {
                      kind: "string",
                      loc: [15, 17, 15, 18],
                      text: "a",
                    },
                  ],
                },
                {
                  kind: "jsx",
                  loc: [16, 11, 16, 25],
                  type: {
                    kind: "string",
                    loc: [16, 12, 16, 16],
                    text: "span",
                  },
                  attributes: [],
                  children: [
                    {
                      kind: "string",
                      loc: [16, 17, 16, 18],
                      text: "b",
                    },
                  ],
                },
              ],
            },
            {
              kind: "jsx",
              loc: [20, 9, 22, 12],
              type: {
                kind: "string",
                loc: [20, 9, 22, 12],
                text: "Fragment",
              },
              attributes: [],
              children: [
                {
                  kind: "jsx",
                  loc: [21, 11, 21, 21],
                  type: {
                    kind: "string",
                    loc: [21, 12, 21, 14],
                    text: "em",
                  },
                  attributes: [],
                  children: [
                    {
                      kind: "string",
                      loc: [21, 15, 21, 16],
                      text: "c",
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
