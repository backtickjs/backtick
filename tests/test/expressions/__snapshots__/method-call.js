import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("methodCall", async (t) => {
  await snapshotCase(
    t,
    "methodCall",
    cs.create(
      [9, 5, 12, 7],
      {
        version: "0.0.0",
        filePath: "expressions/method-call.test.tsx",
        fileHash: "163oncfaq7kkj",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [9, 8, 12, 6],
        statements: [
          {
            kind: "const",
            loc: [10, 7, 10, 32],
            name: {
              kind: "id",
              loc: [10, 13, 10, 21],
              text: "greeting",
              bindingKey: "greeting$163oncfaq7kkj$0",
            },
            initializer: {
              kind: "string",
              loc: [10, 24, 10, 31],
              text: "Hello",
            },
          },
          {
            kind: "return",
            loc: [11, 7, 11, 59],
            expression: {
              kind: "()",
              loc: [11, 14, 11, 58],
              expression: {
                kind: ".",
                loc: [11, 14, 11, 56],
                expression: {
                  kind: "()",
                  loc: [11, 14, 11, 44],
                  expression: {
                    kind: ".",
                    loc: [11, 14, 11, 29],
                    expression: {
                      kind: "id",
                      loc: [11, 14, 11, 22],
                      text: "greeting",
                      bindingKey: "greeting$163oncfaq7kkj$0",
                    },
                    name: "concat",
                  },
                  arguments: [
                    {
                      kind: "string",
                      loc: [11, 30, 11, 34],
                      text: ", ",
                    },
                    {
                      kind: "string",
                      loc: [11, 36, 11, 43],
                      text: "World",
                    },
                  ],
                },
                name: "toUpperCase",
              },
              arguments: [],
            },
          },
        ],
      }),
    ),
  );
});
