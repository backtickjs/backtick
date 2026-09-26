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
          "8u2ewdd1g2mk:26:17",
          { params: [{ kind: "splice", value: rows, bindings: [] }] },
          () => ({
            type: "Splice",
            loc: {
              start: { line: 26, column: 20 },
              end: { line: 26, column: 25 },
            },
            param: 0,
          }),
          {
            code: "export default ($0) => $0();",
            map: '{"version":3,"file":"mapped-component.test.jsx","sourceRoot":"","sources":["mapped-component.test.tsx"],"names":[],"mappings":"eAyBoB,QAAA,IAAK"}',
            imports: [],
            exportAt: 0,
          },
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
                    () => ({
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 27, column: 42 },
                        end: { line: 27, column: 54 },
                      },
                      operator: "+",
                      left: {
                        type: "Literal",
                        loc: {
                          start: { line: 27, column: 42 },
                          end: { line: 27, column: 48 },
                        },
                        value: "row ",
                      },
                      right: {
                        type: "Identifier",
                        loc: {
                          start: { line: 27, column: 51 },
                          end: { line: 27, column: 54 },
                        },
                        name: "row",
                        key: "row$8u2ewdd1g2mk$0",
                      },
                    }),
                    {
                      code: 'export default ($0) => "row " + $0;',
                      map: '{"version":3,"file":"mapped-component.test.jsx","sourceRoot":"","sources":["mapped-component.test.tsx"],"names":[],"mappings":"eA0B0C,QAAA,MAAM,GAAG,EAAG"}',
                      imports: [],
                      exportAt: 0,
                    },
                  ),
                }),
                bindings: ["row$8u2ewdd1g2mk$0"],
              },
            ],
          },
          () => ({
            type: "ArrowFunctionExpression",
            loc: {
              start: { line: 27, column: 12 },
              end: { line: 27, column: 65 },
            },
            params: [
              {
                type: "Identifier",
                loc: {
                  start: { line: 27, column: 13 },
                  end: { line: 27, column: 16 },
                },
                name: "row",
                key: "row$8u2ewdd1g2mk$0",
              },
            ],
            body: {
              type: "Splice",
              loc: {
                start: { line: 27, column: 29 },
                end: { line: 27, column: 65 },
              },
              param: 0,
            },
            expression: true,
          }),
          {
            code: "export default ($0) => (row) => $0(row);",
            map: '{"version":3,"file":"mapped-component.test.jsx","sourceRoot":"","sources":["mapped-component.test.tsx"],"names":[],"mappings":"eA0BY,QAAA,CAAC,GAAW,EAAE,EAAE,CAAC,OAAC"}',
            imports: [],
            exportAt: 0,
          },
        ),
      }),
    }),
  );
});
