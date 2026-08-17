import { cs } from "@backtickjs/core";
const stored = cs.create(
  [14, 16, 17, 3],
  {
    version: "0.0.0",
    filePath: "undefined-annotation.ts",
    fileHash: "vyh7jw6xunik",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 220,
    loc: [14, 19, 17, 2],
    parameters: [
      {
        kind: 170,
        loc: [14, 20, 14, 28],
        name: {
          kind: 80,
          loc: [14, 20, 14, 21],
          text: "x",
          bindingKey: "x$vyh7jw6xunik$0",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [14, 33, 17, 2],
      statements: [
        {
          kind: 244,
          loc: [15, 3, 15, 15],
          declarationList: {
            kind: 262,
            loc: [15, 3, 15, 14],
            declarations: [
              {
                kind: 261,
                loc: [15, 9, 15, 14],
                name: {
                  kind: 80,
                  loc: [15, 9, 15, 10],
                  text: "y",
                  bindingKey: "y$vyh7jw6xunik$1",
                },
                initializer: {
                  kind: 80,
                  loc: [15, 13, 15, 14],
                  text: "x",
                  bindingKey: "x$vyh7jw6xunik$0",
                },
              },
            ],
            keyword: "const",
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
const written = cs.create(
  [19, 17, 23, 3],
  {
    version: "0.0.0",
    filePath: "undefined-annotation.ts",
    fileHash: "vyh7jw6xunik",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 220,
    loc: [19, 20, 23, 2],
    parameters: [
      {
        kind: 170,
        loc: [19, 21, 19, 29],
        name: {
          kind: 80,
          loc: [19, 21, 19, 22],
          text: "x",
          bindingKey: "x$vyh7jw6xunik$2",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [19, 34, 23, 2],
      statements: [
        {
          kind: 244,
          loc: [20, 3, 20, 14],
          declarationList: {
            kind: 262,
            loc: [20, 3, 20, 13],
            declarations: [
              {
                kind: 261,
                loc: [20, 7, 20, 13],
                name: {
                  kind: 80,
                  loc: [20, 7, 20, 8],
                  text: "y",
                  bindingKey: "y$vyh7jw6xunik$3",
                },
                initializer: {
                  kind: 11,
                  loc: [20, 11, 20, 13],
                  text: "",
                },
              },
            ],
            keyword: "let",
          },
        },
        {
          kind: 227,
          loc: [21, 3, 21, 8],
          left: {
            kind: 80,
            loc: [21, 3, 21, 4],
            text: "y",
            bindingKey: "y$vyh7jw6xunik$3",
          },
          operatorToken: "=",
          right: {
            kind: 80,
            loc: [21, 7, 21, 8],
            text: "x",
            bindingKey: "x$vyh7jw6xunik$2",
          },
        },
        {
          kind: 254,
          loc: [22, 3, 22, 12],
          expression: {
            kind: 9,
            loc: [22, 10, 22, 11],
            value: 1,
          },
        },
      ],
    },
  }),
);
