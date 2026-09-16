import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `i++` is not an operator in a client script, so the update is an
// assignment.
it("forLoop", async (t) => {
  await snapshotCase(
    t,
    "forLoop",
    cs.create(
      [11, 5, 17, 7],
      {
        version: "0.0.0",
        filePath: "control-flow/for-loop.test.tsx",
        fileHash: "1z8sn9rs7fbwb",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [11, 8, 17, 6],
        statements: [
          {
            kind: "let",
            loc: [12, 7, 12, 21],
            name: {
              kind: "id",
              loc: [12, 11, 12, 16],
              text: "total",
              bindingKey: "total$1z8sn9rs7fbwb$0",
            },
            initializer: {
              kind: "number",
              loc: [12, 19, 12, 20],
              value: 0,
            },
          },
          {
            kind: "for",
            loc: [13, 7, 15, 8],
            initializer: {
              kind: "let",
              loc: [13, 12, 13, 21],
              name: {
                kind: "id",
                loc: [13, 16, 13, 17],
                text: "i",
                bindingKey: "i$1z8sn9rs7fbwb$1",
              },
              initializer: {
                kind: "number",
                loc: [13, 20, 13, 21],
                value: 0,
              },
            },
            condition: {
              kind: "binop",
              loc: [13, 23, 13, 28],
              left: {
                kind: "id",
                loc: [13, 23, 13, 24],
                text: "i",
                bindingKey: "i$1z8sn9rs7fbwb$1",
              },
              operatorToken: "<",
              right: {
                kind: "number",
                loc: [13, 27, 13, 28],
                value: 5,
              },
            },
            incrementor: {
              kind: "binop",
              loc: [13, 30, 13, 39],
              left: {
                kind: "id",
                loc: [13, 30, 13, 31],
                text: "i",
                bindingKey: "i$1z8sn9rs7fbwb$1",
              },
              operatorToken: "=",
              right: {
                kind: "binop",
                loc: [13, 34, 13, 39],
                left: {
                  kind: "id",
                  loc: [13, 34, 13, 35],
                  text: "i",
                  bindingKey: "i$1z8sn9rs7fbwb$1",
                },
                operatorToken: "+",
                right: {
                  kind: "number",
                  loc: [13, 38, 13, 39],
                  value: 1,
                },
              },
            },
            statement: {
              kind: "{}",
              loc: [13, 41, 15, 8],
              statements: [
                {
                  kind: "binop",
                  loc: [14, 9, 14, 26],
                  left: {
                    kind: "id",
                    loc: [14, 9, 14, 14],
                    text: "total",
                    bindingKey: "total$1z8sn9rs7fbwb$0",
                  },
                  operatorToken: "=",
                  right: {
                    kind: "binop",
                    loc: [14, 17, 14, 26],
                    left: {
                      kind: "id",
                      loc: [14, 17, 14, 22],
                      text: "total",
                      bindingKey: "total$1z8sn9rs7fbwb$0",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "id",
                      loc: [14, 25, 14, 26],
                      text: "i",
                      bindingKey: "i$1z8sn9rs7fbwb$1",
                    },
                  },
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [16, 7, 16, 20],
            expression: {
              kind: "id",
              loc: [16, 14, 16, 19],
              text: "total",
              bindingKey: "total$1z8sn9rs7fbwb$0",
            },
          },
        ],
      }),
    ),
  );
});
