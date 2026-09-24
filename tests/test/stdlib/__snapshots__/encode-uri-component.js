import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A whole name rather than a front, so the call crosses as the one name and
// its argument. What a query is built from: a reserved character, a space and a
// character past ASCII each come out percent-encoded, and a number is written
// as a string first. Decoding reads the same bytes back.
async function Encoded() {
  return cs.create(
    "3tch88psikxru:10:9",
    { splices: {}, captures: [] },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 10, column: 12 }, end: { line: 21, column: 3 } },
      body: [
        {
          type: "ReturnStatement",
          loc: { start: { line: 11, column: 4 }, end: { line: 20, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 12, column: 6 },
              end: { line: 19, column: 13 },
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
                type: "JSXText",
                loc: {
                  start: { line: 13, column: 8 },
                  end: { line: 13, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXExpressionContainer",
                loc: {
                  start: { line: 13, column: 8 },
                  end: { line: 18, column: 55 },
                },
                expression: {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 13, column: 9 },
                    end: { line: 18, column: 54 },
                  },
                  operator: "+",
                  left: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 13, column: 9 },
                      end: { line: 17, column: 13 },
                    },
                    operator: "+",
                    left: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 13, column: 9 },
                        end: { line: 16, column: 33 },
                      },
                      operator: "+",
                      left: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 13, column: 9 },
                          end: { line: 15, column: 18 },
                        },
                        operator: "+",
                        left: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 13, column: 9 },
                            end: { line: 14, column: 41 },
                          },
                          operator: "+",
                          left: {
                            type: "Literal",
                            loc: {
                              start: { line: 13, column: 9 },
                              end: { line: 13, column: 17 },
                            },
                            value: "/at?q=",
                          },
                          right: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 14, column: 10 },
                              end: { line: 14, column: 41 },
                            },
                            callee: {
                              type: "Identifier",
                              loc: {
                                start: { line: 14, column: 10 },
                                end: { line: 14, column: 28 },
                              },
                              name: "encodeURIComponent",
                            },
                            arguments: [
                              {
                                type: "Literal",
                                loc: {
                                  start: { line: 14, column: 29 },
                                  end: { line: 14, column: 40 },
                                },
                                value: "a b+c&d#\u00E9",
                              },
                            ],
                            optional: false,
                          },
                        },
                        right: {
                          type: "Literal",
                          loc: {
                            start: { line: 15, column: 10 },
                            end: { line: 15, column: 18 },
                          },
                          value: "&page=",
                        },
                      },
                      right: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 16, column: 10 },
                          end: { line: 16, column: 33 },
                        },
                        callee: {
                          type: "Identifier",
                          loc: {
                            start: { line: 16, column: 10 },
                            end: { line: 16, column: 28 },
                          },
                          name: "encodeURIComponent",
                        },
                        arguments: [
                          {
                            type: "Literal",
                            loc: {
                              start: { line: 16, column: 29 },
                              end: { line: 16, column: 32 },
                            },
                            value: 2.5,
                          },
                        ],
                        optional: false,
                      },
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 17, column: 10 },
                        end: { line: 17, column: 13 },
                      },
                      value: " ",
                    },
                  },
                  right: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 18, column: 10 },
                      end: { line: 18, column: 54 },
                    },
                    callee: {
                      type: "Identifier",
                      loc: {
                        start: { line: 18, column: 10 },
                        end: { line: 18, column: 28 },
                      },
                      name: "decodeURIComponent",
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 18, column: 29 },
                          end: { line: 18, column: 53 },
                        },
                        value: "a%20b%2Bc%26d%23%C3%A9",
                      },
                    ],
                    optional: false,
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 19, column: 6 },
                  end: { line: 19, column: 6 },
                },
                value: "\n      ",
                raw: "\n      ",
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 19, column: 6 },
                end: { line: 19, column: 13 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 19, column: 8 },
                  end: { line: 19, column: 12 },
                },
                name: "span",
              },
            },
          },
        },
      ],
    }),
    '() => {\n    return (<span>\n        {"/at?q=" +\n            encodeURIComponent("a b+c&d#\u00E9") +\n            "&page=" +\n            encodeURIComponent(2.5) +\n            " " +\n            decodeURIComponent("a%20b%2Bc%26d%23%C3%A9")}\n      </span>);\n}',
    '{"version":3,"file":"encode-uri-component.test.jsx","sourceRoot":"","sources":["encode-uri-component.test.tsx"],"names":[],"mappings":"AASY;IACR,OAAO,CACL,CAAC,IAAI,CACH;QAAA,CAAC,QAAQ;YACP,kBAAkB,CAAC,WAAW,CAAC;YAC/B,QAAQ;YACR,kBAAkB,CAAC,GAAG,CAAC;YACvB,GAAG;YACH,kBAAkB,CAAC,wBAAwB,CAAC,CAChD;MAAA,EAAE,IAAI,CAAC,CACR,CAAC;AACJ,CAAC,CAAA"}',
  );
}
it("Encoded", async (t) => {
  await snapshotCase(t, "Encoded", _jsx(Encoded, {}));
});
