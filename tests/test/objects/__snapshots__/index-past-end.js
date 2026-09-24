import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Where the two rules part company, pinned so a client implementer can see
// it: `names[9]` types as `string`, because TypeScript's indexed access says
// the element type, and reads as `undefined`, because the runtime read is total.
// Nothing faults; the type simply doesn't mention the floor under it.
it("indexPastEnd", async (t) => {
  await snapshotCase(
    t,
    "indexPastEnd",
    cs.create(
      "3821as72cvvin:13:4",
      { splices: {}, captures: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 13, column: 7 }, end: { line: 16, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 14, column: 36 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 14, column: 12 },
                  end: { line: 14, column: 35 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 14, column: 12 },
                    end: { line: 14, column: 17 },
                  },
                  name: "names",
                  key: "names$3821as72cvvin$0",
                },
                init: {
                  type: "ArrayExpression",
                  loc: {
                    start: { line: 14, column: 20 },
                    end: { line: 14, column: 35 },
                  },
                  elements: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 14, column: 21 },
                        end: { line: 14, column: 27 },
                      },
                      value: "zero",
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 14, column: 29 },
                        end: { line: 14, column: 34 },
                      },
                      value: "one",
                    },
                  ],
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 15, column: 6 },
              end: { line: 15, column: 22 },
            },
            argument: {
              type: "MemberExpression",
              loc: {
                start: { line: 15, column: 13 },
                end: { line: 15, column: 21 },
              },
              object: {
                type: "Identifier",
                loc: {
                  start: { line: 15, column: 13 },
                  end: { line: 15, column: 18 },
                },
                name: "names",
                key: "names$3821as72cvvin$0",
              },
              property: {
                type: "Literal",
                loc: {
                  start: { line: 15, column: 19 },
                  end: { line: 15, column: 20 },
                },
                value: 9,
              },
              computed: true,
              optional: false,
            },
          },
        ],
      }),
      '() => {\n    const names = ["zero", "one"];\n    return names[9];\n}',
      '{"version":3,"file":"index-past-end.test.jsx","sourceRoot":"","sources":["index-past-end.test.tsx"],"names":[],"mappings":"AAYO;IACD,MAAM,KAAK,GAAG,CAAC,MAAM,EAAE,KAAK,CAAC,CAAC;IAC9B,OAAO,KAAK,CAAC,CAAC,CAAC,CAAC;AAClB,CAAC,CAAA"}',
    ),
  );
});
