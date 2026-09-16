import { cs } from "@backtickjs/core";
// A script that returns a value may still run an action: what a statement
// discards has to be nothing, and an action is what answers with nothing.
//
// The check is `cs.statement`'s and not the compiler's — the position is what
// decides, not the kind of script it sits in. A value in statement position is
// a mistake wherever it stands (see `discarded-value`), and an action is the
// point of the position rather than something a value script has to go without.
const valueScriptEffects = cs.create(
  [11, 42, 13, 3],
  {
    version: "0.0.0",
    filePath: "actionInValueScript.tsx",
    fileHash: "33t8mgfgb9n9v",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [11, 45, 13, 2],
    statements: [
      {
        kind: "const",
        loc: [12, 3, 12, 15],
        name: {
          kind: "id",
          loc: [12, 9, 12, 10],
          text: "x",
          bindingKey: "x$33t8mgfgb9n9v$0",
        },
        initializer: {
          kind: "number",
          loc: [12, 13, 12, 14],
          value: 1,
        },
      },
    ],
  }),
);
const ping = cs.create(
  [15, 34, 18, 3],
  {
    version: "0.0.0",
    filePath: "actionInValueScript.tsx",
    fileHash: "33t8mgfgb9n9v",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [15, 37, 18, 2],
    parameters: [],
    body: {
      kind: "{}",
      loc: [15, 43, 18, 2],
      statements: [
        {
          kind: "let",
          loc: [16, 3, 16, 13],
          name: {
            kind: "id",
            loc: [16, 7, 16, 8],
            text: "n",
            bindingKey: "n$33t8mgfgb9n9v$1",
          },
          initializer: {
            kind: "number",
            loc: [16, 11, 16, 12],
            value: 0,
          },
        },
        {
          kind: "binop",
          loc: [17, 3, 17, 8],
          left: {
            kind: "id",
            loc: [17, 3, 17, 4],
            text: "n",
            bindingKey: "n$33t8mgfgb9n9v$1",
          },
          operatorToken: "=",
          right: {
            kind: "number",
            loc: [17, 7, 17, 8],
            value: 1,
          },
        },
      ],
    },
  }),
);
const actionInValueScript = cs.create(
  [20, 29, 28, 3],
  {
    version: "0.0.0",
    filePath: "actionInValueScript.tsx",
    fileHash: "33t8mgfgb9n9v",
    splices: {
      $valueScriptEffects: { value: valueScriptEffects, params: [] },
      $ping: { value: ping, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [20, 32, 28, 2],
    parameters: [
      {
        kind: "param",
        loc: [20, 33, 20, 43],
        name: {
          kind: "id",
          loc: [20, 33, 20, 34],
          text: "b",
          bindingKey: "b$33t8mgfgb9n9v$2",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [20, 48, 28, 2],
      statements: [
        {
          kind: "let",
          loc: [21, 3, 21, 13],
          name: {
            kind: "id",
            loc: [21, 7, 21, 8],
            text: "n",
            bindingKey: "n$33t8mgfgb9n9v$3",
          },
          initializer: {
            kind: "number",
            loc: [21, 11, 21, 12],
            value: 0,
          },
        },
        {
          kind: "splice",
          loc: [22, 3, 22, 22],
          key: "$valueScriptEffects",
        },
        {
          kind: "if",
          loc: [23, 3, 26, 4],
          expression: {
            kind: "id",
            loc: [23, 7, 23, 8],
            text: "b",
            bindingKey: "b$33t8mgfgb9n9v$2",
          },
          thenStatement: {
            kind: "{}",
            loc: [23, 10, 26, 4],
            statements: [
              {
                kind: "()",
                loc: [24, 5, 24, 12],
                expression: {
                  kind: "splice",
                  loc: [24, 5, 24, 10],
                  key: "$ping",
                },
                arguments: [],
              },
              {
                kind: "binop",
                loc: [25, 5, 25, 10],
                left: {
                  kind: "id",
                  loc: [25, 5, 25, 6],
                  text: "n",
                  bindingKey: "n$33t8mgfgb9n9v$3",
                },
                operatorToken: "=",
                right: {
                  kind: "number",
                  loc: [25, 9, 25, 10],
                  value: 1,
                },
              },
            ],
          },
          elseStatement: null,
        },
        {
          kind: "return",
          loc: [27, 3, 27, 12],
          expression: {
            kind: "id",
            loc: [27, 10, 27, 11],
            text: "n",
            bindingKey: "n$33t8mgfgb9n9v$3",
          },
        },
      ],
    },
  }),
);
