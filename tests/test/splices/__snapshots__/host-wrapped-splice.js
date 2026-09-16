import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Splices that arrive through host code — the case a hole can never be resolved
// from source, because what the compiler sees at the hole is a call expression
// and not a template.
//
// Two shapes, and the second is the one that matters. `foo` builds a new
// script, written at its own location outside the enclosing one, so nothing
// about it looks lexical. `same` hands back the template it was given: the
// script that lands at the hole *is* written inside the enclosing script's
// span, and still can't be read off that span, because only running `same` says
// it goes there. Anything that resolves a hole by comparing spans gets this one
// wrong.
function wrap(start) {
  return cs.create(
    [17, 10, 23, 5],
    {
      version: "0.0.0",
      filePath: "splices/host-wrapped-splice.test.tsx",
      fileHash: "zqr0jsdf8ub6",
      splices: {
        $start: { value: start, params: [] },
        $0splice0: {
          value: foo(
            cs.create(
              [19, 18, 22, 7],
              {
                version: "0.0.0",
                filePath: "splices/host-wrapped-splice.test.tsx",
                fileHash: "zqr0jsdf8ub6",
                splices: {
                  $0splice0: {
                    value: same(
                      cs.create(
                        [21, 30, 21, 39],
                        {
                          version: "0.0.0",
                          filePath: "splices/host-wrapped-splice.test.tsx",
                          fileHash: "zqr0jsdf8ub6",
                          splices: {},
                          captures: ["outer$zqr0jsdf8ub6$0"],
                        },
                        () => ({
                          kind: "id",
                          loc: [21, 33, 21, 38],
                          text: "outer",
                          bindingKey: "outer$zqr0jsdf8ub6$0",
                        }),
                      ),
                    ),
                    params: [],
                  },
                },
                captures: ["outer$zqr0jsdf8ub6$0"],
              },
              () => ({
                kind: "{}",
                loc: [19, 21, 22, 6],
                statements: [
                  {
                    kind: "const",
                    loc: [20, 7, 20, 25],
                    name: {
                      kind: "id",
                      loc: [20, 13, 20, 19],
                      text: "middle",
                      bindingKey: "middle$zqr0jsdf8ub6$1",
                    },
                    initializer: {
                      kind: "number",
                      loc: [20, 22, 20, 24],
                      value: 10,
                    },
                  },
                  {
                    kind: "return",
                    loc: [21, 7, 21, 42],
                    expression: {
                      kind: "binop",
                      loc: [21, 14, 21, 41],
                      left: {
                        kind: "id",
                        loc: [21, 14, 21, 20],
                        text: "middle",
                        bindingKey: "middle$zqr0jsdf8ub6$1",
                      },
                      operatorToken: "+",
                      right: {
                        kind: "splice",
                        loc: [21, 23, 21, 41],
                        key: "$0splice0",
                      },
                    },
                  },
                ],
              }),
            ),
          ),
          params: ["outer$zqr0jsdf8ub6$0"],
        },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [17, 13, 23, 4],
      statements: [
        {
          kind: "const",
          loc: [18, 5, 18, 26],
          name: {
            kind: "id",
            loc: [18, 11, 18, 16],
            text: "outer",
            bindingKey: "outer$zqr0jsdf8ub6$0",
          },
          initializer: {
            kind: "splice",
            loc: [18, 19, 18, 25],
            key: "$start",
          },
        },
        {
          kind: "return",
          loc: [19, 5, 22, 10],
          expression: {
            kind: "splice",
            loc: [19, 12, 22, 9],
            key: "$0splice0",
          },
        },
      ],
    }),
  );
}
function foo(start) {
  return cs.create(
    [27, 10, 27, 24],
    {
      version: "0.0.0",
      filePath: "splices/host-wrapped-splice.test.tsx",
      fileHash: "zqr0jsdf8ub6",
      splices: { $start: { value: start, params: [] } },
      captures: [],
    },
    () => ({
      kind: "binop",
      loc: [27, 13, 27, 23],
      left: {
        kind: "splice",
        loc: [27, 13, 27, 19],
        key: "$start",
      },
      operatorToken: "+",
      right: {
        kind: "number",
        loc: [27, 22, 27, 23],
        value: 1,
      },
    }),
  );
}
function same(script) {
  return script;
}
it("hostWrappedSplice", async (t) => {
  await snapshotCase(
    t,
    "hostWrappedSplice",
    cs.create(
      [38, 5, 38, 40],
      {
        version: "0.0.0",
        filePath: "splices/host-wrapped-splice.test.tsx",
        fileHash: "zqr0jsdf8ub6",
        splices: {
          $0splice0: {
            value: wrap(
              cs.create(
                [38, 15, 38, 20],
                {
                  version: "0.0.0",
                  filePath: "splices/host-wrapped-splice.test.tsx",
                  fileHash: "zqr0jsdf8ub6",
                  splices: {},
                  captures: [],
                },
                () => ({
                  kind: "number",
                  loc: [38, 18, 38, 19],
                  value: 1,
                }),
              ),
            ),
            params: [],
          },
          $0splice1: {
            value: wrap(
              cs.create(
                [38, 32, 38, 37],
                {
                  version: "0.0.0",
                  filePath: "splices/host-wrapped-splice.test.tsx",
                  fileHash: "zqr0jsdf8ub6",
                  splices: {},
                  captures: [],
                },
                () => ({
                  kind: "number",
                  loc: [38, 35, 38, 36],
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
        loc: [38, 8, 38, 39],
        left: {
          kind: "splice",
          loc: [38, 8, 38, 22],
          key: "$0splice0",
        },
        operatorToken: "+",
        right: {
          kind: "splice",
          loc: [38, 25, 38, 39],
          key: "$0splice1",
        },
      }),
    ),
  );
});
