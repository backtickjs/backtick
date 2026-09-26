import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
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
          "1sxi0mwqvirfh:27:17",
          { params: [{ kind: "splice", value: rows, bindings: [] }] },
          "($splice0) => $splice0()",
          '{"version":3,"file":"mapped-component.test.jsx","sourceRoot":"","sources":["jsx/mapped-component.test.tsx"],"names":[],"mappings":"AA0BoB,cAAA,UAAK"}',
        ),
        children: cs.create(
          "1sxi0mwqvirfh:28:9",
          {
            params: [
              {
                kind: "splice",
                value: _jsx("span", {
                  children: cs.create(
                    "1sxi0mwqvirfh:28:39",
                    {
                      params: [{ kind: "capture", key: "row$1sxi0mwqvirfh$0" }],
                    },
                    '($capture0) => "row " + $capture0',
                    '{"version":3,"file":"mapped-component.test.jsx","sourceRoot":"","sources":["jsx/mapped-component.test.tsx"],"names":[],"mappings":"AA2B0C,eAAA,MAAM,GAAG,SAAG"}',
                  ),
                }),
                bindings: ["row$1sxi0mwqvirfh$0"],
              },
            ],
          },
          "($splice0) => (row) => $splice0(row)",
          '{"version":3,"file":"mapped-component.test.jsx","sourceRoot":"","sources":["jsx/mapped-component.test.tsx"],"names":[],"mappings":"AA2BY,cAAA,CAAC,GAAW,EAAE,EAAE,CAAC,aAAC"}',
        ),
      }),
    }),
  );
});
