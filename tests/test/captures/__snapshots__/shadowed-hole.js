import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A hole inside a block that shadows an outer name. Two call sites make the
// script polymorphic, so the splice arrives as a thunk rather than inlined.
//
// Both `total` bindings are the entry's own, and both render under their source
// name — the inner one shadows the outer exactly as it does in the source, and
// a block frames its declarations, so nothing has to tell them apart. What an
// entry captures cannot collide with either: a capture is a parameter, numbered
// `$0` upward, and `$` starts no name a script can write.
function wrapShadowed(fragment) {
  return cs.create(
    [15, 10, 21, 5],
    {
      version: "0.0.0",
      filePath: "captures/shadowed-hole.test.tsx",
      fileHash: "1wiy7dknp0llv",
      splices: { $fragment: { value: fragment, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [15, 13, 21, 4],
      statements: [
        {
          kind: "const",
          loc: [16, 5, 16, 21],
          name: {
            kind: "id",
            loc: [16, 11, 16, 16],
            text: "total",
            bindingKey: "total$1wiy7dknp0llv$0",
          },
          initializer: {
            kind: "number",
            loc: [16, 19, 16, 20],
            value: 1,
          },
        },
        {
          kind: "{}",
          loc: [17, 5, 20, 6],
          statements: [
            {
              kind: "const",
              loc: [18, 7, 18, 23],
              name: {
                kind: "id",
                loc: [18, 13, 18, 18],
                text: "total",
                bindingKey: "total$1wiy7dknp0llv$1",
              },
              initializer: {
                kind: "number",
                loc: [18, 21, 18, 22],
                value: 2,
              },
            },
            {
              kind: "return",
              loc: [19, 7, 19, 32],
              expression: {
                kind: "binop",
                loc: [19, 14, 19, 31],
                left: {
                  kind: "id",
                  loc: [19, 14, 19, 19],
                  text: "total",
                  bindingKey: "total$1wiy7dknp0llv$1",
                },
                operatorToken: "+",
                right: {
                  kind: "splice",
                  loc: [19, 22, 19, 31],
                  key: "$fragment",
                },
              },
            },
          ],
        },
      ],
    }),
  );
}
it("shadowedHole", async (t) => {
  await snapshotCase(
    t,
    "shadowedHole",
    cs.create(
      [28, 5, 28, 58],
      {
        version: "0.0.0",
        filePath: "captures/shadowed-hole.test.tsx",
        fileHash: "1wiy7dknp0llv",
        splices: {
          $0splice0: {
            value: wrapShadowed(
              cs.create(
                [28, 23, 28, 29],
                {
                  version: "0.0.0",
                  filePath: "captures/shadowed-hole.test.tsx",
                  fileHash: "1wiy7dknp0llv",
                  splices: {},
                  captures: [],
                },
                () => ({
                  kind: "number",
                  loc: [28, 26, 28, 28],
                  value: 10,
                }),
              ),
            ),
            params: [],
          },
          $0splice1: {
            value: wrapShadowed(
              cs.create(
                [28, 49, 28, 55],
                {
                  version: "0.0.0",
                  filePath: "captures/shadowed-hole.test.tsx",
                  fileHash: "1wiy7dknp0llv",
                  splices: {},
                  captures: [],
                },
                () => ({
                  kind: "number",
                  loc: [28, 52, 28, 54],
                  value: 20,
                }),
              ),
            ),
            params: [],
          },
        },
        captures: [],
      },
      () => ({
        kind: "binop",
        loc: [28, 8, 28, 57],
        left: {
          kind: "splice",
          loc: [28, 8, 28, 31],
          key: "$0splice0",
        },
        operatorToken: "+",
        right: {
          kind: "splice",
          loc: [28, 34, 28, 57],
          key: "$0splice1",
        },
      }),
    ),
  );
});
