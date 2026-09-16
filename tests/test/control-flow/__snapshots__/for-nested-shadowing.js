import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Nested headers reusing a name, and a body that shadows the header's own:
// the update still means the header's binding, because names resolve to their
// binding before anything is lowered.
it("forNestedShadowing", async (t) => {
  await snapshotCase(
    t,
    "forNestedShadowing",
    cs.create(
      [12, 5, 21, 7],
      {
        version: "0.0.0",
        filePath: "control-flow/for-nested-shadowing.test.tsx",
        fileHash: "lj6vk8127ex6",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [12, 8, 21, 6],
        statements: [
          {
            kind: "let",
            loc: [13, 7, 13, 20],
            name: {
              kind: "id",
              loc: [13, 11, 13, 14],
              text: "out",
              bindingKey: "out$lj6vk8127ex6$0",
            },
            initializer: {
              kind: "string",
              loc: [13, 17, 13, 19],
              text: "",
            },
          },
          {
            kind: "for",
            loc: [14, 7, 19, 8],
            initializer: {
              kind: "let",
              loc: [14, 12, 14, 21],
              name: {
                kind: "id",
                loc: [14, 16, 14, 17],
                text: "i",
                bindingKey: "i$lj6vk8127ex6$1",
              },
              initializer: {
                kind: "number",
                loc: [14, 20, 14, 21],
                value: 0,
              },
            },
            condition: {
              kind: "binop",
              loc: [14, 23, 14, 28],
              left: {
                kind: "id",
                loc: [14, 23, 14, 24],
                text: "i",
                bindingKey: "i$lj6vk8127ex6$1",
              },
              operatorToken: "<",
              right: {
                kind: "number",
                loc: [14, 27, 14, 28],
                value: 2,
              },
            },
            incrementor: {
              kind: "binop",
              loc: [14, 30, 14, 39],
              left: {
                kind: "id",
                loc: [14, 30, 14, 31],
                text: "i",
                bindingKey: "i$lj6vk8127ex6$1",
              },
              operatorToken: "=",
              right: {
                kind: "binop",
                loc: [14, 34, 14, 39],
                left: {
                  kind: "id",
                  loc: [14, 34, 14, 35],
                  text: "i",
                  bindingKey: "i$lj6vk8127ex6$1",
                },
                operatorToken: "+",
                right: {
                  kind: "number",
                  loc: [14, 38, 14, 39],
                  value: 1,
                },
              },
            },
            statement: {
              kind: "{}",
              loc: [14, 41, 19, 8],
              statements: [
                {
                  kind: "const",
                  loc: [15, 9, 15, 23],
                  name: {
                    kind: "id",
                    loc: [15, 15, 15, 16],
                    text: "i",
                    bindingKey: "i$lj6vk8127ex6$2",
                  },
                  initializer: {
                    kind: "string",
                    loc: [15, 19, 15, 22],
                    text: "-",
                  },
                },
                {
                  kind: "for",
                  loc: [16, 9, 18, 10],
                  initializer: {
                    kind: "let",
                    loc: [16, 14, 16, 23],
                    name: {
                      kind: "id",
                      loc: [16, 18, 16, 19],
                      text: "j",
                      bindingKey: "j$lj6vk8127ex6$3",
                    },
                    initializer: {
                      kind: "number",
                      loc: [16, 22, 16, 23],
                      value: 0,
                    },
                  },
                  condition: {
                    kind: "binop",
                    loc: [16, 25, 16, 30],
                    left: {
                      kind: "id",
                      loc: [16, 25, 16, 26],
                      text: "j",
                      bindingKey: "j$lj6vk8127ex6$3",
                    },
                    operatorToken: "<",
                    right: {
                      kind: "number",
                      loc: [16, 29, 16, 30],
                      value: 2,
                    },
                  },
                  incrementor: {
                    kind: "binop",
                    loc: [16, 32, 16, 41],
                    left: {
                      kind: "id",
                      loc: [16, 32, 16, 33],
                      text: "j",
                      bindingKey: "j$lj6vk8127ex6$3",
                    },
                    operatorToken: "=",
                    right: {
                      kind: "binop",
                      loc: [16, 36, 16, 41],
                      left: {
                        kind: "id",
                        loc: [16, 36, 16, 37],
                        text: "j",
                        bindingKey: "j$lj6vk8127ex6$3",
                      },
                      operatorToken: "+",
                      right: {
                        kind: "number",
                        loc: [16, 40, 16, 41],
                        value: 1,
                      },
                    },
                  },
                  statement: {
                    kind: "{}",
                    loc: [16, 43, 18, 10],
                    statements: [
                      {
                        kind: "binop",
                        loc: [17, 11, 17, 28],
                        left: {
                          kind: "id",
                          loc: [17, 11, 17, 14],
                          text: "out",
                          bindingKey: "out$lj6vk8127ex6$0",
                        },
                        operatorToken: "=",
                        right: {
                          kind: "binop",
                          loc: [17, 17, 17, 28],
                          left: {
                            kind: "binop",
                            loc: [17, 17, 17, 24],
                            left: {
                              kind: "id",
                              loc: [17, 17, 17, 20],
                              text: "out",
                              bindingKey: "out$lj6vk8127ex6$0",
                            },
                            operatorToken: "+",
                            right: {
                              kind: "id",
                              loc: [17, 23, 17, 24],
                              text: "i",
                              bindingKey: "i$lj6vk8127ex6$2",
                            },
                          },
                          operatorToken: "+",
                          right: {
                            kind: "id",
                            loc: [17, 27, 17, 28],
                            text: "j",
                            bindingKey: "j$lj6vk8127ex6$3",
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [20, 7, 20, 18],
            expression: {
              kind: "id",
              loc: [20, 14, 20, 17],
              text: "out",
              bindingKey: "out$lj6vk8127ex6$0",
            },
          },
        ],
      }),
    ),
  );
});
