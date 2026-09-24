import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A property literally named `...`, in a literal a spread also runs through —
// which is the one shape where a spread and a pair holding `...` sit in the
// same list. A pair is an array of its own, so its `...` is only a string.
it("objectDotsKey", async (t) => {
  await snapshotCase(
    t,
    "objectDotsKey",
    cs.create(
      { start: { line: 12, column: 4 }, end: { line: 15, column: 6 } },
      { fileHash: "13e6vrhonm3wb", splices: {}, captures: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 12, column: 7 }, end: { line: 15, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 13, column: 28 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 13, column: 12 },
                  end: { line: 13, column: 27 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 12 },
                    end: { line: 13, column: 16 },
                  },
                  name: "base",
                  key: "base$13e6vrhonm3wb$0",
                },
                init: {
                  type: "ObjectExpression",
                  loc: {
                    start: { line: 13, column: 19 },
                    end: { line: 13, column: 27 },
                  },
                  properties: [
                    {
                      type: "Property",
                      loc: {
                        start: { line: 13, column: 21 },
                        end: { line: 13, column: 25 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 13, column: 21 },
                          end: { line: 13, column: 22 },
                        },
                        name: "a",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 13, column: 24 },
                          end: { line: 13, column: 25 },
                        },
                        value: 1,
                      },
                      kind: "init",
                      computed: false,
                      method: false,
                      shorthand: false,
                    },
                  ],
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 14, column: 35 },
            },
            argument: {
              type: "ObjectExpression",
              loc: {
                start: { line: 14, column: 13 },
                end: { line: 14, column: 34 },
              },
              properties: [
                {
                  type: "SpreadElement",
                  loc: {
                    start: { line: 14, column: 15 },
                    end: { line: 14, column: 22 },
                  },
                  argument: {
                    type: "Identifier",
                    loc: {
                      start: { line: 14, column: 18 },
                      end: { line: 14, column: 22 },
                    },
                    name: "base",
                    key: "base$13e6vrhonm3wb$0",
                  },
                },
                {
                  type: "Property",
                  loc: {
                    start: { line: 14, column: 24 },
                    end: { line: 14, column: 32 },
                  },
                  key: {
                    type: "Literal",
                    loc: {
                      start: { line: 14, column: 24 },
                      end: { line: 14, column: 29 },
                    },
                    value: "...",
                  },
                  value: {
                    type: "Literal",
                    loc: {
                      start: { line: 14, column: 31 },
                      end: { line: 14, column: 32 },
                    },
                    value: 2,
                  },
                  kind: "init",
                  computed: false,
                  method: false,
                  shorthand: false,
                },
              ],
            },
          },
        ],
      }),
      '() => {\n    const base = { a: 1 };\n    return { ...base, "...": 2 };\n}',
      '{"version":3,"file":"object-dots-key.test.jsx","sourceRoot":"","sources":["object-dots-key.test.tsx"],"names":[],"mappings":"AAWO;IACD,MAAM,IAAI,GAAG,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC;IACtB,OAAO,EAAE,GAAG,IAAI,EAAE,KAAK,EAAE,CAAC,EAAE,CAAC;AAC/B,CAAC,CAAA"}',
    ),
  );
});
