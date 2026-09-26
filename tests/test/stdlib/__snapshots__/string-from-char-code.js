import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// UTF-16 code units rather than code points: a surrogate pair is two
// arguments, where `String.fromCodePoint` takes the one code point.
async function Written() {
  return cs.create(
    "rfc8jtzlhm6q:8:9",
    { params: [] },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 8, column: 12 }, end: { line: 14, column: 3 } },
      body: [
        {
          type: "ReturnStatement",
          loc: { start: { line: 9, column: 4 }, end: { line: 13, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 10, column: 6 },
              end: { line: 12, column: 13 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 10, column: 6 },
                end: { line: 10, column: 12 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 10, column: 7 },
                  end: { line: 10, column: 11 },
                },
                name: "span",
              },
              attributes: [],
              selfClosing: false,
            },
            children: [
              {
                type: "JSXText",
                loc: {
                  start: { line: 11, column: 8 },
                  end: { line: 11, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXExpressionContainer",
                loc: {
                  start: { line: 11, column: 8 },
                  end: { line: 11, column: 76 },
                },
                expression: {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 11, column: 9 },
                    end: { line: 11, column: 75 },
                  },
                  operator: "+",
                  left: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 11, column: 9 },
                      end: { line: 11, column: 37 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 11, column: 9 },
                        end: { line: 11, column: 28 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 11, column: 9 },
                          end: { line: 11, column: 15 },
                        },
                        name: "String",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 11, column: 16 },
                          end: { line: 11, column: 28 },
                        },
                        name: "fromCharCode",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 11, column: 29 },
                          end: { line: 11, column: 31 },
                        },
                        value: 72,
                      },
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 11, column: 33 },
                          end: { line: 11, column: 36 },
                        },
                        value: 105,
                      },
                    ],
                    optional: false,
                  },
                  right: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 11, column: 40 },
                      end: { line: 11, column: 75 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 11, column: 40 },
                        end: { line: 11, column: 59 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 11, column: 40 },
                          end: { line: 11, column: 46 },
                        },
                        name: "String",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 11, column: 47 },
                          end: { line: 11, column: 59 },
                        },
                        name: "fromCharCode",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 11, column: 60 },
                          end: { line: 11, column: 66 },
                        },
                        value: 55357,
                      },
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 11, column: 68 },
                          end: { line: 11, column: 74 },
                        },
                        value: 56832,
                      },
                    ],
                    optional: false,
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 12, column: 6 },
                  end: { line: 12, column: 6 },
                },
                value: "\n      ",
                raw: "\n      ",
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 12, column: 6 },
                end: { line: 12, column: 13 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 12, column: 8 },
                  end: { line: 12, column: 12 },
                },
                name: "span",
              },
            },
          },
        },
      ],
    }),
    {
      code: "export default () => {\n    return (<span>\n        {String.fromCharCode(72, 105) + String.fromCharCode(0xd83d, 0xde00)}\n      </span>);\n};",
      map: '{"version":3,"file":"string-from-char-code.test.jsx","sourceRoot":"","sources":["string-from-char-code.test.tsx"],"names":[],"mappings":"eAOY;IACR,OAAO,CACL,CAAC,IAAI,CACH;QAAA,CAAC,MAAM,CAAC,YAAY,CAAC,EAAE,EAAE,GAAG,CAAC,GAAG,MAAM,CAAC,YAAY,CAAC,MAAM,EAAE,MAAM,CAAC,CACrE;MAAA,EAAE,IAAI,CAAC,CACR,CAAC;AACJ,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
}
it("Written", async (t) => {
  await snapshotCase(t, "Written", _jsx(Written, {}));
});
