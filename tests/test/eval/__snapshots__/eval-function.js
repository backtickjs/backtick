import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A bundle whose value is a function: evaluated, then called like any other.
// One answers a string; the other a drawing, handed its props as a value.
const greet = await bundler.run(
  cs.create(
    "1061hn7xljcgj:8:32",
    { params: [] },
    () => ({
      type: "ArrowFunctionExpression",
      loc: { start: { line: 8, column: 35 }, end: { line: 8, column: 68 } },
      params: [
        {
          type: "Identifier",
          loc: { start: { line: 8, column: 36 }, end: { line: 8, column: 40 } },
          name: "name",
          key: "name$1061hn7xljcgj$0",
        },
      ],
      body: {
        type: "BinaryExpression",
        loc: { start: { line: 8, column: 53 }, end: { line: 8, column: 68 } },
        operator: "+",
        left: {
          type: "Literal",
          loc: { start: { line: 8, column: 53 }, end: { line: 8, column: 61 } },
          value: "hello ",
        },
        right: {
          type: "Identifier",
          loc: { start: { line: 8, column: 64 }, end: { line: 8, column: 68 } },
          name: "name",
          key: "name$1061hn7xljcgj$0",
        },
      },
      expression: true,
    }),
    {
      code: 'export default () => (name) => "hello " + name;',
      map: '{"version":3,"file":"eval-function.test.jsx","sourceRoot":"","sources":["eval-function.test.tsx"],"names":[],"mappings":"eAOmC,MAAA,CAAC,IAAY,EAAE,EAAE,CAAC,QAAQ,GAAG,IAAI"}',
      imports: [],
      exportAt: 0,
    },
  ),
);
const badge = await bundler.run(
  cs.create(
    "1061hn7xljcgj:11:2",
    { params: [] },
    () => ({
      type: "ArrowFunctionExpression",
      loc: { start: { line: 11, column: 5 }, end: { line: 11, column: 66 } },
      params: [
        {
          type: "Identifier",
          loc: {
            start: { line: 11, column: 6 },
            end: { line: 11, column: 11 },
          },
          name: "props",
          key: "props$1061hn7xljcgj$1",
        },
      ],
      body: {
        type: "JSXElement",
        loc: { start: { line: 11, column: 35 }, end: { line: 11, column: 66 } },
        openingElement: {
          type: "JSXOpeningElement",
          loc: {
            start: { line: 11, column: 35 },
            end: { line: 11, column: 38 },
          },
          name: {
            type: "JSXIdentifier",
            loc: {
              start: { line: 11, column: 36 },
              end: { line: 11, column: 37 },
            },
            name: "b",
          },
          attributes: [],
          selfClosing: false,
        },
        children: [
          {
            type: "JSXExpressionContainer",
            loc: {
              start: { line: 11, column: 38 },
              end: { line: 11, column: 62 },
            },
            expression: {
              type: "BinaryExpression",
              loc: {
                start: { line: 11, column: 39 },
                end: { line: 11, column: 61 },
              },
              operator: "+",
              left: {
                type: "Literal",
                loc: {
                  start: { line: 11, column: 39 },
                  end: { line: 11, column: 47 },
                },
                value: "count ",
              },
              right: {
                type: "MemberExpression",
                loc: {
                  start: { line: 11, column: 50 },
                  end: { line: 11, column: 61 },
                },
                object: {
                  type: "Identifier",
                  loc: {
                    start: { line: 11, column: 50 },
                    end: { line: 11, column: 55 },
                  },
                  name: "props",
                  key: "props$1061hn7xljcgj$1",
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 11, column: 56 },
                    end: { line: 11, column: 61 },
                  },
                  name: "count",
                },
                computed: false,
                optional: false,
              },
            },
          },
        ],
        closingElement: {
          type: "JSXClosingElement",
          loc: {
            start: { line: 11, column: 62 },
            end: { line: 11, column: 66 },
          },
          name: {
            type: "JSXIdentifier",
            loc: {
              start: { line: 11, column: 64 },
              end: { line: 11, column: 65 },
            },
            name: "b",
          },
        },
      },
      expression: true,
    }),
    {
      code: 'export default () => (props) => <b>{"count " + props.count}</b>;',
      map: '{"version":3,"file":"eval-function.test.jsx","sourceRoot":"","sources":["eval-function.test.tsx"],"names":[],"mappings":"eAUK,MAAA,CAAC,KAAwB,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,QAAQ,GAAG,KAAK,CAAC,KAAK,CAAC,EAAE,CAAC,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  ),
);
it("evalFunction", async (t) => {
  await snapshotCase(
    t,
    "evalFunction",
    cs.create(
      "1061hn7xljcgj:18:4",
      {
        params: [
          { kind: "splice", value: greet, bindings: [] },
          { kind: "splice", value: badge, bindings: [] },
        ],
      },
      () => ({
        type: "JSXElement",
        loc: { start: { line: 18, column: 7 }, end: { line: 21, column: 10 } },
        openingElement: {
          type: "JSXOpeningElement",
          loc: {
            start: { line: 18, column: 7 },
            end: { line: 18, column: 12 },
          },
          name: {
            type: "JSXIdentifier",
            loc: {
              start: { line: 18, column: 8 },
              end: { line: 18, column: 11 },
            },
            name: "div",
          },
          attributes: [],
          selfClosing: false,
        },
        children: [
          {
            type: "JSXText",
            loc: {
              start: { line: 19, column: 6 },
              end: { line: 19, column: 6 },
            },
            value: "\n      ",
            raw: "\n      ",
          },
          {
            type: "JSXElement",
            loc: {
              start: { line: 19, column: 6 },
              end: { line: 19, column: 40 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 19, column: 6 },
                end: { line: 19, column: 12 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 19, column: 7 },
                  end: { line: 19, column: 11 },
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
                  start: { line: 19, column: 12 },
                  end: { line: 19, column: 33 },
                },
                expression: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 19, column: 13 },
                    end: { line: 19, column: 32 },
                  },
                  callee: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 19, column: 13 },
                      end: { line: 19, column: 25 },
                    },
                    callee: {
                      type: "Identifier",
                      loc: {
                        start: { line: 19, column: 13 },
                        end: { line: 19, column: 17 },
                      },
                      name: "eval",
                    },
                    arguments: [
                      {
                        type: "Splice",
                        loc: {
                          start: { line: 19, column: 18 },
                          end: { line: 19, column: 24 },
                        },
                        param: 0,
                      },
                    ],
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 19, column: 26 },
                        end: { line: 19, column: 31 },
                      },
                      value: "ada",
                    },
                  ],
                  optional: false,
                },
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 19, column: 33 },
                end: { line: 19, column: 40 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 19, column: 35 },
                  end: { line: 19, column: 39 },
                },
                name: "span",
              },
            },
          },
          {
            type: "JSXText",
            loc: {
              start: { line: 20, column: 6 },
              end: { line: 20, column: 6 },
            },
            value: "\n      ",
            raw: "\n      ",
          },
          {
            type: "JSXExpressionContainer",
            loc: {
              start: { line: 20, column: 6 },
              end: { line: 20, column: 34 },
            },
            expression: {
              type: "CallExpression",
              loc: {
                start: { line: 20, column: 7 },
                end: { line: 20, column: 33 },
              },
              callee: {
                type: "CallExpression",
                loc: {
                  start: { line: 20, column: 7 },
                  end: { line: 20, column: 19 },
                },
                callee: {
                  type: "Identifier",
                  loc: {
                    start: { line: 20, column: 7 },
                    end: { line: 20, column: 11 },
                  },
                  name: "eval",
                },
                arguments: [
                  {
                    type: "Splice",
                    loc: {
                      start: { line: 20, column: 12 },
                      end: { line: 20, column: 18 },
                    },
                    param: 1,
                  },
                ],
                optional: false,
              },
              arguments: [
                {
                  type: "ObjectExpression",
                  loc: {
                    start: { line: 20, column: 20 },
                    end: { line: 20, column: 32 },
                  },
                  properties: [
                    {
                      type: "Property",
                      loc: {
                        start: { line: 20, column: 22 },
                        end: { line: 20, column: 30 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 20, column: 22 },
                          end: { line: 20, column: 27 },
                        },
                        name: "count",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 20, column: 29 },
                          end: { line: 20, column: 30 },
                        },
                        value: 3,
                      },
                      kind: "init",
                      computed: false,
                      method: false,
                      shorthand: false,
                    },
                  ],
                },
              ],
              optional: false,
            },
          },
          {
            type: "JSXText",
            loc: {
              start: { line: 21, column: 4 },
              end: { line: 21, column: 4 },
            },
            value: "\n    ",
            raw: "\n    ",
          },
        ],
        closingElement: {
          type: "JSXClosingElement",
          loc: {
            start: { line: 21, column: 4 },
            end: { line: 21, column: 10 },
          },
          name: {
            type: "JSXIdentifier",
            loc: {
              start: { line: 21, column: 6 },
              end: { line: 21, column: 9 },
            },
            name: "div",
          },
        },
      }),
      {
        code: 'export default ($0, $1) => <div>\n      <span>{eval($0())("ada")}</span>\n      {eval($1())({ count: 3 })}\n    </div>;',
        map: '{"version":3,"file":"eval-function.test.jsx","sourceRoot":"","sources":["eval-function.test.tsx"],"names":[],"mappings":"eAiBO,YAAA,CAAC,GAAG,CACL;MAAA,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,IAAM,CAAC,CAAC,KAAK,CAAC,CAAC,EAAE,IAAI,CACjC;MAAA,CAAC,IAAI,CAAC,IAAM,CAAC,CAAC,EAAE,KAAK,EAAE,CAAC,EAAE,CAAC,CAC7B;IAAA,EAAE,GAAG,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
