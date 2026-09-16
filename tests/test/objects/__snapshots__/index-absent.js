import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A key an object hasn't got reads as the language's one absent value. A
// record's member reads as `string | null` — a record says nothing about which
// keys it has — so this one is answered rather than assumed.
const answers = { here: "yes" };
it("indexAbsent", async (t) => {
  await snapshotCase(
    t,
    "indexAbsent",
    cs.create(
      [14, 5, 18, 7],
      {
        version: "0.0.0",
        filePath: "objects/index-absent.test.tsx",
        fileHash: "26sqkhggd8j15",
        splices: { $answers: { value: answers, params: [] } },
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [14, 8, 18, 6],
        statements: [
          {
            kind: "const",
            loc: [15, 7, 15, 37],
            name: {
              kind: "id",
              loc: [15, 13, 15, 18],
              text: "names",
              bindingKey: "names$26sqkhggd8j15$0",
            },
            initializer: {
              kind: "arr",
              loc: [15, 21, 15, 36],
              elements: [
                {
                  kind: "string",
                  loc: [15, 22, 15, 28],
                  text: "zero",
                },
                {
                  kind: "string",
                  loc: [15, 30, 15, 35],
                  text: "one",
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [16, 7, 16, 53],
            name: {
              kind: "id",
              loc: [16, 13, 16, 20],
              text: "missing",
              bindingKey: "missing$26sqkhggd8j15$1",
            },
            initializer: {
              kind: "binop",
              loc: [16, 23, 16, 52],
              left: {
                kind: "[]",
                loc: [16, 23, 16, 42],
                expression: {
                  kind: "splice",
                  loc: [16, 23, 16, 31],
                  key: "$answers",
                },
                argumentExpression: {
                  kind: "string",
                  loc: [16, 32, 16, 41],
                  text: "nowhere",
                },
              },
              operatorToken: "??",
              right: {
                kind: "string",
                loc: [16, 46, 16, 52],
                text: "gone",
              },
            },
          },
          {
            kind: "return",
            loc: [17, 7, 17, 39],
            expression: {
              kind: "binop",
              loc: [17, 14, 17, 38],
              left: {
                kind: "binop",
                loc: [17, 14, 17, 28],
                left: {
                  kind: "[]",
                  loc: [17, 14, 17, 22],
                  expression: {
                    kind: "id",
                    loc: [17, 14, 17, 19],
                    text: "names",
                    bindingKey: "names$26sqkhggd8j15$0",
                  },
                  argumentExpression: {
                    kind: "number",
                    loc: [17, 20, 17, 21],
                    value: 1,
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "string",
                  loc: [17, 25, 17, 28],
                  text: "/",
                },
              },
              operatorToken: "+",
              right: {
                kind: "id",
                loc: [17, 31, 17, 38],
                text: "missing",
                bindingKey: "missing$26sqkhggd8j15$1",
              },
            },
          },
        ],
      }),
    ),
  );
});
