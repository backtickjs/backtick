import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { computed, cs, state } from "@backtickjs/core";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
// Each reader logs when it runs, so a test counts the runs by counting the
// logs, and reads what was logged.
let logged = [];
const log = globalThis.window.console.log;
beforeEach(() => {
  logged = [];
  globalThis.window.console.log = (...values) => {
    logged.push(values);
  };
});
afterEach(() => {
  globalThis.window.console.log = log;
});
const press = () => userEvent.click(screen.getByRole("button"));
describe("equals", () => {
  it("keeps a computed's readers from updating for an equal value", async () => {
    await render(
      cs.create(
        "34j4m9r77iqx8:27:6",
        {
          params: [
            { kind: "splice", value: state, bindings: [] },
            { kind: "splice", value: computed, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        () => ({
          type: "BlockStatement",
          loc: { start: { line: 27, column: 9 }, end: { line: 42, column: 7 } },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 28, column: 8 },
                end: { line: 28, column: 28 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 28, column: 14 },
                    end: { line: 28, column: 27 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 28, column: 14 },
                      end: { line: 28, column: 15 },
                    },
                    name: "n",
                    key: "n$34j4m9r77iqx8$0",
                  },
                  init: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 28, column: 18 },
                      end: { line: 28, column: 27 },
                    },
                    callee: {
                      type: "Splice",
                      loc: {
                        start: { line: 28, column: 18 },
                        end: { line: 28, column: 24 },
                      },
                      param: 0,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 28, column: 25 },
                          end: { line: 28, column: 26 },
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
                start: { line: 29, column: 8 },
                end: { line: 31, column: 11 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 29, column: 14 },
                    end: { line: 31, column: 10 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 29, column: 14 },
                      end: { line: 29, column: 18 },
                    },
                    name: "size",
                    key: "size$34j4m9r77iqx8$1",
                  },
                  init: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 29, column: 21 },
                      end: { line: 31, column: 10 },
                    },
                    callee: {
                      type: "Splice",
                      loc: {
                        start: { line: 29, column: 21 },
                        end: { line: 29, column: 30 },
                      },
                      param: 1,
                    },
                    arguments: [
                      {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 29, column: 31 },
                          end: { line: 29, column: 73 },
                        },
                        params: [],
                        body: {
                          type: "ObjectExpression",
                          loc: {
                            start: { line: 29, column: 38 },
                            end: { line: 29, column: 72 },
                          },
                          properties: [
                            {
                              type: "Property",
                              loc: {
                                start: { line: 29, column: 40 },
                                end: { line: 29, column: 58 },
                              },
                              key: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 29, column: 40 },
                                  end: { line: 29, column: 45 },
                                },
                                name: "isBig",
                              },
                              value: {
                                type: "BinaryExpression",
                                loc: {
                                  start: { line: 29, column: 47 },
                                  end: { line: 29, column: 58 },
                                },
                                operator: ">",
                                left: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 29, column: 47 },
                                    end: { line: 29, column: 54 },
                                  },
                                  callee: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 29, column: 47 },
                                      end: { line: 29, column: 52 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 29, column: 47 },
                                        end: { line: 29, column: 48 },
                                      },
                                      name: "n",
                                      key: "n$34j4m9r77iqx8$0",
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 29, column: 49 },
                                        end: { line: 29, column: 52 },
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
                                    start: { line: 29, column: 57 },
                                    end: { line: 29, column: 58 },
                                  },
                                  value: 2,
                                },
                              },
                              kind: "init",
                              computed: false,
                              method: false,
                              shorthand: false,
                            },
                            {
                              type: "Property",
                              loc: {
                                start: { line: 29, column: 60 },
                                end: { line: 29, column: 70 },
                              },
                              key: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 29, column: 60 },
                                  end: { line: 29, column: 61 },
                                },
                                name: "n",
                              },
                              value: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 29, column: 63 },
                                  end: { line: 29, column: 70 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 29, column: 63 },
                                    end: { line: 29, column: 68 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 29, column: 63 },
                                      end: { line: 29, column: 64 },
                                    },
                                    name: "n",
                                    key: "n$34j4m9r77iqx8$0",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 29, column: 65 },
                                      end: { line: 29, column: 68 },
                                    },
                                    name: "get",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                                arguments: [],
                                optional: false,
                              },
                              kind: "init",
                              computed: false,
                              method: false,
                              shorthand: false,
                            },
                          ],
                        },
                        expression: true,
                      },
                      {
                        type: "ObjectExpression",
                        loc: {
                          start: { line: 29, column: 75 },
                          end: { line: 31, column: 9 },
                        },
                        properties: [
                          {
                            type: "Property",
                            loc: {
                              start: { line: 30, column: 10 },
                              end: { line: 30, column: 67 },
                            },
                            key: {
                              type: "Identifier",
                              loc: {
                                start: { line: 30, column: 10 },
                                end: { line: 30, column: 16 },
                              },
                              name: "equals",
                            },
                            value: {
                              type: "ArrowFunctionExpression",
                              loc: {
                                start: { line: 30, column: 18 },
                                end: { line: 30, column: 67 },
                              },
                              params: [
                                {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 30, column: 19 },
                                    end: { line: 30, column: 27 },
                                  },
                                  name: "previous",
                                  key: "previous$34j4m9r77iqx8$3",
                                },
                                {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 30, column: 29 },
                                    end: { line: 30, column: 33 },
                                  },
                                  name: "next",
                                  key: "next$34j4m9r77iqx8$4",
                                },
                              ],
                              body: {
                                type: "BinaryExpression",
                                loc: {
                                  start: { line: 30, column: 38 },
                                  end: { line: 30, column: 67 },
                                },
                                operator: "===",
                                left: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 30, column: 38 },
                                    end: { line: 30, column: 52 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 30, column: 38 },
                                      end: { line: 30, column: 46 },
                                    },
                                    name: "previous",
                                    key: "previous$34j4m9r77iqx8$3",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 30, column: 47 },
                                      end: { line: 30, column: 52 },
                                    },
                                    name: "isBig",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                                right: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 30, column: 57 },
                                    end: { line: 30, column: 67 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 30, column: 57 },
                                      end: { line: 30, column: 61 },
                                    },
                                    name: "next",
                                    key: "next$34j4m9r77iqx8$4",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 30, column: 62 },
                                      end: { line: 30, column: 67 },
                                    },
                                    name: "isBig",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                              },
                              expression: true,
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
              ],
            },
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 32, column: 8 },
                end: { line: 35, column: 10 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 32, column: 14 },
                    end: { line: 35, column: 9 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 32, column: 14 },
                      end: { line: 32, column: 19 },
                    },
                    name: "label",
                    key: "label$34j4m9r77iqx8$2",
                  },
                  init: {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 32, column: 22 },
                      end: { line: 35, column: 9 },
                    },
                    params: [],
                    body: {
                      type: "BlockStatement",
                      loc: {
                        start: { line: 32, column: 28 },
                        end: { line: 35, column: 9 },
                      },
                      body: [
                        {
                          type: "ExpressionStatement",
                          loc: {
                            start: { line: 33, column: 10 },
                            end: { line: 33, column: 32 },
                          },
                          expression: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 33, column: 10 },
                              end: { line: 33, column: 31 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 33, column: 10 },
                                end: { line: 33, column: 29 },
                              },
                              object: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 33, column: 10 },
                                  end: { line: 33, column: 25 },
                                },
                                object: {
                                  type: "Splice",
                                  loc: {
                                    start: { line: 33, column: 10 },
                                    end: { line: 33, column: 17 },
                                  },
                                  param: 2,
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 33, column: 18 },
                                    end: { line: 33, column: 25 },
                                  },
                                  name: "console",
                                },
                                computed: false,
                                optional: false,
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 33, column: 26 },
                                  end: { line: 33, column: 29 },
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
                            start: { line: 34, column: 10 },
                            end: { line: 34, column: 52 },
                          },
                          argument: {
                            type: "ConditionalExpression",
                            loc: {
                              start: { line: 34, column: 17 },
                              end: { line: 34, column: 51 },
                            },
                            test: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 34, column: 17 },
                                end: { line: 34, column: 33 },
                              },
                              object: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 34, column: 17 },
                                  end: { line: 34, column: 27 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 34, column: 17 },
                                    end: { line: 34, column: 25 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 34, column: 17 },
                                      end: { line: 34, column: 21 },
                                    },
                                    name: "size",
                                    key: "size$34j4m9r77iqx8$1",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 34, column: 22 },
                                      end: { line: 34, column: 25 },
                                    },
                                    name: "get",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                                arguments: [],
                                optional: false,
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 34, column: 28 },
                                  end: { line: 34, column: 33 },
                                },
                                name: "isBig",
                              },
                              computed: false,
                              optional: false,
                            },
                            consequent: {
                              type: "Literal",
                              loc: {
                                start: { line: 34, column: 36 },
                                end: { line: 34, column: 41 },
                              },
                              value: "big",
                            },
                            alternate: {
                              type: "Literal",
                              loc: {
                                start: { line: 34, column: 44 },
                                end: { line: 34, column: 51 },
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
                start: { line: 36, column: 8 },
                end: { line: 41, column: 10 },
              },
              argument: {
                type: "JSXElement",
                loc: {
                  start: { line: 37, column: 10 },
                  end: { line: 40, column: 16 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 37, column: 10 },
                    end: { line: 37, column: 15 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 37, column: 11 },
                      end: { line: 37, column: 14 },
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
                      start: { line: 38, column: 12 },
                      end: { line: 38, column: 12 },
                    },
                    value: "\n            ",
                    raw: "\n            ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 38, column: 12 },
                      end: { line: 38, column: 67 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 38, column: 12 },
                        end: { line: 38, column: 55 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 38, column: 13 },
                          end: { line: 38, column: 19 },
                        },
                        name: "button",
                      },
                      attributes: [
                        {
                          type: "JSXAttribute",
                          loc: {
                            start: { line: 38, column: 20 },
                            end: { line: 38, column: 54 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 38, column: 20 },
                              end: { line: 38, column: 27 },
                            },
                            name: "onclick",
                          },
                          value: {
                            type: "JSXExpressionContainer",
                            loc: {
                              start: { line: 38, column: 28 },
                              end: { line: 38, column: 54 },
                            },
                            expression: {
                              type: "ArrowFunctionExpression",
                              loc: {
                                start: { line: 38, column: 29 },
                                end: { line: 38, column: 53 },
                              },
                              params: [],
                              body: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 38, column: 35 },
                                  end: { line: 38, column: 53 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 38, column: 35 },
                                    end: { line: 38, column: 40 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 38, column: 35 },
                                      end: { line: 38, column: 36 },
                                    },
                                    name: "n",
                                    key: "n$34j4m9r77iqx8$0",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 38, column: 37 },
                                      end: { line: 38, column: 40 },
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
                                      start: { line: 38, column: 41 },
                                      end: { line: 38, column: 52 },
                                    },
                                    operator: "+",
                                    left: {
                                      type: "CallExpression",
                                      loc: {
                                        start: { line: 38, column: 41 },
                                        end: { line: 38, column: 48 },
                                      },
                                      callee: {
                                        type: "MemberExpression",
                                        loc: {
                                          start: { line: 38, column: 41 },
                                          end: { line: 38, column: 46 },
                                        },
                                        object: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 38, column: 41 },
                                            end: { line: 38, column: 42 },
                                          },
                                          name: "n",
                                          key: "n$34j4m9r77iqx8$0",
                                        },
                                        property: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 38, column: 43 },
                                            end: { line: 38, column: 46 },
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
                                        start: { line: 38, column: 51 },
                                        end: { line: 38, column: 52 },
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
                          start: { line: 38, column: 55 },
                          end: { line: 38, column: 58 },
                        },
                        value: "add",
                        raw: "add",
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 38, column: 58 },
                        end: { line: 38, column: 67 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 38, column: 60 },
                          end: { line: 38, column: 66 },
                        },
                        name: "button",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 39, column: 12 },
                      end: { line: 39, column: 12 },
                    },
                    value: "\n            ",
                    raw: "\n            ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 39, column: 12 },
                      end: { line: 39, column: 28 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 39, column: 12 },
                        end: { line: 39, column: 15 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 39, column: 13 },
                          end: { line: 39, column: 14 },
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
                          start: { line: 39, column: 15 },
                          end: { line: 39, column: 24 },
                        },
                        expression: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 39, column: 16 },
                            end: { line: 39, column: 23 },
                          },
                          callee: {
                            type: "Identifier",
                            loc: {
                              start: { line: 39, column: 16 },
                              end: { line: 39, column: 21 },
                            },
                            name: "label",
                            key: "label$34j4m9r77iqx8$2",
                          },
                          arguments: [],
                          optional: false,
                        },
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 39, column: 24 },
                        end: { line: 39, column: 28 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 39, column: 26 },
                          end: { line: 39, column: 27 },
                        },
                        name: "p",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 40, column: 10 },
                      end: { line: 40, column: 10 },
                    },
                    value: "\n          ",
                    raw: "\n          ",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 40, column: 10 },
                    end: { line: 40, column: 16 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 40, column: 12 },
                      end: { line: 40, column: 15 },
                    },
                    name: "div",
                  },
                },
              },
            },
          ],
        }),
        {
          code: 'export default ($0, $1, $2) => {\n    const n = $0()(1);\n    const size = $1()(() => ({ isBig: n.get() > 2, n: n.get() }), {\n        equals: (previous, next) => previous.isBig === next.isBig,\n    });\n    const label = () => {\n        $2().console.log();\n        return size.get().isBig ? "big" : "small";\n    };\n    return (<div>\n            <button onclick={() => n.set(n.get() + 1)}>add</button>\n            <p>{label()}</p>\n          </div>);\n};',
          map: '{"version":3,"file":"equals.test.jsx","sourceRoot":"","sources":["equals.test.tsx"],"names":[],"mappings":"eA0BS;IACD,MAAM,CAAC,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IACpB,MAAM,IAAI,GAAG,IAAS,CAAC,GAAG,EAAE,CAAC,CAAC,EAAE,KAAK,EAAE,CAAC,CAAC,GAAG,EAAE,GAAG,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,GAAG,EAAE,EAAE,CAAC,EAAE;QACjE,MAAM,EAAE,CAAC,QAAQ,EAAE,IAAI,EAAE,EAAE,CAAC,QAAQ,CAAC,KAAK,KAAK,IAAI,CAAC,KAAK;KAC1D,CAAC,CAAC;IACH,MAAM,KAAK,GAAG,GAAG,EAAE;QACjB,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC;QACtB,OAAO,IAAI,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,OAAO,CAAC;IAC5C,CAAC,CAAC;IACF,OAAO,CACL,CAAC,GAAG,CACF;YAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,GAAG,EAAE,MAAM,CACtD;YAAA,CAAC,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,EAAE,CAAC,CACjB;UAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
          imports: [],
          exportAt: 0,
        },
      ),
    );
    assert.equal(logged.length, 1);
    // A new object, but `isBig` is still false.
    await press();
    assert.equal(logged.length, 1);
    await press();
    assert.equal(logged.length, 2);
    assert.ok(screen.getByText("big"));
  });
  it("keeps a state's readers from updating for an equal value", async () => {
    await render(
      cs.create(
        "34j4m9r77iqx8:57:6",
        {
          params: [
            { kind: "splice", value: state, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        () => ({
          type: "BlockStatement",
          loc: { start: { line: 57, column: 9 }, end: { line: 74, column: 7 } },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 58, column: 8 },
                end: { line: 61, column: 10 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 58, column: 14 },
                    end: { line: 61, column: 9 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 58, column: 14 },
                      end: { line: 58, column: 19 },
                    },
                    name: "point",
                    key: "point$34j4m9r77iqx8$5",
                  },
                  init: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 58, column: 22 },
                      end: { line: 61, column: 9 },
                    },
                    callee: {
                      type: "Splice",
                      loc: {
                        start: { line: 58, column: 22 },
                        end: { line: 58, column: 28 },
                      },
                      param: 0,
                    },
                    arguments: [
                      {
                        type: "ObjectExpression",
                        loc: {
                          start: { line: 59, column: 10 },
                          end: { line: 59, column: 18 },
                        },
                        properties: [
                          {
                            type: "Property",
                            loc: {
                              start: { line: 59, column: 12 },
                              end: { line: 59, column: 16 },
                            },
                            key: {
                              type: "Identifier",
                              loc: {
                                start: { line: 59, column: 12 },
                                end: { line: 59, column: 13 },
                              },
                              name: "x",
                            },
                            value: {
                              type: "Literal",
                              loc: {
                                start: { line: 59, column: 15 },
                                end: { line: 59, column: 16 },
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
                      {
                        type: "ObjectExpression",
                        loc: {
                          start: { line: 60, column: 10 },
                          end: { line: 60, column: 63 },
                        },
                        properties: [
                          {
                            type: "Property",
                            loc: {
                              start: { line: 60, column: 12 },
                              end: { line: 60, column: 61 },
                            },
                            key: {
                              type: "Identifier",
                              loc: {
                                start: { line: 60, column: 12 },
                                end: { line: 60, column: 18 },
                              },
                              name: "equals",
                            },
                            value: {
                              type: "ArrowFunctionExpression",
                              loc: {
                                start: { line: 60, column: 20 },
                                end: { line: 60, column: 61 },
                              },
                              params: [
                                {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 60, column: 21 },
                                    end: { line: 60, column: 29 },
                                  },
                                  name: "previous",
                                  key: "previous$34j4m9r77iqx8$7",
                                },
                                {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 60, column: 31 },
                                    end: { line: 60, column: 35 },
                                  },
                                  name: "next",
                                  key: "next$34j4m9r77iqx8$8",
                                },
                              ],
                              body: {
                                type: "BinaryExpression",
                                loc: {
                                  start: { line: 60, column: 40 },
                                  end: { line: 60, column: 61 },
                                },
                                operator: "===",
                                left: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 60, column: 40 },
                                    end: { line: 60, column: 50 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 60, column: 40 },
                                      end: { line: 60, column: 48 },
                                    },
                                    name: "previous",
                                    key: "previous$34j4m9r77iqx8$7",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 60, column: 49 },
                                      end: { line: 60, column: 50 },
                                    },
                                    name: "x",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                                right: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 60, column: 55 },
                                    end: { line: 60, column: 61 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 60, column: 55 },
                                      end: { line: 60, column: 59 },
                                    },
                                    name: "next",
                                    key: "next$34j4m9r77iqx8$8",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 60, column: 60 },
                                      end: { line: 60, column: 61 },
                                    },
                                    name: "x",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                              },
                              expression: true,
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
              ],
            },
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 62, column: 8 },
                end: { line: 65, column: 10 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 62, column: 14 },
                    end: { line: 65, column: 9 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 62, column: 14 },
                      end: { line: 62, column: 19 },
                    },
                    name: "label",
                    key: "label$34j4m9r77iqx8$6",
                  },
                  init: {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 62, column: 22 },
                      end: { line: 65, column: 9 },
                    },
                    params: [],
                    body: {
                      type: "BlockStatement",
                      loc: {
                        start: { line: 62, column: 28 },
                        end: { line: 65, column: 9 },
                      },
                      body: [
                        {
                          type: "ExpressionStatement",
                          loc: {
                            start: { line: 63, column: 10 },
                            end: { line: 63, column: 32 },
                          },
                          expression: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 63, column: 10 },
                              end: { line: 63, column: 31 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 63, column: 10 },
                                end: { line: 63, column: 29 },
                              },
                              object: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 63, column: 10 },
                                  end: { line: 63, column: 25 },
                                },
                                object: {
                                  type: "Splice",
                                  loc: {
                                    start: { line: 63, column: 10 },
                                    end: { line: 63, column: 17 },
                                  },
                                  param: 1,
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 63, column: 18 },
                                    end: { line: 63, column: 25 },
                                  },
                                  name: "console",
                                },
                                computed: false,
                                optional: false,
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 63, column: 26 },
                                  end: { line: 63, column: 29 },
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
                            start: { line: 64, column: 10 },
                            end: { line: 64, column: 38 },
                          },
                          argument: {
                            type: "BinaryExpression",
                            loc: {
                              start: { line: 64, column: 17 },
                              end: { line: 64, column: 37 },
                            },
                            operator: "+",
                            left: {
                              type: "Literal",
                              loc: {
                                start: { line: 64, column: 17 },
                                end: { line: 64, column: 21 },
                              },
                              value: "x ",
                            },
                            right: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 64, column: 24 },
                                end: { line: 64, column: 37 },
                              },
                              object: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 64, column: 24 },
                                  end: { line: 64, column: 35 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 64, column: 24 },
                                    end: { line: 64, column: 33 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 64, column: 24 },
                                      end: { line: 64, column: 29 },
                                    },
                                    name: "point",
                                    key: "point$34j4m9r77iqx8$5",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 64, column: 30 },
                                      end: { line: 64, column: 33 },
                                    },
                                    name: "get",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                                arguments: [],
                                optional: false,
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 64, column: 36 },
                                  end: { line: 64, column: 37 },
                                },
                                name: "x",
                              },
                              computed: false,
                              optional: false,
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
                start: { line: 66, column: 8 },
                end: { line: 73, column: 10 },
              },
              argument: {
                type: "JSXElement",
                loc: {
                  start: { line: 67, column: 10 },
                  end: { line: 72, column: 16 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 67, column: 10 },
                    end: { line: 67, column: 15 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 67, column: 11 },
                      end: { line: 67, column: 14 },
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
                      start: { line: 68, column: 12 },
                      end: { line: 68, column: 12 },
                    },
                    value: "\n            ",
                    raw: "\n            ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 68, column: 12 },
                      end: { line: 70, column: 21 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 68, column: 12 },
                        end: { line: 68, column: 68 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 68, column: 13 },
                          end: { line: 68, column: 19 },
                        },
                        name: "button",
                      },
                      attributes: [
                        {
                          type: "JSXAttribute",
                          loc: {
                            start: { line: 68, column: 20 },
                            end: { line: 68, column: 67 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 68, column: 20 },
                              end: { line: 68, column: 27 },
                            },
                            name: "onclick",
                          },
                          value: {
                            type: "JSXExpressionContainer",
                            loc: {
                              start: { line: 68, column: 28 },
                              end: { line: 68, column: 67 },
                            },
                            expression: {
                              type: "ArrowFunctionExpression",
                              loc: {
                                start: { line: 68, column: 29 },
                                end: { line: 68, column: 66 },
                              },
                              params: [],
                              body: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 68, column: 35 },
                                  end: { line: 68, column: 66 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 68, column: 35 },
                                    end: { line: 68, column: 44 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 68, column: 35 },
                                      end: { line: 68, column: 40 },
                                    },
                                    name: "point",
                                    key: "point$34j4m9r77iqx8$5",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 68, column: 41 },
                                      end: { line: 68, column: 44 },
                                    },
                                    name: "set",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                                arguments: [
                                  {
                                    type: "ObjectExpression",
                                    loc: {
                                      start: { line: 68, column: 45 },
                                      end: { line: 68, column: 65 },
                                    },
                                    properties: [
                                      {
                                        type: "Property",
                                        loc: {
                                          start: { line: 68, column: 47 },
                                          end: { line: 68, column: 63 },
                                        },
                                        key: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 68, column: 47 },
                                            end: { line: 68, column: 48 },
                                          },
                                          name: "x",
                                        },
                                        value: {
                                          type: "MemberExpression",
                                          loc: {
                                            start: { line: 68, column: 50 },
                                            end: { line: 68, column: 63 },
                                          },
                                          object: {
                                            type: "CallExpression",
                                            loc: {
                                              start: { line: 68, column: 50 },
                                              end: { line: 68, column: 61 },
                                            },
                                            callee: {
                                              type: "MemberExpression",
                                              loc: {
                                                start: { line: 68, column: 50 },
                                                end: { line: 68, column: 59 },
                                              },
                                              object: {
                                                type: "Identifier",
                                                loc: {
                                                  start: {
                                                    line: 68,
                                                    column: 50,
                                                  },
                                                  end: { line: 68, column: 55 },
                                                },
                                                name: "point",
                                                key: "point$34j4m9r77iqx8$5",
                                              },
                                              property: {
                                                type: "Identifier",
                                                loc: {
                                                  start: {
                                                    line: 68,
                                                    column: 56,
                                                  },
                                                  end: { line: 68, column: 59 },
                                                },
                                                name: "get",
                                              },
                                              computed: false,
                                              optional: false,
                                            },
                                            arguments: [],
                                            optional: false,
                                          },
                                          property: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 68, column: 62 },
                                              end: { line: 68, column: 63 },
                                            },
                                            name: "x",
                                          },
                                          computed: false,
                                          optional: false,
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
                          start: { line: 69, column: 14 },
                          end: { line: 70, column: 12 },
                        },
                        value: "\n              same\n            ",
                        raw: "\n              same\n            ",
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 70, column: 12 },
                        end: { line: 70, column: 21 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 70, column: 14 },
                          end: { line: 70, column: 20 },
                        },
                        name: "button",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 71, column: 12 },
                      end: { line: 71, column: 12 },
                    },
                    value: "\n            ",
                    raw: "\n            ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 71, column: 12 },
                      end: { line: 71, column: 28 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 71, column: 12 },
                        end: { line: 71, column: 15 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 71, column: 13 },
                          end: { line: 71, column: 14 },
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
                          start: { line: 71, column: 15 },
                          end: { line: 71, column: 24 },
                        },
                        expression: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 71, column: 16 },
                            end: { line: 71, column: 23 },
                          },
                          callee: {
                            type: "Identifier",
                            loc: {
                              start: { line: 71, column: 16 },
                              end: { line: 71, column: 21 },
                            },
                            name: "label",
                            key: "label$34j4m9r77iqx8$6",
                          },
                          arguments: [],
                          optional: false,
                        },
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 71, column: 24 },
                        end: { line: 71, column: 28 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 71, column: 26 },
                          end: { line: 71, column: 27 },
                        },
                        name: "p",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 72, column: 10 },
                      end: { line: 72, column: 10 },
                    },
                    value: "\n          ",
                    raw: "\n          ",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 72, column: 10 },
                    end: { line: 72, column: 16 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 72, column: 12 },
                      end: { line: 72, column: 15 },
                    },
                    name: "div",
                  },
                },
              },
            },
          ],
        }),
        {
          code: 'export default ($0, $1) => {\n    const point = $0()({ x: 1 }, { equals: (previous, next) => previous.x === next.x });\n    const label = () => {\n        $1().console.log();\n        return "x " + point.get().x;\n    };\n    return (<div>\n            <button onclick={() => point.set({ x: point.get().x })}>\n              same\n            </button>\n            <p>{label()}</p>\n          </div>);\n};',
          map: '{"version":3,"file":"equals.test.jsx","sourceRoot":"","sources":["equals.test.tsx"],"names":[],"mappings":"eAwDS;IACD,MAAM,KAAK,GAAG,IAAM,CAClB,EAAE,CAAC,EAAE,CAAC,EAAE,EACR,EAAE,MAAM,EAAE,CAAC,QAAQ,EAAE,IAAI,EAAE,EAAE,CAAC,QAAQ,CAAC,CAAC,KAAK,IAAI,CAAC,CAAC,EAAE,CACtD,CAAC;IACF,MAAM,KAAK,GAAG,GAAG,EAAE;QACjB,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC;QACtB,OAAO,IAAI,GAAG,KAAK,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC;IAC9B,CAAC,CAAC;IACF,OAAO,CACL,CAAC,GAAG,CACF;YAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,GAAG,CAAC,EAAE,CAAC,EAAE,KAAK,CAAC,GAAG,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CACrD;;YACF,EAAE,MAAM,CACR;YAAA,CAAC,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,EAAE,CAAC,CACjB;UAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
          imports: [],
          exportAt: 0,
        },
      ),
    );
    await press();
    assert.equal(logged.length, 1);
  });
  it("is handed the previous and the next value", async () => {
    await render(
      cs.create(
        "34j4m9r77iqx8:82:6",
        {
          params: [
            { kind: "splice", value: state, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        () => ({
          type: "BlockStatement",
          loc: { start: { line: 82, column: 9 }, end: { line: 90, column: 7 } },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 83, column: 8 },
                end: { line: 88, column: 11 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 83, column: 14 },
                    end: { line: 88, column: 10 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 83, column: 14 },
                      end: { line: 83, column: 15 },
                    },
                    name: "n",
                    key: "n$34j4m9r77iqx8$9",
                  },
                  init: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 83, column: 18 },
                      end: { line: 88, column: 10 },
                    },
                    callee: {
                      type: "Splice",
                      loc: {
                        start: { line: 83, column: 18 },
                        end: { line: 83, column: 24 },
                      },
                      param: 0,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 83, column: 25 },
                          end: { line: 83, column: 26 },
                        },
                        value: 1,
                      },
                      {
                        type: "ObjectExpression",
                        loc: {
                          start: { line: 83, column: 28 },
                          end: { line: 88, column: 9 },
                        },
                        properties: [
                          {
                            type: "Property",
                            loc: {
                              start: { line: 84, column: 10 },
                              end: { line: 87, column: 11 },
                            },
                            key: {
                              type: "Identifier",
                              loc: {
                                start: { line: 84, column: 10 },
                                end: { line: 84, column: 16 },
                              },
                              name: "equals",
                            },
                            value: {
                              type: "ArrowFunctionExpression",
                              loc: {
                                start: { line: 84, column: 18 },
                                end: { line: 87, column: 11 },
                              },
                              params: [
                                {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 84, column: 19 },
                                    end: { line: 84, column: 27 },
                                  },
                                  name: "previous",
                                  key: "previous$34j4m9r77iqx8$10",
                                },
                                {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 84, column: 29 },
                                    end: { line: 84, column: 33 },
                                  },
                                  name: "next",
                                  key: "next$34j4m9r77iqx8$11",
                                },
                              ],
                              body: {
                                type: "BlockStatement",
                                loc: {
                                  start: { line: 84, column: 38 },
                                  end: { line: 87, column: 11 },
                                },
                                body: [
                                  {
                                    type: "ExpressionStatement",
                                    loc: {
                                      start: { line: 85, column: 12 },
                                      end: { line: 85, column: 48 },
                                    },
                                    expression: {
                                      type: "CallExpression",
                                      loc: {
                                        start: { line: 85, column: 12 },
                                        end: { line: 85, column: 47 },
                                      },
                                      callee: {
                                        type: "MemberExpression",
                                        loc: {
                                          start: { line: 85, column: 12 },
                                          end: { line: 85, column: 31 },
                                        },
                                        object: {
                                          type: "MemberExpression",
                                          loc: {
                                            start: { line: 85, column: 12 },
                                            end: { line: 85, column: 27 },
                                          },
                                          object: {
                                            type: "Splice",
                                            loc: {
                                              start: { line: 85, column: 12 },
                                              end: { line: 85, column: 19 },
                                            },
                                            param: 1,
                                          },
                                          property: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 85, column: 20 },
                                              end: { line: 85, column: 27 },
                                            },
                                            name: "console",
                                          },
                                          computed: false,
                                          optional: false,
                                        },
                                        property: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 85, column: 28 },
                                            end: { line: 85, column: 31 },
                                          },
                                          name: "log",
                                        },
                                        computed: false,
                                        optional: false,
                                      },
                                      arguments: [
                                        {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 85, column: 32 },
                                            end: { line: 85, column: 40 },
                                          },
                                          name: "previous",
                                          key: "previous$34j4m9r77iqx8$10",
                                        },
                                        {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 85, column: 42 },
                                            end: { line: 85, column: 46 },
                                          },
                                          name: "next",
                                          key: "next$34j4m9r77iqx8$11",
                                        },
                                      ],
                                      optional: false,
                                    },
                                  },
                                  {
                                    type: "ReturnStatement",
                                    loc: {
                                      start: { line: 86, column: 12 },
                                      end: { line: 86, column: 37 },
                                    },
                                    argument: {
                                      type: "BinaryExpression",
                                      loc: {
                                        start: { line: 86, column: 19 },
                                        end: { line: 86, column: 36 },
                                      },
                                      operator: "===",
                                      left: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 86, column: 19 },
                                          end: { line: 86, column: 27 },
                                        },
                                        name: "previous",
                                        key: "previous$34j4m9r77iqx8$10",
                                      },
                                      right: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 86, column: 32 },
                                          end: { line: 86, column: 36 },
                                        },
                                        name: "next",
                                        key: "next$34j4m9r77iqx8$11",
                                      },
                                    },
                                  },
                                ],
                              },
                              expression: false,
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
              ],
            },
            {
              type: "ReturnStatement",
              loc: {
                start: { line: 89, column: 8 },
                end: { line: 89, column: 74 },
              },
              argument: {
                type: "JSXElement",
                loc: {
                  start: { line: 89, column: 15 },
                  end: { line: 89, column: 73 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 89, column: 15 },
                    end: { line: 89, column: 48 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 89, column: 16 },
                      end: { line: 89, column: 22 },
                    },
                    name: "button",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 89, column: 23 },
                        end: { line: 89, column: 47 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 89, column: 23 },
                          end: { line: 89, column: 30 },
                        },
                        name: "onclick",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 89, column: 31 },
                          end: { line: 89, column: 47 },
                        },
                        expression: {
                          type: "ArrowFunctionExpression",
                          loc: {
                            start: { line: 89, column: 32 },
                            end: { line: 89, column: 46 },
                          },
                          params: [],
                          body: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 89, column: 38 },
                              end: { line: 89, column: 46 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 89, column: 38 },
                                end: { line: 89, column: 43 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 89, column: 38 },
                                  end: { line: 89, column: 39 },
                                },
                                name: "n",
                                key: "n$34j4m9r77iqx8$9",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 89, column: 40 },
                                  end: { line: 89, column: 43 },
                                },
                                name: "set",
                              },
                              computed: false,
                              optional: false,
                            },
                            arguments: [
                              {
                                type: "Literal",
                                loc: {
                                  start: { line: 89, column: 44 },
                                  end: { line: 89, column: 45 },
                                },
                                value: 2,
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
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 89, column: 48 },
                      end: { line: 89, column: 64 },
                    },
                    expression: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 89, column: 49 },
                        end: { line: 89, column: 63 },
                      },
                      operator: "+",
                      left: {
                        type: "Literal",
                        loc: {
                          start: { line: 89, column: 49 },
                          end: { line: 89, column: 53 },
                        },
                        value: "n ",
                      },
                      right: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 89, column: 56 },
                          end: { line: 89, column: 63 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 89, column: 56 },
                            end: { line: 89, column: 61 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 89, column: 56 },
                              end: { line: 89, column: 57 },
                            },
                            name: "n",
                            key: "n$34j4m9r77iqx8$9",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 89, column: 58 },
                              end: { line: 89, column: 61 },
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
                    start: { line: 89, column: 64 },
                    end: { line: 89, column: 73 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 89, column: 66 },
                      end: { line: 89, column: 72 },
                    },
                    name: "button",
                  },
                },
              },
            },
          ],
        }),
        {
          code: 'export default ($0, $1) => {\n    const n = $0()(1, {\n        equals: (previous, next) => {\n            $1().console.log(previous, next);\n            return previous === next;\n        },\n    });\n    return <button onclick={() => n.set(2)}>{"n " + n.get()}</button>;\n};',
          map: '{"version":3,"file":"equals.test.jsx","sourceRoot":"","sources":["equals.test.tsx"],"names":[],"mappings":"eAiFS;IACD,MAAM,CAAC,GAAG,IAAM,CAAC,CAAC,EAAE;QAClB,MAAM,EAAE,CAAC,QAAQ,EAAE,IAAI,EAAE,EAAE;YACzB,IAAO,CAAC,OAAO,CAAC,GAAG,CAAC,QAAQ,EAAE,IAAI,CAAC,CAAC;YACpC,OAAO,QAAQ,KAAK,IAAI,CAAC;QAC3B,CAAC;KACF,CAAC,CAAC;IACH,OAAO,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,GAAG,CAAC,CAAC,GAAG,EAAE,CAAC,EAAE,MAAM,CAAC,CAAC;AACpE,CAAC"}',
          imports: [],
          exportAt: 0,
        },
      ),
    );
    await press();
    assert.deepEqual(logged, [[1, 2]]);
    assert.equal(screen.getByRole("button").textContent, "n 2");
  });
  it("is `===` when left out, so the same number doesn't update", async () => {
    await render(
      cs.create(
        "34j4m9r77iqx8:99:6",
        {
          params: [
            { kind: "splice", value: state, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        () => ({
          type: "BlockStatement",
          loc: {
            start: { line: 99, column: 9 },
            end: { line: 111, column: 7 },
          },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 100, column: 8 },
                end: { line: 100, column: 28 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 100, column: 14 },
                    end: { line: 100, column: 27 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 100, column: 14 },
                      end: { line: 100, column: 15 },
                    },
                    name: "n",
                    key: "n$34j4m9r77iqx8$12",
                  },
                  init: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 100, column: 18 },
                      end: { line: 100, column: 27 },
                    },
                    callee: {
                      type: "Splice",
                      loc: {
                        start: { line: 100, column: 18 },
                        end: { line: 100, column: 24 },
                      },
                      param: 0,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 100, column: 25 },
                          end: { line: 100, column: 26 },
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
                start: { line: 101, column: 8 },
                end: { line: 104, column: 10 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 101, column: 14 },
                    end: { line: 104, column: 9 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 101, column: 14 },
                      end: { line: 101, column: 19 },
                    },
                    name: "label",
                    key: "label$34j4m9r77iqx8$13",
                  },
                  init: {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 101, column: 22 },
                      end: { line: 104, column: 9 },
                    },
                    params: [],
                    body: {
                      type: "BlockStatement",
                      loc: {
                        start: { line: 101, column: 28 },
                        end: { line: 104, column: 9 },
                      },
                      body: [
                        {
                          type: "ExpressionStatement",
                          loc: {
                            start: { line: 102, column: 10 },
                            end: { line: 102, column: 32 },
                          },
                          expression: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 102, column: 10 },
                              end: { line: 102, column: 31 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 102, column: 10 },
                                end: { line: 102, column: 29 },
                              },
                              object: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 102, column: 10 },
                                  end: { line: 102, column: 25 },
                                },
                                object: {
                                  type: "Splice",
                                  loc: {
                                    start: { line: 102, column: 10 },
                                    end: { line: 102, column: 17 },
                                  },
                                  param: 1,
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 102, column: 18 },
                                    end: { line: 102, column: 25 },
                                  },
                                  name: "console",
                                },
                                computed: false,
                                optional: false,
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 102, column: 26 },
                                  end: { line: 102, column: 29 },
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
                            start: { line: 103, column: 10 },
                            end: { line: 103, column: 32 },
                          },
                          argument: {
                            type: "BinaryExpression",
                            loc: {
                              start: { line: 103, column: 17 },
                              end: { line: 103, column: 31 },
                            },
                            operator: "+",
                            left: {
                              type: "Literal",
                              loc: {
                                start: { line: 103, column: 17 },
                                end: { line: 103, column: 21 },
                              },
                              value: "n ",
                            },
                            right: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 103, column: 24 },
                                end: { line: 103, column: 31 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 103, column: 24 },
                                  end: { line: 103, column: 29 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 103, column: 24 },
                                    end: { line: 103, column: 25 },
                                  },
                                  name: "n",
                                  key: "n$34j4m9r77iqx8$12",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 103, column: 26 },
                                    end: { line: 103, column: 29 },
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
                    },
                    expression: false,
                  },
                },
              ],
            },
            {
              type: "ReturnStatement",
              loc: {
                start: { line: 105, column: 8 },
                end: { line: 110, column: 10 },
              },
              argument: {
                type: "JSXElement",
                loc: {
                  start: { line: 106, column: 10 },
                  end: { line: 109, column: 16 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 106, column: 10 },
                    end: { line: 106, column: 15 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 106, column: 11 },
                      end: { line: 106, column: 14 },
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
                      start: { line: 107, column: 12 },
                      end: { line: 107, column: 12 },
                    },
                    value: "\n            ",
                    raw: "\n            ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 107, column: 12 },
                      end: { line: 107, column: 58 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 107, column: 12 },
                        end: { line: 107, column: 45 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 107, column: 13 },
                          end: { line: 107, column: 19 },
                        },
                        name: "button",
                      },
                      attributes: [
                        {
                          type: "JSXAttribute",
                          loc: {
                            start: { line: 107, column: 20 },
                            end: { line: 107, column: 44 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 107, column: 20 },
                              end: { line: 107, column: 27 },
                            },
                            name: "onclick",
                          },
                          value: {
                            type: "JSXExpressionContainer",
                            loc: {
                              start: { line: 107, column: 28 },
                              end: { line: 107, column: 44 },
                            },
                            expression: {
                              type: "ArrowFunctionExpression",
                              loc: {
                                start: { line: 107, column: 29 },
                                end: { line: 107, column: 43 },
                              },
                              params: [],
                              body: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 107, column: 35 },
                                  end: { line: 107, column: 43 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 107, column: 35 },
                                    end: { line: 107, column: 40 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 107, column: 35 },
                                      end: { line: 107, column: 36 },
                                    },
                                    name: "n",
                                    key: "n$34j4m9r77iqx8$12",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 107, column: 37 },
                                      end: { line: 107, column: 40 },
                                    },
                                    name: "set",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                                arguments: [
                                  {
                                    type: "Literal",
                                    loc: {
                                      start: { line: 107, column: 41 },
                                      end: { line: 107, column: 42 },
                                    },
                                    value: 1,
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
                          start: { line: 107, column: 45 },
                          end: { line: 107, column: 49 },
                        },
                        value: "same",
                        raw: "same",
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 107, column: 49 },
                        end: { line: 107, column: 58 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 107, column: 51 },
                          end: { line: 107, column: 57 },
                        },
                        name: "button",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 108, column: 12 },
                      end: { line: 108, column: 12 },
                    },
                    value: "\n            ",
                    raw: "\n            ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 108, column: 12 },
                      end: { line: 108, column: 28 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 108, column: 12 },
                        end: { line: 108, column: 15 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 108, column: 13 },
                          end: { line: 108, column: 14 },
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
                          start: { line: 108, column: 15 },
                          end: { line: 108, column: 24 },
                        },
                        expression: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 108, column: 16 },
                            end: { line: 108, column: 23 },
                          },
                          callee: {
                            type: "Identifier",
                            loc: {
                              start: { line: 108, column: 16 },
                              end: { line: 108, column: 21 },
                            },
                            name: "label",
                            key: "label$34j4m9r77iqx8$13",
                          },
                          arguments: [],
                          optional: false,
                        },
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 108, column: 24 },
                        end: { line: 108, column: 28 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 108, column: 26 },
                          end: { line: 108, column: 27 },
                        },
                        name: "p",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 109, column: 10 },
                      end: { line: 109, column: 10 },
                    },
                    value: "\n          ",
                    raw: "\n          ",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 109, column: 10 },
                    end: { line: 109, column: 16 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 109, column: 12 },
                      end: { line: 109, column: 15 },
                    },
                    name: "div",
                  },
                },
              },
            },
          ],
        }),
        {
          code: 'export default ($0, $1) => {\n    const n = $0()(1);\n    const label = () => {\n        $1().console.log();\n        return "n " + n.get();\n    };\n    return (<div>\n            <button onclick={() => n.set(1)}>same</button>\n            <p>{label()}</p>\n          </div>);\n};',
          map: '{"version":3,"file":"equals.test.jsx","sourceRoot":"","sources":["equals.test.tsx"],"names":[],"mappings":"eAkGS;IACD,MAAM,CAAC,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IACpB,MAAM,KAAK,GAAG,GAAG,EAAE;QACjB,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC;QACtB,OAAO,IAAI,GAAG,CAAC,CAAC,GAAG,EAAE,CAAC;IACxB,CAAC,CAAC;IACF,OAAO,CACL,CAAC,GAAG,CACF;YAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,EAAE,MAAM,CAC7C;YAAA,CAAC,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,EAAE,CAAC,CACjB;UAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
          imports: [],
          exportAt: 0,
        },
      ),
    );
    await press();
    assert.equal(logged.length, 1);
  });
  it("is `===` when left out, so a new object always updates", async () => {
    await render(
      cs.create(
        "34j4m9r77iqx8:119:6",
        {
          params: [
            { kind: "splice", value: state, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        () => ({
          type: "BlockStatement",
          loc: {
            start: { line: 119, column: 9 },
            end: { line: 133, column: 7 },
          },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 120, column: 8 },
                end: { line: 120, column: 39 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 120, column: 14 },
                    end: { line: 120, column: 38 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 120, column: 14 },
                      end: { line: 120, column: 19 },
                    },
                    name: "point",
                    key: "point$34j4m9r77iqx8$14",
                  },
                  init: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 120, column: 22 },
                      end: { line: 120, column: 38 },
                    },
                    callee: {
                      type: "Splice",
                      loc: {
                        start: { line: 120, column: 22 },
                        end: { line: 120, column: 28 },
                      },
                      param: 0,
                    },
                    arguments: [
                      {
                        type: "ObjectExpression",
                        loc: {
                          start: { line: 120, column: 29 },
                          end: { line: 120, column: 37 },
                        },
                        properties: [
                          {
                            type: "Property",
                            loc: {
                              start: { line: 120, column: 31 },
                              end: { line: 120, column: 35 },
                            },
                            key: {
                              type: "Identifier",
                              loc: {
                                start: { line: 120, column: 31 },
                                end: { line: 120, column: 32 },
                              },
                              name: "x",
                            },
                            value: {
                              type: "Literal",
                              loc: {
                                start: { line: 120, column: 34 },
                                end: { line: 120, column: 35 },
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
                    ],
                    optional: false,
                  },
                },
              ],
            },
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 121, column: 8 },
                end: { line: 124, column: 10 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 121, column: 14 },
                    end: { line: 124, column: 9 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 121, column: 14 },
                      end: { line: 121, column: 19 },
                    },
                    name: "label",
                    key: "label$34j4m9r77iqx8$15",
                  },
                  init: {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 121, column: 22 },
                      end: { line: 124, column: 9 },
                    },
                    params: [],
                    body: {
                      type: "BlockStatement",
                      loc: {
                        start: { line: 121, column: 28 },
                        end: { line: 124, column: 9 },
                      },
                      body: [
                        {
                          type: "ExpressionStatement",
                          loc: {
                            start: { line: 122, column: 10 },
                            end: { line: 122, column: 32 },
                          },
                          expression: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 122, column: 10 },
                              end: { line: 122, column: 31 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 122, column: 10 },
                                end: { line: 122, column: 29 },
                              },
                              object: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 122, column: 10 },
                                  end: { line: 122, column: 25 },
                                },
                                object: {
                                  type: "Splice",
                                  loc: {
                                    start: { line: 122, column: 10 },
                                    end: { line: 122, column: 17 },
                                  },
                                  param: 1,
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 122, column: 18 },
                                    end: { line: 122, column: 25 },
                                  },
                                  name: "console",
                                },
                                computed: false,
                                optional: false,
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 122, column: 26 },
                                  end: { line: 122, column: 29 },
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
                            start: { line: 123, column: 10 },
                            end: { line: 123, column: 38 },
                          },
                          argument: {
                            type: "BinaryExpression",
                            loc: {
                              start: { line: 123, column: 17 },
                              end: { line: 123, column: 37 },
                            },
                            operator: "+",
                            left: {
                              type: "Literal",
                              loc: {
                                start: { line: 123, column: 17 },
                                end: { line: 123, column: 21 },
                              },
                              value: "x ",
                            },
                            right: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 123, column: 24 },
                                end: { line: 123, column: 37 },
                              },
                              object: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 123, column: 24 },
                                  end: { line: 123, column: 35 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 123, column: 24 },
                                    end: { line: 123, column: 33 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 123, column: 24 },
                                      end: { line: 123, column: 29 },
                                    },
                                    name: "point",
                                    key: "point$34j4m9r77iqx8$14",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 123, column: 30 },
                                      end: { line: 123, column: 33 },
                                    },
                                    name: "get",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                                arguments: [],
                                optional: false,
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 123, column: 36 },
                                  end: { line: 123, column: 37 },
                                },
                                name: "x",
                              },
                              computed: false,
                              optional: false,
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
                start: { line: 125, column: 8 },
                end: { line: 132, column: 10 },
              },
              argument: {
                type: "JSXElement",
                loc: {
                  start: { line: 126, column: 10 },
                  end: { line: 131, column: 16 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 126, column: 10 },
                    end: { line: 126, column: 15 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 126, column: 11 },
                      end: { line: 126, column: 14 },
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
                      start: { line: 127, column: 12 },
                      end: { line: 127, column: 12 },
                    },
                    value: "\n            ",
                    raw: "\n            ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 127, column: 12 },
                      end: { line: 129, column: 21 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 127, column: 12 },
                        end: { line: 127, column: 68 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 127, column: 13 },
                          end: { line: 127, column: 19 },
                        },
                        name: "button",
                      },
                      attributes: [
                        {
                          type: "JSXAttribute",
                          loc: {
                            start: { line: 127, column: 20 },
                            end: { line: 127, column: 67 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 127, column: 20 },
                              end: { line: 127, column: 27 },
                            },
                            name: "onclick",
                          },
                          value: {
                            type: "JSXExpressionContainer",
                            loc: {
                              start: { line: 127, column: 28 },
                              end: { line: 127, column: 67 },
                            },
                            expression: {
                              type: "ArrowFunctionExpression",
                              loc: {
                                start: { line: 127, column: 29 },
                                end: { line: 127, column: 66 },
                              },
                              params: [],
                              body: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 127, column: 35 },
                                  end: { line: 127, column: 66 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 127, column: 35 },
                                    end: { line: 127, column: 44 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 127, column: 35 },
                                      end: { line: 127, column: 40 },
                                    },
                                    name: "point",
                                    key: "point$34j4m9r77iqx8$14",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 127, column: 41 },
                                      end: { line: 127, column: 44 },
                                    },
                                    name: "set",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                                arguments: [
                                  {
                                    type: "ObjectExpression",
                                    loc: {
                                      start: { line: 127, column: 45 },
                                      end: { line: 127, column: 65 },
                                    },
                                    properties: [
                                      {
                                        type: "Property",
                                        loc: {
                                          start: { line: 127, column: 47 },
                                          end: { line: 127, column: 63 },
                                        },
                                        key: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 127, column: 47 },
                                            end: { line: 127, column: 48 },
                                          },
                                          name: "x",
                                        },
                                        value: {
                                          type: "MemberExpression",
                                          loc: {
                                            start: { line: 127, column: 50 },
                                            end: { line: 127, column: 63 },
                                          },
                                          object: {
                                            type: "CallExpression",
                                            loc: {
                                              start: { line: 127, column: 50 },
                                              end: { line: 127, column: 61 },
                                            },
                                            callee: {
                                              type: "MemberExpression",
                                              loc: {
                                                start: {
                                                  line: 127,
                                                  column: 50,
                                                },
                                                end: { line: 127, column: 59 },
                                              },
                                              object: {
                                                type: "Identifier",
                                                loc: {
                                                  start: {
                                                    line: 127,
                                                    column: 50,
                                                  },
                                                  end: {
                                                    line: 127,
                                                    column: 55,
                                                  },
                                                },
                                                name: "point",
                                                key: "point$34j4m9r77iqx8$14",
                                              },
                                              property: {
                                                type: "Identifier",
                                                loc: {
                                                  start: {
                                                    line: 127,
                                                    column: 56,
                                                  },
                                                  end: {
                                                    line: 127,
                                                    column: 59,
                                                  },
                                                },
                                                name: "get",
                                              },
                                              computed: false,
                                              optional: false,
                                            },
                                            arguments: [],
                                            optional: false,
                                          },
                                          property: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 127, column: 62 },
                                              end: { line: 127, column: 63 },
                                            },
                                            name: "x",
                                          },
                                          computed: false,
                                          optional: false,
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
                          start: { line: 128, column: 14 },
                          end: { line: 129, column: 12 },
                        },
                        value: "\n              same\n            ",
                        raw: "\n              same\n            ",
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 129, column: 12 },
                        end: { line: 129, column: 21 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 129, column: 14 },
                          end: { line: 129, column: 20 },
                        },
                        name: "button",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 130, column: 12 },
                      end: { line: 130, column: 12 },
                    },
                    value: "\n            ",
                    raw: "\n            ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 130, column: 12 },
                      end: { line: 130, column: 28 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 130, column: 12 },
                        end: { line: 130, column: 15 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 130, column: 13 },
                          end: { line: 130, column: 14 },
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
                          start: { line: 130, column: 15 },
                          end: { line: 130, column: 24 },
                        },
                        expression: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 130, column: 16 },
                            end: { line: 130, column: 23 },
                          },
                          callee: {
                            type: "Identifier",
                            loc: {
                              start: { line: 130, column: 16 },
                              end: { line: 130, column: 21 },
                            },
                            name: "label",
                            key: "label$34j4m9r77iqx8$15",
                          },
                          arguments: [],
                          optional: false,
                        },
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 130, column: 24 },
                        end: { line: 130, column: 28 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 130, column: 26 },
                          end: { line: 130, column: 27 },
                        },
                        name: "p",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 131, column: 10 },
                      end: { line: 131, column: 10 },
                    },
                    value: "\n          ",
                    raw: "\n          ",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 131, column: 10 },
                    end: { line: 131, column: 16 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 131, column: 12 },
                      end: { line: 131, column: 15 },
                    },
                    name: "div",
                  },
                },
              },
            },
          ],
        }),
        {
          code: 'export default ($0, $1) => {\n    const point = $0()({ x: 1 });\n    const label = () => {\n        $1().console.log();\n        return "x " + point.get().x;\n    };\n    return (<div>\n            <button onclick={() => point.set({ x: point.get().x })}>\n              same\n            </button>\n            <p>{label()}</p>\n          </div>);\n};',
          map: '{"version":3,"file":"equals.test.jsx","sourceRoot":"","sources":["equals.test.tsx"],"names":[],"mappings":"eAsHS;IACD,MAAM,KAAK,GAAG,IAAM,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC;IAC/B,MAAM,KAAK,GAAG,GAAG,EAAE;QACjB,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC;QACtB,OAAO,IAAI,GAAG,KAAK,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC;IAC9B,CAAC,CAAC;IACF,OAAO,CACL,CAAC,GAAG,CACF;YAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,GAAG,CAAC,EAAE,CAAC,EAAE,KAAK,CAAC,GAAG,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CACrD;;YACF,EAAE,MAAM,CACR;YAAA,CAAC,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,EAAE,CAAC,CACjB;UAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
          imports: [],
          exportAt: 0,
        },
      ),
    );
    await press();
    assert.equal(logged.length, 2);
  });
});
