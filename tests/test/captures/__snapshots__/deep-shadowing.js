import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
function outerBase(inner) {
  return cs.create(
    "8up2nb5o0inm:7:9",
    { params: [{ kind: "splice", value: middleBase(inner), bindings: [] }] },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 7, column: 12 }, end: { line: 10, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: { start: { line: 8, column: 4 }, end: { line: 8, column: 19 } },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 8, column: 10 },
                end: { line: 8, column: 18 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 8, column: 10 },
                  end: { line: 8, column: 14 },
                },
                name: "base",
                key: "base$8up2nb5o0inm$0",
              },
              init: {
                type: "Literal",
                loc: {
                  start: { line: 8, column: 17 },
                  end: { line: 8, column: 18 },
                },
                value: 1,
              },
            },
          ],
        },
        {
          type: "ReturnStatement",
          loc: { start: { line: 9, column: 4 }, end: { line: 9, column: 39 } },
          argument: {
            type: "BinaryExpression",
            loc: {
              start: { line: 9, column: 11 },
              end: { line: 9, column: 38 },
            },
            operator: "+",
            left: {
              type: "Identifier",
              loc: {
                start: { line: 9, column: 11 },
                end: { line: 9, column: 15 },
              },
              name: "base",
              key: "base$8up2nb5o0inm$0",
            },
            right: {
              type: "Splice",
              loc: {
                start: { line: 9, column: 18 },
                end: { line: 9, column: 38 },
              },
              param: 0,
            },
          },
        },
      ],
    }),
    "$0 => {\n    const base = 1;\n    return base + $0();\n}",
    '{"version":3,"file":"deep-shadowing.test.jsx","sourceRoot":"","sources":["deep-shadowing.test.tsx"],"names":[],"mappings":"AAMY;IACR,MAAM,IAAI,GAAG,CAAC,CAAC;IACf,OAAO,IAAI,GAAG,IAAC,CAAoB;AACrC,CAAC,CAAA"}',
  );
}
function middleBase(inner) {
  return cs.create(
    "8up2nb5o0inm:14:9",
    { params: [{ kind: "splice", value: inner, bindings: [] }] },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 14, column: 12 }, end: { line: 17, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 15, column: 4 },
            end: { line: 15, column: 19 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 15, column: 10 },
                end: { line: 15, column: 18 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 15, column: 10 },
                  end: { line: 15, column: 14 },
                },
                name: "base",
                key: "base$8up2nb5o0inm$1",
              },
              init: {
                type: "Literal",
                loc: {
                  start: { line: 15, column: 17 },
                  end: { line: 15, column: 18 },
                },
                value: 2,
              },
            },
          ],
        },
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 16, column: 4 },
            end: { line: 16, column: 25 },
          },
          argument: {
            type: "BinaryExpression",
            loc: {
              start: { line: 16, column: 11 },
              end: { line: 16, column: 24 },
            },
            operator: "*",
            left: {
              type: "Identifier",
              loc: {
                start: { line: 16, column: 11 },
                end: { line: 16, column: 15 },
              },
              name: "base",
              key: "base$8up2nb5o0inm$1",
            },
            right: {
              type: "Splice",
              loc: {
                start: { line: 16, column: 18 },
                end: { line: 16, column: 24 },
              },
              param: 0,
            },
          },
        },
      ],
    }),
    "$0 => {\n    const base = 2;\n    return base * $0();\n}",
    '{"version":3,"file":"deep-shadowing.test.jsx","sourceRoot":"","sources":["deep-shadowing.test.tsx"],"names":[],"mappings":"AAaY;IACR,MAAM,IAAI,GAAG,CAAC,CAAC;IACf,OAAO,IAAI,GAAG,IAAM,CAAC;AACvB,CAAC,CAAA"}',
  );
}
// `cs`base`` is written under the outer `base`, but is threaded through two
// host functions that each shadow `base` with their own binding. The captured
// value must reach the leaf untouched, so the threaded channel is renamed
// away from every `base` it passes through.
it("deepShadowing", async (t) => {
  await snapshotCase(
    t,
    "deepShadowing",
    cs.create(
      "8up2nb5o0inm:28:4",
      {
        params: [
          {
            kind: "splice",
            value: outerBase(
              cs.create(
                "8up2nb5o0inm:30:25",
                { params: [{ kind: "capture", key: "base$8up2nb5o0inm$2" }] },
                () => ({
                  type: "Identifier",
                  loc: {
                    start: { line: 30, column: 28 },
                    end: { line: 30, column: 32 },
                  },
                  name: "base",
                  key: "base$8up2nb5o0inm$2",
                }),
                "$0 => $0",
                '{"version":3,"file":"deep-shadowing.test.jsx","sourceRoot":"","sources":["deep-shadowing.test.tsx"],"names":[],"mappings":"AA6B4B,MAAA,EAAI,CAAA"}',
              ),
            ),
            bindings: ["base$8up2nb5o0inm$2"],
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
              end: { line: 29, column: 22 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 29, column: 12 },
                  end: { line: 29, column: 21 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 29, column: 12 },
                    end: { line: 29, column: 16 },
                  },
                  name: "base",
                  key: "base$8up2nb5o0inm$2",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 29, column: 19 },
                    end: { line: 29, column: 21 },
                  },
                  value: 10,
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
      "$0 => {\n    const base = 10;\n    return $0(base);\n}",
      '{"version":3,"file":"deep-shadowing.test.jsx","sourceRoot":"","sources":["deep-shadowing.test.tsx"],"names":[],"mappings":"AA2BO;IACD,MAAM,IAAI,GAAG,EAAE,CAAC;IAChB,OAAO,QAAC,CAAsB;AAChC,CAAC,CAAA"}',
    ),
  );
});
