import { cs } from "@backtickjs/core";
// `?.` propagates null one step: a null receiver reads as null — the
// language's absent value; `undefined` never arises. A chain spells `?.` at
// each access, and a null method receiver skips the call.
const pick = cs.create(
  [6, 14, 8, 3],
  {
    version: "0.0.0",
    filePath: "optionalChain.tsx",
    fileHash: "3hq3ldj3347uk",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [6, 17, 8, 2],
    parameters: [
      {
        kind: "param",
        loc: [6, 18, 6, 41],
        name: {
          kind: "id",
          loc: [6, 18, 6, 19],
          text: "p",
          bindingKey: "p$3hq3ldj3347uk$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [6, 46, 8, 2],
      statements: [
        {
          kind: "return",
          loc: [7, 3, 7, 15],
          expression: {
            kind: "?.",
            loc: [7, 10, 7, 14],
            expression: {
              kind: "id",
              loc: [7, 10, 7, 11],
              text: "p",
              bindingKey: "p$3hq3ldj3347uk$0",
            },
            name: "x",
          },
        },
      ],
    },
  }),
);
const deep = cs.create(
  [10, 14, 12, 3],
  {
    version: "0.0.0",
    filePath: "optionalChain.tsx",
    fileHash: "3hq3ldj3347uk",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [10, 17, 12, 2],
    parameters: [
      {
        kind: "param",
        loc: [10, 18, 10, 59],
        name: {
          kind: "id",
          loc: [10, 18, 10, 19],
          text: "o",
          bindingKey: "o$3hq3ldj3347uk$1",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [10, 64, 12, 2],
      statements: [
        {
          kind: "return",
          loc: [11, 3, 11, 22],
          expression: {
            kind: "?.",
            loc: [11, 10, 11, 21],
            expression: {
              kind: "?.",
              loc: [11, 10, 11, 18],
              expression: {
                kind: "id",
                loc: [11, 10, 11, 11],
                text: "o",
                bindingKey: "o$3hq3ldj3347uk$1",
              },
              name: "inner",
            },
            name: "z",
          },
        },
      ],
    },
  }),
);
const shout = cs.create(
  [14, 15, 16, 3],
  {
    version: "0.0.0",
    filePath: "optionalChain.tsx",
    fileHash: "3hq3ldj3347uk",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [14, 18, 16, 2],
    parameters: [
      {
        kind: "param",
        loc: [14, 19, 14, 35],
        name: {
          kind: "id",
          loc: [14, 19, 14, 20],
          text: "s",
          bindingKey: "s$3hq3ldj3347uk$2",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [14, 40, 16, 2],
      statements: [
        {
          kind: "return",
          loc: [15, 3, 15, 25],
          expression: {
            kind: "()",
            loc: [15, 10, 15, 24],
            expression: {
              kind: "?.",
              loc: [15, 10, 15, 19],
              expression: {
                kind: "id",
                loc: [15, 10, 15, 11],
                text: "s",
                bindingKey: "s$3hq3ldj3347uk$2",
              },
              name: "concat",
            },
            arguments: [
              {
                kind: "string",
                loc: [15, 20, 15, 23],
                text: "!",
              },
            ],
          },
        },
      ],
    },
  }),
);
const optionalChain = cs.create(
  [18, 23, 26, 4],
  {
    version: "0.0.0",
    filePath: "optionalChain.tsx",
    fileHash: "3hq3ldj3347uk",
    splices: {
      $pick: { value: pick, params: [] },
      $deep: { value: deep, params: [] },
      $shout: { value: shout, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "obj",
    loc: [18, 27, 26, 2],
    properties: [
      {
        kind: ":",
        loc: [19, 3, 19, 25],
        name: "found",
        initializer: {
          kind: "()",
          loc: [19, 10, 19, 25],
          expression: {
            kind: "splice",
            loc: [19, 10, 19, 15],
            key: "$pick",
          },
          arguments: [
            {
              kind: "obj",
              loc: [19, 16, 19, 24],
              properties: [
                {
                  kind: ":",
                  loc: [19, 18, 19, 22],
                  name: "x",
                  initializer: {
                    kind: "number",
                    loc: [19, 21, 19, 22],
                    value: 5,
                  },
                },
              ],
            },
          ],
        },
      },
      {
        kind: ":",
        loc: [20, 3, 20, 23],
        name: "missing",
        initializer: {
          kind: "()",
          loc: [20, 12, 20, 23],
          expression: {
            kind: "splice",
            loc: [20, 12, 20, 17],
            key: "$pick",
          },
          arguments: [
            {
              kind: "null",
              loc: [20, 18, 20, 22],
            },
          ],
        },
      },
      {
        kind: ":",
        loc: [21, 3, 21, 35],
        name: "deep",
        initializer: {
          kind: "()",
          loc: [21, 9, 21, 35],
          expression: {
            kind: "splice",
            loc: [21, 9, 21, 14],
            key: "$deep",
          },
          arguments: [
            {
              kind: "obj",
              loc: [21, 15, 21, 34],
              properties: [
                {
                  kind: ":",
                  loc: [21, 17, 21, 32],
                  name: "inner",
                  initializer: {
                    kind: "obj",
                    loc: [21, 24, 21, 32],
                    properties: [
                      {
                        kind: ":",
                        loc: [21, 26, 21, 30],
                        name: "z",
                        initializer: {
                          kind: "number",
                          loc: [21, 29, 21, 30],
                          value: 7,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      },
      {
        kind: ":",
        loc: [22, 3, 22, 30],
        name: "cut",
        initializer: {
          kind: "()",
          loc: [22, 8, 22, 30],
          expression: {
            kind: "splice",
            loc: [22, 8, 22, 13],
            key: "$deep",
          },
          arguments: [
            {
              kind: "obj",
              loc: [22, 14, 22, 29],
              properties: [
                {
                  kind: ":",
                  loc: [22, 16, 22, 27],
                  name: "inner",
                  initializer: {
                    kind: "null",
                    loc: [22, 23, 22, 27],
                  },
                },
              ],
            },
          ],
        },
      },
      {
        kind: ":",
        loc: [23, 3, 23, 19],
        name: "top",
        initializer: {
          kind: "()",
          loc: [23, 8, 23, 19],
          expression: {
            kind: "splice",
            loc: [23, 8, 23, 13],
            key: "$deep",
          },
          arguments: [
            {
              kind: "null",
              loc: [23, 14, 23, 18],
            },
          ],
        },
      },
      {
        kind: ":",
        loc: [24, 3, 24, 21],
        name: "loud",
        initializer: {
          kind: "()",
          loc: [24, 9, 24, 21],
          expression: {
            kind: "splice",
            loc: [24, 9, 24, 15],
            key: "$shout",
          },
          arguments: [
            {
              kind: "string",
              loc: [24, 16, 24, 20],
              text: "hi",
            },
          ],
        },
      },
      {
        kind: ":",
        loc: [25, 3, 25, 23],
        name: "silent",
        initializer: {
          kind: "()",
          loc: [25, 11, 25, 23],
          expression: {
            kind: "splice",
            loc: [25, 11, 25, 17],
            key: "$shout",
          },
          arguments: [
            {
              kind: "null",
              loc: [25, 18, 25, 22],
            },
          ],
        },
      },
    ],
  }),
);
