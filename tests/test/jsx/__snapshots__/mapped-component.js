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
    cs.create(
      "3kr2wp8s6e8ma:26:4",
      {
        params: [
          { kind: "splice", value: rows, bindings: [] },
          {
            kind: "splice",
            value: cs.create(
              "3kr2wp8s6e8ma:28:28",
              { params: [{ kind: "capture", key: "row$3kr2wp8s6e8ma$0" }] },
              '($capture0) => <span>{"row " + $capture0}</span>',
              '{"version":3,"file":"mapped-component.test.jsx","sourceRoot":"","sources":["jsx/mapped-component.test.tsx"],"names":[],"mappings":"AA2B+B,eAAA,CAAC,IAAI,CAAC,CAAC,MAAM,GAAG,SAAG,CAAC,EAAE,IAAI,CAAC"}',
            ),
            bindings: ["row$3kr2wp8s6e8ma$0"],
          },
          { kind: "tag", value: For },
        ],
      },
      "($splice0, $splice1, $tag2) => <div>\n      <$tag2 each={$splice0()}>\n        {(row) => $splice1(row)}\n      </$tag2>\n    </div>",
      '{"version":3,"file":"mapped-component.test.jsx","sourceRoot":"","sources":["jsx/mapped-component.test.tsx"],"names":[],"mappings":"AAyBO,+BAAA,CAAC,GAAG,CACL;MAAA,CAAC,KAAG,CAAC,IAAI,CAAC,CAAC,UAAK,CAAC,CACf;QAAA,CAAC,CAAC,GAAW,EAAE,EAAE,CAAC,aAAkC,CACtD;MAAA,EAAE,KAAG,CACP;IAAA,EAAE,GAAG,CAAC"}',
    ),
  );
});
