import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A namespace static taking a rest parameter, so the whole of the call crosses
// as one name and a list of arguments — `String` is the front of the name and
// never a value read off. Called with none, which the schema says answers with
// the empty string rather than refusing the way an empty `Math.min` does.
async function Written() {
  return cs.create(
    "7lcft72v2y3x:10:9",
    { params: [] },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 10, column: 12 }, end: { line: 14, column: 3 } },
      body: [
        {
          type: "ReturnStatement",
          loc: { start: { line: 11, column: 4 }, end: { line: 13, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 12, column: 6 },
              end: { line: 12, column: 75 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 12, column: 6 },
                end: { line: 12, column: 12 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 12, column: 7 },
                  end: { line: 12, column: 11 },
                },
                name: "span",
              },
              attributes: [],
              selfClosing: false,
            },
            children: [
              {
                type: "JSXExpressionContainer",
                loc: {
                  start: { line: 12, column: 12 },
                  end: { line: 12, column: 68 },
                },
                expression: {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 12, column: 13 },
                    end: { line: 12, column: 67 },
                  },
                  operator: "+",
                  left: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 12, column: 13 },
                      end: { line: 12, column: 42 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 12, column: 13 },
                        end: { line: 12, column: 33 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 12, column: 13 },
                          end: { line: 12, column: 19 },
                        },
                        name: "String",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 12, column: 20 },
                          end: { line: 12, column: 33 },
                        },
                        name: "fromCodePoint",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 12, column: 34 },
                          end: { line: 12, column: 36 },
                        },
                        value: 72,
                      },
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 12, column: 38 },
                          end: { line: 12, column: 41 },
                        },
                        value: 105,
                      },
                    ],
                    optional: false,
                  },
                  right: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 12, column: 45 },
                      end: { line: 12, column: 67 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 12, column: 45 },
                        end: { line: 12, column: 65 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 12, column: 45 },
                          end: { line: 12, column: 51 },
                        },
                        name: "String",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 12, column: 52 },
                          end: { line: 12, column: 65 },
                        },
                        name: "fromCodePoint",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [],
                    optional: false,
                  },
                },
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 12, column: 68 },
                end: { line: 12, column: 75 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 12, column: 70 },
                  end: { line: 12, column: 74 },
                },
                name: "span",
              },
            },
          },
        },
      ],
    }),
    {
      code: "export default () => {\n    return (<span>{String.fromCodePoint(72, 105) + String.fromCodePoint()}</span>);\n};",
      map: '{"version":3,"file":"string-from-code-point.test.jsx","sourceRoot":"","sources":["string-from-code-point.test.tsx"],"names":[],"mappings":"eASY;IACR,OAAO,CACL,CAAC,IAAI,CAAC,CAAC,MAAM,CAAC,aAAa,CAAC,EAAE,EAAE,GAAG,CAAC,GAAG,MAAM,CAAC,aAAa,EAAE,CAAC,EAAE,IAAI,CAAC,CACtE,CAAC;AACJ,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
}
it("Written", async (t) => {
  await snapshotCase(t, "Written", _jsx(Written, {}));
});
