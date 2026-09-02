import { cs } from "@backtickjs/core";
import { Fragment } from "@backtickjs/web-schema";
// `<Fragment>` written out inside a script, where `<>` is the shorthand. A
// fragment is a component — it answers with its children — so a tag naming one
// splices it and is a call of it, like any other component tag.
//
// The shorthand is not: the compiler reads an absent opening tag as a fragment
// and lowers it to its children, so nothing of it reaches the host at all.
export default cs.create(
  [10, 16, 26, 3],
  {
    version: "0.0.0",
    filePath: "script-fragment-tag.tsx",
    fileHash: "1kjbg1lf78b9h",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 242,
    loc: [10, 19, 26, 2],
    statements: [
      {
        kind: 254,
        loc: [11, 3, 25, 5],
        expression: {
          kind: 285,
          loc: [12, 5, 24, 11],
          type: {
            kind: 11,
            loc: [12, 6, 12, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: 210,
              loc: [14, 9, 17, 20],
              elements: [
                {
                  kind: 285,
                  loc: [15, 11, 15, 25],
                  type: {
                    kind: 11,
                    loc: [15, 12, 15, 16],
                    text: "span",
                  },
                  attributes: [],
                  children: [
                    {
                      kind: 11,
                      loc: [15, 17, 15, 18],
                      text: "a",
                    },
                  ],
                },
                {
                  kind: 285,
                  loc: [16, 11, 16, 25],
                  type: {
                    kind: 11,
                    loc: [16, 12, 16, 16],
                    text: "span",
                  },
                  attributes: [],
                  children: [
                    {
                      kind: 11,
                      loc: [16, 17, 16, 18],
                      text: "b",
                    },
                  ],
                },
              ],
            },
            {
              kind: 285,
              loc: [21, 11, 21, 21],
              type: {
                kind: 11,
                loc: [21, 12, 21, 14],
                text: "em",
              },
              attributes: [],
              children: [
                {
                  kind: 11,
                  loc: [21, 15, 21, 16],
                  text: "c",
                },
              ],
            },
          ],
        },
      },
    ],
  }),
);
