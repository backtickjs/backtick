import { cs } from "@backtickjs/core";
const stored = cs.create(
  [8, 16, 11, 3],
  {
    version: "0.0.0",
    filePath: "undefined-annotation.ts",
    fileHash: "18uwl3j62c30b",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 220,
    loc: [8, 19, 11, 2],
    parameters: [
      {
        kind: 170,
        loc: [8, 20, 8, 28],
        name: {
          kind: 80,
          loc: [8, 20, 8, 21],
          text: "x",
          bindingKey: "x$18uwl3j62c30b$0",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [8, 33, 11, 2],
      statements: [
        {
          kind: 244,
          loc: [9, 3, 9, 15],
          declarationList: {
            kind: 262,
            loc: [9, 3, 9, 14],
            declarations: [
              {
                kind: 261,
                loc: [9, 9, 9, 14],
                name: {
                  kind: 80,
                  loc: [9, 9, 9, 10],
                  text: "y",
                  bindingKey: "y$18uwl3j62c30b$1",
                },
                initializer: {
                  kind: 80,
                  loc: [9, 13, 9, 14],
                  text: "x",
                  bindingKey: "x$18uwl3j62c30b$0",
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 254,
          loc: [10, 3, 10, 12],
          expression: {
            kind: 9,
            loc: [10, 10, 10, 11],
            value: 1,
          },
        },
      ],
    },
  }),
);
const written = cs.create(
  [13, 17, 17, 3],
  {
    version: "0.0.0",
    filePath: "undefined-annotation.ts",
    fileHash: "18uwl3j62c30b",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 220,
    loc: [13, 20, 17, 2],
    parameters: [
      {
        kind: 170,
        loc: [13, 21, 13, 29],
        name: {
          kind: 80,
          loc: [13, 21, 13, 22],
          text: "x",
          bindingKey: "x$18uwl3j62c30b$2",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [13, 34, 17, 2],
      statements: [
        {
          kind: 244,
          loc: [14, 3, 14, 14],
          declarationList: {
            kind: 262,
            loc: [14, 3, 14, 13],
            declarations: [
              {
                kind: 261,
                loc: [14, 7, 14, 13],
                name: {
                  kind: 80,
                  loc: [14, 7, 14, 8],
                  text: "y",
                  bindingKey: "y$18uwl3j62c30b$3",
                },
                initializer: {
                  kind: 11,
                  loc: [14, 11, 14, 13],
                  text: "",
                },
              },
            ],
            keyword: "let",
          },
        },
        {
          kind: 227,
          loc: [15, 3, 15, 8],
          left: {
            kind: 80,
            loc: [15, 3, 15, 4],
            text: "y",
            bindingKey: "y$18uwl3j62c30b$3",
          },
          operatorToken: "=",
          right: {
            kind: 80,
            loc: [15, 7, 15, 8],
            text: "x",
            bindingKey: "x$18uwl3j62c30b$2",
          },
        },
        {
          kind: 254,
          loc: [16, 3, 16, 12],
          expression: {
            kind: 9,
            loc: [16, 10, 16, 11],
            value: 1,
          },
        },
      ],
    },
  }),
);
