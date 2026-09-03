import { cs } from "@backtickjs/core";
// `?` marks a nullable parameter — sugar for `T | null`, not an optional
// argument: callers pass `null` explicitly, and `undefined` never arises.
const greet = cs.create(
  [5, 15, 7, 3],
  {
    version: "0.0.0",
    filePath: "optional-parameter.ts",
    fileHash: "hlti23avj5mo",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [5, 18, 7, 2],
    parameters: [
      {
        kind: "param",
        loc: [5, 19, 5, 32],
        name: {
          kind: "id",
          loc: [5, 19, 5, 23],
          text: "name",
          bindingKey: "name$hlti23avj5mo$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [5, 37, 7, 2],
      statements: [
        {
          kind: "return",
          loc: [6, 3, 6, 28],
          expression: {
            kind: "()",
            loc: [6, 10, 6, 27],
            expression: {
              kind: "?.",
              loc: [6, 10, 6, 22],
              expression: {
                kind: "id",
                loc: [6, 10, 6, 14],
                text: "name",
                bindingKey: "name$hlti23avj5mo$0",
              },
              name: "concat",
            },
            arguments: [
              {
                kind: "string",
                loc: [6, 23, 6, 26],
                text: "!",
              },
            ],
          },
        },
      ],
    },
  }),
);
// A function-typed annotation unions parenthesized: `(() => number) | null`.
const double = cs.create(
  [10, 16, 10, 27],
  {
    version: "0.0.0",
    filePath: "optional-parameter.ts",
    fileHash: "hlti23avj5mo",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [10, 19, 10, 26],
    parameters: [],
    body: {
      kind: "number",
      loc: [10, 25, 10, 26],
      value: 2,
    },
  }),
);
const call = cs.create(
  [12, 14, 14, 3],
  {
    version: "0.0.0",
    filePath: "optional-parameter.ts",
    fileHash: "hlti23avj5mo",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [12, 17, 14, 2],
    parameters: [
      {
        kind: "param",
        loc: [12, 18, 12, 35],
        name: {
          kind: "id",
          loc: [12, 18, 12, 20],
          text: "cb",
          bindingKey: "cb$hlti23avj5mo$1",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [12, 40, 14, 2],
      statements: [
        {
          kind: "return",
          loc: [13, 3, 13, 22],
          expression: {
            kind: "binop",
            loc: [13, 10, 13, 21],
            left: {
              kind: "?.()",
              loc: [13, 10, 13, 16],
              expression: {
                kind: "id",
                loc: [13, 10, 13, 12],
                text: "cb",
                bindingKey: "cb$hlti23avj5mo$1",
              },
              arguments: [],
            },
            operatorToken: "??",
            right: {
              kind: "number",
              loc: [13, 20, 13, 21],
              value: 0,
            },
          },
        },
      ],
    },
  }),
);
export default cs.create(
  [16, 16, 21, 4],
  {
    version: "0.0.0",
    filePath: "optional-parameter.ts",
    fileHash: "hlti23avj5mo",
    splices: {
      $greet: { value: greet, params: [] },
      $call: { value: call, params: [] },
      $double: { value: double, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "obj",
    loc: [16, 20, 21, 2],
    properties: [
      {
        kind: ":",
        loc: [17, 3, 17, 22],
        name: "named",
        initializer: {
          kind: "()",
          loc: [17, 10, 17, 22],
          expression: {
            kind: "splice",
            loc: [17, 10, 17, 16],
            key: "$greet",
          },
          arguments: [
            {
              kind: "string",
              loc: [17, 17, 17, 21],
              text: "hi",
            },
          ],
        },
      },
      {
        kind: ":",
        loc: [18, 3, 18, 25],
        name: "explicit",
        initializer: {
          kind: "()",
          loc: [18, 13, 18, 25],
          expression: {
            kind: "splice",
            loc: [18, 13, 18, 19],
            key: "$greet",
          },
          arguments: [
            {
              kind: "null",
              loc: [18, 20, 18, 24],
            },
          ],
        },
      },
      {
        kind: ":",
        loc: [19, 3, 19, 27],
        name: "supplied",
        initializer: {
          kind: "()",
          loc: [19, 13, 19, 27],
          expression: {
            kind: "splice",
            loc: [19, 13, 19, 18],
            key: "$call",
          },
          arguments: [
            {
              kind: "splice",
              loc: [19, 19, 19, 26],
              key: "$double",
            },
          ],
        },
      },
      {
        kind: ":",
        loc: [20, 3, 20, 24],
        name: "fallback",
        initializer: {
          kind: "()",
          loc: [20, 13, 20, 24],
          expression: {
            kind: "splice",
            loc: [20, 13, 20, 18],
            key: "$call",
          },
          arguments: [
            {
              kind: "null",
              loc: [20, 19, 20, 23],
            },
          ],
        },
      },
    ],
  }),
);
