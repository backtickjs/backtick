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
        [32, 17, 39, 7],
        {
          version: "0.0.0",
          filePath: "bundler/spliced-into-shadow.test.tsx",
          fileHash: "1rcr3g75v4qq5",
          splices: {
            $0splice0: {
              value: keep(
                cs.create(
                  [34, 28, 34, 37],
                  {
                    version: "0.0.0",
                    filePath: "bundler/spliced-into-shadow.test.tsx",
                    fileHash: "1rcr3g75v4qq5",
                    splices: {},
                    captures: ["total$1rcr3g75v4qq5$0"],
                  },
                  () => ({
                    kind: "id",
                    loc: [34, 31, 34, 36],
                    text: "total",
                    bindingKey: "total$1rcr3g75v4qq5$0",
                  }),
                ),
              ),
              params: ["total$1rcr3g75v4qq5$0"],
            },
            $0splice1: { value: again(), params: [] },
          },
          captures: [],
        },
        () => ({
          kind: "{}",
          loc: [32, 20, 39, 6],
          statements: [
            {
              kind: "const",
              loc: [33, 7, 33, 23],
              name: {
                kind: "id",
                loc: [33, 13, 33, 18],
                text: "total",
                bindingKey: "total$1rcr3g75v4qq5$0",
              },
              initializer: {
                kind: "number",
                loc: [33, 21, 33, 22],
                value: 1,
              },
            },
            {
              kind: "const",
              loc: [34, 7, 34, 40],
              name: {
                kind: "id",
                loc: [34, 13, 34, 18],
                text: "first",
                bindingKey: "first$1rcr3g75v4qq5$1",
              },
              initializer: {
                kind: "splice",
                loc: [34, 21, 34, 39],
                key: "$0splice0",
              },
            },
            {
              kind: "{}",
              loc: [35, 7, 38, 8],
              statements: [
                {
                  kind: "const",
                  loc: [36, 9, 36, 25],
                  name: {
                    kind: "id",
                    loc: [36, 15, 36, 20],
                    text: "total",
                    bindingKey: "total$1rcr3g75v4qq5$2",
                  },
                  initializer: {
                    kind: "number",
                    loc: [36, 23, 36, 24],
                    value: 2,
                  },
                },
                {
                  kind: "return",
                  loc: [37, 9, 37, 43],
                  expression: {
                    kind: "binop",
                    loc: [37, 16, 37, 42],
                    left: {
                      kind: "binop",
                      loc: [37, 16, 37, 29],
                      left: {
                        kind: "id",
                        loc: [37, 16, 37, 21],
                        text: "first",
                        bindingKey: "first$1rcr3g75v4qq5$1",
                      },
                      operatorToken: "+",
                      right: {
                        kind: "id",
                        loc: [37, 24, 37, 29],
                        text: "total",
                        bindingKey: "total$1rcr3g75v4qq5$2",
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: "splice",
                      loc: [37, 32, 37, 42],
                      key: "$0splice1",
                    },
                  },
                },
              ],
            },
          ],
        }),
      ),
    ),
    {
      message:
        "Can't thread the capture `total`: nothing encloses this reference to supply it. A fragment carries the bindings it was written under, so this is also what happens when one is spliced somewhere another `total` shadows it: the binding is still there, but no longer reachable by name, and naming it anyway would mean emitting what the source couldn't say.",
    },
  );
});
