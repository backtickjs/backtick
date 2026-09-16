import { cs } from "@backtickjs/core";
// A host helper reused with different splices makes its script polymorphic:
// the holes can't be inlined, so every call site passes its splice as a
// thunk and the body evaluates `$0()` at the hole. The thunk is what keeps
// the hole as lazy as an inlined splice: `guard(broken)(false)` never
// reaches its hole, so the broken fragment must never evaluate — passed
// eagerly (by value instead of by thunk) it would throw before `flag` was
// even tested.
function guard(fragment) {
  return cs.create(
    [11, 10, 16, 5],
    {
      version: "0.0.0",
      filePath: "spliceLaziness.tsx",
      fileHash: "31cxejmyerl7a",
      splices: { $fragment: { value: fragment, params: [] } },
      captures: [],
    },
    () => ({
      kind: "=>",
      loc: [11, 13, 16, 4],
      parameters: [
        {
          kind: "param",
          loc: [11, 14, 11, 27],
          name: {
            kind: "id",
            loc: [11, 14, 11, 18],
            text: "flag",
            bindingKey: "flag$31cxejmyerl7a$0",
          },
        },
      ],
      body: {
        kind: "{}",
        loc: [11, 32, 16, 4],
        statements: [
          {
            kind: "if",
            loc: [12, 5, 14, 6],
            expression: {
              kind: "id",
              loc: [12, 9, 12, 13],
              text: "flag",
              bindingKey: "flag$31cxejmyerl7a$0",
            },
            thenStatement: {
              kind: "{}",
              loc: [12, 15, 14, 6],
              statements: [
                {
                  kind: "return",
                  loc: [13, 7, 13, 24],
                  expression: {
                    kind: "splice",
                    loc: [13, 14, 13, 23],
                    key: "$fragment",
                  },
                },
              ],
            },
            elseStatement: null,
          },
          {
            kind: "return",
            loc: [15, 5, 15, 22],
            expression: {
              kind: "string",
              loc: [15, 12, 15, 21],
              text: "skipped",
            },
          },
        ],
      },
    }),
  );
}
const ok = cs.create(
  [19, 12, 19, 27],
  {
    version: "0.0.0",
    filePath: "spliceLaziness.tsx",
    fileHash: "31cxejmyerl7a",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "string",
    loc: [19, 15, 19, 26],
    text: "evaluated",
  }),
);
const broken = cs.create(
  [21, 16, 23, 3],
  {
    version: "0.0.0",
    filePath: "spliceLaziness.tsx",
    fileHash: "31cxejmyerl7a",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [21, 19, 23, 2],
    statements: [
      {
        kind: "throw",
        loc: [22, 3, 22, 52],
        expression: {
          kind: "string",
          loc: [22, 9, 22, 51],
          text: "the guarded fragment must never evaluate",
        },
      },
    ],
  }),
);
const spliceLaziness = cs.create(
  [25, 24, 28, 4],
  {
    version: "0.0.0",
    filePath: "spliceLaziness.tsx",
    fileHash: "31cxejmyerl7a",
    splices: {
      $0splice0: { value: guard(ok), params: [] },
      $0splice1: { value: guard(broken), params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "obj",
    loc: [25, 28, 28, 2],
    properties: [
      {
        kind: ":",
        loc: [26, 3, 26, 28],
        name: "taken",
        initializer: {
          kind: "()",
          loc: [26, 10, 26, 28],
          expression: {
            kind: "splice",
            loc: [26, 10, 26, 22],
            key: "$0splice0",
          },
          arguments: [
            {
              kind: "true",
              loc: [26, 23, 26, 27],
            },
          ],
        },
      },
      {
        kind: ":",
        loc: [27, 3, 27, 35],
        name: "skipped",
        initializer: {
          kind: "()",
          loc: [27, 12, 27, 35],
          expression: {
            kind: "splice",
            loc: [27, 12, 27, 28],
            key: "$0splice1",
          },
          arguments: [
            {
              kind: "false",
              loc: [27, 29, 27, 34],
            },
          ],
        },
      },
    ],
  }),
);
