import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, For } from "@backtickjs/core";
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
const mappedComponent = _jsx("div", {
  children: _jsx(For, {
    each: cs.create(
      [21, 16, 21, 25],
      {
        version: "0.0.0",
        filePath: "mappedComponent.tsx",
        fileHash: "3akf3wzymopre",
        splices: { $rows: { value: rows, params: [] } },
        captures: [],
      },
      () => ({
        kind: "splice",
        loc: [21, 19, 21, 24],
        key: "$rows",
      }),
    ),
    children: cs.create(
      [22, 8, 22, 65],
      {
        version: "0.0.0",
        filePath: "mappedComponent.tsx",
        fileHash: "3akf3wzymopre",
        splices: {
          $0splice0: {
            value: _jsx("span", {
              children: cs.create(
                [22, 38, 22, 54],
                {
                  version: "0.0.0",
                  filePath: "mappedComponent.tsx",
                  fileHash: "3akf3wzymopre",
                  splices: {},
                  captures: ["row$3akf3wzymopre$0"],
                },
                () => ({
                  kind: "binop",
                  loc: [22, 41, 22, 53],
                  left: {
                    kind: "string",
                    loc: [22, 41, 22, 47],
                    text: "row ",
                  },
                  operatorToken: "+",
                  right: {
                    kind: "id",
                    loc: [22, 50, 22, 53],
                    text: "row",
                    bindingKey: "row$3akf3wzymopre$0",
                  },
                }),
              ),
            }),
            params: ["row$3akf3wzymopre$0"],
          },
        },
        captures: [],
      },
      () => ({
        kind: "=>",
        loc: [22, 11, 22, 64],
        parameters: [
          {
            kind: "param",
            loc: [22, 12, 22, 23],
            name: {
              kind: "id",
              loc: [22, 12, 22, 15],
              text: "row",
              bindingKey: "row$3akf3wzymopre$0",
            },
          },
        ],
        body: {
          kind: "splice",
          loc: [22, 28, 22, 64],
          key: "$0splice0",
        },
      }),
    ),
  }),
});
