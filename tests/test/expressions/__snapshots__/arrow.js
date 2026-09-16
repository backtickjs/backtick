import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("arrow", async (t) => {
  await snapshotCase(
    t,
    "arrow",
    cs.create(
      [9, 5, 12, 7],
      {
        version: "0.0.0",
        filePath: "expressions/arrow.test.tsx",
        fileHash: "1qw9q1toh3rnd",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [9, 8, 12, 6],
        statements: [
          {
            kind: "const",
            loc: [10, 7, 10, 23],
            name: {
              kind: "id",
              loc: [10, 13, 10, 17],
              text: "base",
              bindingKey: "base$1qw9q1toh3rnd$0",
            },
            initializer: {
              kind: "number",
              loc: [10, 20, 10, 22],
              value: 10,
            },
          },
          {
            kind: "return",
            loc: [11, 7, 11, 61],
            expression: {
              kind: "=>",
              loc: [11, 14, 11, 60],
              parameters: [
                {
                  kind: "param",
                  loc: [11, 15, 11, 26],
                  name: {
                    kind: "id",
                    loc: [11, 15, 11, 18],
                    text: "one",
                    bindingKey: "one$1qw9q1toh3rnd$1",
                  },
                },
                {
                  kind: "param",
                  loc: [11, 28, 11, 39],
                  name: {
                    kind: "id",
                    loc: [11, 28, 11, 31],
                    text: "two",
                    bindingKey: "two$1qw9q1toh3rnd$2",
                  },
                },
              ],
              body: {
                kind: "binop",
                loc: [11, 44, 11, 60],
                left: {
                  kind: "binop",
                  loc: [11, 44, 11, 53],
                  left: {
                    kind: "id",
                    loc: [11, 44, 11, 47],
                    text: "one",
                    bindingKey: "one$1qw9q1toh3rnd$1",
                  },
                  operatorToken: "+",
                  right: {
                    kind: "id",
                    loc: [11, 50, 11, 53],
                    text: "two",
                    bindingKey: "two$1qw9q1toh3rnd$2",
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "id",
                  loc: [11, 56, 11, 60],
                  text: "base",
                  bindingKey: "base$1qw9q1toh3rnd$0",
                },
              },
            },
          },
        ],
      }),
    ),
  );
});
