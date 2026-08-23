import { cs } from "@backtickjs/core";
import { Fragment } from "@backtickjs/web-sdk/jsx-runtime";
// `<Fragment>` written out inside a script, where `<>` is the shorthand. A
// fragment is a component — it answers with its children — so a tag naming one
// splices it and is a call of it, like any other component tag.
//
// The shorthand is not: the compiler reads an absent opening tag as a fragment
// and lowers it to its children, so nothing of it reaches the host at all.
export default cs.create(
  [10, 16, 20, 3],
  {
    version: "0.0.0",
    filePath: "script-fragment-tag.tsx",
    fileHash: "22ng6jt0kn4tw",
    kind: "value",
    splices: { $Fragment: Fragment },
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 242,
    loc: [10, 19, 20, 2],
    statements: [
      {
        kind: 254,
        loc: [11, 3, 19, 10],
        expression: {
          kind: 285,
          loc: [11, 10, 19, 9],
          type: {
            kind: 11,
            loc: [11, 11, 11, 14],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: 285,
              loc: [12, 6, 15, 16],
              type: {
                kind: 1000,
                loc: [12, 7, 12, 15],
                key: "$Fragment",
              },
              attributes: [],
              children: [
                {
                  kind: 285,
                  loc: [13, 7, 13, 21],
                  type: {
                    kind: 11,
                    loc: [13, 8, 13, 12],
                    text: "span",
                  },
                  attributes: [],
                  children: [
                    {
                      kind: 11,
                      loc: [13, 13, 13, 14],
                      text: "a",
                    },
                  ],
                },
                {
                  kind: 285,
                  loc: [14, 7, 14, 21],
                  type: {
                    kind: 11,
                    loc: [14, 8, 14, 12],
                    text: "span",
                  },
                  attributes: [],
                  children: [
                    {
                      kind: 11,
                      loc: [14, 13, 14, 14],
                      text: "b",
                    },
                  ],
                },
              ],
            },
            {
              kind: 285,
              loc: [17, 7, 17, 17],
              type: {
                kind: 11,
                loc: [17, 8, 17, 10],
                text: "em",
              },
              attributes: [],
              children: [
                {
                  kind: 11,
                  loc: [17, 11, 17, 12],
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
