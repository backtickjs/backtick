import { cs } from "@backtickjs/core";
// A builtin is a value, not only a callee. The compiler folds `Math.floor` into
// one whole name the client answers — there is no `Math` for a read to yield —
// and that name stands wherever a value does: bound to a variable, and handed
// to something that calls it.
//
// `math.ts` reads `Math.PI` as a value too, but a constant is the easy half of
// this. What a builtin *function* is read as has to arrive callable.
export default cs.create(
  [10, 16, 14, 3],
  {
    version: "0.0.0",
    filePath: "builtin-as-value.ts",
    fileHash: "326ky9he8cldj",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [10, 19, 14, 2],
    statements: [
      {
        kind: "const",
        loc: [11, 3, 11, 28],
        name: {
          kind: "id",
          loc: [11, 9, 11, 14],
          text: "floor",
          bindingKey: "floor$326ky9he8cldj$0",
        },
        initializer: {
          kind: "bltn",
          loc: [11, 17, 11, 27],
          name: "Math.floor",
        },
      },
      {
        kind: "const",
        loc: [12, 3, 12, 63],
        name: {
          kind: "id",
          loc: [12, 9, 12, 14],
          text: "apply",
          bindingKey: "apply$326ky9he8cldj$1",
        },
        initializer: {
          kind: "=>",
          loc: [12, 17, 12, 62],
          parameters: [
            {
              kind: "param",
              loc: [12, 18, 12, 42],
              name: {
                kind: "id",
                loc: [12, 18, 12, 19],
                text: "f",
                bindingKey: "f$326ky9he8cldj$2",
              },
            },
            {
              kind: "param",
              loc: [12, 44, 12, 53],
              name: {
                kind: "id",
                loc: [12, 44, 12, 45],
                text: "n",
                bindingKey: "n$326ky9he8cldj$3",
              },
            },
          ],
          body: {
            kind: "()",
            loc: [12, 58, 12, 62],
            expression: {
              kind: "id",
              loc: [12, 58, 12, 59],
              text: "f",
              bindingKey: "f$326ky9he8cldj$2",
            },
            arguments: [
              {
                kind: "id",
                loc: [12, 60, 12, 61],
                text: "n",
                bindingKey: "n$326ky9he8cldj$3",
              },
            ],
          },
        },
      },
      {
        kind: "return",
        loc: [13, 3, 13, 45],
        expression: {
          kind: "binop",
          loc: [13, 10, 13, 44],
          left: {
            kind: "()",
            loc: [13, 10, 13, 20],
            expression: {
              kind: "id",
              loc: [13, 10, 13, 15],
              text: "floor",
              bindingKey: "floor$326ky9he8cldj$0",
            },
            arguments: [
              {
                kind: "number",
                loc: [13, 16, 13, 19],
                value: 3.5,
              },
            ],
          },
          operatorToken: "+",
          right: {
            kind: "()",
            loc: [13, 23, 13, 44],
            expression: {
              kind: "id",
              loc: [13, 23, 13, 28],
              text: "apply",
              bindingKey: "apply$326ky9he8cldj$1",
            },
            arguments: [
              {
                kind: "bltn",
                loc: [13, 29, 13, 38],
                name: "Math.ceil",
              },
              {
                kind: "number",
                loc: [13, 40, 13, 43],
                value: 3.5,
              },
            ],
          },
        },
      },
    ],
  }),
);
