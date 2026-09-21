import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The string members after ES2015 that read a string without changing
// anything: padding, trimming one end, reading by position, and replacing
// every occurrence.
it("stringMembersEs2017", async (t) => {
  await snapshotCase(
    t,
    "stringMembersEs2017",
    cs.create(
      [12, 5, 21, 7],
      {
        version: "0.0.0",
        filePath: "stdlib/string-members-es2017.test.tsx",
        fileHash: "376ffut9l2xr3",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [12, 8, 21, 6],
        statements: [
          {
            kind: "const",
            loc: [13, 7, 13, 25],
            name: {
              kind: "id",
              loc: [13, 13, 13, 17],
              text: "word",
              bindingKey: "word$376ffut9l2xr3$0",
            },
            initializer: {
              kind: "string",
              loc: [13, 20, 13, 24],
              text: "ab",
            },
          },
          {
            kind: "return",
            loc: [14, 7, 20, 9],
            expression: {
              kind: "obj",
              loc: [14, 14, 20, 8],
              properties: [
                {
                  kind: ":",
                  loc: [15, 9, 15, 62],
                  name: {
                    kind: "string",
                    loc: [15, 9, 15, 15],
                    text: "padded",
                  },
                  initializer: {
                    kind: "binop",
                    loc: [15, 17, 15, 62],
                    left: {
                      kind: "binop",
                      loc: [15, 17, 15, 39],
                      left: {
                        kind: "()",
                        loc: [15, 17, 15, 33],
                        expression: {
                          kind: ".",
                          loc: [15, 17, 15, 30],
                          expression: {
                            kind: "id",
                            loc: [15, 17, 15, 21],
                            text: "word",
                            bindingKey: "word$376ffut9l2xr3$0",
                          },
                          name: "padStart",
                        },
                        arguments: [
                          {
                            kind: "number",
                            loc: [15, 31, 15, 32],
                            value: 4,
                          },
                        ],
                      },
                      operatorToken: "+",
                      right: {
                        kind: "string",
                        loc: [15, 36, 15, 39],
                        text: "|",
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: "()",
                      loc: [15, 42, 15, 62],
                      expression: {
                        kind: ".",
                        loc: [15, 42, 15, 53],
                        expression: {
                          kind: "id",
                          loc: [15, 42, 15, 46],
                          text: "word",
                          bindingKey: "word$376ffut9l2xr3$0",
                        },
                        name: "padEnd",
                      },
                      arguments: [
                        {
                          kind: "number",
                          loc: [15, 54, 15, 55],
                          value: 5,
                        },
                        {
                          kind: "string",
                          loc: [15, 57, 15, 61],
                          text: "-=",
                        },
                      ],
                    },
                  },
                },
                {
                  kind: ":",
                  loc: [16, 9, 16, 69],
                  name: {
                    kind: "string",
                    loc: [16, 9, 16, 16],
                    text: "trimmed",
                  },
                  initializer: {
                    kind: "binop",
                    loc: [16, 18, 16, 69],
                    left: {
                      kind: "binop",
                      loc: [16, 18, 16, 63],
                      left: {
                        kind: "binop",
                        loc: [16, 18, 16, 43],
                        left: {
                          kind: "()",
                          loc: [16, 18, 16, 37],
                          expression: {
                            kind: ".",
                            loc: [16, 18, 16, 35],
                            expression: {
                              kind: "string",
                              loc: [16, 18, 16, 25],
                              text: "  x  ",
                            },
                            name: "trimStart",
                          },
                          arguments: [],
                        },
                        operatorToken: "+",
                        right: {
                          kind: "string",
                          loc: [16, 40, 16, 43],
                          text: "|",
                        },
                      },
                      operatorToken: "+",
                      right: {
                        kind: "()",
                        loc: [16, 46, 16, 63],
                        expression: {
                          kind: ".",
                          loc: [16, 46, 16, 61],
                          expression: {
                            kind: "string",
                            loc: [16, 46, 16, 53],
                            text: "  x  ",
                          },
                          name: "trimEnd",
                        },
                        arguments: [],
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: "string",
                      loc: [16, 66, 16, 69],
                      text: "|",
                    },
                  },
                },
                {
                  kind: ":",
                  loc: [17, 9, 17, 50],
                  name: {
                    kind: "string",
                    loc: [17, 9, 17, 11],
                    text: "at",
                  },
                  initializer: {
                    kind: "arr",
                    loc: [17, 13, 17, 50],
                    elements: [
                      {
                        kind: "()",
                        loc: [17, 14, 17, 24],
                        expression: {
                          kind: ".",
                          loc: [17, 14, 17, 21],
                          expression: {
                            kind: "id",
                            loc: [17, 14, 17, 18],
                            text: "word",
                            bindingKey: "word$376ffut9l2xr3$0",
                          },
                          name: "at",
                        },
                        arguments: [
                          {
                            kind: "number",
                            loc: [17, 22, 17, 23],
                            value: 0,
                          },
                        ],
                      },
                      {
                        kind: "()",
                        loc: [17, 26, 17, 37],
                        expression: {
                          kind: ".",
                          loc: [17, 26, 17, 33],
                          expression: {
                            kind: "id",
                            loc: [17, 26, 17, 30],
                            text: "word",
                            bindingKey: "word$376ffut9l2xr3$0",
                          },
                          name: "at",
                        },
                        arguments: [
                          {
                            kind: "prefixop",
                            loc: [17, 34, 17, 36],
                            operator: "-",
                            operand: {
                              kind: "number",
                              loc: [17, 35, 17, 36],
                              value: 1,
                            },
                          },
                        ],
                      },
                      {
                        kind: "()",
                        loc: [17, 39, 17, 49],
                        expression: {
                          kind: ".",
                          loc: [17, 39, 17, 46],
                          expression: {
                            kind: "id",
                            loc: [17, 39, 17, 43],
                            text: "word",
                            bindingKey: "word$376ffut9l2xr3$0",
                          },
                          name: "at",
                        },
                        arguments: [
                          {
                            kind: "number",
                            loc: [17, 47, 17, 48],
                            value: 5,
                          },
                        ],
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [18, 9, 18, 47],
                  name: {
                    kind: "string",
                    loc: [18, 9, 18, 17],
                    text: "replaced",
                  },
                  initializer: {
                    kind: "()",
                    loc: [18, 19, 18, 47],
                    expression: {
                      kind: ".",
                      loc: [18, 19, 18, 37],
                      expression: {
                        kind: "string",
                        loc: [18, 19, 18, 26],
                        text: "a.b.c",
                      },
                      name: "replaceAll",
                    },
                    arguments: [
                      {
                        kind: "string",
                        loc: [18, 38, 18, 41],
                        text: ".",
                      },
                      {
                        kind: "string",
                        loc: [18, 43, 18, 46],
                        text: "/",
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [19, 9, 19, 74],
                  name: {
                    kind: "string",
                    loc: [19, 9, 19, 19],
                    text: "replacedBy",
                  },
                  initializer: {
                    kind: "()",
                    loc: [19, 21, 19, 74],
                    expression: {
                      kind: ".",
                      loc: [19, 21, 19, 37],
                      expression: {
                        kind: "string",
                        loc: [19, 21, 19, 26],
                        text: "a.b",
                      },
                      name: "replaceAll",
                    },
                    arguments: [
                      {
                        kind: "string",
                        loc: [19, 38, 19, 41],
                        text: ".",
                      },
                      {
                        kind: "=>",
                        loc: [19, 43, 19, 73],
                        parameters: [
                          {
                            kind: "param",
                            loc: [19, 44, 19, 49],
                            name: {
                              kind: "id",
                              loc: [19, 44, 19, 49],
                              text: "found",
                              bindingKey: "found$376ffut9l2xr3$1",
                            },
                          },
                          {
                            kind: "param",
                            loc: [19, 51, 19, 57],
                            name: {
                              kind: "id",
                              loc: [19, 51, 19, 57],
                              text: "offset",
                              bindingKey: "offset$376ffut9l2xr3$2",
                            },
                          },
                        ],
                        body: {
                          kind: "binop",
                          loc: [19, 62, 19, 73],
                          left: {
                            kind: "string",
                            loc: [19, 62, 19, 64],
                            text: "",
                          },
                          operatorToken: "+",
                          right: {
                            kind: "id",
                            loc: [19, 67, 19, 73],
                            text: "offset",
                            bindingKey: "offset$376ffut9l2xr3$2",
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
