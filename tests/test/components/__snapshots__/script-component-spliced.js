import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A host binding a script both writes as a tag and splices as `$Card`. They are
// two parameters: the tag is handed over as its value and the splice is called,
// so neither use changes how the other compiles.
function Card(props) {
  return _jsx("h2", { children: props.title });
}
it("scriptComponentSpliced", async (t) => {
  await snapshotCase(
    t,
    "scriptComponentSpliced",
    cs.create(
      "2rdt83dl9708i:17:4",
      {
        params: [
          { kind: "splice", value: Card, bindings: [] },
          { kind: "tag", value: Card },
        ],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 17, column: 7 }, end: { line: 25, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 18, column: 6 },
              end: { line: 18, column: 28 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 18, column: 12 },
                  end: { line: 18, column: 27 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 18, column: 12 },
                    end: { line: 18, column: 19 },
                  },
                  name: "Heading",
                  key: "Heading$2rdt83dl9708i$0",
                },
                init: {
                  type: "Splice",
                  loc: {
                    start: { line: 18, column: 22 },
                    end: { line: 18, column: 27 },
                  },
                  param: 0,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 19, column: 6 },
              end: { line: 24, column: 8 },
            },
            argument: {
              type: "JSXElement",
              loc: {
                start: { line: 20, column: 8 },
                end: { line: 23, column: 14 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 20, column: 8 },
                  end: { line: 20, column: 13 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 20, column: 9 },
                    end: { line: 20, column: 12 },
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
                    start: { line: 21, column: 10 },
                    end: { line: 21, column: 10 },
                  },
                  value: "\n          ",
                  raw: "\n          ",
                },
                {
                  type: "JSXElement",
                  loc: {
                    start: { line: 21, column: 10 },
                    end: { line: 21, column: 30 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 21, column: 10 },
                      end: { line: 21, column: 30 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 21, column: 11 },
                        end: { line: 21, column: 15 },
                      },
                      name: "Card",
                      param: 1,
                    },
                    attributes: [
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 21, column: 16 },
                          end: { line: 21, column: 27 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 21, column: 16 },
                            end: { line: 21, column: 21 },
                          },
                          name: "title",
                        },
                        value: {
                          type: "Literal",
                          loc: {
                            start: { line: 21, column: 22 },
                            end: { line: 21, column: 27 },
                          },
                          value: "tag",
                        },
                      },
                    ],
                    selfClosing: true,
                  },
                  children: [],
                  closingElement: null,
                },
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 22, column: 10 },
                    end: { line: 22, column: 10 },
                  },
                  value: "\n          ",
                  raw: "\n          ",
                },
                {
                  type: "JSXElement",
                  loc: {
                    start: { line: 22, column: 10 },
                    end: { line: 22, column: 36 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 22, column: 10 },
                      end: { line: 22, column: 36 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 22, column: 11 },
                        end: { line: 22, column: 18 },
                      },
                      name: "Heading",
                      key: "Heading$2rdt83dl9708i$0",
                    },
                    attributes: [
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 22, column: 19 },
                          end: { line: 22, column: 33 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 22, column: 19 },
                            end: { line: 22, column: 24 },
                          },
                          name: "title",
                        },
                        value: {
                          type: "Literal",
                          loc: {
                            start: { line: 22, column: 25 },
                            end: { line: 22, column: 33 },
                          },
                          value: "splice",
                        },
                      },
                    ],
                    selfClosing: true,
                  },
                  children: [],
                  closingElement: null,
                },
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 23, column: 8 },
                    end: { line: 23, column: 8 },
                  },
                  value: "\n        ",
                  raw: "\n        ",
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 23, column: 8 },
                  end: { line: 23, column: 14 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 23, column: 10 },
                    end: { line: 23, column: 13 },
                  },
                  name: "div",
                },
              },
            },
          },
        ],
      }),
      '($0, $1) => {\n    const Heading = $0();\n    return (<div>\n          <$1 title="tag"/>\n          <Heading title="splice"/>\n        </div>);\n}',
      '{"version":3,"file":"script-component-spliced.test.jsx","sourceRoot":"","sources":["script-component-spliced.test.tsx"],"names":[],"mappings":"AAgBO;IACD,MAAM,OAAO,GAAG,IAAK,CAAC;IACtB,OAAO,CACL,CAAC,GAAG,CACF;UAAA,CAAC,EAAI,CAAC,KAAK,CAAC,KAAK,EACjB;UAAA,CAAC,OAAO,CAAC,KAAK,CAAC,QAAQ,EACzB;QAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC,CAAA"}',
    ),
  );
});
