import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `?.` propagates null one step: a null receiver reads as null — the
// language's absent value; `undefined` never arises. A chain spells `?.` at
// each access, and a null method receiver skips the call.
const pick = cs.create(
  [8, 14, 10, 3],
  {
    version: "0.0.0",
    filePath: "objects/optional-chain.test.tsx",
    fileHash: "2dtorvijco8u0",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [8, 17, 10, 2],
    parameters: [
      {
        kind: "param",
        loc: [8, 18, 8, 41],
        name: {
          kind: "id",
          loc: [8, 18, 8, 19],
          text: "p",
          bindingKey: "p$2dtorvijco8u0$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [8, 46, 10, 2],
      statements: [
        {
          kind: "return",
          loc: [9, 3, 9, 15],
          expression: {
            kind: "?.",
            loc: [9, 10, 9, 14],
            expression: {
              kind: "id",
              loc: [9, 10, 9, 11],
              text: "p",
              bindingKey: "p$2dtorvijco8u0$0",
            },
            name: "x",
          },
        },
      ],
    },
  }),
);
const deep = cs.create(
  [12, 14, 14, 3],
  {
    version: "0.0.0",
    filePath: "objects/optional-chain.test.tsx",
    fileHash: "2dtorvijco8u0",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [12, 17, 14, 2],
    parameters: [
      {
        kind: "param",
        loc: [12, 18, 12, 59],
        name: {
          kind: "id",
          loc: [12, 18, 12, 19],
          text: "o",
          bindingKey: "o$2dtorvijco8u0$1",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [12, 64, 14, 2],
      statements: [
        {
          kind: "return",
          loc: [13, 3, 13, 22],
          expression: {
            kind: "?.",
            loc: [13, 10, 13, 21],
            expression: {
              kind: "?.",
              loc: [13, 10, 13, 18],
              expression: {
                kind: "id",
                loc: [13, 10, 13, 11],
                text: "o",
                bindingKey: "o$2dtorvijco8u0$1",
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
  [16, 15, 18, 3],
  {
    version: "0.0.0",
    filePath: "objects/optional-chain.test.tsx",
    fileHash: "2dtorvijco8u0",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [16, 18, 18, 2],
    parameters: [
      {
        kind: "param",
        loc: [16, 19, 16, 35],
        name: {
          kind: "id",
          loc: [16, 19, 16, 20],
          text: "s",
          bindingKey: "s$2dtorvijco8u0$2",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [16, 40, 18, 2],
      statements: [
        {
          kind: "return",
          loc: [17, 3, 17, 25],
          expression: {
            kind: "()",
            loc: [17, 10, 17, 24],
            expression: {
              kind: "?.",
              loc: [17, 10, 17, 19],
              expression: {
                kind: "id",
                loc: [17, 10, 17, 11],
                text: "s",
                bindingKey: "s$2dtorvijco8u0$2",
              },
              name: "concat",
            },
            arguments: [
              {
                kind: "string",
                loc: [17, 20, 17, 23],
                text: "!",
              },
            ],
          },
        },
      ],
    },
  }),
);
it("optionalChain", async (t) => {
  await snapshotCase(
    t,
    "optionalChain",
    cs.create(
      [24, 5, 32, 8],
      {
        version: "0.0.0",
        filePath: "objects/optional-chain.test.tsx",
        fileHash: "2dtorvijco8u0",
        splices: {
          $pick: { value: pick, params: [] },
          $deep: { value: deep, params: [] },
          $shout: { value: shout, params: [] },
        },
        captures: [],
      },
      () => ({
        kind: "obj",
        loc: [24, 9, 32, 6],
        properties: [
          {
            kind: ":",
            loc: [25, 7, 25, 29],
            name: "found",
            initializer: {
              kind: "()",
              loc: [25, 14, 25, 29],
              expression: {
                kind: "splice",
                loc: [25, 14, 25, 19],
                key: "$pick",
              },
              arguments: [
                {
                  kind: "obj",
                  loc: [25, 20, 25, 28],
                  properties: [
                    {
                      kind: ":",
                      loc: [25, 22, 25, 26],
                      name: "x",
                      initializer: {
                        kind: "number",
                        loc: [25, 25, 25, 26],
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
            loc: [26, 7, 26, 27],
            name: "missing",
            initializer: {
              kind: "()",
              loc: [26, 16, 26, 27],
              expression: {
                kind: "splice",
                loc: [26, 16, 26, 21],
                key: "$pick",
              },
              arguments: [
                {
                  kind: "null",
                  loc: [26, 22, 26, 26],
                },
              ],
            },
          },
          {
            kind: ":",
            loc: [27, 7, 27, 39],
            name: "deep",
            initializer: {
              kind: "()",
              loc: [27, 13, 27, 39],
              expression: {
                kind: "splice",
                loc: [27, 13, 27, 18],
                key: "$deep",
              },
              arguments: [
                {
                  kind: "obj",
                  loc: [27, 19, 27, 38],
                  properties: [
                    {
                      kind: ":",
                      loc: [27, 21, 27, 36],
                      name: "inner",
                      initializer: {
                        kind: "obj",
                        loc: [27, 28, 27, 36],
                        properties: [
                          {
                            kind: ":",
                            loc: [27, 30, 27, 34],
                            name: "z",
                            initializer: {
                              kind: "number",
                              loc: [27, 33, 27, 34],
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
            loc: [28, 7, 28, 34],
            name: "cut",
            initializer: {
              kind: "()",
              loc: [28, 12, 28, 34],
              expression: {
                kind: "splice",
                loc: [28, 12, 28, 17],
                key: "$deep",
              },
              arguments: [
                {
                  kind: "obj",
                  loc: [28, 18, 28, 33],
                  properties: [
                    {
                      kind: ":",
                      loc: [28, 20, 28, 31],
                      name: "inner",
                      initializer: {
                        kind: "null",
                        loc: [28, 27, 28, 31],
                      },
                    },
                  ],
                },
              ],
            },
          },
          {
            kind: ":",
            loc: [29, 7, 29, 23],
            name: "top",
            initializer: {
              kind: "()",
              loc: [29, 12, 29, 23],
              expression: {
                kind: "splice",
                loc: [29, 12, 29, 17],
                key: "$deep",
              },
              arguments: [
                {
                  kind: "null",
                  loc: [29, 18, 29, 22],
                },
              ],
            },
          },
          {
            kind: ":",
            loc: [30, 7, 30, 25],
            name: "loud",
            initializer: {
              kind: "()",
              loc: [30, 13, 30, 25],
              expression: {
                kind: "splice",
                loc: [30, 13, 30, 19],
                key: "$shout",
              },
              arguments: [
                {
                  kind: "string",
                  loc: [30, 20, 30, 24],
                  text: "hi",
                },
              ],
            },
          },
          {
            kind: ":",
            loc: [31, 7, 31, 27],
            name: "silent",
            initializer: {
              kind: "()",
              loc: [31, 15, 31, 27],
              expression: {
                kind: "splice",
                loc: [31, 15, 31, 21],
                key: "$shout",
              },
              arguments: [
                {
                  kind: "null",
                  loc: [31, 22, 31, 26],
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
