import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { Fragment } from "@backtickjs/web-sdk";
import { snapshotCase } from "../snapshotCase.ts";
// `<Fragment>` written out inside a script, where `<>` is the shorthand. A
// fragment is a component — it answers with its children — so a tag naming
// one splices it and is a call of it, like any other component tag.
//
// The shorthand is not: the compiler reads an absent opening tag as a
// fragment and lowers it to its children, so nothing of it reaches the host
// at all.
it("scriptFragmentTag", async (t) => {
  await snapshotCase(
    t,
    "scriptFragmentTag",
    cs.create(
      [17, 5, 33, 7],
      {
        version: "0.0.0",
        filePath: "jsx/script-fragment-tag.test.tsx",
        fileHash: "1uevnymojdbzi",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [17, 8, 33, 6],
        statements: [
          {
            kind: "return",
            loc: [18, 7, 32, 9],
            expression: {
              kind: "jsx",
              loc: [19, 9, 31, 15],
              type: {
                kind: "string",
                loc: [19, 10, 19, 13],
                text: "div",
              },
              attributes: [],
              children: [
                {
                  kind: "jsx",
                  loc: [21, 13, 24, 24],
                  type: {
                    kind: "string",
                    loc: [21, 14, 21, 22],
                    text: "Fragment",
                  },
                  attributes: [],
                  children: [
                    {
                      kind: "jsx",
                      loc: [22, 15, 22, 29],
                      type: {
                        kind: "string",
                        loc: [22, 16, 22, 20],
                        text: "span",
                      },
                      attributes: [],
                      children: [
                        {
                          kind: "string",
                          loc: [22, 21, 22, 22],
                          text: "a",
                        },
                      ],
                    },
                    {
                      kind: "jsx",
                      loc: [23, 15, 23, 29],
                      type: {
                        kind: "string",
                        loc: [23, 16, 23, 20],
                        text: "span",
                      },
                      attributes: [],
                      children: [
                        {
                          kind: "string",
                          loc: [23, 21, 23, 22],
                          text: "b",
                        },
                      ],
                    },
                  ],
                },
                {
                  kind: "jsx",
                  loc: [27, 13, 29, 16],
                  type: {
                    kind: "string",
                    loc: [27, 13, 29, 16],
                    text: "Fragment",
                  },
                  attributes: [],
                  children: [
                    {
                      kind: "jsx",
                      loc: [28, 15, 28, 25],
                      type: {
                        kind: "string",
                        loc: [28, 16, 28, 18],
                        text: "em",
                      },
                      attributes: [],
                      children: [
                        {
                          kind: "string",
                          loc: [28, 19, 28, 20],
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
    ),
  );
});
