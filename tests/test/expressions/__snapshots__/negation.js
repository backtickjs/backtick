import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A negative literal is written as one, and reaches the wire as one: `-1` is
// a prefix operator on `1` in TypeScript's AST and in this one, and a number
// on the wire, where every literal carries itself.
//
// Negating something computed is the same operator with nothing to fold.
it("negation", async (t) => {
  await snapshotCase(
    t,
    "negation",
    cs.create(
      [14, 5, 18, 7],
      {
        version: "0.0.0",
        filePath: "expressions/negation.test.tsx",
        fileHash: "31nhc0aoqh9gi",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "=>",
        loc: [14, 8, 18, 6],
        parameters: [
          {
            kind: "param",
            loc: [14, 9, 14, 22],
            name: {
              kind: "id",
              loc: [14, 9, 14, 14],
              text: "count",
              bindingKey: "count$31nhc0aoqh9gi$0",
            },
          },
        ],
        body: {
          kind: "{}",
          loc: [14, 27, 18, 6],
          statements: [
            {
              kind: "const",
              loc: [15, 7, 15, 24],
              name: {
                kind: "id",
                loc: [15, 13, 15, 18],
                text: "floor",
                bindingKey: "floor$31nhc0aoqh9gi$1",
              },
              initializer: {
                kind: "unop",
                loc: [15, 21, 15, 23],
                operator: "-",
                operand: {
                  kind: "number",
                  loc: [15, 22, 15, 23],
                  value: 1,
                },
              },
            },
            {
              kind: "const",
              loc: [16, 7, 16, 27],
              name: {
                kind: "id",
                loc: [16, 13, 16, 17],
                text: "step",
                bindingKey: "step$31nhc0aoqh9gi$2",
              },
              initializer: {
                kind: "unop",
                loc: [16, 20, 16, 26],
                operator: "-",
                operand: {
                  kind: "id",
                  loc: [16, 21, 16, 26],
                  text: "count",
                  bindingKey: "count$31nhc0aoqh9gi$0",
                },
              },
            },
            {
              kind: "return",
              loc: [17, 7, 17, 32],
              expression: {
                kind: "binop",
                loc: [17, 14, 17, 31],
                left: {
                  kind: "binop",
                  loc: [17, 14, 17, 26],
                  left: {
                    kind: "id",
                    loc: [17, 14, 17, 19],
                    text: "floor",
                    bindingKey: "floor$31nhc0aoqh9gi$1",
                  },
                  operatorToken: "+",
                  right: {
                    kind: "id",
                    loc: [17, 22, 17, 26],
                    text: "step",
                    bindingKey: "step$31nhc0aoqh9gi$2",
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "unop",
                  loc: [17, 29, 17, 31],
                  operator: "-",
                  operand: {
                    kind: "number",
                    loc: [17, 30, 17, 31],
                    value: 2,
                  },
                },
              },
            },
          ],
        },
      }),
    ),
  );
});
// `-0` stays a negation on the wire: JSON writes the number `-0` as `0`.
it("negativeZero", async (t) => {
  await snapshotCase(
    t,
    "negativeZero",
    cs.create(
      [24, 41, 26, 5],
      {
        version: "0.0.0",
        filePath: "expressions/negation.test.tsx",
        fileHash: "31nhc0aoqh9gi",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [24, 44, 26, 4],
        statements: [
          {
            kind: "return",
            loc: [25, 5, 25, 19],
            expression: {
              kind: "binop",
              loc: [25, 12, 25, 18],
              left: {
                kind: "number",
                loc: [25, 12, 25, 13],
                value: 1,
              },
              operatorToken: "/",
              right: {
                kind: "unop",
                loc: [25, 16, 25, 18],
                operator: "-",
                operand: {
                  kind: "number",
                  loc: [25, 17, 25, 18],
                  value: 0,
                },
              },
            },
          },
        ],
      }),
    ),
  );
});
