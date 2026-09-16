import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `...xs` where an element goes: it has no value of its own, it contributes
// however many the array it spreads has. An empty one contributes nothing, a
// list may hold several, and what it spreads is an ordinary expression.
it("spread", async (t) => {
  await snapshotCase(
    t,
    "spread",
    cs.create(
      [12, 5, 19, 7],
      {
        version: "0.0.0",
        filePath: "expressions/spread.test.tsx",
        fileHash: "2b1hzyqftxgza",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [12, 8, 19, 6],
        statements: [
          {
            kind: "const",
            loc: [13, 7, 13, 28],
            name: {
              kind: "id",
              loc: [13, 13, 13, 18],
              text: "front",
              bindingKey: "front$2b1hzyqftxgza$0",
            },
            initializer: {
              kind: "arr",
              loc: [13, 21, 13, 27],
              elements: [
                {
                  kind: "number",
                  loc: [13, 22, 13, 23],
                  value: 1,
                },
                {
                  kind: "number",
                  loc: [13, 25, 13, 26],
                  value: 2,
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
              text: "back",
              bindingKey: "back$2b1hzyqftxgza$1",
            },
            initializer: {
              kind: "arr",
              loc: [14, 20, 14, 23],
              elements: [
                {
                  kind: "number",
                  loc: [14, 21, 14, 22],
                  value: 3,
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [15, 7, 15, 23],
            name: {
              kind: "id",
              loc: [15, 13, 15, 17],
              text: "none",
              bindingKey: "none$2b1hzyqftxgza$2",
            },
            initializer: {
              kind: "arr",
              loc: [15, 20, 15, 22],
              elements: [],
            },
          },
          {
            kind: "const",
            loc: [16, 7, 16, 54],
            name: {
              kind: "id",
              loc: [16, 13, 16, 16],
              text: "all",
              bindingKey: "all$2b1hzyqftxgza$3",
            },
            initializer: {
              kind: "arr",
              loc: [16, 19, 16, 53],
              elements: [
                {
                  kind: "number",
                  loc: [16, 20, 16, 21],
                  value: 0,
                },
                {
                  kind: "...",
                  loc: [16, 23, 16, 31],
                  expression: {
                    kind: "id",
                    loc: [16, 26, 16, 31],
                    text: "front",
                    bindingKey: "front$2b1hzyqftxgza$0",
                  },
                },
                {
                  kind: "...",
                  loc: [16, 33, 16, 40],
                  expression: {
                    kind: "id",
                    loc: [16, 36, 16, 40],
                    text: "none",
                    bindingKey: "none$2b1hzyqftxgza$2",
                  },
                },
                {
                  kind: "...",
                  loc: [16, 42, 16, 49],
                  expression: {
                    kind: "id",
                    loc: [16, 45, 16, 49],
                    text: "back",
                    bindingKey: "back$2b1hzyqftxgza$1",
                  },
                },
                {
                  kind: "number",
                  loc: [16, 51, 16, 52],
                  value: 4,
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [17, 7, 17, 38],
            name: {
              kind: "id",
              loc: [17, 13, 17, 18],
              text: "twice",
              bindingKey: "twice$2b1hzyqftxgza$4",
            },
            initializer: {
              kind: "arr",
              loc: [17, 21, 17, 37],
              elements: [
                {
                  kind: "...",
                  loc: [17, 22, 17, 28],
                  expression: {
                    kind: "id",
                    loc: [17, 25, 17, 28],
                    text: "all",
                    bindingKey: "all$2b1hzyqftxgza$3",
                  },
                },
                {
                  kind: "...",
                  loc: [17, 30, 17, 36],
                  expression: {
                    kind: "id",
                    loc: [17, 33, 17, 36],
                    text: "all",
                    bindingKey: "all$2b1hzyqftxgza$3",
                  },
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [18, 7, 18, 49],
            expression: {
              kind: "binop",
              loc: [18, 14, 18, 48],
              left: {
                kind: "binop",
                loc: [18, 14, 18, 33],
                left: {
                  kind: "()",
                  loc: [18, 14, 18, 27],
                  expression: {
                    kind: ".",
                    loc: [18, 14, 18, 22],
                    expression: {
                      kind: "id",
                      loc: [18, 14, 18, 17],
                      text: "all",
                      bindingKey: "all$2b1hzyqftxgza$3",
                    },
                    name: "join",
                  },
                  arguments: [
                    {
                      kind: "string",
                      loc: [18, 23, 18, 26],
                      text: ",",
                    },
                  ],
                },
                operatorToken: "+",
                right: {
                  kind: "string",
                  loc: [18, 30, 18, 33],
                  text: "|",
                },
              },
              operatorToken: "+",
              right: {
                kind: ".",
                loc: [18, 36, 18, 48],
                expression: {
                  kind: "id",
                  loc: [18, 36, 18, 41],
                  text: "twice",
                  bindingKey: "twice$2b1hzyqftxgza$4",
                },
                name: "length",
              },
            },
          },
        ],
      }),
    ),
  );
});
