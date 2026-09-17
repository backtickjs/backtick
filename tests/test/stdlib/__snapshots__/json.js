import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Text in, value out, and back again. What round-trips is the format's to say
// — so what is here is what every host spells the same way, and a value a
// host could not hand back is not a value this admits.
it("jsonRoundTrip", async (t) => {
  await snapshotCase(
    t,
    "jsonRoundTrip",
    cs.create(
      [12, 5, 31, 7],
      {
        version: "0.0.0",
        filePath: "stdlib/json.test.tsx",
        fileHash: "1nb9j9gha9a2e",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [12, 8, 31, 6],
        statements: [
          {
            kind: "const",
            loc: [13, 7, 13, 49],
            name: {
              kind: "id",
              loc: [13, 13, 13, 20],
              text: "numbers",
              bindingKey: "numbers$1nb9j9gha9a2e$0",
            },
            initializer: {
              kind: "()",
              loc: [13, 23, 13, 48],
              expression: {
                kind: "bltn",
                loc: [13, 23, 13, 37],
                name: "JSON.stringify",
              },
              arguments: [
                {
                  kind: "arr",
                  loc: [13, 38, 13, 47],
                  elements: [
                    {
                      kind: "number",
                      loc: [13, 39, 13, 40],
                      value: 1,
                    },
                    {
                      kind: "number",
                      loc: [13, 42, 13, 43],
                      value: 2,
                    },
                    {
                      kind: "number",
                      loc: [13, 45, 13, 46],
                      value: 3,
                    },
                  ],
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [14, 7, 14, 41],
            name: {
              kind: "id",
              loc: [14, 13, 14, 17],
              text: "text",
              bindingKey: "text$1nb9j9gha9a2e$1",
            },
            initializer: {
              kind: "()",
              loc: [14, 20, 14, 40],
              expression: {
                kind: "bltn",
                loc: [14, 20, 14, 34],
                name: "JSON.stringify",
              },
              arguments: [
                {
                  kind: "string",
                  loc: [14, 35, 14, 39],
                  text: "hi",
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [15, 7, 15, 41],
            name: {
              kind: "id",
              loc: [15, 13, 15, 17],
              text: "flag",
              bindingKey: "flag$1nb9j9gha9a2e$2",
            },
            initializer: {
              kind: "()",
              loc: [15, 20, 15, 40],
              expression: {
                kind: "bltn",
                loc: [15, 20, 15, 34],
                name: "JSON.stringify",
              },
              arguments: [
                {
                  kind: "true",
                  loc: [15, 35, 15, 39],
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [16, 7, 16, 55],
            name: {
              kind: "id",
              loc: [16, 13, 16, 17],
              text: "held",
              bindingKey: "held$1nb9j9gha9a2e$3",
            },
            initializer: {
              kind: "()",
              loc: [16, 20, 16, 54],
              expression: {
                kind: "bltn",
                loc: [16, 20, 16, 34],
                name: "JSON.stringify",
              },
              arguments: [
                {
                  kind: "obj",
                  loc: [16, 35, 16, 53],
                  properties: [
                    {
                      kind: ":",
                      loc: [16, 37, 16, 41],
                      name: {
                        kind: "string",
                        loc: [16, 37, 16, 38],
                        text: "a",
                      },
                      initializer: {
                        kind: "number",
                        loc: [16, 40, 16, 41],
                        value: 1,
                      },
                    },
                    {
                      kind: ":",
                      loc: [16, 43, 16, 51],
                      name: {
                        kind: "string",
                        loc: [16, 43, 16, 44],
                        text: "b",
                      },
                      initializer: {
                        kind: "string",
                        loc: [16, 46, 16, 51],
                        text: "two",
                      },
                    },
                  ],
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [17, 7, 17, 40],
            name: {
              kind: "id",
              loc: [17, 13, 17, 17],
              text: "back",
              bindingKey: "back$1nb9j9gha9a2e$4",
            },
            initializer: {
              kind: "()",
              loc: [17, 20, 17, 39],
              expression: {
                kind: "bltn",
                loc: [17, 20, 17, 30],
                name: "JSON.parse",
              },
              arguments: [
                {
                  kind: "id",
                  loc: [17, 31, 17, 38],
                  text: "numbers",
                  bindingKey: "numbers$1nb9j9gha9a2e$0",
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [18, 7, 30, 9],
            expression: {
              kind: "binop",
              loc: [19, 9, 29, 41],
              left: {
                kind: "binop",
                loc: [19, 9, 28, 12],
                left: {
                  kind: "binop",
                  loc: [19, 9, 27, 29],
                  left: {
                    kind: "binop",
                    loc: [19, 9, 26, 12],
                    left: {
                      kind: "binop",
                      loc: [19, 9, 25, 13],
                      left: {
                        kind: "binop",
                        loc: [19, 9, 24, 12],
                        left: {
                          kind: "binop",
                          loc: [19, 9, 23, 13],
                          left: {
                            kind: "binop",
                            loc: [19, 9, 22, 12],
                            left: {
                              kind: "binop",
                              loc: [19, 9, 21, 13],
                              left: {
                                kind: "binop",
                                loc: [19, 9, 20, 12],
                                left: {
                                  kind: "id",
                                  loc: [19, 9, 19, 16],
                                  text: "numbers",
                                  bindingKey: "numbers$1nb9j9gha9a2e$0",
                                },
                                operatorToken: "+",
                                right: {
                                  kind: "string",
                                  loc: [20, 9, 20, 12],
                                  text: "|",
                                },
                              },
                              operatorToken: "+",
                              right: {
                                kind: "id",
                                loc: [21, 9, 21, 13],
                                text: "text",
                                bindingKey: "text$1nb9j9gha9a2e$1",
                              },
                            },
                            operatorToken: "+",
                            right: {
                              kind: "string",
                              loc: [22, 9, 22, 12],
                              text: "|",
                            },
                          },
                          operatorToken: "+",
                          right: {
                            kind: "id",
                            loc: [23, 9, 23, 13],
                            text: "flag",
                            bindingKey: "flag$1nb9j9gha9a2e$2",
                          },
                        },
                        operatorToken: "+",
                        right: {
                          kind: "string",
                          loc: [24, 9, 24, 12],
                          text: "|",
                        },
                      },
                      operatorToken: "+",
                      right: {
                        kind: "id",
                        loc: [25, 9, 25, 13],
                        text: "held",
                        bindingKey: "held$1nb9j9gha9a2e$3",
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: "string",
                      loc: [26, 9, 26, 12],
                      text: "|",
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "()",
                    loc: [27, 9, 27, 29],
                    expression: {
                      kind: "bltn",
                      loc: [27, 9, 27, 23],
                      name: "JSON.stringify",
                    },
                    arguments: [
                      {
                        kind: "id",
                        loc: [27, 24, 27, 28],
                        text: "back",
                        bindingKey: "back$1nb9j9gha9a2e$4",
                      },
                    ],
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "string",
                  loc: [28, 9, 28, 12],
                  text: "|",
                },
              },
              operatorToken: "+",
              right: {
                kind: "()",
                loc: [29, 9, 29, 41],
                expression: {
                  kind: "bltn",
                  loc: [29, 9, 29, 23],
                  name: "JSON.stringify",
                },
                arguments: [
                  {
                    kind: "()",
                    loc: [29, 24, 29, 40],
                    expression: {
                      kind: "bltn",
                      loc: [29, 24, 29, 34],
                      name: "JSON.parse",
                    },
                    arguments: [
                      {
                        kind: "id",
                        loc: [29, 35, 29, 39],
                        text: "held",
                        bindingKey: "held$1nb9j9gha9a2e$3",
                      },
                    ],
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
