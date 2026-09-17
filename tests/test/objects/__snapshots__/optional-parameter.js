import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `?` marks an optional parameter — sugar for `T | undefined`. A caller may
// pass `undefined` where the argument is not supplied; `null` is a value of
// its own and not accepted here.
const greet = cs.create(
  [8, 15, 10, 3],
  {
    version: "0.0.0",
    filePath: "objects/optional-parameter.test.tsx",
    fileHash: "9e5jt4ky6olv",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [8, 18, 10, 2],
    parameters: [
      {
        kind: "param",
        loc: [8, 19, 8, 32],
        name: {
          kind: "id",
          loc: [8, 19, 8, 23],
          text: "name",
          bindingKey: "name$9e5jt4ky6olv$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [8, 37, 10, 2],
      statements: [
        {
          kind: "return",
          loc: [9, 3, 9, 28],
          expression: {
            kind: "()",
            loc: [9, 10, 9, 27],
            expression: {
              kind: "?.",
              loc: [9, 10, 9, 22],
              expression: {
                kind: "id",
                loc: [9, 10, 9, 14],
                text: "name",
                bindingKey: "name$9e5jt4ky6olv$0",
              },
              name: "concat",
            },
            arguments: [
              {
                kind: "string",
                loc: [9, 23, 9, 26],
                text: "!",
              },
            ],
          },
        },
      ],
    },
  }),
);
// A function-typed annotation unions parenthesized: `(() => number) |
// undefined`.
const double = cs.create(
  [14, 16, 14, 27],
  {
    version: "0.0.0",
    filePath: "objects/optional-parameter.test.tsx",
    fileHash: "9e5jt4ky6olv",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [14, 19, 14, 26],
    parameters: [],
    body: {
      kind: "number",
      loc: [14, 25, 14, 26],
      value: 2,
    },
  }),
);
const callIfGiven = cs.create(
  [16, 21, 18, 3],
  {
    version: "0.0.0",
    filePath: "objects/optional-parameter.test.tsx",
    fileHash: "9e5jt4ky6olv",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [16, 24, 18, 2],
    parameters: [
      {
        kind: "param",
        loc: [16, 25, 16, 42],
        name: {
          kind: "id",
          loc: [16, 25, 16, 27],
          text: "cb",
          bindingKey: "cb$9e5jt4ky6olv$1",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [16, 47, 18, 2],
      statements: [
        {
          kind: "return",
          loc: [17, 3, 17, 22],
          expression: {
            kind: "binop",
            loc: [17, 10, 17, 21],
            left: {
              kind: "?.()",
              loc: [17, 10, 17, 16],
              expression: {
                kind: "id",
                loc: [17, 10, 17, 12],
                text: "cb",
                bindingKey: "cb$9e5jt4ky6olv$1",
              },
              arguments: [],
            },
            operatorToken: "??",
            right: {
              kind: "number",
              loc: [17, 20, 17, 21],
              value: 0,
            },
          },
        },
      ],
    },
  }),
);
it("optionalParameter", async (t) => {
  await snapshotCase(
    t,
    "optionalParameter",
    cs.create(
      [24, 5, 29, 8],
      {
        version: "0.0.0",
        filePath: "objects/optional-parameter.test.tsx",
        fileHash: "9e5jt4ky6olv",
        splices: {
          $greet: { value: greet, params: [] },
          $callIfGiven: { value: callIfGiven, params: [] },
          $double: { value: double, params: [] },
        },
        captures: [],
      },
      () => ({
        kind: "obj",
        loc: [24, 9, 29, 6],
        properties: [
          {
            kind: ":",
            loc: [25, 7, 25, 26],
            name: {
              kind: "string",
              loc: [25, 7, 25, 12],
              text: "named",
            },
            initializer: {
              kind: "()",
              loc: [25, 14, 25, 26],
              expression: {
                kind: "splice",
                loc: [25, 14, 25, 20],
                key: "$greet",
              },
              arguments: [
                {
                  kind: "string",
                  loc: [25, 21, 25, 25],
                  text: "hi",
                },
              ],
            },
          },
          {
            kind: ":",
            loc: [26, 7, 26, 34],
            name: {
              kind: "string",
              loc: [26, 7, 26, 15],
              text: "explicit",
            },
            initializer: {
              kind: "()",
              loc: [26, 17, 26, 34],
              expression: {
                kind: "splice",
                loc: [26, 17, 26, 23],
                key: "$greet",
              },
              arguments: [
                {
                  kind: "undefined",
                  loc: [26, 24, 26, 33],
                },
              ],
            },
          },
          {
            kind: ":",
            loc: [27, 7, 27, 38],
            name: {
              kind: "string",
              loc: [27, 7, 27, 15],
              text: "supplied",
            },
            initializer: {
              kind: "()",
              loc: [27, 17, 27, 38],
              expression: {
                kind: "splice",
                loc: [27, 17, 27, 29],
                key: "$callIfGiven",
              },
              arguments: [
                {
                  kind: "splice",
                  loc: [27, 30, 27, 37],
                  key: "$double",
                },
              ],
            },
          },
          {
            kind: ":",
            loc: [28, 7, 28, 40],
            name: {
              kind: "string",
              loc: [28, 7, 28, 15],
              text: "fallback",
            },
            initializer: {
              kind: "()",
              loc: [28, 17, 28, 40],
              expression: {
                kind: "splice",
                loc: [28, 17, 28, 29],
                key: "$callIfGiven",
              },
              arguments: [
                {
                  kind: "undefined",
                  loc: [28, 30, 28, 39],
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
