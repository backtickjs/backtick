import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { computed, cs, state } from "@backtickjs/core";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
// Each script logs where it runs, so a test counts the runs by counting the
// logs.
let runs = 0;
const log = globalThis.window.console.log;
beforeEach(() => {
  runs = 0;
  globalThis.window.console.log = () => {
    runs = runs + 1;
  };
});
afterEach(() => {
  globalThis.window.console.log = log;
});
describe("computed", () => {
  it("runs once per change, however many read it", async () => {
    await render(
      cs.create(
        "3vk1ks01z9ilh:25:6",
        {
          params: [
            { kind: "splice", value: state, bindings: [] },
            { kind: "splice", value: computed, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        () => ({
          type: "BlockStatement",
          loc: { start: { line: 25, column: 9 }, end: { line: 39, column: 7 } },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 26, column: 8 },
                end: { line: 26, column: 28 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 26, column: 14 },
                    end: { line: 26, column: 27 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 26, column: 14 },
                      end: { line: 26, column: 15 },
                    },
                    name: "n",
                    key: "n$3vk1ks01z9ilh$0",
                  },
                  init: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 26, column: 18 },
                      end: { line: 26, column: 27 },
                    },
                    callee: {
                      type: "Splice",
                      loc: {
                        start: { line: 26, column: 18 },
                        end: { line: 26, column: 24 },
                      },
                      param: 0,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 26, column: 25 },
                          end: { line: 26, column: 26 },
                        },
                        value: 1,
                      },
                    ],
                    optional: false,
                  },
                },
              ],
            },
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 27, column: 8 },
                end: { line: 30, column: 11 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 27, column: 14 },
                    end: { line: 30, column: 10 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 27, column: 14 },
                      end: { line: 27, column: 21 },
                    },
                    name: "doubled",
                    key: "doubled$3vk1ks01z9ilh$1",
                  },
                  init: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 27, column: 24 },
                      end: { line: 30, column: 10 },
                    },
                    callee: {
                      type: "Splice",
                      loc: {
                        start: { line: 27, column: 24 },
                        end: { line: 27, column: 33 },
                      },
                      param: 1,
                    },
                    arguments: [
                      {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 27, column: 34 },
                          end: { line: 30, column: 9 },
                        },
                        params: [],
                        body: {
                          type: "BlockStatement",
                          loc: {
                            start: { line: 27, column: 40 },
                            end: { line: 30, column: 9 },
                          },
                          body: [
                            {
                              type: "ExpressionStatement",
                              loc: {
                                start: { line: 28, column: 10 },
                                end: { line: 28, column: 32 },
                              },
                              expression: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 28, column: 10 },
                                  end: { line: 28, column: 31 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 28, column: 10 },
                                    end: { line: 28, column: 29 },
                                  },
                                  object: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 28, column: 10 },
                                      end: { line: 28, column: 25 },
                                    },
                                    object: {
                                      type: "Splice",
                                      loc: {
                                        start: { line: 28, column: 10 },
                                        end: { line: 28, column: 17 },
                                      },
                                      param: 2,
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 28, column: 18 },
                                        end: { line: 28, column: 25 },
                                      },
                                      name: "console",
                                    },
                                    computed: false,
                                    optional: false,
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 28, column: 26 },
                                      end: { line: 28, column: 29 },
                                    },
                                    name: "log",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                                arguments: [],
                                optional: false,
                              },
                            },
                            {
                              type: "ReturnStatement",
                              loc: {
                                start: { line: 29, column: 10 },
                                end: { line: 29, column: 29 },
                              },
                              argument: {
                                type: "BinaryExpression",
                                loc: {
                                  start: { line: 29, column: 17 },
                                  end: { line: 29, column: 28 },
                                },
                                operator: "*",
                                left: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 29, column: 17 },
                                    end: { line: 29, column: 24 },
                                  },
                                  callee: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 29, column: 17 },
                                      end: { line: 29, column: 22 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 29, column: 17 },
                                        end: { line: 29, column: 18 },
                                      },
                                      name: "n",
                                      key: "n$3vk1ks01z9ilh$0",
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 29, column: 19 },
                                        end: { line: 29, column: 22 },
                                      },
                                      name: "get",
                                    },
                                    computed: false,
                                    optional: false,
                                  },
                                  arguments: [],
                                  optional: false,
                                },
                                right: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 29, column: 27 },
                                    end: { line: 29, column: 28 },
                                  },
                                  value: 2,
                                },
                              },
                            },
                          ],
                        },
                        expression: false,
                      },
                    ],
                    optional: false,
                  },
                },
              ],
            },
            {
              type: "ReturnStatement",
              loc: {
                start: { line: 31, column: 8 },
                end: { line: 38, column: 10 },
              },
              argument: {
                type: "JSXElement",
                loc: {
                  start: { line: 32, column: 10 },
                  end: { line: 37, column: 16 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 32, column: 10 },
                    end: { line: 32, column: 15 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 32, column: 11 },
                      end: { line: 32, column: 14 },
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
                      start: { line: 33, column: 12 },
                      end: { line: 33, column: 12 },
                    },
                    value: "\n            ",
                    raw: "\n            ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 33, column: 12 },
                      end: { line: 33, column: 67 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 33, column: 12 },
                        end: { line: 33, column: 55 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 33, column: 13 },
                          end: { line: 33, column: 19 },
                        },
                        name: "button",
                      },
                      attributes: [
                        {
                          type: "JSXAttribute",
                          loc: {
                            start: { line: 33, column: 20 },
                            end: { line: 33, column: 54 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 33, column: 20 },
                              end: { line: 33, column: 27 },
                            },
                            name: "onclick",
                          },
                          value: {
                            type: "JSXExpressionContainer",
                            loc: {
                              start: { line: 33, column: 28 },
                              end: { line: 33, column: 54 },
                            },
                            expression: {
                              type: "ArrowFunctionExpression",
                              loc: {
                                start: { line: 33, column: 29 },
                                end: { line: 33, column: 53 },
                              },
                              params: [],
                              body: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 33, column: 35 },
                                  end: { line: 33, column: 53 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 33, column: 35 },
                                    end: { line: 33, column: 40 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 33, column: 35 },
                                      end: { line: 33, column: 36 },
                                    },
                                    name: "n",
                                    key: "n$3vk1ks01z9ilh$0",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 33, column: 37 },
                                      end: { line: 33, column: 40 },
                                    },
                                    name: "set",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                                arguments: [
                                  {
                                    type: "BinaryExpression",
                                    loc: {
                                      start: { line: 33, column: 41 },
                                      end: { line: 33, column: 52 },
                                    },
                                    operator: "+",
                                    left: {
                                      type: "CallExpression",
                                      loc: {
                                        start: { line: 33, column: 41 },
                                        end: { line: 33, column: 48 },
                                      },
                                      callee: {
                                        type: "MemberExpression",
                                        loc: {
                                          start: { line: 33, column: 41 },
                                          end: { line: 33, column: 46 },
                                        },
                                        object: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 33, column: 41 },
                                            end: { line: 33, column: 42 },
                                          },
                                          name: "n",
                                          key: "n$3vk1ks01z9ilh$0",
                                        },
                                        property: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 33, column: 43 },
                                            end: { line: 33, column: 46 },
                                          },
                                          name: "get",
                                        },
                                        computed: false,
                                        optional: false,
                                      },
                                      arguments: [],
                                      optional: false,
                                    },
                                    right: {
                                      type: "Literal",
                                      loc: {
                                        start: { line: 33, column: 51 },
                                        end: { line: 33, column: 52 },
                                      },
                                      value: 1,
                                    },
                                  },
                                ],
                                optional: false,
                              },
                              expression: true,
                            },
                          },
                        },
                      ],
                      selfClosing: false,
                    },
                    children: [
                      {
                        type: "JSXText",
                        loc: {
                          start: { line: 33, column: 55 },
                          end: { line: 33, column: 58 },
                        },
                        value: "add",
                        raw: "add",
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 33, column: 58 },
                        end: { line: 33, column: 67 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 33, column: 60 },
                          end: { line: 33, column: 66 },
                        },
                        name: "button",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 34, column: 12 },
                      end: { line: 34, column: 12 },
                    },
                    value: "\n            ",
                    raw: "\n            ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 34, column: 12 },
                      end: { line: 34, column: 41 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 34, column: 12 },
                        end: { line: 34, column: 15 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 34, column: 13 },
                          end: { line: 34, column: 14 },
                        },
                        name: "p",
                      },
                      attributes: [],
                      selfClosing: false,
                    },
                    children: [
                      {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 34, column: 15 },
                          end: { line: 34, column: 37 },
                        },
                        expression: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 34, column: 16 },
                            end: { line: 34, column: 36 },
                          },
                          operator: "+",
                          left: {
                            type: "Literal",
                            loc: {
                              start: { line: 34, column: 16 },
                              end: { line: 34, column: 20 },
                            },
                            value: "a ",
                          },
                          right: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 34, column: 23 },
                              end: { line: 34, column: 36 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 34, column: 23 },
                                end: { line: 34, column: 34 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 34, column: 23 },
                                  end: { line: 34, column: 30 },
                                },
                                name: "doubled",
                                key: "doubled$3vk1ks01z9ilh$1",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 34, column: 31 },
                                  end: { line: 34, column: 34 },
                                },
                                name: "get",
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
                        start: { line: 34, column: 37 },
                        end: { line: 34, column: 41 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 34, column: 39 },
                          end: { line: 34, column: 40 },
                        },
                        name: "p",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 35, column: 12 },
                      end: { line: 35, column: 12 },
                    },
                    value: "\n            ",
                    raw: "\n            ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 35, column: 12 },
                      end: { line: 35, column: 41 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 35, column: 12 },
                        end: { line: 35, column: 15 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 35, column: 13 },
                          end: { line: 35, column: 14 },
                        },
                        name: "p",
                      },
                      attributes: [],
                      selfClosing: false,
                    },
                    children: [
                      {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 35, column: 15 },
                          end: { line: 35, column: 37 },
                        },
                        expression: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 35, column: 16 },
                            end: { line: 35, column: 36 },
                          },
                          operator: "+",
                          left: {
                            type: "Literal",
                            loc: {
                              start: { line: 35, column: 16 },
                              end: { line: 35, column: 20 },
                            },
                            value: "b ",
                          },
                          right: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 35, column: 23 },
                              end: { line: 35, column: 36 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 35, column: 23 },
                                end: { line: 35, column: 34 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 35, column: 23 },
                                  end: { line: 35, column: 30 },
                                },
                                name: "doubled",
                                key: "doubled$3vk1ks01z9ilh$1",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 35, column: 31 },
                                  end: { line: 35, column: 34 },
                                },
                                name: "get",
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
                        start: { line: 35, column: 37 },
                        end: { line: 35, column: 41 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 35, column: 39 },
                          end: { line: 35, column: 40 },
                        },
                        name: "p",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 36, column: 12 },
                      end: { line: 36, column: 12 },
                    },
                    value: "\n            ",
                    raw: "\n            ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 36, column: 12 },
                      end: { line: 36, column: 41 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 36, column: 12 },
                        end: { line: 36, column: 15 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 36, column: 13 },
                          end: { line: 36, column: 14 },
                        },
                        name: "p",
                      },
                      attributes: [],
                      selfClosing: false,
                    },
                    children: [
                      {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 36, column: 15 },
                          end: { line: 36, column: 37 },
                        },
                        expression: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 36, column: 16 },
                            end: { line: 36, column: 36 },
                          },
                          operator: "+",
                          left: {
                            type: "Literal",
                            loc: {
                              start: { line: 36, column: 16 },
                              end: { line: 36, column: 20 },
                            },
                            value: "c ",
                          },
                          right: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 36, column: 23 },
                              end: { line: 36, column: 36 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 36, column: 23 },
                                end: { line: 36, column: 34 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 36, column: 23 },
                                  end: { line: 36, column: 30 },
                                },
                                name: "doubled",
                                key: "doubled$3vk1ks01z9ilh$1",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 36, column: 31 },
                                  end: { line: 36, column: 34 },
                                },
                                name: "get",
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
                        start: { line: 36, column: 37 },
                        end: { line: 36, column: 41 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 36, column: 39 },
                          end: { line: 36, column: 40 },
                        },
                        name: "p",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 37, column: 10 },
                      end: { line: 37, column: 10 },
                    },
                    value: "\n          ",
                    raw: "\n          ",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 37, column: 10 },
                    end: { line: 37, column: 16 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 37, column: 12 },
                      end: { line: 37, column: 15 },
                    },
                    name: "div",
                  },
                },
              },
            },
          ],
        }),
        {
          code: 'export default ($0, $1, $2) => {\n    const n = $0()(1);\n    const doubled = $1()(() => {\n        $2().console.log();\n        return n.get() * 2;\n    });\n    return (<div>\n            <button onclick={() => n.set(n.get() + 1)}>add</button>\n            <p>{"a " + doubled.get()}</p>\n            <p>{"b " + doubled.get()}</p>\n            <p>{"c " + doubled.get()}</p>\n          </div>);\n};',
          map: '{"version":3,"file":"computed.test.jsx","sourceRoot":"","sources":["computed.test.tsx"],"names":[],"mappings":"eAwBS;IACD,MAAM,CAAC,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IACpB,MAAM,OAAO,GAAG,IAAS,CAAC,GAAG,EAAE;QAC7B,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC;QACtB,OAAO,CAAC,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC;IACrB,CAAC,CAAC,CAAC;IACH,OAAO,CACL,CAAC,GAAG,CACF;YAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,GAAG,EAAE,MAAM,CACtD;YAAA,CAAC,CAAC,CAAC,CAAC,IAAI,GAAG,OAAO,CAAC,GAAG,EAAE,CAAC,EAAE,CAAC,CAC5B;YAAA,CAAC,CAAC,CAAC,CAAC,IAAI,GAAG,OAAO,CAAC,GAAG,EAAE,CAAC,EAAE,CAAC,CAC5B;YAAA,CAAC,CAAC,CAAC,CAAC,IAAI,GAAG,OAAO,CAAC,GAAG,EAAE,CAAC,EAAE,CAAC,CAC9B;UAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
        },
      ),
    );
    assert.equal(runs, 1);
    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 2);
    assert.ok(screen.getByText("a 4"));
    assert.ok(screen.getByText("c 4"));
  });
  it("passes a change on only when its value changes", async () => {
    await render(
      cs.create(
        "3vk1ks01z9ilh:51:6",
        {
          params: [
            { kind: "splice", value: state, bindings: [] },
            { kind: "splice", value: computed, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        () => ({
          type: "BlockStatement",
          loc: { start: { line: 51, column: 9 }, end: { line: 64, column: 7 } },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 52, column: 8 },
                end: { line: 52, column: 28 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 52, column: 14 },
                    end: { line: 52, column: 27 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 52, column: 14 },
                      end: { line: 52, column: 15 },
                    },
                    name: "n",
                    key: "n$3vk1ks01z9ilh$2",
                  },
                  init: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 52, column: 18 },
                      end: { line: 52, column: 27 },
                    },
                    callee: {
                      type: "Splice",
                      loc: {
                        start: { line: 52, column: 18 },
                        end: { line: 52, column: 24 },
                      },
                      param: 0,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 52, column: 25 },
                          end: { line: 52, column: 26 },
                        },
                        value: 1,
                      },
                    ],
                    optional: false,
                  },
                },
              ],
            },
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 53, column: 8 },
                end: { line: 53, column: 51 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 53, column: 14 },
                    end: { line: 53, column: 50 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 53, column: 14 },
                      end: { line: 53, column: 19 },
                    },
                    name: "isBig",
                    key: "isBig$3vk1ks01z9ilh$3",
                  },
                  init: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 53, column: 22 },
                      end: { line: 53, column: 50 },
                    },
                    callee: {
                      type: "Splice",
                      loc: {
                        start: { line: 53, column: 22 },
                        end: { line: 53, column: 31 },
                      },
                      param: 1,
                    },
                    arguments: [
                      {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 53, column: 32 },
                          end: { line: 53, column: 49 },
                        },
                        params: [],
                        body: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 53, column: 38 },
                            end: { line: 53, column: 49 },
                          },
                          operator: ">",
                          left: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 53, column: 38 },
                              end: { line: 53, column: 45 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 53, column: 38 },
                                end: { line: 53, column: 43 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 53, column: 38 },
                                  end: { line: 53, column: 39 },
                                },
                                name: "n",
                                key: "n$3vk1ks01z9ilh$2",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 53, column: 40 },
                                  end: { line: 53, column: 43 },
                                },
                                name: "get",
                              },
                              computed: false,
                              optional: false,
                            },
                            arguments: [],
                            optional: false,
                          },
                          right: {
                            type: "Literal",
                            loc: {
                              start: { line: 53, column: 48 },
                              end: { line: 53, column: 49 },
                            },
                            value: 2,
                          },
                        },
                        expression: true,
                      },
                    ],
                    optional: false,
                  },
                },
              ],
            },
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 54, column: 8 },
                end: { line: 57, column: 10 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 54, column: 14 },
                    end: { line: 57, column: 9 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 54, column: 14 },
                      end: { line: 54, column: 19 },
                    },
                    name: "label",
                    key: "label$3vk1ks01z9ilh$4",
                  },
                  init: {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 54, column: 22 },
                      end: { line: 57, column: 9 },
                    },
                    params: [],
                    body: {
                      type: "BlockStatement",
                      loc: {
                        start: { line: 54, column: 28 },
                        end: { line: 57, column: 9 },
                      },
                      body: [
                        {
                          type: "ExpressionStatement",
                          loc: {
                            start: { line: 55, column: 10 },
                            end: { line: 55, column: 32 },
                          },
                          expression: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 55, column: 10 },
                              end: { line: 55, column: 31 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 55, column: 10 },
                                end: { line: 55, column: 29 },
                              },
                              object: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 55, column: 10 },
                                  end: { line: 55, column: 25 },
                                },
                                object: {
                                  type: "Splice",
                                  loc: {
                                    start: { line: 55, column: 10 },
                                    end: { line: 55, column: 17 },
                                  },
                                  param: 2,
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 55, column: 18 },
                                    end: { line: 55, column: 25 },
                                  },
                                  name: "console",
                                },
                                computed: false,
                                optional: false,
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 55, column: 26 },
                                  end: { line: 55, column: 29 },
                                },
                                name: "log",
                              },
                              computed: false,
                              optional: false,
                            },
                            arguments: [],
                            optional: false,
                          },
                        },
                        {
                          type: "ReturnStatement",
                          loc: {
                            start: { line: 56, column: 10 },
                            end: { line: 56, column: 47 },
                          },
                          argument: {
                            type: "ConditionalExpression",
                            loc: {
                              start: { line: 56, column: 17 },
                              end: { line: 56, column: 46 },
                            },
                            test: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 56, column: 17 },
                                end: { line: 56, column: 28 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 56, column: 17 },
                                  end: { line: 56, column: 26 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 56, column: 17 },
                                    end: { line: 56, column: 22 },
                                  },
                                  name: "isBig",
                                  key: "isBig$3vk1ks01z9ilh$3",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 56, column: 23 },
                                    end: { line: 56, column: 26 },
                                  },
                                  name: "get",
                                },
                                computed: false,
                                optional: false,
                              },
                              arguments: [],
                              optional: false,
                            },
                            consequent: {
                              type: "Literal",
                              loc: {
                                start: { line: 56, column: 31 },
                                end: { line: 56, column: 36 },
                              },
                              value: "big",
                            },
                            alternate: {
                              type: "Literal",
                              loc: {
                                start: { line: 56, column: 39 },
                                end: { line: 56, column: 46 },
                              },
                              value: "small",
                            },
                          },
                        },
                      ],
                    },
                    expression: false,
                  },
                },
              ],
            },
            {
              type: "ReturnStatement",
              loc: {
                start: { line: 58, column: 8 },
                end: { line: 63, column: 10 },
              },
              argument: {
                type: "JSXElement",
                loc: {
                  start: { line: 59, column: 10 },
                  end: { line: 62, column: 16 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 59, column: 10 },
                    end: { line: 59, column: 15 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 59, column: 11 },
                      end: { line: 59, column: 14 },
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
                      start: { line: 60, column: 12 },
                      end: { line: 60, column: 12 },
                    },
                    value: "\n            ",
                    raw: "\n            ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 60, column: 12 },
                      end: { line: 60, column: 67 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 60, column: 12 },
                        end: { line: 60, column: 55 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 60, column: 13 },
                          end: { line: 60, column: 19 },
                        },
                        name: "button",
                      },
                      attributes: [
                        {
                          type: "JSXAttribute",
                          loc: {
                            start: { line: 60, column: 20 },
                            end: { line: 60, column: 54 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 60, column: 20 },
                              end: { line: 60, column: 27 },
                            },
                            name: "onclick",
                          },
                          value: {
                            type: "JSXExpressionContainer",
                            loc: {
                              start: { line: 60, column: 28 },
                              end: { line: 60, column: 54 },
                            },
                            expression: {
                              type: "ArrowFunctionExpression",
                              loc: {
                                start: { line: 60, column: 29 },
                                end: { line: 60, column: 53 },
                              },
                              params: [],
                              body: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 60, column: 35 },
                                  end: { line: 60, column: 53 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 60, column: 35 },
                                    end: { line: 60, column: 40 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 60, column: 35 },
                                      end: { line: 60, column: 36 },
                                    },
                                    name: "n",
                                    key: "n$3vk1ks01z9ilh$2",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 60, column: 37 },
                                      end: { line: 60, column: 40 },
                                    },
                                    name: "set",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                                arguments: [
                                  {
                                    type: "BinaryExpression",
                                    loc: {
                                      start: { line: 60, column: 41 },
                                      end: { line: 60, column: 52 },
                                    },
                                    operator: "+",
                                    left: {
                                      type: "CallExpression",
                                      loc: {
                                        start: { line: 60, column: 41 },
                                        end: { line: 60, column: 48 },
                                      },
                                      callee: {
                                        type: "MemberExpression",
                                        loc: {
                                          start: { line: 60, column: 41 },
                                          end: { line: 60, column: 46 },
                                        },
                                        object: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 60, column: 41 },
                                            end: { line: 60, column: 42 },
                                          },
                                          name: "n",
                                          key: "n$3vk1ks01z9ilh$2",
                                        },
                                        property: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 60, column: 43 },
                                            end: { line: 60, column: 46 },
                                          },
                                          name: "get",
                                        },
                                        computed: false,
                                        optional: false,
                                      },
                                      arguments: [],
                                      optional: false,
                                    },
                                    right: {
                                      type: "Literal",
                                      loc: {
                                        start: { line: 60, column: 51 },
                                        end: { line: 60, column: 52 },
                                      },
                                      value: 1,
                                    },
                                  },
                                ],
                                optional: false,
                              },
                              expression: true,
                            },
                          },
                        },
                      ],
                      selfClosing: false,
                    },
                    children: [
                      {
                        type: "JSXText",
                        loc: {
                          start: { line: 60, column: 55 },
                          end: { line: 60, column: 58 },
                        },
                        value: "add",
                        raw: "add",
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 60, column: 58 },
                        end: { line: 60, column: 67 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 60, column: 60 },
                          end: { line: 60, column: 66 },
                        },
                        name: "button",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 61, column: 12 },
                      end: { line: 61, column: 12 },
                    },
                    value: "\n            ",
                    raw: "\n            ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 61, column: 12 },
                      end: { line: 61, column: 28 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 61, column: 12 },
                        end: { line: 61, column: 15 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 61, column: 13 },
                          end: { line: 61, column: 14 },
                        },
                        name: "p",
                      },
                      attributes: [],
                      selfClosing: false,
                    },
                    children: [
                      {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 61, column: 15 },
                          end: { line: 61, column: 24 },
                        },
                        expression: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 61, column: 16 },
                            end: { line: 61, column: 23 },
                          },
                          callee: {
                            type: "Identifier",
                            loc: {
                              start: { line: 61, column: 16 },
                              end: { line: 61, column: 21 },
                            },
                            name: "label",
                            key: "label$3vk1ks01z9ilh$4",
                          },
                          arguments: [],
                          optional: false,
                        },
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 61, column: 24 },
                        end: { line: 61, column: 28 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 61, column: 26 },
                          end: { line: 61, column: 27 },
                        },
                        name: "p",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 62, column: 10 },
                      end: { line: 62, column: 10 },
                    },
                    value: "\n          ",
                    raw: "\n          ",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 62, column: 10 },
                    end: { line: 62, column: 16 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 62, column: 12 },
                      end: { line: 62, column: 15 },
                    },
                    name: "div",
                  },
                },
              },
            },
          ],
        }),
        {
          code: 'export default ($0, $1, $2) => {\n    const n = $0()(1);\n    const isBig = $1()(() => n.get() > 2);\n    const label = () => {\n        $2().console.log();\n        return isBig.get() ? "big" : "small";\n    };\n    return (<div>\n            <button onclick={() => n.set(n.get() + 1)}>add</button>\n            <p>{label()}</p>\n          </div>);\n};',
          map: '{"version":3,"file":"computed.test.jsx","sourceRoot":"","sources":["computed.test.tsx"],"names":[],"mappings":"eAkDS;IACD,MAAM,CAAC,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IACpB,MAAM,KAAK,GAAG,IAAS,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC;IAC3C,MAAM,KAAK,GAAG,GAAG,EAAE;QACjB,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC;QACtB,OAAO,KAAK,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,OAAO,CAAC;IACvC,CAAC,CAAC;IACF,OAAO,CACL,CAAC,GAAG,CACF;YAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,GAAG,EAAE,MAAM,CACtD;YAAA,CAAC,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,EAAE,CAAC,CACjB;UAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
        },
      ),
    );
    assert.equal(runs, 1);
    // 1 to 2: still small, so the reader doesn't run.
    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 1);
    // 2 to 3: big now.
    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 2);
    assert.ok(screen.getByText("big"));
  });
});
