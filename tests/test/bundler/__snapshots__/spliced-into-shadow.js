import assert from "node:assert/strict";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
// A fragment written under the outer `total`, carried by host code into a hole
// inside a block that shadows it.
//
// Refused. The binding is still in scope there, and the bundler could reach it
// by renaming the inner one — which is what it used to do, quietly returning 5
// where the fragment meant 4. But no JavaScript can name a shadowed binding
// from inside the scope that shadows it, and a bundle should not be able to say
// what its source cannot. The behaviour itself is ordinary — a closure written
// in the outer scope and called in the inner does exactly this — so the fix is
// to splice the fragment where its binding is not shadowed.
let carried;
const keep = (fragment) => {
  carried = fragment;
  return fragment;
};
const again = () => {
  if (carried === undefined) {
    throw new Error("the first hole runs first");
  }
  return carried;
};
it("refuses a capture spliced where it is shadowed", async () => {
  await assert.rejects(
    bundler.run(
      cs.create(
        { start: { line: 32, column: 16 }, end: { line: 39, column: 6 } },
        {
          fileHash: "1rcr3g75v4qq5",
          splices: {
            $0splice0: {
              value: keep(
                cs.create(
                  {
                    start: { line: 34, column: 27 },
                    end: { line: 34, column: 36 },
                  },
                  {
                    fileHash: "1rcr3g75v4qq5",
                    splices: {},
                    captures: ["total$1rcr3g75v4qq5$0"],
                  },
                  () => ({
                    type: "Identifier",
                    loc: {
                      start: { line: 34, column: 30 },
                      end: { line: 34, column: 35 },
                    },
                    name: "total",
                    key: "total$1rcr3g75v4qq5$0",
                  }),
                  "$0 => $0",
                  '{"version":3,"file":"spliced-into-shadow.test.jsx","sourceRoot":"","sources":["spliced-into-shadow.test.tsx"],"names":[],"mappings":"AAiC8B,MAAA,EAAK,CAAA"}',
                ),
              ),
              params: ["total$1rcr3g75v4qq5$0"],
            },
            $0splice1: { value: again(), params: [] },
          },
          captures: [],
        },
        () => ({
          type: "BlockStatement",
          loc: {
            start: { line: 32, column: 19 },
            end: { line: 39, column: 5 },
          },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 33, column: 6 },
                end: { line: 33, column: 22 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 33, column: 12 },
                    end: { line: 33, column: 21 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 33, column: 12 },
                      end: { line: 33, column: 17 },
                    },
                    name: "total",
                    key: "total$1rcr3g75v4qq5$0",
                  },
                  init: {
                    type: "Literal",
                    loc: {
                      start: { line: 33, column: 20 },
                      end: { line: 33, column: 21 },
                    },
                    value: 1,
                  },
                },
              ],
            },
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 34, column: 6 },
                end: { line: 34, column: 39 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 34, column: 12 },
                    end: { line: 34, column: 38 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 34, column: 12 },
                      end: { line: 34, column: 17 },
                    },
                    name: "first",
                    key: "first$1rcr3g75v4qq5$1",
                  },
                  init: {
                    type: "Splice",
                    loc: {
                      start: { line: 34, column: 20 },
                      end: { line: 34, column: 38 },
                    },
                    key: "$0splice0",
                  },
                },
              ],
            },
            {
              type: "BlockStatement",
              loc: {
                start: { line: 35, column: 6 },
                end: { line: 38, column: 7 },
              },
              body: [
                {
                  type: "VariableDeclaration",
                  loc: {
                    start: { line: 36, column: 8 },
                    end: { line: 36, column: 24 },
                  },
                  kind: "const",
                  declarations: [
                    {
                      type: "VariableDeclarator",
                      loc: {
                        start: { line: 36, column: 14 },
                        end: { line: 36, column: 23 },
                      },
                      id: {
                        type: "Identifier",
                        loc: {
                          start: { line: 36, column: 14 },
                          end: { line: 36, column: 19 },
                        },
                        name: "total",
                        key: "total$1rcr3g75v4qq5$2",
                      },
                      init: {
                        type: "Literal",
                        loc: {
                          start: { line: 36, column: 22 },
                          end: { line: 36, column: 23 },
                        },
                        value: 2,
                      },
                    },
                  ],
                },
                {
                  type: "ReturnStatement",
                  loc: {
                    start: { line: 37, column: 8 },
                    end: { line: 37, column: 42 },
                  },
                  argument: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 37, column: 15 },
                      end: { line: 37, column: 41 },
                    },
                    operator: "+",
                    left: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 37, column: 15 },
                        end: { line: 37, column: 28 },
                      },
                      operator: "+",
                      left: {
                        type: "Identifier",
                        loc: {
                          start: { line: 37, column: 15 },
                          end: { line: 37, column: 20 },
                        },
                        name: "first",
                        key: "first$1rcr3g75v4qq5$1",
                      },
                      right: {
                        type: "Identifier",
                        loc: {
                          start: { line: 37, column: 23 },
                          end: { line: 37, column: 28 },
                        },
                        name: "total",
                        key: "total$1rcr3g75v4qq5$2",
                      },
                    },
                    right: {
                      type: "Splice",
                      loc: {
                        start: { line: 37, column: 31 },
                        end: { line: 37, column: 41 },
                      },
                      key: "$0splice1",
                    },
                  },
                },
              ],
            },
          ],
        }),
        "($0, $1) => {\n    const total = 1;\n    const first = $0(total);\n    {\n        const total = 2;\n        return first + total + $1();\n    }\n}",
        '{"version":3,"file":"spliced-into-shadow.test.jsx","sourceRoot":"","sources":["spliced-into-shadow.test.tsx"],"names":[],"mappings":"AA+BmB;IACb,MAAM,KAAK,GAAG,CAAC,CAAC;IAChB,MAAM,KAAK,GAAG,SAAC,CAAkB;IACjC,CAAC;QACC,MAAM,KAAK,GAAG,CAAC,CAAC;QAChB,OAAO,KAAK,GAAG,KAAK,GAAG,IAAC,CAAU;IACpC,CAAC;AACH,CAAC,CAAA"}',
      ),
    ),
    {
      message:
        "Can't thread the capture `total`: nothing encloses this reference to supply it. A fragment carries the bindings it was written under, so this is also what happens when one is spliced somewhere another `total` shadows it: the binding is still there, but no longer reachable by name, and naming it anyway would mean emitting what the source couldn't say.",
    },
  );
});
