import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
function addOwnTotal(lhs, rhs) {
  return cs.create(
    "3ujapqmnmm2ra:7:9",
    {
      params: [
        { kind: "splice", value: lhs, bindings: [] },
        { kind: "splice", value: rhs, bindings: [] },
      ],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 7, column: 12 }, end: { line: 12, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: { start: { line: 8, column: 4 }, end: { line: 8, column: 18 } },
          kind: "let",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 8, column: 8 },
                end: { line: 8, column: 17 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 8, column: 8 },
                  end: { line: 8, column: 13 },
                },
                name: "total",
                key: "total$3ujapqmnmm2ra$0",
              },
              init: {
                type: "Literal",
                loc: {
                  start: { line: 8, column: 16 },
                  end: { line: 8, column: 17 },
                },
                value: 0,
              },
            },
          ],
        },
        {
          type: "ExpressionStatement",
          loc: { start: { line: 9, column: 4 }, end: { line: 9, column: 25 } },
          expression: {
            type: "AssignmentExpression",
            loc: {
              start: { line: 9, column: 4 },
              end: { line: 9, column: 24 },
            },
            operator: "=",
            left: {
              type: "Identifier",
              loc: {
                start: { line: 9, column: 4 },
                end: { line: 9, column: 9 },
              },
              name: "total",
              key: "total$3ujapqmnmm2ra$0",
            },
            right: {
              type: "BinaryExpression",
              loc: {
                start: { line: 9, column: 12 },
                end: { line: 9, column: 24 },
              },
              operator: "+",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 9, column: 12 },
                  end: { line: 9, column: 17 },
                },
                name: "total",
                key: "total$3ujapqmnmm2ra$0",
              },
              right: {
                type: "Splice",
                loc: {
                  start: { line: 9, column: 20 },
                  end: { line: 9, column: 24 },
                },
                param: 0,
              },
            },
          },
        },
        {
          type: "ExpressionStatement",
          loc: {
            start: { line: 10, column: 4 },
            end: { line: 10, column: 25 },
          },
          expression: {
            type: "AssignmentExpression",
            loc: {
              start: { line: 10, column: 4 },
              end: { line: 10, column: 24 },
            },
            operator: "=",
            left: {
              type: "Identifier",
              loc: {
                start: { line: 10, column: 4 },
                end: { line: 10, column: 9 },
              },
              name: "total",
              key: "total$3ujapqmnmm2ra$0",
            },
            right: {
              type: "BinaryExpression",
              loc: {
                start: { line: 10, column: 12 },
                end: { line: 10, column: 24 },
              },
              operator: "+",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 10, column: 12 },
                  end: { line: 10, column: 17 },
                },
                name: "total",
                key: "total$3ujapqmnmm2ra$0",
              },
              right: {
                type: "Splice",
                loc: {
                  start: { line: 10, column: 20 },
                  end: { line: 10, column: 24 },
                },
                param: 1,
              },
            },
          },
        },
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 11, column: 4 },
            end: { line: 11, column: 17 },
          },
          argument: {
            type: "Identifier",
            loc: {
              start: { line: 11, column: 11 },
              end: { line: 11, column: 16 },
            },
            name: "total",
            key: "total$3ujapqmnmm2ra$0",
          },
        },
      ],
    }),
    {
      code: "export default ($0, $1) => {\n    let total = 0;\n    total = total + $0();\n    total = total + $1();\n    return total;\n};",
      map: '{"version":3,"file":"shadowing.test.jsx","sourceRoot":"","sources":["shadowing.test.tsx"],"names":[],"mappings":"eAMY;IACR,IAAI,KAAK,GAAG,CAAC,CAAC;IACd,KAAK,GAAG,KAAK,GAAG,IAAI,CAAC;IACrB,KAAK,GAAG,KAAK,GAAG,IAAI,CAAC;IACrB,OAAO,KAAK,CAAC;AACf,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
}
it("shadowing", async (t) => {
  await snapshotCase(
    t,
    "shadowing",
    cs.create(
      "3ujapqmnmm2ra:19:4",
      {
        params: [
          {
            kind: "splice",
            value: addOwnTotal(
              cs.create(
                "3ujapqmnmm2ra:21:27",
                { params: [{ kind: "capture", key: "total$3ujapqmnmm2ra$1" }] },
                () => ({
                  type: "Identifier",
                  loc: {
                    start: { line: 21, column: 30 },
                    end: { line: 21, column: 35 },
                  },
                  name: "total",
                  key: "total$3ujapqmnmm2ra$1",
                }),
                {
                  code: "export default ($0) => $0;",
                  map: '{"version":3,"file":"shadowing.test.jsx","sourceRoot":"","sources":["shadowing.test.tsx"],"names":[],"mappings":"eAoB8B,QAAA,EAAK"}',
                  imports: [],
                  exportAt: 0,
                },
              ),
              100,
            ),
            bindings: ["total$3ujapqmnmm2ra$1"],
          },
        ],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 19, column: 7 }, end: { line: 22, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 20, column: 6 },
              end: { line: 20, column: 22 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 20, column: 12 },
                  end: { line: 20, column: 21 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 20, column: 12 },
                    end: { line: 20, column: 17 },
                  },
                  name: "total",
                  key: "total$3ujapqmnmm2ra$1",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 20, column: 20 },
                    end: { line: 20, column: 21 },
                  },
                  value: 1,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 21, column: 6 },
              end: { line: 21, column: 44 },
            },
            argument: {
              type: "Splice",
              loc: {
                start: { line: 21, column: 13 },
                end: { line: 21, column: 43 },
              },
              param: 0,
            },
          },
        ],
      }),
      {
        code: "export default ($0) => {\n    const total = 1;\n    return $0(total);\n};",
        map: '{"version":3,"file":"shadowing.test.jsx","sourceRoot":"","sources":["shadowing.test.tsx"],"names":[],"mappings":"eAkBO;IACD,MAAM,KAAK,GAAG,CAAC,CAAC;IAChB,OAAO,SAAC,CAA8B;AACxC,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
