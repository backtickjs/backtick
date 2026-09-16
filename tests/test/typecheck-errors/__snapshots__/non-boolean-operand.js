import { cs } from "@backtickjs/core";
// `&&`/`||` operate on booleans and always yield one: the guard and default
// idioms that lean on truthiness (`count && flag`, `value || fallback`) are
// type errors on each non-boolean operand. Defaulting is `??`.
export default cs.create(
  [6, 16, 9, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/non-boolean-operand.test.tsx",
    fileHash: "31w10vl5tonbf",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [6, 19, 9, 2],
    parameters: [
      {
        kind: "param",
        loc: [6, 20, 6, 33],
        name: {
          kind: "id",
          loc: [6, 20, 6, 25],
          text: "count",
          bindingKey: "count$31w10vl5tonbf$0",
        },
      },
      {
        kind: "param",
        loc: [6, 35, 6, 48],
        name: {
          kind: "id",
          loc: [6, 35, 6, 39],
          text: "flag",
          bindingKey: "flag$31w10vl5tonbf$1",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [6, 53, 9, 2],
      statements: [
        {
          kind: "return",
          loc: [8, 3, 8, 36],
          expression: {
            kind: "binop",
            loc: [8, 10, 8, 35],
            left: {
              kind: "binop",
              loc: [8, 11, 8, 24],
              left: {
                kind: "id",
                loc: [8, 11, 8, 16],
                text: "count",
                bindingKey: "count$31w10vl5tonbf$0",
              },
              operatorToken: "&&",
              right: {
                kind: "id",
                loc: [8, 20, 8, 24],
                text: "flag",
                bindingKey: "flag$31w10vl5tonbf$1",
              },
            },
            operatorToken: "||",
            right: {
              kind: "string",
              loc: [8, 29, 8, 35],
              text: "none",
            },
          },
        },
      ],
    },
  }),
);
