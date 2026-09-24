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
    { start: { line: 15, column: 9 }, end: { line: 21, column: 4 } },
    {
      filePath: "captures/shadowed-hole.test.tsx",
      fileHash: "1wiy7dknp0llv",
      splices: { $fragment: { value: fragment, params: [] } },
      captures: [],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 15, column: 12 }, end: { line: 21, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 16, column: 4 },
            end: { line: 16, column: 20 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 16, column: 10 },
                end: { line: 16, column: 19 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 16, column: 10 },
                  end: { line: 16, column: 15 },
                },
                name: "total",
                key: "total$1wiy7dknp0llv$0",
              },
              init: {
                type: "Literal",
                loc: {
                  start: { line: 16, column: 18 },
                  end: { line: 16, column: 19 },
                },
                value: 1,
              },
            },
          ],
        },
        {
          type: "BlockStatement",
          loc: { start: { line: 17, column: 4 }, end: { line: 20, column: 5 } },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 18, column: 6 },
                end: { line: 18, column: 22 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 18, column: 12 },
                    end: { line: 18, column: 21 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 18, column: 12 },
                      end: { line: 18, column: 17 },
                    },
                    name: "total",
                    key: "total$1wiy7dknp0llv$1",
                  },
                  init: {
                    type: "Literal",
                    loc: {
                      start: { line: 18, column: 20 },
                      end: { line: 18, column: 21 },
                    },
                    value: 2,
                  },
                },
              ],
            },
            {
              type: "ReturnStatement",
              loc: {
                start: { line: 19, column: 6 },
                end: { line: 19, column: 31 },
              },
              argument: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 19, column: 13 },
                  end: { line: 19, column: 30 },
                },
                operator: "+",
                left: {
                  type: "Identifier",
                  loc: {
                    start: { line: 19, column: 13 },
                    end: { line: 19, column: 18 },
                  },
                  name: "total",
                  key: "total$1wiy7dknp0llv$1",
                },
                right: {
                  type: "Splice",
                  loc: {
                    start: { line: 19, column: 21 },
                    end: { line: 19, column: 30 },
                  },
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
      { start: { line: 28, column: 4 }, end: { line: 28, column: 57 } },
      {
        filePath: "captures/shadowed-hole.test.tsx",
        fileHash: "1wiy7dknp0llv",
        splices: {
          $0splice0: {
            value: wrapShadowed(
              cs.create(
                {
                  start: { line: 28, column: 22 },
                  end: { line: 28, column: 28 },
                },
                {
                  filePath: "captures/shadowed-hole.test.tsx",
                  fileHash: "1wiy7dknp0llv",
                  splices: {},
                  captures: [],
                },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 28, column: 25 },
                    end: { line: 28, column: 27 },
                  },
                  value: 10,
                }),
              ),
            ),
            params: [],
          },
          $0splice1: {
            value: wrapShadowed(
              cs.create(
                {
                  start: { line: 28, column: 48 },
                  end: { line: 28, column: 54 },
                },
                {
                  filePath: "captures/shadowed-hole.test.tsx",
                  fileHash: "1wiy7dknp0llv",
                  splices: {},
                  captures: [],
                },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 28, column: 51 },
                    end: { line: 28, column: 53 },
                  },
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
        type: "BinaryExpression",
        loc: { start: { line: 28, column: 7 }, end: { line: 28, column: 56 } },
        operator: "+",
        left: {
          type: "Splice",
          loc: {
            start: { line: 28, column: 7 },
            end: { line: 28, column: 30 },
          },
          key: "$0splice0",
        },
        right: {
          type: "Splice",
          loc: {
            start: { line: 28, column: 33 },
            end: { line: 28, column: 56 },
          },
          key: "$0splice1",
        },
      }),
    ),
  );
});
