import { cs } from "@backtickjs/core";
// `?` marks an optional parameter — sugar for `T | undefined`. A caller may
// pass `undefined` where the argument is not supplied; `null` is a value of
// its own and not accepted here.
const greet = cs.create(
  [6, 15, 8, 3],
  {
    version: "0.0.0",
    filePath: "optional-parameter.ts",
    fileHash: "s4cewloqhuul",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [6, 18, 8, 2],
    parameters: [
      {
        kind: "param",
        loc: [6, 19, 6, 32],
        name: {
          kind: "id",
          loc: [6, 19, 6, 23],
          text: "name",
          bindingKey: "name$s4cewloqhuul$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [6, 37, 8, 2],
      statements: [
        {
          kind: "return",
          loc: [7, 3, 7, 28],
          expression: {
            kind: "()",
            loc: [7, 10, 7, 27],
            expression: {
              kind: "?.",
              loc: [7, 10, 7, 22],
              expression: {
                kind: "id",
                loc: [7, 10, 7, 14],
                text: "name",
                bindingKey: "name$s4cewloqhuul$0",
              },
              name: "concat",
            },
            arguments: [
              {
                kind: "string",
                loc: [7, 23, 7, 26],
                text: "!",
              },
            ],
          },
        },
      ],
    },
  }),
);
// A function-typed annotation unions parenthesized: `(() => number) | undefined`.
const double = cs.create(
  [11, 16, 11, 27],
  {
    version: "0.0.0",
    filePath: "optional-parameter.ts",
    fileHash: "s4cewloqhuul",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [11, 19, 11, 26],
    parameters: [],
    body: {
      kind: "number",
      loc: [11, 25, 11, 26],
      value: 2,
    },
  }),
);
const call = cs.create(
  [13, 14, 15, 3],
  {
    version: "0.0.0",
    filePath: "optional-parameter.ts",
    fileHash: "s4cewloqhuul",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [13, 17, 15, 2],
    parameters: [
      {
        kind: "param",
        loc: [13, 18, 13, 35],
        name: {
          kind: "id",
          loc: [13, 18, 13, 20],
          text: "cb",
          bindingKey: "cb$s4cewloqhuul$1",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [13, 40, 15, 2],
      statements: [
        {
          kind: "return",
          loc: [14, 3, 14, 22],
          expression: {
            kind: "binop",
            loc: [14, 10, 14, 21],
            left: {
              kind: "?.()",
              loc: [14, 10, 14, 16],
              expression: {
                kind: "id",
                loc: [14, 10, 14, 12],
                text: "cb",
                bindingKey: "cb$s4cewloqhuul$1",
              },
              arguments: [],
            },
            operatorToken: "??",
            right: {
              kind: "number",
              loc: [14, 20, 14, 21],
              value: 0,
            },
          },
        },
      ],
    },
  }),
);
export default cs.create(
  [17, 16, 22, 4],
  {
    version: "0.0.0",
    filePath: "optional-parameter.ts",
    fileHash: "s4cewloqhuul",
    splices: {
      $greet: { value: greet, params: [] },
      $call: { value: call, params: [] },
      $double: { value: double, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "obj",
    loc: [17, 20, 22, 2],
    properties: [
      {
        kind: ":",
        loc: [18, 3, 18, 22],
        name: "named",
        initializer: {
          kind: "()",
          loc: [18, 10, 18, 22],
          expression: {
            kind: "splice",
            loc: [18, 10, 18, 16],
            key: "$greet",
          },
          arguments: [
            {
              kind: "string",
              loc: [18, 17, 18, 21],
              text: "hi",
            },
          ],
        },
      },
      {
        kind: ":",
        loc: [19, 3, 19, 30],
        name: "explicit",
        initializer: {
          kind: "()",
          loc: [19, 13, 19, 30],
          expression: {
            kind: "splice",
            loc: [19, 13, 19, 19],
            key: "$greet",
          },
          arguments: [
            {
              kind: "undefined",
              loc: [19, 20, 19, 29],
            },
          ],
        },
      },
      {
        kind: ":",
        loc: [20, 3, 20, 27],
        name: "supplied",
        initializer: {
          kind: "()",
          loc: [20, 13, 20, 27],
          expression: {
            kind: "splice",
            loc: [20, 13, 20, 18],
            key: "$call",
          },
          arguments: [
            {
              kind: "splice",
              loc: [20, 19, 20, 26],
              key: "$double",
            },
          ],
        },
      },
      {
        kind: ":",
        loc: [21, 3, 21, 29],
        name: "fallback",
        initializer: {
          kind: "()",
          loc: [21, 13, 21, 29],
          expression: {
            kind: "splice",
            loc: [21, 13, 21, 18],
            key: "$call",
          },
          arguments: [
            {
              kind: "undefined",
              loc: [21, 19, 21, 28],
            },
          ],
        },
      },
    ],
  }),
);
