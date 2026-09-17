import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A key computed while the script runs. A literal that holds one is a node,
// as one a spread runs through is: its key has no text to ship as data. Keys
// are evaluated in order, and a later one wins in the place the first took.
it("computedKey", async (t) => {
  await snapshotCase(
    t,
    "computedKey",
    cs.create(
      [12, 5, 21, 7],
      {
        version: "0.0.0",
        filePath: "objects/computed-key.test.tsx",
        fileHash: "3cml3gbmctaj1",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [12, 8, 21, 6],
        statements: [
          {
            kind: "const",
            loc: [13, 7, 13, 35],
            name: {
              kind: "id",
              loc: [13, 13, 13, 17],
              text: "base",
              bindingKey: "base$3cml3gbmctaj1$0",
            },
            initializer: {
              kind: "obj",
              loc: [13, 20, 13, 34],
              properties: [
                {
                  kind: ":",
                  loc: [13, 22, 13, 26],
                  name: {
                    kind: "string",
                    loc: [13, 22, 13, 23],
                    text: "a",
                  },
                  initializer: {
                    kind: "number",
                    loc: [13, 25, 13, 26],
                    value: 1,
                  },
                },
                {
                  kind: ":",
                  loc: [13, 28, 13, 32],
                  name: {
                    kind: "string",
                    loc: [13, 28, 13, 29],
                    text: "b",
                  },
                  initializer: {
                    kind: "number",
                    loc: [13, 31, 13, 32],
                    value: 2,
                  },
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [14, 7, 14, 24],
            name: {
              kind: "id",
              loc: [14, 13, 14, 17],
              text: "name",
              bindingKey: "name$3cml3gbmctaj1$1",
            },
            initializer: {
              kind: "string",
              loc: [14, 20, 14, 23],
              text: "b",
            },
          },
          {
            kind: "return",
            loc: [15, 7, 20, 9],
            expression: {
              kind: "obj",
              loc: [15, 14, 20, 8],
              properties: [
                {
                  kind: "...",
                  loc: [16, 9, 16, 16],
                  expression: {
                    kind: "id",
                    loc: [16, 12, 16, 16],
                    text: "base",
                    bindingKey: "base$3cml3gbmctaj1$0",
                  },
                },
                {
                  kind: ":",
                  loc: [17, 9, 17, 18],
                  name: {
                    kind: "id",
                    loc: [17, 10, 17, 14],
                    text: "name",
                    bindingKey: "name$3cml3gbmctaj1$1",
                  },
                  initializer: {
                    kind: "number",
                    loc: [17, 17, 17, 18],
                    value: 9,
                  },
                },
                {
                  kind: ":",
                  loc: [18, 9, 18, 23],
                  name: {
                    kind: "binop",
                    loc: [18, 10, 18, 19],
                    left: {
                      kind: "string",
                      loc: [18, 10, 18, 13],
                      text: "c",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "string",
                      loc: [18, 16, 18, 19],
                      text: "d",
                    },
                  },
                  initializer: {
                    kind: "number",
                    loc: [18, 22, 18, 23],
                    value: 3,
                  },
                },
                {
                  kind: ":",
                  loc: [19, 9, 19, 13],
                  name: {
                    kind: "string",
                    loc: [19, 9, 19, 10],
                    text: "a",
                  },
                  initializer: {
                    kind: "number",
                    loc: [19, 12, 19, 13],
                    value: 4,
                  },
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
