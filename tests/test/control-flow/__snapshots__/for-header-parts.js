import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Every part of the header is optional: this one declares nothing and updates
// nothing, leaving both to the block around it and the body.
it("forHeaderParts", async (t) => {
  await snapshotCase(
    t,
    "forHeaderParts",
    cs.create(
      [11, 5, 19, 7],
      {
        version: "0.0.0",
        filePath: "control-flow/for-header-parts.test.tsx",
        fileHash: "2espgmzktnj99",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [11, 8, 19, 6],
        statements: [
          {
            kind: "let",
            loc: [12, 7, 12, 17],
            name: {
              kind: "id",
              loc: [12, 11, 12, 12],
              text: "i",
              bindingKey: "i$2espgmzktnj99$0",
            },
            initializer: {
              kind: "number",
              loc: [12, 15, 12, 16],
              value: 0,
            },
          },
          {
            kind: "let",
            loc: [13, 7, 13, 21],
            name: {
              kind: "id",
              loc: [13, 11, 13, 15],
              text: "seen",
              bindingKey: "seen$2espgmzktnj99$1",
            },
            initializer: {
              kind: "string",
              loc: [13, 18, 13, 20],
              text: "",
            },
          },
          {
            kind: "for",
            loc: [14, 7, 17, 8],
            initializer: null,
            condition: {
              kind: "binop",
              loc: [14, 14, 14, 19],
              left: {
                kind: "id",
                loc: [14, 14, 14, 15],
                text: "i",
                bindingKey: "i$2espgmzktnj99$0",
              },
              operatorToken: "<",
              right: {
                kind: "number",
                loc: [14, 18, 14, 19],
                value: 3,
              },
            },
            incrementor: null,
            statement: {
              kind: "{}",
              loc: [14, 23, 17, 8],
              statements: [
                {
                  kind: "binop",
                  loc: [15, 9, 15, 24],
                  left: {
                    kind: "id",
                    loc: [15, 9, 15, 13],
                    text: "seen",
                    bindingKey: "seen$2espgmzktnj99$1",
                  },
                  operatorToken: "=",
                  right: {
                    kind: "binop",
                    loc: [15, 16, 15, 24],
                    left: {
                      kind: "id",
                      loc: [15, 16, 15, 20],
                      text: "seen",
                      bindingKey: "seen$2espgmzktnj99$1",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "id",
                      loc: [15, 23, 15, 24],
                      text: "i",
                      bindingKey: "i$2espgmzktnj99$0",
                    },
                  },
                },
                {
                  kind: "binop",
                  loc: [16, 9, 16, 18],
                  left: {
                    kind: "id",
                    loc: [16, 9, 16, 10],
                    text: "i",
                    bindingKey: "i$2espgmzktnj99$0",
                  },
                  operatorToken: "=",
                  right: {
                    kind: "binop",
                    loc: [16, 13, 16, 18],
                    left: {
                      kind: "id",
                      loc: [16, 13, 16, 14],
                      text: "i",
                      bindingKey: "i$2espgmzktnj99$0",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "number",
                      loc: [16, 17, 16, 18],
                      value: 1,
                    },
                  },
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [18, 7, 18, 19],
            expression: {
              kind: "id",
              loc: [18, 14, 18, 18],
              text: "seen",
              bindingKey: "seen$2espgmzktnj99$1",
            },
          },
        ],
      }),
    ),
  );
});
