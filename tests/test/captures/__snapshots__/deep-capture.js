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
    [18, 10, 24, 5],
    {
      version: "0.0.0",
      filePath: "captures/deep-capture.test.tsx",
      fileHash: "22sufdxid1i7s",
      splices: {
        $start: { value: start, params: [] },
        $0splice0: {
          value: cs.create(
            [20, 14, 23, 7],
            {
              version: "0.0.0",
              filePath: "captures/deep-capture.test.tsx",
              fileHash: "22sufdxid1i7s",
              splices: {
                $0splice0: {
                  value: cs.create(
                    [22, 25, 22, 34],
                    {
                      version: "0.0.0",
                      filePath: "captures/deep-capture.test.tsx",
                      fileHash: "22sufdxid1i7s",
                      splices: {},
                      captures: ["outer$22sufdxid1i7s$0"],
                    },
                    () => ({
                      kind: "id",
                      loc: [22, 28, 22, 33],
                      text: "outer",
                      bindingKey: "outer$22sufdxid1i7s$0",
                    }),
                  ),
                  params: [],
                },
              },
              captures: ["outer$22sufdxid1i7s$0"],
            },
            () => ({
              kind: "{}",
              loc: [20, 17, 23, 6],
              statements: [
                {
                  kind: "const",
                  loc: [21, 7, 21, 25],
                  name: {
                    kind: "id",
                    loc: [21, 13, 21, 19],
                    text: "middle",
                    bindingKey: "middle$22sufdxid1i7s$1",
                  },
                  initializer: {
                    kind: "number",
                    loc: [21, 22, 21, 24],
                    value: 10,
                  },
                },
                {
                  kind: "return",
                  loc: [22, 7, 22, 36],
                  expression: {
                    kind: "binop",
                    loc: [22, 14, 22, 35],
                    left: {
                      kind: "id",
                      loc: [22, 14, 22, 20],
                      text: "middle",
                      bindingKey: "middle$22sufdxid1i7s$1",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "splice",
                      loc: [22, 23, 22, 35],
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
      kind: "{}",
      loc: [18, 13, 24, 4],
      statements: [
        {
          kind: "const",
          loc: [19, 5, 19, 26],
          name: {
            kind: "id",
            loc: [19, 11, 19, 16],
            text: "outer",
            bindingKey: "outer$22sufdxid1i7s$0",
          },
          initializer: {
            kind: "splice",
            loc: [19, 19, 19, 25],
            key: "$start",
          },
        },
        {
          kind: "return",
          loc: [20, 5, 23, 9],
          expression: {
            kind: "splice",
            loc: [20, 12, 23, 8],
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
      [28, 40, 28, 75],
      {
        version: "0.0.0",
        filePath: "captures/deep-capture.test.tsx",
        fileHash: "22sufdxid1i7s",
        splices: {
          $0splice0: {
            value: wrap(
              cs.create(
                [28, 50, 28, 55],
                {
                  version: "0.0.0",
                  filePath: "captures/deep-capture.test.tsx",
                  fileHash: "22sufdxid1i7s",
                  splices: {},
                  captures: [],
                },
                () => ({
                  kind: "number",
                  loc: [28, 53, 28, 54],
                  value: 1,
                }),
              ),
            ),
            params: [],
          },
          $0splice1: {
            value: wrap(
              cs.create(
                [28, 67, 28, 72],
                {
                  version: "0.0.0",
                  filePath: "captures/deep-capture.test.tsx",
                  fileHash: "22sufdxid1i7s",
                  splices: {},
                  captures: [],
                },
                () => ({
                  kind: "number",
                  loc: [28, 70, 28, 71],
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
        kind: "binop",
        loc: [28, 43, 28, 74],
        left: {
          kind: "splice",
          loc: [28, 43, 28, 57],
          key: "$0splice0",
        },
        operatorToken: "+",
        right: {
          kind: "splice",
          loc: [28, 60, 28, 74],
          key: "$0splice1",
        },
      }),
    ),
  );
});
