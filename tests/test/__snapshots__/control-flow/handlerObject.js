import { cs } from "@backtickjs/core";
// Handlers — action arrows — are values: an object carries them, and
// storing one is not calling it.
const beep = cs.create(
  [6, 28, 9, 3],
  {
    version: "0.0.0",
    filePath: "handlerObject.tsx",
    fileHash: "3tnozyx64sffg",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [6, 31, 9, 2],
    statements: [
      {
        kind: "let",
        loc: [7, 3, 7, 13],
        name: {
          kind: "id",
          loc: [7, 7, 7, 8],
          text: "n",
          bindingKey: "n$3tnozyx64sffg$0",
        },
        initializer: {
          kind: "number",
          loc: [7, 11, 7, 12],
          value: 0,
        },
      },
      {
        kind: "binop",
        loc: [8, 3, 8, 8],
        left: {
          kind: "id",
          loc: [8, 3, 8, 4],
          text: "n",
          bindingKey: "n$3tnozyx64sffg$0",
        },
        operatorToken: "=",
        right: {
          kind: "number",
          loc: [8, 7, 8, 8],
          value: 1,
        },
      },
    ],
  }),
);
const onTap = cs.create(
  [11, 45, 13, 3],
  {
    version: "0.0.0",
    filePath: "handlerObject.tsx",
    fileHash: "3tnozyx64sffg",
    splices: { $beep: { value: beep, params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [11, 48, 13, 2],
    parameters: [
      {
        kind: "param",
        loc: [11, 49, 11, 59],
        name: {
          kind: "id",
          loc: [11, 49, 11, 51],
          text: "id",
          bindingKey: "id$3tnozyx64sffg$1",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [11, 64, 13, 2],
      statements: [
        {
          kind: "splice",
          loc: [12, 3, 12, 8],
          key: "$beep",
        },
      ],
    },
  }),
);
const handlerObject = cs.create(
  [15, 23, 21, 3],
  {
    version: "0.0.0",
    filePath: "handlerObject.tsx",
    fileHash: "3tnozyx64sffg",
    splices: { $onTap: { value: onTap, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [15, 26, 21, 2],
    statements: [
      {
        kind: "const",
        loc: [16, 3, 19, 5],
        name: {
          kind: "id",
          loc: [16, 9, 16, 17],
          text: "handlers",
          bindingKey: "handlers$3tnozyx64sffg$2",
        },
        initializer: {
          kind: "obj",
          loc: [16, 20, 19, 4],
          properties: [
            {
              kind: ":",
              loc: [17, 5, 17, 16],
              name: "tap",
              initializer: {
                kind: "splice",
                loc: [17, 10, 17, 16],
                key: "$onTap",
              },
            },
            {
              kind: ":",
              loc: [18, 5, 18, 17],
              name: "hold",
              initializer: {
                kind: "splice",
                loc: [18, 11, 18, 17],
                key: "$onTap",
              },
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [20, 3, 20, 19],
        expression: {
          kind: "id",
          loc: [20, 10, 20, 18],
          text: "handlers",
          bindingKey: "handlers$3tnozyx64sffg$2",
        },
      },
    ],
  }),
);
