import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A component tag written inside a client script. `Card` is a name no scope in
// the script binds, so it splices as the host binding, and what a splice holds
// that is a function is its expansion: the component run once against one
// opaque hole for the argument it takes, with a field read off that hole
// wherever it read a prop. The tag is a call of it.
//
// Each prop goes as a thunk and the drawing calls it where it reads it, which
// is what keeps a prop a prop: an argument is evaluated once where it is
// passed, and a prop has to be re-read whenever what it names changes.
async function Card(props) {
  return _jsx("h2", { children: props.title });
}
async function Badge() {
  return _jsx("span", { children: "new" });
}
it("scriptComponent", async (t) => {
  await snapshotCase(
    t,
    "scriptComponent",
    cs.create(
      { start: { line: 27, column: 4 }, end: { line: 34, column: 6 } },
      {
        fileHash: "2ielk672xspgd",
        splices: {
          $Card: { value: Card, params: [] },
          $Badge: { value: Badge, params: [] },
        },
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 27, column: 7 }, end: { line: 34, column: 5 } },
        body: [
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 28, column: 6 },
              end: { line: 33, column: 8 },
            },
            argument: {
              type: "JSXElement",
              loc: {
                start: { line: 29, column: 8 },
                end: { line: 32, column: 14 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 29, column: 8 },
                  end: { line: 29, column: 13 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 29, column: 9 },
                    end: { line: 29, column: 12 },
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
                    start: { line: 30, column: 10 },
                    end: { line: 30, column: 10 },
                  },
                  value: "\n          ",
                  raw: "\n          ",
                },
                {
                  type: "JSXElement",
                  loc: {
                    start: { line: 30, column: 10 },
                    end: { line: 30, column: 33 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 30, column: 10 },
                      end: { line: 30, column: 33 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 30, column: 11 },
                        end: { line: 30, column: 15 },
                      },
                      name: "Card",
                    },
                    attributes: [
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 30, column: 16 },
                          end: { line: 30, column: 30 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 30, column: 16 },
                            end: { line: 30, column: 21 },
                          },
                          name: "title",
                        },
                        value: {
                          type: "Literal",
                          loc: {
                            start: { line: 30, column: 22 },
                            end: { line: 30, column: 30 },
                          },
                          value: "totals",
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
                    start: { line: 31, column: 10 },
                    end: { line: 31, column: 10 },
                  },
                  value: "\n          ",
                  raw: "\n          ",
                },
                {
                  type: "JSXElement",
                  loc: {
                    start: { line: 31, column: 10 },
                    end: { line: 31, column: 19 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 31, column: 10 },
                      end: { line: 31, column: 19 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 31, column: 11 },
                        end: { line: 31, column: 16 },
                      },
                      name: "Badge",
                    },
                    attributes: [],
                    selfClosing: true,
                  },
                  children: [],
                  closingElement: null,
                },
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 32, column: 8 },
                    end: { line: 32, column: 8 },
                  },
                  value: "\n        ",
                  raw: "\n        ",
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 32, column: 8 },
                  end: { line: 32, column: 14 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 32, column: 10 },
                    end: { line: 32, column: 13 },
                  },
                  name: "div",
                },
              },
            },
          },
        ],
      }),
      '($0, $1) => {\n    return (<div>\n          <$0 title="totals"/>\n          <$1 />\n        </div>);\n}',
      '{"version":3,"file":"script-component.test.jsx","sourceRoot":"","sources":["script-component.test.tsx"],"names":[],"mappings":"AA0BO;IACD,OAAO,CACL,CAAC,GAAG,CACF;UAAA,CAAC,EAAI,CAAC,KAAK,CAAC,QAAQ,EACpB;UAAA,CAAC,EAAK,CAAC,AAAD,EACR;QAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC,CAAA"}',
    ),
  );
});
