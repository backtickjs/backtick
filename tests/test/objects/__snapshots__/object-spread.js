import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A spread in an object literal, which is the one place the format cannot
// ship an object as the data it spells: an object in a value slot *is* its
// own keys and none of them is reserved, so there is nowhere to write "and
// every key of that one". A literal a spread runs through is a node instead —
// a name slot of `null` marking the spread — and a literal without one is
// data still.
//
// Later wins, both ways round, the way it does in the language this mirrors.
it("objectSpread", async (t) => {
  await snapshotCase(
    t,
    "objectSpread",
    cs.create(
      [17, 5, 25, 7],
      {
        version: "0.0.0",
        filePath: "objects/object-spread.test.tsx",
        fileHash: "3jf5cgjhw3sl1",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [17, 8, 25, 6],
        statements: [
          {
            kind: "const",
            loc: [18, 7, 18, 35],
            name: {
              kind: "id",
              loc: [18, 13, 18, 17],
              text: "base",
              bindingKey: "base$3jf5cgjhw3sl1$0",
            },
            initializer: {
              kind: "obj",
              loc: [18, 20, 18, 34],
              properties: [
                {
                  kind: ":",
                  loc: [18, 22, 18, 26],
                  name: "a",
                  initializer: {
                    kind: "number",
                    loc: [18, 25, 18, 26],
                    value: 1,
                  },
                },
                {
                  kind: ":",
                  loc: [18, 28, 18, 32],
                  name: "b",
                  initializer: {
                    kind: "number",
                    loc: [18, 31, 18, 32],
                    value: 2,
                  },
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [19, 7, 19, 29],
            name: {
              kind: "id",
              loc: [19, 13, 19, 17],
              text: "over",
              bindingKey: "over$3jf5cgjhw3sl1$1",
            },
            initializer: {
              kind: "obj",
              loc: [19, 20, 19, 28],
              properties: [
                {
                  kind: ":",
                  loc: [19, 22, 19, 26],
                  name: "b",
                  initializer: {
                    kind: "number",
                    loc: [19, 25, 19, 26],
                    value: 9,
                  },
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [20, 7, 24, 9],
            expression: {
              kind: "obj",
              loc: [20, 14, 24, 8],
              properties: [
                {
                  kind: "...",
                  loc: [21, 9, 21, 16],
                  expression: {
                    kind: "id",
                    loc: [21, 12, 21, 16],
                    text: "base",
                    bindingKey: "base$3jf5cgjhw3sl1$0",
                  },
                },
                {
                  kind: "...",
                  loc: [22, 9, 22, 16],
                  expression: {
                    kind: "id",
                    loc: [22, 12, 22, 16],
                    text: "over",
                    bindingKey: "over$3jf5cgjhw3sl1$1",
                  },
                },
                {
                  kind: ":",
                  loc: [23, 9, 23, 13],
                  name: "c",
                  initializer: {
                    kind: "number",
                    loc: [23, 12, 23, 13],
                    value: 3,
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
