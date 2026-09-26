import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
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
          "8u2ewdd1g2mk:26:17",
          { params: [{ kind: "splice", value: rows, bindings: [] }] },
          "($0) => $0()",
          '{"version":3,"file":"mapped-component.test.jsx","sourceRoot":"","sources":["jsx/mapped-component.test.tsx"],"names":[],"mappings":"AAyBoB,QAAA,IAAK"}',
        ),
        children: cs.create(
          "8u2ewdd1g2mk:27:9",
          {
            params: [
              {
                kind: "splice",
                value: _jsx("span", {
                  children: cs.create(
                    "8u2ewdd1g2mk:27:39",
                    {
                      params: [{ kind: "capture", key: "row$8u2ewdd1g2mk$0" }],
                    },
                    '($0) => "row " + $0',
                    '{"version":3,"file":"mapped-component.test.jsx","sourceRoot":"","sources":["jsx/mapped-component.test.tsx"],"names":[],"mappings":"AA0B0C,QAAA,MAAM,GAAG,EAAG"}',
                  ),
                }),
                bindings: ["row$8u2ewdd1g2mk$0"],
              },
            ],
          },
          "($0) => (row) => $0(row)",
          '{"version":3,"file":"mapped-component.test.jsx","sourceRoot":"","sources":["jsx/mapped-component.test.tsx"],"names":[],"mappings":"AA0BY,QAAA,CAAC,GAAW,EAAE,EAAE,CAAC,OAAC"}',
        ),
      }),
    }),
  );
});
