import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A key computed while the script runs. A literal that holds one is
// `Object.fromEntries` over its pairs, as one a spread runs through is: its
// key has no text to ship as data. Keys are evaluated in order, and a later
// one wins in the place the first took.
it("computedKey", async (t) => {
  await snapshotCase(
    t,
    "computedKey",
    cs.create(
      [13, 5, 22, 7],
      {
        version: "0.0.0",
        filePath: "objects/computed-key.test.tsx",
        fileHash: "27b2r7injyzq0",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [13, 8, 22, 6],
        statements: [
          {
            kind: "const",
            loc: [14, 7, 14, 35],
            name: {
              kind: "id",
              loc: [14, 13, 14, 17],
              text: "base",
              bindingKey: "base$27b2r7injyzq0$0",
            },
            initializer: {
              kind: "obj",
              loc: [14, 20, 14, 34],
              properties: [
                {
                  kind: ":",
                  loc: [14, 22, 14, 26],
                  name: {
                    kind: "string",
                    loc: [14, 22, 14, 23],
                    text: "a",
                  },
                  initializer: {
                    kind: "number",
                    loc: [14, 25, 14, 26],
                    value: 1,
                  },
                },
                {
                  kind: ":",
                  loc: [14, 28, 14, 32],
                  name: {
                    kind: "string",
                    loc: [14, 28, 14, 29],
                    text: "b",
                  },
                  initializer: {
                    kind: "number",
                    loc: [14, 31, 14, 32],
                    value: 2,
                  },
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [15, 7, 15, 24],
            name: {
              kind: "id",
              loc: [15, 13, 15, 17],
              text: "name",
              bindingKey: "name$27b2r7injyzq0$1",
            },
            initializer: {
              kind: "string",
              loc: [15, 20, 15, 23],
              text: "b",
            },
          },
          {
            kind: "return",
            loc: [16, 7, 21, 9],
            expression: {
              kind: "obj",
              loc: [16, 14, 21, 8],
              properties: [
                {
                  kind: "...",
                  loc: [17, 9, 17, 16],
                  expression: {
                    kind: "id",
                    loc: [17, 12, 17, 16],
                    text: "base",
                    bindingKey: "base$27b2r7injyzq0$0",
                  },
                },
                {
                  kind: ":",
                  loc: [18, 9, 18, 18],
                  name: {
                    kind: "id",
                    loc: [18, 10, 18, 14],
                    text: "name",
                    bindingKey: "name$27b2r7injyzq0$1",
                  },
                  initializer: {
                    kind: "number",
                    loc: [18, 17, 18, 18],
                    value: 9,
                  },
                },
                {
                  kind: ":",
                  loc: [19, 9, 19, 23],
                  name: {
                    kind: "binop",
                    loc: [19, 10, 19, 19],
                    left: {
                      kind: "string",
                      loc: [19, 10, 19, 13],
                      text: "c",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "string",
                      loc: [19, 16, 19, 19],
                      text: "d",
                    },
                  },
                  initializer: {
                    kind: "number",
                    loc: [19, 22, 19, 23],
                    value: 3,
                  },
                },
                {
                  kind: ":",
                  loc: [20, 9, 20, 13],
                  name: {
                    kind: "string",
                    loc: [20, 9, 20, 10],
                    text: "a",
                  },
                  initializer: {
                    kind: "number",
                    loc: [20, 12, 20, 13],
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
