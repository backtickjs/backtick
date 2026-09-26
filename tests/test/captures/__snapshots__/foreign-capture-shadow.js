import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Two distinct captures of one entry that want the same name.
//
// An entry's own free variables can never collide — within one script `base`
// resolves outward to exactly one binding. But an entry also receives whatever
// the arguments it inlines capture, and a fragment written under the outer
// `base` can be carried by host code into a script written under the inner one.
// Both then land in the same environment, under the same source name.
//
// Everything stays nested so both bindings are actually in scope where they are
// threaded to — carrying the fragment somewhere the outer `base` does not
// enclose is a different error.
function innerBase(carried) {
  return cs.create(
    "bphb1svo1jv3:18:9",
    {
      params: [
        {
          kind: "splice",
          value: cs.create(
            "bphb1svo1jv3:20:13",
            {
              params: [
                { kind: "splice", value: carried, bindings: [] },
                { kind: "capture", key: "base$bphb1svo1jv3$0" },
              ],
            },
            () => ({
              type: "BinaryExpression",
              loc: {
                start: { line: 20, column: 16 },
                end: { line: 20, column: 31 },
              },
              operator: "+",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 20, column: 16 },
                  end: { line: 20, column: 20 },
                },
                name: "base",
                key: "base$bphb1svo1jv3$0",
              },
              right: {
                type: "Splice",
                loc: {
                  start: { line: 20, column: 23 },
                  end: { line: 20, column: 31 },
                },
                param: 0,
              },
            }),
            {
              code: "export default ($0, $1) => $1 + $0($1);",
              map: '{"version":3,"file":"foreign-capture-shadow.test.jsx","sourceRoot":"","sources":["foreign-capture-shadow.test.tsx"],"names":[],"mappings":"eAmBgB,YAAA,EAAI,GAAG,MAAQ"}',
            },
          ),
          bindings: ["base$bphb1svo1jv3$0"],
        },
      ],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 18, column: 12 }, end: { line: 21, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 19, column: 4 },
            end: { line: 19, column: 21 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 19, column: 10 },
                end: { line: 19, column: 20 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 19, column: 10 },
                  end: { line: 19, column: 14 },
                },
                name: "base",
                key: "base$bphb1svo1jv3$0",
              },
              init: {
                type: "Literal",
                loc: {
                  start: { line: 19, column: 17 },
                  end: { line: 19, column: 20 },
                },
                value: 100,
              },
            },
          ],
        },
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 20, column: 4 },
            end: { line: 20, column: 34 },
          },
          argument: {
            type: "Splice",
            loc: {
              start: { line: 20, column: 11 },
              end: { line: 20, column: 33 },
            },
            param: 0,
          },
        },
      ],
    }),
    {
      code: "export default ($0) => {\n    const base = 100;\n    return $0(base);\n};",
      map: '{"version":3,"file":"foreign-capture-shadow.test.jsx","sourceRoot":"","sources":["foreign-capture-shadow.test.tsx"],"names":[],"mappings":"eAiBY;IACR,MAAM,IAAI,GAAG,GAAG,CAAC;IACjB,OAAO,QAAC,CAAsB;AAChC,CAAC"}',
    },
  );
}
it("foreignCaptureShadow", async (t) => {
  await snapshotCase(
    t,
    "foreignCaptureShadow",
    cs.create(
      "bphb1svo1jv3:28:4",
      {
        params: [
          {
            kind: "splice",
            value: innerBase(
              cs.create(
                "bphb1svo1jv3:30:25",
                { params: [{ kind: "capture", key: "base$bphb1svo1jv3$1" }] },
                () => ({
                  type: "Identifier",
                  loc: {
                    start: { line: 30, column: 28 },
                    end: { line: 30, column: 32 },
                  },
                  name: "base",
                  key: "base$bphb1svo1jv3$1",
                }),
                {
                  code: "export default ($0) => $0;",
                  map: '{"version":3,"file":"foreign-capture-shadow.test.jsx","sourceRoot":"","sources":["foreign-capture-shadow.test.tsx"],"names":[],"mappings":"eA6B4B,QAAA,EAAI"}',
                },
              ),
            ),
            bindings: ["base$bphb1svo1jv3$1"],
          },
        ],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 28, column: 7 }, end: { line: 31, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 29, column: 6 },
              end: { line: 29, column: 21 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 29, column: 12 },
                  end: { line: 29, column: 20 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 29, column: 12 },
                    end: { line: 29, column: 16 },
                  },
                  name: "base",
                  key: "base$bphb1svo1jv3$1",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 29, column: 19 },
                    end: { line: 29, column: 20 },
                  },
                  value: 1,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 30, column: 6 },
              end: { line: 30, column: 36 },
            },
            argument: {
              type: "Splice",
              loc: {
                start: { line: 30, column: 13 },
                end: { line: 30, column: 35 },
              },
              param: 0,
            },
          },
        ],
      }),
      {
        code: "export default ($0) => {\n    const base = 1;\n    return $0(base);\n};",
        map: '{"version":3,"file":"foreign-capture-shadow.test.jsx","sourceRoot":"","sources":["foreign-capture-shadow.test.tsx"],"names":[],"mappings":"eA2BO;IACD,MAAM,IAAI,GAAG,CAAC,CAAC;IACf,OAAO,QAAC,CAAsB;AAChC,CAAC"}',
      },
    ),
  );
});
