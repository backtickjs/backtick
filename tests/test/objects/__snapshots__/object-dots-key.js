import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A property literally named `...`, in a literal a spread also runs through —
// which is the one shape where both are entries of the same node. The format
// tells them apart by the entry's first slot, and `...` is a name a property
// may have, so this is where the two could be confused.
it("objectDotsKey", async (t) => {
  await snapshotCase(
    t,
    "objectDotsKey",
    cs.create(
      [13, 5, 16, 7],
      {
        version: "0.0.0",
        filePath: "objects/object-dots-key.test.tsx",
        fileHash: "16bj2njuilmni",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [13, 8, 16, 6],
        statements: [
          {
            kind: "const",
            loc: [14, 7, 14, 29],
            name: {
              kind: "id",
              loc: [14, 13, 14, 17],
              text: "base",
              bindingKey: "base$16bj2njuilmni$0",
            },
            initializer: {
              kind: "obj",
              loc: [14, 20, 14, 28],
              properties: [
                {
                  kind: ":",
                  loc: [14, 22, 14, 26],
                  name: "a",
                  initializer: {
                    kind: "number",
                    loc: [14, 25, 14, 26],
                    value: 1,
                  },
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [15, 7, 15, 36],
            expression: {
              kind: "obj",
              loc: [15, 14, 15, 35],
              properties: [
                {
                  kind: "...",
                  loc: [15, 16, 15, 23],
                  expression: {
                    kind: "id",
                    loc: [15, 19, 15, 23],
                    text: "base",
                    bindingKey: "base$16bj2njuilmni$0",
                  },
                },
                {
                  kind: ":",
                  loc: [15, 25, 15, 33],
                  name: "...",
                  initializer: {
                    kind: "number",
                    loc: [15, 32, 15, 33],
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
