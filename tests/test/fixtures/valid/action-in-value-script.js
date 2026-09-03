import { cs } from "@backtickjs/core";
// A script that returns a value may still run an action: what a statement
// discards has to be nothing, and an action is what answers with nothing.
//
// The check is `cs.statement`'s and not the compiler's — the position is what
// decides, not the kind of script it sits in. A value in statement position is
// a mistake wherever it stands (see `discarded-value`), and an action is the
// point of the position rather than something a value script has to go without.
const effects = cs.create(
  [10, 31, 12, 3],
  {
    version: "0.0.0",
    filePath: "action-in-value-script.ts",
    fileHash: "7giyz7fx5ljm",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [10, 34, 12, 2],
    statements: [
      {
        kind: "const",
        loc: [11, 3, 11, 15],
        name: {
          kind: "id",
          loc: [11, 9, 11, 10],
          text: "x",
          bindingKey: "x$7giyz7fx5ljm$0",
        },
        initializer: {
          kind: "number",
          loc: [11, 13, 11, 14],
          value: 1,
        },
      },
    ],
  }),
);
const ping = cs.create(
  [14, 34, 17, 3],
  {
    version: "0.0.0",
    filePath: "action-in-value-script.ts",
    fileHash: "7giyz7fx5ljm",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [14, 37, 17, 2],
    parameters: [],
    body: {
      kind: "{}",
      loc: [14, 43, 17, 2],
      statements: [
        {
          kind: "let",
          loc: [15, 3, 15, 13],
          name: {
            kind: "id",
            loc: [15, 7, 15, 8],
            text: "n",
            bindingKey: "n$7giyz7fx5ljm$1",
          },
          initializer: {
            kind: "number",
            loc: [15, 11, 15, 12],
            value: 0,
          },
        },
        {
          kind: "binop",
          loc: [16, 3, 16, 8],
          left: {
            kind: "id",
            loc: [16, 3, 16, 4],
            text: "n",
            bindingKey: "n$7giyz7fx5ljm$1",
          },
          operatorToken: "=",
          right: {
            kind: "number",
            loc: [16, 7, 16, 8],
            value: 1,
          },
        },
      ],
    },
  }),
);
export default cs.create(
  [19, 16, 27, 3],
  {
    version: "0.0.0",
    filePath: "action-in-value-script.ts",
    fileHash: "7giyz7fx5ljm",
    splices: {
      $effects: { value: effects, params: [] },
      $ping: { value: ping, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [19, 19, 27, 2],
    parameters: [
      {
        kind: "param",
        loc: [19, 20, 19, 30],
        name: {
          kind: "id",
          loc: [19, 20, 19, 21],
          text: "b",
          bindingKey: "b$7giyz7fx5ljm$2",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [19, 35, 27, 2],
      statements: [
        {
          kind: "let",
          loc: [20, 3, 20, 13],
          name: {
            kind: "id",
            loc: [20, 7, 20, 8],
            text: "n",
            bindingKey: "n$7giyz7fx5ljm$3",
          },
          initializer: {
            kind: "number",
            loc: [20, 11, 20, 12],
            value: 0,
          },
        },
        {
          kind: "splice",
          loc: [21, 3, 21, 11],
          key: "$effects",
        },
        {
          kind: "if",
          loc: [22, 3, 25, 4],
          expression: {
            kind: "id",
            loc: [22, 7, 22, 8],
            text: "b",
            bindingKey: "b$7giyz7fx5ljm$2",
          },
          thenStatement: {
            kind: "{}",
            loc: [22, 10, 25, 4],
            statements: [
              {
                kind: "()",
                loc: [23, 5, 23, 12],
                expression: {
                  kind: "splice",
                  loc: [23, 5, 23, 10],
                  key: "$ping",
                },
                arguments: [],
              },
              {
                kind: "binop",
                loc: [24, 5, 24, 10],
                left: {
                  kind: "id",
                  loc: [24, 5, 24, 6],
                  text: "n",
                  bindingKey: "n$7giyz7fx5ljm$3",
                },
                operatorToken: "=",
                right: {
                  kind: "number",
                  loc: [24, 9, 24, 10],
                  value: 1,
                },
              },
            ],
          },
          elseStatement: null,
        },
        {
          kind: "return",
          loc: [26, 3, 26, 12],
          expression: {
            kind: "id",
            loc: [26, 10, 26, 11],
            text: "n",
            bindingKey: "n$7giyz7fx5ljm$3",
          },
        },
      ],
    },
  }),
);
