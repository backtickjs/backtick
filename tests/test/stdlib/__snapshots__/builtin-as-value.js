import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A builtin is a value, not only a callee. The compiler folds `Math.floor`
// into one whole name the client answers — there is no `Math` for a read to
// yield — and that name stands wherever a value does: bound to a variable,
// and handed to something that calls it.
//
// The `math` case reads `Math.PI` as a value too, but a constant is the easy
// half of this. What a builtin *function* is read as has to arrive callable.
it("builtinAsValue", async (t) => {
  await snapshotCase(
    t,
    "builtinAsValue",
    cs.create(
      [16, 5, 20, 7],
      {
        version: "0.0.0",
        filePath: "stdlib/builtin-as-value.test.tsx",
        fileHash: "1n7k5w76rpsyr",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [16, 8, 20, 6],
        statements: [
          {
            kind: "const",
            loc: [17, 7, 17, 32],
            name: {
              kind: "id",
              loc: [17, 13, 17, 18],
              text: "floor",
              bindingKey: "floor$1n7k5w76rpsyr$0",
            },
            initializer: {
              kind: ".",
              loc: [17, 21, 17, 31],
              expression: {
                kind: "bltn",
                loc: [17, 21, 17, 25],
                name: "Math",
              },
              name: "floor",
            },
          },
          {
            kind: "const",
            loc: [18, 7, 18, 67],
            name: {
              kind: "id",
              loc: [18, 13, 18, 18],
              text: "apply",
              bindingKey: "apply$1n7k5w76rpsyr$1",
            },
            initializer: {
              kind: "=>",
              loc: [18, 21, 18, 66],
              parameters: [
                {
                  kind: "param",
                  loc: [18, 22, 18, 46],
                  name: {
                    kind: "id",
                    loc: [18, 22, 18, 23],
                    text: "f",
                    bindingKey: "f$1n7k5w76rpsyr$2",
                  },
                },
                {
                  kind: "param",
                  loc: [18, 48, 18, 57],
                  name: {
                    kind: "id",
                    loc: [18, 48, 18, 49],
                    text: "n",
                    bindingKey: "n$1n7k5w76rpsyr$3",
                  },
                },
              ],
              body: {
                kind: "()",
                loc: [18, 62, 18, 66],
                expression: {
                  kind: "id",
                  loc: [18, 62, 18, 63],
                  text: "f",
                  bindingKey: "f$1n7k5w76rpsyr$2",
                },
                arguments: [
                  {
                    kind: "id",
                    loc: [18, 64, 18, 65],
                    text: "n",
                    bindingKey: "n$1n7k5w76rpsyr$3",
                  },
                ],
              },
            },
          },
          {
            kind: "return",
            loc: [19, 7, 19, 49],
            expression: {
              kind: "binop",
              loc: [19, 14, 19, 48],
              left: {
                kind: "()",
                loc: [19, 14, 19, 24],
                expression: {
                  kind: "id",
                  loc: [19, 14, 19, 19],
                  text: "floor",
                  bindingKey: "floor$1n7k5w76rpsyr$0",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [19, 20, 19, 23],
                    value: 3.5,
                  },
                ],
              },
              operatorToken: "+",
              right: {
                kind: "()",
                loc: [19, 27, 19, 48],
                expression: {
                  kind: "id",
                  loc: [19, 27, 19, 32],
                  text: "apply",
                  bindingKey: "apply$1n7k5w76rpsyr$1",
                },
                arguments: [
                  {
                    kind: ".",
                    loc: [19, 33, 19, 42],
                    expression: {
                      kind: "bltn",
                      loc: [19, 33, 19, 37],
                      name: "Math",
                    },
                    name: "ceil",
                  },
                  {
                    kind: "number",
                    loc: [19, 44, 19, 47],
                    value: 3.5,
                  },
                ],
              },
            },
          },
        ],
      }),
    ),
  );
});
