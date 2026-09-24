import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A `$` inside a name is ordinary JavaScript — only the leading sigil is
// reserved for splices — so a `$`-bearing binding survives mangling, its
// `<name>$<fileHash>$<n>` binding key still parses from the right, and the
// threaded capture's display name recovers `foo$` intact.
function add(lhs) {
  return cs.create(
    "sl458m2swc6c:10:9",
    { splices: { $lhs: { value: lhs, params: [] } }, captures: [] },
    () => ({
      type: "BinaryExpression",
      loc: { start: { line: 10, column: 12 }, end: { line: 10, column: 20 } },
      operator: "+",
      left: {
        type: "Splice",
        loc: { start: { line: 10, column: 12 }, end: { line: 10, column: 16 } },
        key: "$lhs",
      },
      right: {
        type: "Literal",
        loc: { start: { line: 10, column: 19 }, end: { line: 10, column: 20 } },
        value: 2,
      },
    }),
    "$0 => $0() + 2",
    '{"version":3,"file":"dollar-name.test.jsx","sourceRoot":"","sources":["dollar-name.test.tsx"],"names":[],"mappings":"AASY,MAAA,IAAI,GAAG,CAAC,CAAA"}',
  );
}
it("dollarName", async (t) => {
  await snapshotCase(
    t,
    "dollarName",
    cs.create(
      "sl458m2swc6c:17:4",
      {
        splices: {
          $0splice0: {
            value: add(
              cs.create(
                "sl458m2swc6c:19:19",
                { splices: {}, captures: ["foo$$sl458m2swc6c$0"] },
                () => ({
                  type: "Identifier",
                  loc: {
                    start: { line: 19, column: 22 },
                    end: { line: 19, column: 26 },
                  },
                  name: "foo$",
                  key: "foo$$sl458m2swc6c$0",
                }),
                "$0 => $0",
                '{"version":3,"file":"dollar-name.test.jsx","sourceRoot":"","sources":["dollar-name.test.tsx"],"names":[],"mappings":"AAkBsB,MAAA,EAAI,CAAA"}',
              ),
            ),
            params: ["foo$$sl458m2swc6c$0"],
          },
        },
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 17, column: 7 }, end: { line: 20, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 18, column: 6 },
              end: { line: 18, column: 21 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 18, column: 12 },
                  end: { line: 18, column: 20 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 18, column: 12 },
                    end: { line: 18, column: 16 },
                  },
                  name: "foo$",
                  key: "foo$$sl458m2swc6c$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 18, column: 19 },
                    end: { line: 18, column: 20 },
                  },
                  value: 1,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 19, column: 6 },
              end: { line: 19, column: 30 },
            },
            argument: {
              type: "Splice",
              loc: {
                start: { line: 19, column: 13 },
                end: { line: 19, column: 29 },
              },
              key: "$0splice0",
            },
          },
        ],
      }),
      "$0 => {\n    const foo$ = 1;\n    return $0(foo$);\n}",
      '{"version":3,"file":"dollar-name.test.jsx","sourceRoot":"","sources":["dollar-name.test.tsx"],"names":[],"mappings":"AAgBO;IACD,MAAM,IAAI,GAAG,CAAC,CAAC;IACf,OAAO,QAAC,CAAgB;AAC1B,CAAC,CAAA"}',
    ),
  );
});
