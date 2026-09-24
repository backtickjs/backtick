import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Three scripts, and the binding skips the middle one.
//
// The outer script declares `outer`; the innermost references it. The script
// between them neither declares nor mentions it, so it has no capture of its
// own — the binding still has to reach through it, and the outer script has to
// know its declaration escaped even though the script that took it is two
// levels down.
//
// Two call sites make the outer script polymorphic, so its splice arrives as a
// thunk: `captured` is what the hole hands that thunk, which is the only place
// a wrong answer would show up.
function wrap(start) {
  return cs.create(
    { start: { line: 18, column: 9 }, end: { line: 24, column: 4 } },
    {
      version: "0.0.0",
      filePath: "captures/deep-capture.test.tsx",
      fileHash: "22sufdxid1i7s",
      splices: {
        $start: { value: start, params: [] },
        $0splice0: {
          value: cs.create(
            { start: { line: 20, column: 13 }, end: { line: 23, column: 6 } },
            {
              version: "0.0.0",
              filePath: "captures/deep-capture.test.tsx",
              fileHash: "22sufdxid1i7s",
              splices: {
                $0splice0: {
                  value: cs.create(
                    {
                      start: { line: 22, column: 24 },
                      end: { line: 22, column: 33 },
                    },
                    {
                      version: "0.0.0",
                      filePath: "captures/deep-capture.test.tsx",
                      fileHash: "22sufdxid1i7s",
                      splices: {},
                      captures: ["outer$22sufdxid1i7s$0"],
                    },
                    () => ({
                      type: "Identifier",
                      loc: {
                        start: { line: 22, column: 27 },
                        end: { line: 22, column: 32 },
                      },
                      name: "outer",
                      bindingKey: "outer$22sufdxid1i7s$0",
                    }),
                  ),
                  params: [],
                },
              },
              captures: ["outer$22sufdxid1i7s$0"],
            },
            () => ({
              type: "BlockStatement",
              loc: {
                start: { line: 20, column: 16 },
                end: { line: 23, column: 5 },
              },
              body: [
                {
                  type: "VariableDeclaration",
                  loc: {
                    start: { line: 21, column: 6 },
                    end: { line: 21, column: 24 },
                  },
                  kind: "const",
                  declarations: [
                    {
                      type: "VariableDeclarator",
                      loc: {
                        start: { line: 21, column: 12 },
                        end: { line: 21, column: 23 },
                      },
                      id: {
                        type: "Identifier",
                        loc: {
                          start: { line: 21, column: 12 },
                          end: { line: 21, column: 18 },
                        },
                        name: "middle",
                        bindingKey: "middle$22sufdxid1i7s$1",
                      },
                      init: {
                        type: "Literal",
                        loc: {
                          start: { line: 21, column: 21 },
                          end: { line: 21, column: 23 },
                        },
                        value: 10,
                      },
                    },
                  ],
                },
                {
                  type: "ReturnStatement",
                  loc: {
                    start: { line: 22, column: 6 },
                    end: { line: 22, column: 35 },
                  },
                  argument: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 22, column: 13 },
                      end: { line: 22, column: 34 },
                    },
                    operator: "+",
                    left: {
                      type: "Identifier",
                      loc: {
                        start: { line: 22, column: 13 },
                        end: { line: 22, column: 19 },
                      },
                      name: "middle",
                      bindingKey: "middle$22sufdxid1i7s$1",
                    },
                    right: {
                      type: "Splice",
                      loc: {
                        start: { line: 22, column: 22 },
                        end: { line: 22, column: 34 },
                      },
                      key: "$0splice0",
                    },
                  },
                },
              ],
            }),
          ),
          params: ["outer$22sufdxid1i7s$0"],
        },
      },
      captures: [],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 18, column: 12 }, end: { line: 24, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 19, column: 4 },
            end: { line: 19, column: 25 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 19, column: 10 },
                end: { line: 19, column: 24 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 19, column: 10 },
                  end: { line: 19, column: 15 },
                },
                name: "outer",
                bindingKey: "outer$22sufdxid1i7s$0",
              },
              init: {
                type: "Splice",
                loc: {
                  start: { line: 19, column: 18 },
                  end: { line: 19, column: 24 },
                },
                key: "$start",
              },
            },
          ],
        },
        {
          type: "ReturnStatement",
          loc: { start: { line: 20, column: 4 }, end: { line: 23, column: 8 } },
          argument: {
            type: "Splice",
            loc: {
              start: { line: 20, column: 11 },
              end: { line: 23, column: 7 },
            },
            key: "$0splice0",
          },
        },
      ],
    }),
  );
}
it("deepCapture", async (t) => {
  await snapshotCase(
    t,
    "deepCapture",
    cs.create(
      { start: { line: 28, column: 39 }, end: { line: 28, column: 74 } },
      {
        version: "0.0.0",
        filePath: "captures/deep-capture.test.tsx",
        fileHash: "22sufdxid1i7s",
        splices: {
          $0splice0: {
            value: wrap(
              cs.create(
                {
                  start: { line: 28, column: 49 },
                  end: { line: 28, column: 54 },
                },
                {
                  version: "0.0.0",
                  filePath: "captures/deep-capture.test.tsx",
                  fileHash: "22sufdxid1i7s",
                  splices: {},
                  captures: [],
                },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 28, column: 52 },
                    end: { line: 28, column: 53 },
                  },
                  value: 1,
                }),
              ),
            ),
            params: [],
          },
          $0splice1: {
            value: wrap(
              cs.create(
                {
                  start: { line: 28, column: 66 },
                  end: { line: 28, column: 71 },
                },
                {
                  version: "0.0.0",
                  filePath: "captures/deep-capture.test.tsx",
                  fileHash: "22sufdxid1i7s",
                  splices: {},
                  captures: [],
                },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 28, column: 69 },
                    end: { line: 28, column: 70 },
                  },
                  value: 2,
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
        loc: { start: { line: 28, column: 42 }, end: { line: 28, column: 73 } },
        operator: "+",
        left: {
          type: "Splice",
          loc: {
            start: { line: 28, column: 42 },
            end: { line: 28, column: 56 },
          },
          key: "$0splice0",
        },
        right: {
          type: "Splice",
          loc: {
            start: { line: 28, column: 59 },
            end: { line: 28, column: 73 },
          },
          key: "$0splice1",
        },
      }),
    ),
  );
});
