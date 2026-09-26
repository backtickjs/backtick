import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A hole inside a block that shadows an outer name. Two call sites make the
// script polymorphic, so the splice arrives as a thunk rather than inlined.
//
// Both `total` bindings are the entry's own, and both render under their source
// name — the inner one shadows the outer exactly as it does in the source, and
// a block frames its declarations, so nothing has to tell them apart. What an
// entry captures cannot collide with either: a capture is a parameter, numbered
// `$0` upward, and `$` starts no name a script can write.
function wrapShadowed(fragment) {
  return cs.create(
    "1wiy7dknp0llv:15:9",
    { params: [{ kind: "splice", value: fragment, bindings: [] }] },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 15, column: 12 }, end: { line: 21, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 16, column: 4 },
            end: { line: 16, column: 20 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 16, column: 10 },
                end: { line: 16, column: 19 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 16, column: 10 },
                  end: { line: 16, column: 15 },
                },
                name: "total",
                key: "total$1wiy7dknp0llv$0",
              },
              init: {
                type: "Literal",
                loc: {
                  start: { line: 16, column: 18 },
                  end: { line: 16, column: 19 },
                },
                value: 1,
              },
            },
          ],
        },
        {
          type: "BlockStatement",
          loc: { start: { line: 17, column: 4 }, end: { line: 20, column: 5 } },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 18, column: 6 },
                end: { line: 18, column: 22 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 18, column: 12 },
                    end: { line: 18, column: 21 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 18, column: 12 },
                      end: { line: 18, column: 17 },
                    },
                    name: "total",
                    key: "total$1wiy7dknp0llv$1",
                  },
                  init: {
                    type: "Literal",
                    loc: {
                      start: { line: 18, column: 20 },
                      end: { line: 18, column: 21 },
                    },
                    value: 2,
                  },
                },
              ],
            },
            {
              type: "ReturnStatement",
              loc: {
                start: { line: 19, column: 6 },
                end: { line: 19, column: 31 },
              },
              argument: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 19, column: 13 },
                  end: { line: 19, column: 30 },
                },
                operator: "+",
                left: {
                  type: "Identifier",
                  loc: {
                    start: { line: 19, column: 13 },
                    end: { line: 19, column: 18 },
                  },
                  name: "total",
                  key: "total$1wiy7dknp0llv$1",
                },
                right: {
                  type: "Splice",
                  loc: {
                    start: { line: 19, column: 21 },
                    end: { line: 19, column: 30 },
                  },
                  param: 0,
                },
              },
            },
          ],
        },
      ],
    }),
    {
      code: "export default ($0) => {\n    const total = 1;\n    {\n        const total = 2;\n        return total + $0();\n    }\n};",
      map: '{"version":3,"file":"shadowed-hole.test.jsx","sourceRoot":"","sources":["shadowed-hole.test.tsx"],"names":[],"mappings":"eAcY;IACR,MAAM,KAAK,GAAG,CAAC,CAAC;IAChB,CAAC;QACC,MAAM,KAAK,GAAG,CAAC,CAAC;QAChB,OAAO,KAAK,GAAG,IAAS,CAAC;IAC3B,CAAC;AACH,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
}
it("shadowedHole", async (t) => {
  await snapshotCase(
    t,
    "shadowedHole",
    cs.create(
      "1wiy7dknp0llv:28:4",
      {
        params: [
          {
            kind: "splice",
            value: wrapShadowed(
              cs.create(
                "1wiy7dknp0llv:28:22",
                { params: [] },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 28, column: 25 },
                    end: { line: 28, column: 27 },
                  },
                  value: 10,
                }),
                {
                  code: "export default () => 10;",
                  map: '{"version":3,"file":"shadowed-hole.test.jsx","sourceRoot":"","sources":["shadowed-hole.test.tsx"],"names":[],"mappings":"eA2ByB,MAAA,EAAE"}',
                  imports: [],
                  exportAt: 0,
                },
              ),
            ),
            bindings: [],
          },
          {
            kind: "splice",
            value: wrapShadowed(
              cs.create(
                "1wiy7dknp0llv:28:48",
                { params: [] },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 28, column: 51 },
                    end: { line: 28, column: 53 },
                  },
                  value: 20,
                }),
                {
                  code: "export default () => 20;",
                  map: '{"version":3,"file":"shadowed-hole.test.jsx","sourceRoot":"","sources":["shadowed-hole.test.tsx"],"names":[],"mappings":"eA2BmD,MAAA,EAAE"}',
                  imports: [],
                  exportAt: 0,
                },
              ),
            ),
            bindings: [],
          },
        ],
      },
      () => ({
        type: "BinaryExpression",
        loc: { start: { line: 28, column: 7 }, end: { line: 28, column: 56 } },
        operator: "+",
        left: {
          type: "Splice",
          loc: {
            start: { line: 28, column: 7 },
            end: { line: 28, column: 30 },
          },
          param: 0,
        },
        right: {
          type: "Splice",
          loc: {
            start: { line: 28, column: 33 },
            end: { line: 28, column: 56 },
          },
          param: 1,
        },
      }),
      {
        code: "export default ($0, $1) => $0() + $1();",
        map: '{"version":3,"file":"shadowed-hole.test.jsx","sourceRoot":"","sources":["shadowed-hole.test.tsx"],"names":[],"mappings":"eA2BO,YAAA,IAAC,GAAyB,IAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
