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
      "3ucocch4sr77y:14:4",
      { params: [] },
      () => ({
        type: "ArrowFunctionExpression",
        loc: { start: { line: 14, column: 7 }, end: { line: 18, column: 5 } },
        params: [
          {
            type: "Identifier",
            loc: {
              start: { line: 14, column: 8 },
              end: { line: 14, column: 13 },
            },
            name: "count",
            key: "count$3ucocch4sr77y$0",
          },
        ],
        body: {
          type: "BlockStatement",
          loc: {
            start: { line: 14, column: 26 },
            end: { line: 18, column: 5 },
          },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 15, column: 6 },
                end: { line: 15, column: 23 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 15, column: 12 },
                    end: { line: 15, column: 22 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 15, column: 12 },
                      end: { line: 15, column: 17 },
                    },
                    name: "floor",
                    key: "floor$3ucocch4sr77y$1",
                  },
                  init: {
                    type: "UnaryExpression",
                    loc: {
                      start: { line: 15, column: 20 },
                      end: { line: 15, column: 22 },
                    },
                    operator: "-",
                    prefix: true,
                    argument: {
                      type: "Literal",
                      loc: {
                        start: { line: 15, column: 21 },
                        end: { line: 15, column: 22 },
                      },
                      value: 1,
                    },
                  },
                },
              ],
            },
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 16, column: 6 },
                end: { line: 16, column: 26 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 16, column: 12 },
                    end: { line: 16, column: 25 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 16, column: 12 },
                      end: { line: 16, column: 16 },
                    },
                    name: "step",
                    key: "step$3ucocch4sr77y$2",
                  },
                  init: {
                    type: "UnaryExpression",
                    loc: {
                      start: { line: 16, column: 19 },
                      end: { line: 16, column: 25 },
                    },
                    operator: "-",
                    prefix: true,
                    argument: {
                      type: "Identifier",
                      loc: {
                        start: { line: 16, column: 20 },
                        end: { line: 16, column: 25 },
                      },
                      name: "count",
                      key: "count$3ucocch4sr77y$0",
                    },
                  },
                },
              ],
            },
            {
              type: "ReturnStatement",
              loc: {
                start: { line: 17, column: 6 },
                end: { line: 17, column: 31 },
              },
              argument: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 17, column: 13 },
                  end: { line: 17, column: 30 },
                },
                operator: "+",
                left: {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 17, column: 13 },
                    end: { line: 17, column: 25 },
                  },
                  operator: "+",
                  left: {
                    type: "Identifier",
                    loc: {
                      start: { line: 17, column: 13 },
                      end: { line: 17, column: 18 },
                    },
                    name: "floor",
                    key: "floor$3ucocch4sr77y$1",
                  },
                  right: {
                    type: "Identifier",
                    loc: {
                      start: { line: 17, column: 21 },
                      end: { line: 17, column: 25 },
                    },
                    name: "step",
                    key: "step$3ucocch4sr77y$2",
                  },
                },
                right: {
                  type: "UnaryExpression",
                  loc: {
                    start: { line: 17, column: 28 },
                    end: { line: 17, column: 30 },
                  },
                  operator: "-",
                  prefix: true,
                  argument: {
                    type: "Literal",
                    loc: {
                      start: { line: 17, column: 29 },
                      end: { line: 17, column: 30 },
                    },
                    value: 2,
                  },
                },
              },
            },
          ],
        },
        expression: false,
      }),
      "() => (count) => {\n    const floor = -1;\n    const step = -count;\n    return floor + step + -2;\n}",
      '{"version":3,"file":"negation.test.jsx","sourceRoot":"","sources":["negation.test.tsx"],"names":[],"mappings":"AAaO,MAAA,CAAC,KAAa,EAAE,EAAE;IACnB,MAAM,KAAK,GAAG,CAAC,CAAC,CAAC;IACjB,MAAM,IAAI,GAAG,CAAC,KAAK,CAAC;IACpB,OAAO,KAAK,GAAG,IAAI,GAAG,CAAC,CAAC,CAAC;AAC3B,CAAC,CAAA"}',
    ),
  );
});
// `-0` stays a negation on the wire: JSON writes the number `-0` as `0`.
it("negativeZero", async (t) => {
  await snapshotCase(
    t,
    "negativeZero",
    cs.create(
      "3ucocch4sr77y:27:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 27, column: 7 }, end: { line: 29, column: 5 } },
        body: [
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 28, column: 6 },
              end: { line: 28, column: 20 },
            },
            argument: {
              type: "BinaryExpression",
              loc: {
                start: { line: 28, column: 13 },
                end: { line: 28, column: 19 },
              },
              operator: "/",
              left: {
                type: "Literal",
                loc: {
                  start: { line: 28, column: 13 },
                  end: { line: 28, column: 14 },
                },
                value: 1,
              },
              right: {
                type: "UnaryExpression",
                loc: {
                  start: { line: 28, column: 17 },
                  end: { line: 28, column: 19 },
                },
                operator: "-",
                prefix: true,
                argument: {
                  type: "Literal",
                  loc: {
                    start: { line: 28, column: 18 },
                    end: { line: 28, column: 19 },
                  },
                  value: 0,
                },
              },
            },
          },
        ],
      }),
      "() => {\n    return 1 / -0;\n}",
      '{"version":3,"file":"negation.test.jsx","sourceRoot":"","sources":["negation.test.tsx"],"names":[],"mappings":"AA0BO;IACD,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC;AAChB,CAAC,CAAA"}',
    ),
  );
});
