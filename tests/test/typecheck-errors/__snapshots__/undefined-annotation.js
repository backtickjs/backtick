import { cs } from "@backtickjs/core";
const stored = cs.create(
  [14, 16, 17, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/undefined-annotation.test.tsx",
    fileHash: "15fgytirahb84",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [14, 19, 17, 2],
    parameters: [
      {
        kind: "param",
        loc: [14, 20, 14, 28],
        name: {
          kind: "id",
          loc: [14, 20, 14, 21],
          text: "x",
          bindingKey: "x$15fgytirahb84$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [14, 33, 17, 2],
      statements: [
        {
          kind: "const",
          loc: [15, 3, 15, 15],
          name: {
            kind: "id",
            loc: [15, 9, 15, 10],
            text: "y",
            bindingKey: "y$15fgytirahb84$1",
          },
          initializer: {
            kind: "id",
            loc: [15, 13, 15, 14],
            text: "x",
            bindingKey: "x$15fgytirahb84$0",
          },
        },
        {
          kind: "return",
          loc: [16, 3, 16, 12],
          expression: {
            kind: "number",
            loc: [16, 10, 16, 11],
            value: 1,
          },
        },
      ],
    },
  }),
);
const written = cs.create(
  [19, 17, 24, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/undefined-annotation.test.tsx",
    fileHash: "15fgytirahb84",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [19, 20, 24, 2],
    parameters: [
      {
        kind: "param",
        loc: [19, 21, 19, 29],
        name: {
          kind: "id",
          loc: [19, 21, 19, 22],
          text: "x",
          bindingKey: "x$15fgytirahb84$2",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [19, 34, 24, 2],
      statements: [
        {
          kind: "let",
          loc: [20, 3, 20, 14],
          name: {
            kind: "id",
            loc: [20, 7, 20, 8],
            text: "y",
            bindingKey: "y$15fgytirahb84$3",
          },
          initializer: {
            kind: "string",
            loc: [20, 11, 20, 13],
            text: "",
          },
        },
        {
          kind: "binop",
          loc: [22, 3, 22, 8],
          left: {
            kind: "id",
            loc: [22, 3, 22, 4],
            text: "y",
            bindingKey: "y$15fgytirahb84$3",
          },
          operatorToken: "=",
          right: {
            kind: "id",
            loc: [22, 7, 22, 8],
            text: "x",
            bindingKey: "x$15fgytirahb84$2",
          },
        },
        {
          kind: "return",
          loc: [23, 3, 23, 12],
          expression: {
            kind: "number",
            loc: [23, 10, 23, 11],
            value: 1,
          },
        },
      ],
    },
  }),
);
