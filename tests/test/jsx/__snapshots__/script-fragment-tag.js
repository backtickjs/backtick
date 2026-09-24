import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { Fragment } from "@backtickjs/web-sdk";
import { snapshotCase } from "../snapshotCase.ts";
// `<Fragment>` written out inside a script, where `<>` is the shorthand. A
// fragment is a component — it answers with its children — so a tag naming
// one splices it and is a call of it, like any other component tag.
//
// The shorthand is not: the compiler reads an absent opening tag as a
// fragment and lowers it to its children, so nothing of it reaches the host
// at all.
it("scriptFragmentTag", async (t) => {
  await snapshotCase(
    t,
    "scriptFragmentTag",
    cs.create(
      { start: { line: 17, column: 4 }, end: { line: 33, column: 6 } },
      { fileHash: "1uevnymojdbzi", splices: {}, captures: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 17, column: 7 }, end: { line: 33, column: 5 } },
        body: [
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 18, column: 6 },
              end: { line: 32, column: 8 },
            },
            argument: {
              type: "JSXElement",
              loc: {
                start: { line: 19, column: 8 },
                end: { line: 31, column: 14 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 19, column: 8 },
                  end: { line: 19, column: 13 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 19, column: 9 },
                    end: { line: 19, column: 12 },
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
                    start: { line: 20, column: 10 },
                    end: { line: 20, column: 10 },
                  },
                  value: "\n          ",
                  raw: "\n          ",
                },
                {
                  type: "JSXExpressionContainer",
                  loc: {
                    start: { line: 20, column: 10 },
                    end: { line: 25, column: 11 },
                  },
                  expression: {
                    type: "JSXElement",
                    loc: {
                      start: { line: 21, column: 12 },
                      end: { line: 24, column: 23 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 21, column: 12 },
                        end: { line: 21, column: 22 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 21, column: 13 },
                          end: { line: 21, column: 21 },
                        },
                        name: "Fragment",
                      },
                      attributes: [],
                      selfClosing: false,
                    },
                    children: [
                      {
                        type: "JSXText",
                        loc: {
                          start: { line: 22, column: 14 },
                          end: { line: 22, column: 14 },
                        },
                        value: "\n              ",
                        raw: "\n              ",
                      },
                      {
                        type: "JSXElement",
                        loc: {
                          start: { line: 22, column: 14 },
                          end: { line: 22, column: 28 },
                        },
                        openingElement: {
                          type: "JSXOpeningElement",
                          loc: {
                            start: { line: 22, column: 14 },
                            end: { line: 22, column: 20 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 22, column: 15 },
                              end: { line: 22, column: 19 },
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
                              start: { line: 22, column: 20 },
                              end: { line: 22, column: 21 },
                            },
                            value: "a",
                            raw: "a",
                          },
                        ],
                        closingElement: {
                          type: "JSXClosingElement",
                          loc: {
                            start: { line: 22, column: 21 },
                            end: { line: 22, column: 28 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 22, column: 23 },
                              end: { line: 22, column: 27 },
                            },
                            name: "span",
                          },
                        },
                      },
                      {
                        type: "JSXText",
                        loc: {
                          start: { line: 23, column: 14 },
                          end: { line: 23, column: 14 },
                        },
                        value: "\n              ",
                        raw: "\n              ",
                      },
                      {
                        type: "JSXElement",
                        loc: {
                          start: { line: 23, column: 14 },
                          end: { line: 23, column: 28 },
                        },
                        openingElement: {
                          type: "JSXOpeningElement",
                          loc: {
                            start: { line: 23, column: 14 },
                            end: { line: 23, column: 20 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 23, column: 15 },
                              end: { line: 23, column: 19 },
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
                              start: { line: 23, column: 20 },
                              end: { line: 23, column: 21 },
                            },
                            value: "b",
                            raw: "b",
                          },
                        ],
                        closingElement: {
                          type: "JSXClosingElement",
                          loc: {
                            start: { line: 23, column: 21 },
                            end: { line: 23, column: 28 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 23, column: 23 },
                              end: { line: 23, column: 27 },
                            },
                            name: "span",
                          },
                        },
                      },
                      {
                        type: "JSXText",
                        loc: {
                          start: { line: 24, column: 12 },
                          end: { line: 24, column: 12 },
                        },
                        value: "\n            ",
                        raw: "\n            ",
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 24, column: 12 },
                        end: { line: 24, column: 23 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 24, column: 14 },
                          end: { line: 24, column: 22 },
                        },
                        name: "Fragment",
                      },
                    },
                  },
                },
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 26, column: 10 },
                    end: { line: 26, column: 10 },
                  },
                  value: "\n          ",
                  raw: "\n          ",
                },
                {
                  type: "JSXExpressionContainer",
                  loc: {
                    start: { line: 26, column: 10 },
                    end: { line: 30, column: 11 },
                  },
                  expression: {
                    type: "JSXFragment",
                    loc: {
                      start: { line: 27, column: 12 },
                      end: { line: 29, column: 15 },
                    },
                    openingFragment: {
                      type: "JSXOpeningFragment",
                      loc: {
                        start: { line: 27, column: 12 },
                        end: { line: 27, column: 14 },
                      },
                    },
                    children: [
                      {
                        type: "JSXText",
                        loc: {
                          start: { line: 28, column: 14 },
                          end: { line: 28, column: 14 },
                        },
                        value: "\n              ",
                        raw: "\n              ",
                      },
                      {
                        type: "JSXElement",
                        loc: {
                          start: { line: 28, column: 14 },
                          end: { line: 28, column: 24 },
                        },
                        openingElement: {
                          type: "JSXOpeningElement",
                          loc: {
                            start: { line: 28, column: 14 },
                            end: { line: 28, column: 18 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 28, column: 15 },
                              end: { line: 28, column: 17 },
                            },
                            name: "em",
                          },
                          attributes: [],
                          selfClosing: false,
                        },
                        children: [
                          {
                            type: "JSXText",
                            loc: {
                              start: { line: 28, column: 18 },
                              end: { line: 28, column: 19 },
                            },
                            value: "c",
                            raw: "c",
                          },
                        ],
                        closingElement: {
                          type: "JSXClosingElement",
                          loc: {
                            start: { line: 28, column: 19 },
                            end: { line: 28, column: 24 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 28, column: 21 },
                              end: { line: 28, column: 23 },
                            },
                            name: "em",
                          },
                        },
                      },
                      {
                        type: "JSXText",
                        loc: {
                          start: { line: 29, column: 12 },
                          end: { line: 29, column: 12 },
                        },
                        value: "\n            ",
                        raw: "\n            ",
                      },
                    ],
                    closingFragment: {
                      type: "JSXClosingFragment",
                      loc: {
                        start: { line: 29, column: 12 },
                        end: { line: 29, column: 15 },
                      },
                    },
                  },
                },
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 31, column: 8 },
                    end: { line: 31, column: 8 },
                  },
                  value: "\n        ",
                  raw: "\n        ",
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 31, column: 8 },
                  end: { line: 31, column: 14 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 31, column: 10 },
                    end: { line: 31, column: 13 },
                  },
                  name: "div",
                },
              },
            },
          },
        ],
      }),
      "() => {\n    return (<div>\n          {<Fragment>\n              <span>a</span>\n              <span>b</span>\n            </Fragment>}\n          {<>\n              <em>c</em>\n            </>}\n        </div>);\n}",
      '{"version":3,"file":"script-fragment-tag.test.jsx","sourceRoot":"","sources":["script-fragment-tag.test.tsx"],"names":[],"mappings":"AAgBO;IACD,OAAO,CACL,CAAC,GAAG,CACF;UAAA,CACE,CAAC,QAAQ,CACP;cAAA,CAAC,IAAI,CAAC,CAAC,EAAE,IAAI,CACb;cAAA,CAAC,IAAI,CAAC,CAAC,EAAE,IAAI,CACf;YAAA,EAAE,QAAQ,CACZ,CACA;UAAA,CACE,EACE;cAAA,CAAC,EAAE,CAAC,CAAC,EAAE,EAAE,CACX;YAAA,GACF,CACF;QAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC,CAAA"}',
    ),
  );
});
