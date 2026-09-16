import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs, For } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// One element template, expanded once per row on the client: the splice hole
// sits inside a `.map` callback, so it is reached once per iteration and each
// expansion must see its own `row`.
//
// The template is written inside the script because that is what lets `row`
// resolve to the callback's binding — hoisting it out would make `row` a free
// host reference instead of a capture.
//
// Inlining is what keeps the expansions apart today: the splice lands in body
// position, where a tree reference is a plain call and instantiates afresh. If
// it ever arrives as a thunk instead, the reference becomes an `apply` in tree
// position, and those memoize one instance per node — one instance shared by
// every row, each overwriting the last. The three values below are what tells
// the two apart.
const rows = [1, 2, 3];
it("mappedComponent", async (t) => {
  await snapshotCase(
    t,
    "mappedComponent",
    _jsx("div", {
      children: _jsx(For, {
        each: cs.create(
          [26, 18, 26, 27],
          {
            version: "0.0.0",
            filePath: "jsx/mapped-component.test.tsx",
            fileHash: "8u2ewdd1g2mk",
            splices: { $rows: { value: rows, params: [] } },
            captures: [],
          },
          () => ({
            kind: "splice",
            loc: [26, 21, 26, 26],
            key: "$rows",
          }),
        ),
        children: cs.create(
          [27, 10, 27, 67],
          {
            version: "0.0.0",
            filePath: "jsx/mapped-component.test.tsx",
            fileHash: "8u2ewdd1g2mk",
            splices: {
              $0splice0: {
                value: _jsx("span", {
                  children: cs.create(
                    [27, 40, 27, 56],
                    {
                      version: "0.0.0",
                      filePath: "jsx/mapped-component.test.tsx",
                      fileHash: "8u2ewdd1g2mk",
                      splices: {},
                      captures: ["row$8u2ewdd1g2mk$0"],
                    },
                    () => ({
                      kind: "binop",
                      loc: [27, 43, 27, 55],
                      left: {
                        kind: "string",
                        loc: [27, 43, 27, 49],
                        text: "row ",
                      },
                      operatorToken: "+",
                      right: {
                        kind: "id",
                        loc: [27, 52, 27, 55],
                        text: "row",
                        bindingKey: "row$8u2ewdd1g2mk$0",
                      },
                    }),
                  ),
                }),
                params: ["row$8u2ewdd1g2mk$0"],
              },
            },
            captures: [],
          },
          () => ({
            kind: "=>",
            loc: [27, 13, 27, 66],
            parameters: [
              {
                kind: "param",
                loc: [27, 14, 27, 25],
                name: {
                  kind: "id",
                  loc: [27, 14, 27, 17],
                  text: "row",
                  bindingKey: "row$8u2ewdd1g2mk$0",
                },
              },
            ],
            body: {
              kind: "splice",
              loc: [27, 30, 27, 66],
              key: "$0splice0",
            },
          }),
        ),
      }),
    }),
  );
});
