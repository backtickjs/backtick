import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs, onMount, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { window } from "@backtickjs/web-sdk";
import { userEvent } from "@testing-library/user-event";
// `ref` hands a script the element it is written on.
describe("ref", () => {
  it("keeps the element for a handler to use", async () => {
    await render(
      cs.create(
        { start: { line: 12, column: 6 }, end: { line: 20, column: 8 } },
        {
          version: "0.0.0",
          filePath: "render/ref.test.tsx",
          fileHash: "1omn3ou0fqxtc",
          splices: { $state: { value: state, params: [] } },
          captures: [],
        },
        () => ({
          type: "BlockStatement",
          loc: { start: { line: 12, column: 9 }, end: { line: 20, column: 7 } },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 13, column: 8 },
                end: { line: 13, column: 60 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 13, column: 14 },
                    end: { line: 13, column: 59 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 13, column: 14 },
                      end: { line: 13, column: 19 },
                    },
                    name: "field",
                    key: "field$1omn3ou0fqxtc$0",
                  },
                  init: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 13, column: 22 },
                      end: { line: 13, column: 59 },
                    },
                    callee: {
                      type: "Splice",
                      loc: {
                        start: { line: 13, column: 22 },
                        end: { line: 13, column: 28 },
                      },
                      key: "$state",
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 13, column: 54 },
                          end: { line: 13, column: 58 },
                        },
                        value: null,
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
                start: { line: 14, column: 8 },
                end: { line: 19, column: 10 },
              },
              argument: {
                type: "JSXElement",
                loc: {
                  start: { line: 15, column: 10 },
                  end: { line: 18, column: 16 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 15, column: 10 },
                    end: { line: 15, column: 15 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 15, column: 11 },
                      end: { line: 15, column: 14 },
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
                      start: { line: 16, column: 12 },
                      end: { line: 16, column: 12 },
                    },
                    value: "\n            ",
                    raw: "\n            ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 16, column: 12 },
                      end: { line: 16, column: 77 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 16, column: 12 },
                        end: { line: 16, column: 77 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 16, column: 13 },
                          end: { line: 16, column: 18 },
                        },
                        name: "input",
                      },
                      attributes: [
                        {
                          type: "JSXAttribute",
                          loc: {
                            start: { line: 16, column: 19 },
                            end: { line: 16, column: 36 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 16, column: 19 },
                              end: { line: 16, column: 29 },
                            },
                            name: "aria-label",
                          },
                          value: {
                            type: "Literal",
                            loc: {
                              start: { line: 16, column: 30 },
                              end: { line: 16, column: 36 },
                            },
                            value: "name",
                          },
                        },
                        {
                          type: "JSXAttribute",
                          loc: {
                            start: { line: 16, column: 37 },
                            end: { line: 16, column: 74 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 16, column: 37 },
                              end: { line: 16, column: 40 },
                            },
                            name: "ref",
                          },
                          value: {
                            type: "JSXExpressionContainer",
                            loc: {
                              start: { line: 16, column: 41 },
                              end: { line: 16, column: 74 },
                            },
                            expression: {
                              type: "ArrowFunctionExpression",
                              loc: {
                                start: { line: 16, column: 42 },
                                end: { line: 16, column: 73 },
                              },
                              params: [
                                {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 16, column: 43 },
                                    end: { line: 16, column: 50 },
                                  },
                                  name: "element",
                                  key: "element$1omn3ou0fqxtc$1",
                                },
                              ],
                              body: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 16, column: 55 },
                                  end: { line: 16, column: 73 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 16, column: 55 },
                                    end: { line: 16, column: 64 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 16, column: 55 },
                                      end: { line: 16, column: 60 },
                                    },
                                    name: "field",
                                    key: "field$1omn3ou0fqxtc$0",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 16, column: 61 },
                                      end: { line: 16, column: 64 },
                                    },
                                    name: "set",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                                arguments: [
                                  {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 16, column: 65 },
                                      end: { line: 16, column: 72 },
                                    },
                                    name: "element",
                                    key: "element$1omn3ou0fqxtc$1",
                                  },
                                ],
                                optional: false,
                              },
                              expression: true,
                            },
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
                      start: { line: 17, column: 12 },
                      end: { line: 17, column: 12 },
                    },
                    value: "\n            ",
                    raw: "\n            ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 17, column: 12 },
                      end: { line: 17, column: 70 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 17, column: 12 },
                        end: { line: 17, column: 57 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 17, column: 13 },
                          end: { line: 17, column: 19 },
                        },
                        name: "button",
                      },
                      attributes: [
                        {
                          type: "JSXAttribute",
                          loc: {
                            start: { line: 17, column: 20 },
                            end: { line: 17, column: 56 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 17, column: 20 },
                              end: { line: 17, column: 27 },
                            },
                            name: "onclick",
                          },
                          value: {
                            type: "JSXExpressionContainer",
                            loc: {
                              start: { line: 17, column: 28 },
                              end: { line: 17, column: 56 },
                            },
                            expression: {
                              type: "ArrowFunctionExpression",
                              loc: {
                                start: { line: 17, column: 29 },
                                end: { line: 17, column: 55 },
                              },
                              params: [],
                              body: {
                                type: "ChainExpression",
                                loc: {
                                  start: { line: 17, column: 35 },
                                  end: { line: 17, column: 55 },
                                },
                                expression: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 17, column: 35 },
                                    end: { line: 17, column: 55 },
                                  },
                                  callee: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 17, column: 35 },
                                      end: { line: 17, column: 53 },
                                    },
                                    object: {
                                      type: "CallExpression",
                                      loc: {
                                        start: { line: 17, column: 35 },
                                        end: { line: 17, column: 46 },
                                      },
                                      callee: {
                                        type: "MemberExpression",
                                        loc: {
                                          start: { line: 17, column: 35 },
                                          end: { line: 17, column: 44 },
                                        },
                                        object: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 17, column: 35 },
                                            end: { line: 17, column: 40 },
                                          },
                                          name: "field",
                                          key: "field$1omn3ou0fqxtc$0",
                                        },
                                        property: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 17, column: 41 },
                                            end: { line: 17, column: 44 },
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
                                        start: { line: 17, column: 48 },
                                        end: { line: 17, column: 53 },
                                      },
                                      name: "focus",
                                    },
                                    computed: false,
                                    optional: true,
                                  },
                                  arguments: [],
                                  optional: false,
                                },
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
                          start: { line: 17, column: 57 },
                          end: { line: 17, column: 61 },
                        },
                        value: "edit",
                        raw: "edit",
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 17, column: 61 },
                        end: { line: 17, column: 70 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 17, column: 63 },
                          end: { line: 17, column: 69 },
                        },
                        name: "button",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 18, column: 10 },
                      end: { line: 18, column: 10 },
                    },
                    value: "\n          ",
                    raw: "\n          ",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 18, column: 10 },
                    end: { line: 18, column: 16 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 18, column: 12 },
                      end: { line: 18, column: 15 },
                    },
                    name: "div",
                  },
                },
              },
            },
          ],
        }),
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });
  it("focuses once in place, through onMount", async () => {
    await render(
      cs.create(
        { start: { line: 28, column: 6 }, end: { line: 35, column: 8 } },
        {
          version: "0.0.0",
          filePath: "render/ref.test.tsx",
          fileHash: "1omn3ou0fqxtc",
          splices: { $onMount: { value: onMount, params: [] } },
          captures: [],
        },
        () => ({
          type: "BlockStatement",
          loc: { start: { line: 28, column: 9 }, end: { line: 35, column: 7 } },
          body: [
            {
              type: "ReturnStatement",
              loc: {
                start: { line: 29, column: 8 },
                end: { line: 34, column: 10 },
              },
              argument: {
                type: "JSXElement",
                loc: {
                  start: { line: 30, column: 10 },
                  end: { line: 33, column: 12 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 30, column: 10 },
                    end: { line: 33, column: 12 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 30, column: 11 },
                      end: { line: 30, column: 16 },
                    },
                    name: "input",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 31, column: 12 },
                        end: { line: 31, column: 29 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 31, column: 12 },
                          end: { line: 31, column: 22 },
                        },
                        name: "aria-label",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 31, column: 23 },
                          end: { line: 31, column: 29 },
                        },
                        value: "name",
                      },
                    },
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 32, column: 12 },
                        end: { line: 32, column: 62 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 32, column: 12 },
                          end: { line: 32, column: 15 },
                        },
                        name: "ref",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 32, column: 16 },
                          end: { line: 32, column: 62 },
                        },
                        expression: {
                          type: "ArrowFunctionExpression",
                          loc: {
                            start: { line: 32, column: 17 },
                            end: { line: 32, column: 61 },
                          },
                          params: [
                            {
                              type: "Identifier",
                              loc: {
                                start: { line: 32, column: 18 },
                                end: { line: 32, column: 25 },
                              },
                              name: "element",
                              key: "element$1omn3ou0fqxtc$2",
                            },
                          ],
                          body: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 32, column: 30 },
                              end: { line: 32, column: 61 },
                            },
                            callee: {
                              type: "Splice",
                              loc: {
                                start: { line: 32, column: 30 },
                                end: { line: 32, column: 38 },
                              },
                              key: "$onMount",
                            },
                            arguments: [
                              {
                                type: "ArrowFunctionExpression",
                                loc: {
                                  start: { line: 32, column: 39 },
                                  end: { line: 32, column: 60 },
                                },
                                params: [],
                                body: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 32, column: 45 },
                                    end: { line: 32, column: 60 },
                                  },
                                  callee: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 32, column: 45 },
                                      end: { line: 32, column: 58 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 32, column: 45 },
                                        end: { line: 32, column: 52 },
                                      },
                                      name: "element",
                                      key: "element$1omn3ou0fqxtc$2",
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 32, column: 53 },
                                        end: { line: 32, column: 58 },
                                      },
                                      name: "focus",
                                    },
                                    computed: false,
                                    optional: false,
                                  },
                                  arguments: [],
                                  optional: false,
                                },
                                expression: true,
                              },
                            ],
                            optional: false,
                          },
                          expression: true,
                        },
                      },
                    },
                  ],
                  selfClosing: true,
                },
                children: [],
                closingElement: null,
              },
            },
          ],
        }),
      ),
    );
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });
  it("is not written as an attribute", async () => {
    await render(
      cs.create(
        { start: { line: 41, column: 17 }, end: { line: 41, column: 63 } },
        {
          version: "0.0.0",
          filePath: "render/ref.test.tsx",
          fileHash: "1omn3ou0fqxtc",
          splices: {},
          captures: [],
        },
        () => ({
          type: "JSXElement",
          loc: {
            start: { line: 41, column: 20 },
            end: { line: 41, column: 62 },
          },
          openingElement: {
            type: "JSXOpeningElement",
            loc: {
              start: { line: 41, column: 20 },
              end: { line: 41, column: 62 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 41, column: 21 },
                end: { line: 41, column: 26 },
              },
              name: "input",
            },
            attributes: [
              {
                type: "JSXAttribute",
                loc: {
                  start: { line: 41, column: 27 },
                  end: { line: 41, column: 44 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 41, column: 27 },
                    end: { line: 41, column: 37 },
                  },
                  name: "aria-label",
                },
                value: {
                  type: "Literal",
                  loc: {
                    start: { line: 41, column: 38 },
                    end: { line: 41, column: 44 },
                  },
                  value: "name",
                },
              },
              {
                type: "JSXAttribute",
                loc: {
                  start: { line: 41, column: 45 },
                  end: { line: 41, column: 59 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 41, column: 45 },
                    end: { line: 41, column: 48 },
                  },
                  name: "ref",
                },
                value: {
                  type: "JSXExpressionContainer",
                  loc: {
                    start: { line: 41, column: 49 },
                    end: { line: 41, column: 59 },
                  },
                  expression: {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 41, column: 50 },
                      end: { line: 41, column: 58 },
                    },
                    params: [],
                    body: {
                      type: "BlockStatement",
                      loc: {
                        start: { line: 41, column: 56 },
                        end: { line: 41, column: 58 },
                      },
                      body: [],
                    },
                    expression: false,
                  },
                },
              },
            ],
            selfClosing: true,
          },
          children: [],
          closingElement: null,
        }),
      ),
    );
    assert.equal(screen.getByLabelText("name").hasAttribute("ref"), false);
  });
  describe("is called once", () => {
    let calls = 0;
    const log = globalThis.window.console.log;
    beforeEach(() => {
      calls = 0;
      globalThis.window.console.log = () => {
        calls = calls + 1;
      };
    });
    afterEach(() => {
      globalThis.window.console.log = log;
    });
    // Drawn by a conditional, whose computation re-runs whenever it reads
    // something that changes, so a tracked read in `ref` would draw the
    // element again.
    it("even when a signal it read changes", async () => {
      await render(
        cs.create(
          { start: { line: 63, column: 8 }, end: { line: 76, column: 10 } },
          {
            version: "0.0.0",
            filePath: "render/ref.test.tsx",
            fileHash: "1omn3ou0fqxtc",
            splices: {
              $state: { value: state, params: [] },
              $window: { value: window, params: [] },
            },
            captures: [],
          },
          () => ({
            type: "BlockStatement",
            loc: {
              start: { line: 63, column: 11 },
              end: { line: 76, column: 9 },
            },
            body: [
              {
                type: "VariableDeclaration",
                loc: {
                  start: { line: 64, column: 10 },
                  end: { line: 64, column: 37 },
                },
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    loc: {
                      start: { line: 64, column: 16 },
                      end: { line: 64, column: 36 },
                    },
                    id: {
                      type: "Identifier",
                      loc: {
                        start: { line: 64, column: 16 },
                        end: { line: 64, column: 21 },
                      },
                      name: "shown",
                      key: "shown$1omn3ou0fqxtc$3",
                    },
                    init: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 64, column: 24 },
                        end: { line: 64, column: 36 },
                      },
                      callee: {
                        type: "Splice",
                        loc: {
                          start: { line: 64, column: 24 },
                          end: { line: 64, column: 30 },
                        },
                        key: "$state",
                      },
                      arguments: [
                        {
                          type: "Literal",
                          loc: {
                            start: { line: 64, column: 31 },
                            end: { line: 64, column: 35 },
                          },
                          value: true,
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
                  start: { line: 65, column: 10 },
                  end: { line: 65, column: 30 },
                },
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    loc: {
                      start: { line: 65, column: 16 },
                      end: { line: 65, column: 29 },
                    },
                    id: {
                      type: "Identifier",
                      loc: {
                        start: { line: 65, column: 16 },
                        end: { line: 65, column: 17 },
                      },
                      name: "n",
                      key: "n$1omn3ou0fqxtc$4",
                    },
                    init: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 65, column: 20 },
                        end: { line: 65, column: 29 },
                      },
                      callee: {
                        type: "Splice",
                        loc: {
                          start: { line: 65, column: 20 },
                          end: { line: 65, column: 26 },
                        },
                        key: "$state",
                      },
                      arguments: [
                        {
                          type: "Literal",
                          loc: {
                            start: { line: 65, column: 27 },
                            end: { line: 65, column: 28 },
                          },
                          value: 0,
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
                  start: { line: 66, column: 10 },
                  end: { line: 75, column: 12 },
                },
                argument: {
                  type: "JSXElement",
                  loc: {
                    start: { line: 67, column: 12 },
                    end: { line: 74, column: 18 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 67, column: 12 },
                      end: { line: 67, column: 17 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 67, column: 13 },
                        end: { line: 67, column: 16 },
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
                        start: { line: 68, column: 14 },
                        end: { line: 68, column: 14 },
                      },
                      value: "\n              ",
                      raw: "\n              ",
                    },
                    {
                      type: "JSXElement",
                      loc: {
                        start: { line: 68, column: 14 },
                        end: { line: 70, column: 23 },
                      },
                      openingElement: {
                        type: "JSXOpeningElement",
                        loc: {
                          start: { line: 68, column: 14 },
                          end: { line: 68, column: 57 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 68, column: 15 },
                            end: { line: 68, column: 21 },
                          },
                          name: "button",
                        },
                        attributes: [
                          {
                            type: "JSXAttribute",
                            loc: {
                              start: { line: 68, column: 22 },
                              end: { line: 68, column: 56 },
                            },
                            name: {
                              type: "JSXIdentifier",
                              loc: {
                                start: { line: 68, column: 22 },
                                end: { line: 68, column: 29 },
                              },
                              name: "onclick",
                            },
                            value: {
                              type: "JSXExpressionContainer",
                              loc: {
                                start: { line: 68, column: 30 },
                                end: { line: 68, column: 56 },
                              },
                              expression: {
                                type: "ArrowFunctionExpression",
                                loc: {
                                  start: { line: 68, column: 31 },
                                  end: { line: 68, column: 55 },
                                },
                                params: [],
                                body: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 68, column: 37 },
                                    end: { line: 68, column: 55 },
                                  },
                                  callee: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 68, column: 37 },
                                      end: { line: 68, column: 42 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 68, column: 37 },
                                        end: { line: 68, column: 38 },
                                      },
                                      name: "n",
                                      key: "n$1omn3ou0fqxtc$4",
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 68, column: 39 },
                                        end: { line: 68, column: 42 },
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
                                        start: { line: 68, column: 43 },
                                        end: { line: 68, column: 54 },
                                      },
                                      operator: "+",
                                      left: {
                                        type: "CallExpression",
                                        loc: {
                                          start: { line: 68, column: 43 },
                                          end: { line: 68, column: 50 },
                                        },
                                        callee: {
                                          type: "MemberExpression",
                                          loc: {
                                            start: { line: 68, column: 43 },
                                            end: { line: 68, column: 48 },
                                          },
                                          object: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 68, column: 43 },
                                              end: { line: 68, column: 44 },
                                            },
                                            name: "n",
                                            key: "n$1omn3ou0fqxtc$4",
                                          },
                                          property: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 68, column: 45 },
                                              end: { line: 68, column: 48 },
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
                                          start: { line: 68, column: 53 },
                                          end: { line: 68, column: 54 },
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
                            start: { line: 69, column: 16 },
                            end: { line: 69, column: 16 },
                          },
                          value: "\n                ",
                          raw: "\n                ",
                        },
                        {
                          type: "JSXExpressionContainer",
                          loc: {
                            start: { line: 69, column: 16 },
                            end: { line: 69, column: 32 },
                          },
                          expression: {
                            type: "BinaryExpression",
                            loc: {
                              start: { line: 69, column: 17 },
                              end: { line: 69, column: 31 },
                            },
                            operator: "+",
                            left: {
                              type: "Literal",
                              loc: {
                                start: { line: 69, column: 17 },
                                end: { line: 69, column: 21 },
                              },
                              value: "n ",
                            },
                            right: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 69, column: 24 },
                                end: { line: 69, column: 31 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 69, column: 24 },
                                  end: { line: 69, column: 29 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 69, column: 24 },
                                    end: { line: 69, column: 25 },
                                  },
                                  name: "n",
                                  key: "n$1omn3ou0fqxtc$4",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 69, column: 26 },
                                    end: { line: 69, column: 29 },
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
                        {
                          type: "JSXText",
                          loc: {
                            start: { line: 70, column: 14 },
                            end: { line: 70, column: 14 },
                          },
                          value: "\n              ",
                          raw: "\n              ",
                        },
                      ],
                      closingElement: {
                        type: "JSXClosingElement",
                        loc: {
                          start: { line: 70, column: 14 },
                          end: { line: 70, column: 23 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 70, column: 16 },
                            end: { line: 70, column: 22 },
                          },
                          name: "button",
                        },
                      },
                    },
                    {
                      type: "JSXText",
                      loc: {
                        start: { line: 71, column: 14 },
                        end: { line: 71, column: 14 },
                      },
                      value: "\n              ",
                      raw: "\n              ",
                    },
                    {
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 71, column: 14 },
                        end: { line: 73, column: 23 },
                      },
                      expression: {
                        type: "ConditionalExpression",
                        loc: {
                          start: { line: 71, column: 15 },
                          end: { line: 73, column: 22 },
                        },
                        test: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 71, column: 15 },
                            end: { line: 71, column: 26 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 71, column: 15 },
                              end: { line: 71, column: 24 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 71, column: 15 },
                                end: { line: 71, column: 20 },
                              },
                              name: "shown",
                              key: "shown$1omn3ou0fqxtc$3",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 71, column: 21 },
                                end: { line: 71, column: 24 },
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
                          type: "JSXElement",
                          loc: {
                            start: { line: 72, column: 16 },
                            end: { line: 72, column: 69 },
                          },
                          openingElement: {
                            type: "JSXOpeningElement",
                            loc: {
                              start: { line: 72, column: 16 },
                              end: { line: 72, column: 60 },
                            },
                            name: {
                              type: "JSXIdentifier",
                              loc: {
                                start: { line: 72, column: 17 },
                                end: { line: 72, column: 18 },
                              },
                              name: "p",
                            },
                            attributes: [
                              {
                                type: "JSXAttribute",
                                loc: {
                                  start: { line: 72, column: 19 },
                                  end: { line: 72, column: 59 },
                                },
                                name: {
                                  type: "JSXIdentifier",
                                  loc: {
                                    start: { line: 72, column: 19 },
                                    end: { line: 72, column: 22 },
                                  },
                                  name: "ref",
                                },
                                value: {
                                  type: "JSXExpressionContainer",
                                  loc: {
                                    start: { line: 72, column: 23 },
                                    end: { line: 72, column: 59 },
                                  },
                                  expression: {
                                    type: "ArrowFunctionExpression",
                                    loc: {
                                      start: { line: 72, column: 24 },
                                      end: { line: 72, column: 58 },
                                    },
                                    params: [],
                                    body: {
                                      type: "CallExpression",
                                      loc: {
                                        start: { line: 72, column: 30 },
                                        end: { line: 72, column: 58 },
                                      },
                                      callee: {
                                        type: "MemberExpression",
                                        loc: {
                                          start: { line: 72, column: 30 },
                                          end: { line: 72, column: 49 },
                                        },
                                        object: {
                                          type: "MemberExpression",
                                          loc: {
                                            start: { line: 72, column: 30 },
                                            end: { line: 72, column: 45 },
                                          },
                                          object: {
                                            type: "Splice",
                                            loc: {
                                              start: { line: 72, column: 30 },
                                              end: { line: 72, column: 37 },
                                            },
                                            key: "$window",
                                          },
                                          property: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 72, column: 38 },
                                              end: { line: 72, column: 45 },
                                            },
                                            name: "console",
                                          },
                                          computed: false,
                                          optional: false,
                                        },
                                        property: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 72, column: 46 },
                                            end: { line: 72, column: 49 },
                                          },
                                          name: "log",
                                        },
                                        computed: false,
                                        optional: false,
                                      },
                                      arguments: [
                                        {
                                          type: "CallExpression",
                                          loc: {
                                            start: { line: 72, column: 50 },
                                            end: { line: 72, column: 57 },
                                          },
                                          callee: {
                                            type: "MemberExpression",
                                            loc: {
                                              start: { line: 72, column: 50 },
                                              end: { line: 72, column: 55 },
                                            },
                                            object: {
                                              type: "Identifier",
                                              loc: {
                                                start: { line: 72, column: 50 },
                                                end: { line: 72, column: 51 },
                                              },
                                              name: "n",
                                              key: "n$1omn3ou0fqxtc$4",
                                            },
                                            property: {
                                              type: "Identifier",
                                              loc: {
                                                start: { line: 72, column: 52 },
                                                end: { line: 72, column: 55 },
                                              },
                                              name: "get",
                                            },
                                            computed: false,
                                            optional: false,
                                          },
                                          arguments: [],
                                          optional: false,
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
                                start: { line: 72, column: 60 },
                                end: { line: 72, column: 65 },
                              },
                              value: "shown",
                              raw: "shown",
                            },
                          ],
                          closingElement: {
                            type: "JSXClosingElement",
                            loc: {
                              start: { line: 72, column: 65 },
                              end: { line: 72, column: 69 },
                            },
                            name: {
                              type: "JSXIdentifier",
                              loc: {
                                start: { line: 72, column: 67 },
                                end: { line: 72, column: 68 },
                              },
                              name: "p",
                            },
                          },
                        },
                        alternate: {
                          type: "Literal",
                          loc: {
                            start: { line: 73, column: 18 },
                            end: { line: 73, column: 22 },
                          },
                          value: null,
                        },
                      },
                    },
                    {
                      type: "JSXText",
                      loc: {
                        start: { line: 74, column: 12 },
                        end: { line: 74, column: 12 },
                      },
                      value: "\n            ",
                      raw: "\n            ",
                    },
                  ],
                  closingElement: {
                    type: "JSXClosingElement",
                    loc: {
                      start: { line: 74, column: 12 },
                      end: { line: 74, column: 18 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 74, column: 14 },
                        end: { line: 74, column: 17 },
                      },
                      name: "div",
                    },
                  },
                },
              },
            ],
          }),
        ),
      );
      const shownText = screen.getByText("shown");
      await userEvent.click(screen.getByRole("button"));
      assert.equal(screen.getByRole("button").textContent, "n 1");
      assert.equal(calls, 1);
      assert.equal(screen.getByText("shown"), shownText);
    });
  });
});
