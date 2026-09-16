import { cs } from "@backtickjs/core";
const answered = '{"rows":["one","two"],"count":2}';
// An assertion is the checker's alone. It is erased on the way to a bundle —
// the runtime here is the expression and nothing else — so a host reading one
// never learns an assertion was written.
//
// `JSON.parse` is why the language has one at all. It answers with
// `ClientValue`, the union of everything a client can hold, and a script that
// means to read `.rows` off what came back has no other way to say what it is
// looking at.
const typeAssertion = cs.create(
  [13, 23, 17, 3],
  {
    version: "0.0.0",
    filePath: "typeAssertion.tsx",
    fileHash: "1xgvxo9wnf21z",
    splices: { $answered: { value: answered, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [13, 26, 17, 2],
    statements: [
      {
        kind: "const",
        loc: [14, 3, 14, 75],
        name: {
          kind: "id",
          loc: [14, 9, 14, 13],
          text: "page",
          bindingKey: "page$1xgvxo9wnf21z$0",
        },
        initializer: {
          kind: "()",
          loc: [14, 16, 14, 37],
          expression: {
            kind: "bltn",
            loc: [14, 16, 14, 26],
            name: "JSON.parse",
          },
          arguments: [
            {
              kind: "splice",
              loc: [14, 27, 14, 36],
              key: "$answered",
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [16, 3, 16, 45],
        expression: {
          kind: "binop",
          loc: [16, 10, 16, 44],
          left: {
            kind: "binop",
            loc: [16, 10, 16, 31],
            left: {
              kind: "[]",
              loc: [16, 10, 16, 22],
              expression: {
                kind: ".",
                loc: [16, 10, 16, 19],
                expression: {
                  kind: "id",
                  loc: [16, 10, 16, 14],
                  text: "page",
                  bindingKey: "page$1xgvxo9wnf21z$0",
                },
                name: "rows",
              },
              argumentExpression: {
                kind: "number",
                loc: [16, 20, 16, 21],
                value: 0,
              },
            },
            operatorToken: "+",
            right: {
              kind: "string",
              loc: [16, 25, 16, 31],
              text: " of ",
            },
          },
          operatorToken: "+",
          right: {
            kind: ".",
            loc: [16, 34, 16, 44],
            expression: {
              kind: "id",
              loc: [16, 34, 16, 38],
              text: "page",
              bindingKey: "page$1xgvxo9wnf21z$0",
            },
            name: "count",
          },
        },
      },
    ],
  }),
);
