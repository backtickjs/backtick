import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A host helper reused with different splices makes its script polymorphic:
// the holes can't be inlined, so every call site passes its splice as a
// thunk and the body evaluates `$0()` at the hole. The thunk is what keeps
// the hole as lazy as an inlined splice: `guard(broken)(false)` never
// reaches its hole, so the broken fragment must never evaluate — passed
// eagerly (by value instead of by thunk) it would throw before `flag` was
// even tested.
function guard(fragment) {
  return cs.create(
    [13, 10, 18, 5],
    {
      version: "0.0.0",
      filePath: "splices/splice-laziness.test.tsx",
      fileHash: "3cvzb2rrvx0i4",
      splices: { $fragment: { value: fragment, params: [] } },
      captures: [],
    },
    () => ({
      kind: "=>",
      loc: [13, 13, 18, 4],
      parameters: [
        {
          kind: "param",
          loc: [13, 14, 13, 27],
          name: {
            kind: "id",
            loc: [13, 14, 13, 18],
            text: "flag",
            bindingKey: "flag$3cvzb2rrvx0i4$0",
          },
        },
      ],
      body: {
        kind: "{}",
        loc: [13, 32, 18, 4],
        statements: [
          {
            kind: "if",
            loc: [14, 5, 16, 6],
            expression: {
              kind: "id",
              loc: [14, 9, 14, 13],
              text: "flag",
              bindingKey: "flag$3cvzb2rrvx0i4$0",
            },
            thenStatement: {
              kind: "{}",
              loc: [14, 15, 16, 6],
              statements: [
                {
                  kind: "return",
                  loc: [15, 7, 15, 24],
                  expression: {
                    kind: "splice",
                    loc: [15, 14, 15, 23],
                    key: "$fragment",
                  },
                },
              ],
            },
            elseStatement: null,
          },
          {
            kind: "return",
            loc: [17, 5, 17, 22],
            expression: {
              kind: "string",
              loc: [17, 12, 17, 21],
              text: "skipped",
            },
          },
        ],
      },
    }),
  );
}
const ok = cs.create(
  [21, 12, 21, 27],
  {
    version: "0.0.0",
    filePath: "splices/splice-laziness.test.tsx",
    fileHash: "3cvzb2rrvx0i4",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "string",
    loc: [21, 15, 21, 26],
    text: "evaluated",
  }),
);
const broken = cs.create(
  [23, 16, 25, 3],
  {
    version: "0.0.0",
    filePath: "splices/splice-laziness.test.tsx",
    fileHash: "3cvzb2rrvx0i4",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [23, 19, 25, 2],
    statements: [
      {
        kind: "throw",
        loc: [24, 3, 24, 52],
        expression: {
          kind: "string",
          loc: [24, 9, 24, 51],
          text: "the guarded fragment must never evaluate",
        },
      },
    ],
  }),
);
it("spliceLaziness", async (t) => {
  await snapshotCase(
    t,
    "spliceLaziness",
    cs.create(
      [31, 5, 34, 8],
      {
        version: "0.0.0",
        filePath: "splices/splice-laziness.test.tsx",
        fileHash: "3cvzb2rrvx0i4",
        splices: {
          $0splice0: { value: guard(ok), params: [] },
          $0splice1: { value: guard(broken), params: [] },
        },
        captures: [],
      },
      () => ({
        kind: "obj",
        loc: [31, 9, 34, 6],
        properties: [
          {
            kind: ":",
            loc: [32, 7, 32, 32],
            name: "taken",
            initializer: {
              kind: "()",
              loc: [32, 14, 32, 32],
              expression: {
                kind: "splice",
                loc: [32, 14, 32, 26],
                key: "$0splice0",
              },
              arguments: [
                {
                  kind: "true",
                  loc: [32, 27, 32, 31],
                },
              ],
            },
          },
          {
            kind: ":",
            loc: [33, 7, 33, 39],
            name: "skipped",
            initializer: {
              kind: "()",
              loc: [33, 16, 33, 39],
              expression: {
                kind: "splice",
                loc: [33, 16, 33, 32],
                key: "$0splice1",
              },
              arguments: [
                {
                  kind: "false",
                  loc: [33, 33, 33, 38],
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
