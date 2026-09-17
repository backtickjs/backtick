import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A property literally named `...`, in a literal a spread also runs through —
// which is the one shape where a spread and a pair holding `...` sit in the
// same list. A pair is an array of its own, so its `...` is only a string.
it("objectDotsKey", async (t) => {
  await snapshotCase(
    t,
    "objectDotsKey",
    cs.create(
      [12, 5, 15, 7],
      {
        version: "0.0.0",
        filePath: "objects/object-dots-key.test.tsx",
        fileHash: "13e6vrhonm3wb",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [12, 8, 15, 6],
        statements: [
          {
            kind: "const",
            loc: [13, 7, 13, 29],
            name: {
              kind: "id",
              loc: [13, 13, 13, 17],
              text: "base",
              bindingKey: "base$13e6vrhonm3wb$0",
            },
            initializer: {
              kind: "obj",
              loc: [13, 20, 13, 28],
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
              ],
            },
          },
          {
            kind: "return",
            loc: [14, 7, 14, 36],
            expression: {
              kind: "obj",
              loc: [14, 14, 14, 35],
              properties: [
                {
                  kind: "...",
                  loc: [14, 16, 14, 23],
                  expression: {
                    kind: "id",
                    loc: [14, 19, 14, 23],
                    text: "base",
                    bindingKey: "base$13e6vrhonm3wb$0",
                  },
                },
                {
                  kind: ":",
                  loc: [14, 25, 14, 33],
                  name: {
                    kind: "string",
                    loc: [14, 25, 14, 30],
                    text: "...",
                  },
                  initializer: {
                    kind: "number",
                    loc: [14, 32, 14, 33],
                    value: 2,
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
