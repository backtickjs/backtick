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
    kind: 242,
    loc: [10, 34, 12, 2],
    statements: [
      {
        kind: 244,
        loc: [11, 3, 11, 15],
        declarationList: {
          kind: 262,
          loc: [11, 3, 11, 14],
          declarations: [
            {
              kind: 261,
              loc: [11, 9, 11, 14],
              name: {
                kind: 80,
                loc: [11, 9, 11, 10],
                text: "x",
                bindingKey: "x$7giyz7fx5ljm$0",
              },
              initializer: {
                kind: 9,
                loc: [11, 13, 11, 14],
                value: 1,
              },
            },
          ],
          keyword: "const",
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
    kind: 220,
    loc: [14, 37, 17, 2],
    parameters: [],
    body: {
      kind: 242,
      loc: [14, 43, 17, 2],
      statements: [
        {
          kind: 244,
          loc: [15, 3, 15, 13],
          declarationList: {
            kind: 262,
            loc: [15, 3, 15, 12],
            declarations: [
              {
                kind: 261,
                loc: [15, 7, 15, 12],
                name: {
                  kind: 80,
                  loc: [15, 7, 15, 8],
                  text: "n",
                  bindingKey: "n$7giyz7fx5ljm$1",
                },
                initializer: {
                  kind: 9,
                  loc: [15, 11, 15, 12],
                  value: 0,
                },
              },
            ],
            keyword: "let",
          },
        },
        {
          kind: 227,
          loc: [16, 3, 16, 8],
          left: {
            kind: 80,
            loc: [16, 3, 16, 4],
            text: "n",
            bindingKey: "n$7giyz7fx5ljm$1",
          },
          operatorToken: "=",
          right: {
            kind: 9,
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
    kind: 220,
    loc: [19, 19, 27, 2],
    parameters: [
      {
        kind: 170,
        loc: [19, 20, 19, 30],
        name: {
          kind: 80,
          loc: [19, 20, 19, 21],
          text: "b",
          bindingKey: "b$7giyz7fx5ljm$2",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [19, 35, 27, 2],
      statements: [
        {
          kind: 244,
          loc: [20, 3, 20, 13],
          declarationList: {
            kind: 262,
            loc: [20, 3, 20, 12],
            declarations: [
              {
                kind: 261,
                loc: [20, 7, 20, 12],
                name: {
                  kind: 80,
                  loc: [20, 7, 20, 8],
                  text: "n",
                  bindingKey: "n$7giyz7fx5ljm$3",
                },
                initializer: {
                  kind: 9,
                  loc: [20, 11, 20, 12],
                  value: 0,
                },
              },
            ],
            keyword: "let",
          },
        },
        {
          kind: 1000,
          loc: [21, 3, 21, 11],
          key: "$effects",
        },
        {
          kind: 246,
          loc: [22, 3, 25, 4],
          expression: {
            kind: 80,
            loc: [22, 7, 22, 8],
            text: "b",
            bindingKey: "b$7giyz7fx5ljm$2",
          },
          thenStatement: {
            kind: 242,
            loc: [22, 10, 25, 4],
            statements: [
              {
                kind: 214,
                loc: [23, 5, 23, 12],
                expression: {
                  kind: 1000,
                  loc: [23, 5, 23, 10],
                  key: "$ping",
                },
                questionDotToken: false,
                arguments: [],
              },
              {
                kind: 227,
                loc: [24, 5, 24, 10],
                left: {
                  kind: 80,
                  loc: [24, 5, 24, 6],
                  text: "n",
                  bindingKey: "n$7giyz7fx5ljm$3",
                },
                operatorToken: "=",
                right: {
                  kind: 9,
                  loc: [24, 9, 24, 10],
                  value: 1,
                },
              },
            ],
          },
          elseStatement: null,
        },
        {
          kind: 254,
          loc: [26, 3, 26, 12],
          expression: {
            kind: 80,
            loc: [26, 10, 26, 11],
            text: "n",
            bindingKey: "n$7giyz7fx5ljm$3",
          },
        },
      ],
    },
  }),
);
