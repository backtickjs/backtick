import { cs } from "@backtickjs/core";
// An action call produces no value: its `void` result can't initialize a
// variable — in a value script or an action.
const ping = cs.create(
  [5, 14, 8, 3],
  {
    version: "0.0.0",
    filePath: "void-initializer.ts",
    fileHash: "3hyzmfxyz75s4",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 220,
    loc: [5, 17, 8, 2],
    parameters: [],
    body: {
      kind: 242,
      loc: [5, 23, 8, 2],
      statements: [
        {
          kind: 244,
          loc: [6, 3, 6, 13],
          declarationList: {
            kind: 262,
            loc: [6, 3, 6, 12],
            declarations: [
              {
                kind: 261,
                loc: [6, 7, 6, 12],
                name: {
                  kind: 80,
                  loc: [6, 7, 6, 8],
                  text: "n",
                  bindingKey: "n$3hyzmfxyz75s4$0",
                },
                initializer: {
                  kind: 9,
                  loc: [6, 11, 6, 12],
                  value: 0,
                },
              },
            ],
            keyword: "let",
          },
        },
        {
          kind: 227,
          loc: [7, 3, 7, 8],
          left: {
            kind: 80,
            loc: [7, 3, 7, 4],
            text: "n",
            bindingKey: "n$3hyzmfxyz75s4$0",
          },
          operatorToken: "=",
          right: {
            kind: 9,
            loc: [7, 7, 7, 8],
            value: 1,
          },
        },
      ],
    },
  }),
);
const script = cs.create(
  [10, 16, 13, 3],
  {
    version: "0.0.0",
    filePath: "void-initializer.ts",
    fileHash: "3hyzmfxyz75s4",
    kind: "value",
    splices: { $ping: ping },
    captures: [],
    spliceParams: { $ping: [] },
  },
  () => ({
    kind: 242,
    loc: [10, 19, 13, 2],
    statements: [
      {
        kind: 244,
        loc: [11, 3, 11, 21],
        declarationList: {
          kind: 262,
          loc: [11, 3, 11, 20],
          declarations: [
            {
              kind: 261,
              loc: [11, 9, 11, 20],
              name: {
                kind: 80,
                loc: [11, 9, 11, 10],
                text: "x",
                bindingKey: "x$3hyzmfxyz75s4$1",
              },
              initializer: {
                kind: 214,
                loc: [11, 13, 11, 20],
                expression: {
                  kind: 1000,
                  loc: [11, 13, 11, 18],
                  key: "$ping",
                },
                questionDotToken: false,
                arguments: [],
              },
            },
          ],
          keyword: "const",
        },
      },
      {
        kind: 254,
        loc: [12, 3, 12, 12],
        expression: {
          kind: 9,
          loc: [12, 10, 12, 11],
          value: 1,
        },
      },
    ],
  }),
);
const action = cs.create(
  [15, 16, 17, 3],
  {
    version: "0.0.0",
    filePath: "void-initializer.ts",
    fileHash: "3hyzmfxyz75s4",
    kind: "action",
    splices: { $ping: ping },
    captures: [],
    spliceParams: { $ping: [] },
  },
  () => ({
    kind: 242,
    loc: [15, 19, 17, 2],
    statements: [
      {
        kind: 244,
        loc: [16, 3, 16, 21],
        declarationList: {
          kind: 262,
          loc: [16, 3, 16, 20],
          declarations: [
            {
              kind: 261,
              loc: [16, 9, 16, 20],
              name: {
                kind: 80,
                loc: [16, 9, 16, 10],
                text: "x",
                bindingKey: "x$3hyzmfxyz75s4$2",
              },
              initializer: {
                kind: 214,
                loc: [16, 13, 16, 20],
                expression: {
                  kind: 1000,
                  loc: [16, 13, 16, 18],
                  key: "$ping",
                },
                questionDotToken: false,
                arguments: [],
              },
            },
          ],
          keyword: "const",
        },
      },
    ],
  }),
);
// An error inside a checked initializer reports once: the duplicate copy
// the check sequences is shielded.
const label = cs.create(
  [21, 15, 23, 3],
  {
    version: "0.0.0",
    filePath: "void-initializer.ts",
    fileHash: "3hyzmfxyz75s4",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 220,
    loc: [21, 18, 23, 2],
    parameters: [
      {
        kind: 170,
        loc: [21, 19, 21, 31],
        name: {
          kind: 80,
          loc: [21, 19, 21, 23],
          text: "text",
          bindingKey: "text$3hyzmfxyz75s4$3",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [21, 36, 23, 2],
      statements: [
        {
          kind: 254,
          loc: [22, 3, 22, 15],
          expression: {
            kind: 80,
            loc: [22, 10, 22, 14],
            text: "text",
            bindingKey: "text$3hyzmfxyz75s4$3",
          },
        },
      ],
    },
  }),
);
const wrongArgument = cs.create(
  [25, 23, 28, 3],
  {
    version: "0.0.0",
    filePath: "void-initializer.ts",
    fileHash: "3hyzmfxyz75s4",
    kind: "value",
    splices: { $label: label },
    captures: [],
    spliceParams: { $label: [] },
  },
  () => ({
    kind: 242,
    loc: [25, 26, 28, 2],
    statements: [
      {
        kind: 244,
        loc: [26, 3, 26, 26],
        declarationList: {
          kind: 262,
          loc: [26, 3, 26, 25],
          declarations: [
            {
              kind: 261,
              loc: [26, 9, 26, 25],
              name: {
                kind: 80,
                loc: [26, 9, 26, 10],
                text: "x",
                bindingKey: "x$3hyzmfxyz75s4$4",
              },
              initializer: {
                kind: 214,
                loc: [26, 13, 26, 25],
                expression: {
                  kind: 1000,
                  loc: [26, 13, 26, 19],
                  key: "$label",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 112,
                    loc: [26, 20, 26, 24],
                  },
                ],
              },
            },
          ],
          keyword: "const",
        },
      },
      {
        kind: 254,
        loc: [27, 3, 27, 12],
        expression: {
          kind: 9,
          loc: [27, 10, 27, 11],
          value: 1,
        },
      },
    ],
  }),
);
