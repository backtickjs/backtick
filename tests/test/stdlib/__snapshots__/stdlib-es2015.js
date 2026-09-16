import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The members ES2015 added that this language answers for: a search that
// finds nothing reads as `undefined`, as a read past the end does, and
// everything else is what the standard library says it is.
it("stdlibEs2015", async (t) => {
  await snapshotCase(
    t,
    "stdlibEs2015",
    cs.create(
      [12, 5, 27, 7],
      {
        version: "0.0.0",
        filePath: "stdlib/stdlib-es2015.test.tsx",
        fileHash: "s2q4937fji9l",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [12, 8, 27, 6],
        statements: [
          {
            kind: "const",
            loc: [13, 7, 13, 32],
            name: {
              kind: "id",
              loc: [13, 13, 13, 15],
              text: "xs",
              bindingKey: "xs$s2q4937fji9l$0",
            },
            initializer: {
              kind: "arr",
              loc: [13, 18, 13, 31],
              elements: [
                {
                  kind: "number",
                  loc: [13, 19, 13, 20],
                  value: 3,
                },
                {
                  kind: "number",
                  loc: [13, 22, 13, 23],
                  value: 8,
                },
                {
                  kind: "number",
                  loc: [13, 25, 13, 27],
                  value: 12,
                },
                {
                  kind: "number",
                  loc: [13, 29, 13, 30],
                  value: 5,
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [14, 7, 14, 31],
            name: {
              kind: "id",
              loc: [14, 13, 14, 17],
              text: "word",
              bindingKey: "word$s2q4937fji9l$1",
            },
            initializer: {
              kind: "string",
              loc: [14, 20, 14, 30],
              text: "backtick",
            },
          },
          {
            kind: "return",
            loc: [15, 7, 26, 9],
            expression: {
              kind: "obj",
              loc: [15, 14, 26, 8],
              properties: [
                {
                  kind: ":",
                  loc: [16, 9, 16, 37],
                  name: "found",
                  initializer: {
                    kind: "()",
                    loc: [16, 16, 16, 37],
                    expression: {
                      kind: ".",
                      loc: [16, 16, 16, 23],
                      expression: {
                        kind: "id",
                        loc: [16, 16, 16, 18],
                        text: "xs",
                        bindingKey: "xs$s2q4937fji9l$0",
                      },
                      name: "find",
                    },
                    arguments: [
                      {
                        kind: "=>",
                        loc: [16, 24, 16, 36],
                        parameters: [
                          {
                            kind: "param",
                            loc: [16, 25, 16, 26],
                            name: {
                              kind: "id",
                              loc: [16, 25, 16, 26],
                              text: "x",
                              bindingKey: "x$s2q4937fji9l$2",
                            },
                          },
                        ],
                        body: {
                          kind: "binop",
                          loc: [16, 31, 16, 36],
                          left: {
                            kind: "id",
                            loc: [16, 31, 16, 32],
                            text: "x",
                            bindingKey: "x$s2q4937fji9l$2",
                          },
                          operatorToken: ">",
                          right: {
                            kind: "number",
                            loc: [16, 35, 16, 36],
                            value: 7,
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [17, 9, 17, 55],
                  name: "missing",
                  initializer: {
                    kind: "binop",
                    loc: [17, 18, 17, 55],
                    left: {
                      kind: "()",
                      loc: [17, 18, 17, 41],
                      expression: {
                        kind: ".",
                        loc: [17, 18, 17, 25],
                        expression: {
                          kind: "id",
                          loc: [17, 18, 17, 20],
                          text: "xs",
                          bindingKey: "xs$s2q4937fji9l$0",
                        },
                        name: "find",
                      },
                      arguments: [
                        {
                          kind: "=>",
                          loc: [17, 26, 17, 40],
                          parameters: [
                            {
                              kind: "param",
                              loc: [17, 27, 17, 28],
                              name: {
                                kind: "id",
                                loc: [17, 27, 17, 28],
                                text: "x",
                                bindingKey: "x$s2q4937fji9l$3",
                              },
                            },
                          ],
                          body: {
                            kind: "binop",
                            loc: [17, 33, 17, 40],
                            left: {
                              kind: "id",
                              loc: [17, 33, 17, 34],
                              text: "x",
                              bindingKey: "x$s2q4937fji9l$3",
                            },
                            operatorToken: ">",
                            right: {
                              kind: "number",
                              loc: [17, 37, 17, 40],
                              value: 100,
                            },
                          },
                        },
                      ],
                    },
                    operatorToken: "===",
                    right: {
                      kind: "undefined",
                      loc: [17, 46, 17, 55],
                    },
                  },
                },
                {
                  kind: ":",
                  loc: [18, 9, 18, 39],
                  name: "at",
                  initializer: {
                    kind: "()",
                    loc: [18, 13, 18, 39],
                    expression: {
                      kind: ".",
                      loc: [18, 13, 18, 25],
                      expression: {
                        kind: "id",
                        loc: [18, 13, 18, 15],
                        text: "xs",
                        bindingKey: "xs$s2q4937fji9l$0",
                      },
                      name: "findIndex",
                    },
                    arguments: [
                      {
                        kind: "=>",
                        loc: [18, 26, 18, 38],
                        parameters: [
                          {
                            kind: "param",
                            loc: [18, 27, 18, 28],
                            name: {
                              kind: "id",
                              loc: [18, 27, 18, 28],
                              text: "x",
                              bindingKey: "x$s2q4937fji9l$4",
                            },
                          },
                        ],
                        body: {
                          kind: "binop",
                          loc: [18, 33, 18, 38],
                          left: {
                            kind: "id",
                            loc: [18, 33, 18, 34],
                            text: "x",
                            bindingKey: "x$s2q4937fji9l$4",
                          },
                          operatorToken: ">",
                          right: {
                            kind: "number",
                            loc: [18, 37, 18, 38],
                            value: 7,
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [19, 9, 19, 46],
                  name: "nowhere",
                  initializer: {
                    kind: "()",
                    loc: [19, 18, 19, 46],
                    expression: {
                      kind: ".",
                      loc: [19, 18, 19, 30],
                      expression: {
                        kind: "id",
                        loc: [19, 18, 19, 20],
                        text: "xs",
                        bindingKey: "xs$s2q4937fji9l$0",
                      },
                      name: "findIndex",
                    },
                    arguments: [
                      {
                        kind: "=>",
                        loc: [19, 31, 19, 45],
                        parameters: [
                          {
                            kind: "param",
                            loc: [19, 32, 19, 33],
                            name: {
                              kind: "id",
                              loc: [19, 32, 19, 33],
                              text: "x",
                              bindingKey: "x$s2q4937fji9l$5",
                            },
                          },
                        ],
                        body: {
                          kind: "binop",
                          loc: [19, 38, 19, 45],
                          left: {
                            kind: "id",
                            loc: [19, 38, 19, 39],
                            text: "x",
                            bindingKey: "x$s2q4937fji9l$5",
                          },
                          operatorToken: ">",
                          right: {
                            kind: "number",
                            loc: [19, 42, 19, 45],
                            value: 100,
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [20, 9, 20, 40],
                  name: "includes",
                  initializer: {
                    kind: "()",
                    loc: [20, 19, 20, 40],
                    expression: {
                      kind: ".",
                      loc: [20, 19, 20, 32],
                      expression: {
                        kind: "id",
                        loc: [20, 19, 20, 23],
                        text: "word",
                        bindingKey: "word$s2q4937fji9l$1",
                      },
                      name: "includes",
                    },
                    arguments: [
                      {
                        kind: "string",
                        loc: [20, 33, 20, 39],
                        text: "tick",
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [21, 9, 21, 44],
                  name: "startsWith",
                  initializer: {
                    kind: "()",
                    loc: [21, 21, 21, 44],
                    expression: {
                      kind: ".",
                      loc: [21, 21, 21, 36],
                      expression: {
                        kind: "id",
                        loc: [21, 21, 21, 25],
                        text: "word",
                        bindingKey: "word$s2q4937fji9l$1",
                      },
                      name: "startsWith",
                    },
                    arguments: [
                      {
                        kind: "string",
                        loc: [21, 37, 21, 43],
                        text: "back",
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [22, 9, 22, 43],
                  name: "endsWith",
                  initializer: {
                    kind: "()",
                    loc: [22, 19, 22, 43],
                    expression: {
                      kind: ".",
                      loc: [22, 19, 22, 32],
                      expression: {
                        kind: "id",
                        loc: [22, 19, 22, 23],
                        text: "word",
                        bindingKey: "word$s2q4937fji9l$1",
                      },
                      name: "endsWith",
                    },
                    arguments: [
                      {
                        kind: "string",
                        loc: [22, 33, 22, 39],
                        text: "tick",
                      },
                      {
                        kind: "number",
                        loc: [22, 41, 22, 42],
                        value: 4,
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [23, 9, 23, 33],
                  name: "repeated",
                  initializer: {
                    kind: "()",
                    loc: [23, 19, 23, 33],
                    expression: {
                      kind: ".",
                      loc: [23, 19, 23, 30],
                      expression: {
                        kind: "string",
                        loc: [23, 19, 23, 23],
                        text: "ab",
                      },
                      name: "repeat",
                    },
                    arguments: [
                      {
                        kind: "number",
                        loc: [23, 31, 23, 32],
                        value: 3,
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [24, 9, 24, 46],
                  name: "codePoint",
                  initializer: {
                    kind: "()",
                    loc: [24, 20, 24, 46],
                    expression: {
                      kind: ".",
                      loc: [24, 20, 24, 43],
                      expression: {
                        kind: "string",
                        loc: [24, 20, 24, 31],
                        text: "\uD83D\uDE00",
                      },
                      name: "codePointAt",
                    },
                    arguments: [
                      {
                        kind: "number",
                        loc: [24, 44, 24, 45],
                        value: 0,
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [25, 9, 25, 42],
                  name: "keys",
                  initializer: {
                    kind: "()",
                    loc: [25, 15, 25, 42],
                    expression: {
                      kind: "bltn",
                      loc: [25, 15, 25, 26],
                      name: "Object.keys",
                    },
                    arguments: [
                      {
                        kind: "obj",
                        loc: [25, 27, 25, 41],
                        properties: [
                          {
                            kind: ":",
                            loc: [25, 29, 25, 33],
                            name: "a",
                            initializer: {
                              kind: "number",
                              loc: [25, 32, 25, 33],
                              value: 1,
                            },
                          },
                          {
                            kind: ":",
                            loc: [25, 35, 25, 39],
                            name: "b",
                            initializer: {
                              kind: "number",
                              loc: [25, 38, 25, 39],
                              value: 2,
                            },
                          },
                        ],
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
