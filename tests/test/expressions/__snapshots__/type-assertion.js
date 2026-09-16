import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const answered = '{"rows":["one","two"],"count":2}';
// An assertion is the checker's alone. It is erased on the way to a bundle —
// the runtime here is the expression and nothing else — so a host reading one
// never learns an assertion was written.
//
// `JSON.parse` is why the language has one at all. It answers with
// `ClientValue`, the union of everything a client can hold, and a script that
// means to read `.rows` off what came back has no other way to say what it is
// looking at.
it("typeAssertion", async (t) => {
  await snapshotCase(
    t,
    "typeAssertion",
    cs.create(
      [19, 5, 23, 7],
      {
        version: "0.0.0",
        filePath: "expressions/type-assertion.test.tsx",
        fileHash: "3amzui83z49rq",
        splices: { $answered: { value: answered, params: [] } },
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [19, 8, 23, 6],
        statements: [
          {
            kind: "const",
            loc: [20, 7, 20, 79],
            name: {
              kind: "id",
              loc: [20, 13, 20, 17],
              text: "page",
              bindingKey: "page$3amzui83z49rq$0",
            },
            initializer: {
              kind: "()",
              loc: [20, 20, 20, 41],
              expression: {
                kind: "bltn",
                loc: [20, 20, 20, 30],
                name: "JSON.parse",
              },
              arguments: [
                {
                  kind: "splice",
                  loc: [20, 31, 20, 40],
                  key: "$answered",
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [22, 7, 22, 49],
            expression: {
              kind: "binop",
              loc: [22, 14, 22, 48],
              left: {
                kind: "binop",
                loc: [22, 14, 22, 35],
                left: {
                  kind: "[]",
                  loc: [22, 14, 22, 26],
                  expression: {
                    kind: ".",
                    loc: [22, 14, 22, 23],
                    expression: {
                      kind: "id",
                      loc: [22, 14, 22, 18],
                      text: "page",
                      bindingKey: "page$3amzui83z49rq$0",
                    },
                    name: "rows",
                  },
                  argumentExpression: {
                    kind: "number",
                    loc: [22, 24, 22, 25],
                    value: 0,
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "string",
                  loc: [22, 29, 22, 35],
                  text: " of ",
                },
              },
              operatorToken: "+",
              right: {
                kind: ".",
                loc: [22, 38, 22, 48],
                expression: {
                  kind: "id",
                  loc: [22, 38, 22, 42],
                  text: "page",
                  bindingKey: "page$3amzui83z49rq$0",
                },
                name: "count",
              },
            },
          },
        ],
      }),
    ),
  );
});
