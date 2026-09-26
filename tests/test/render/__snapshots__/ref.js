import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs, onMount, state } from "@backtickjs/core";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
// `ref` hands a script the element it is written on.
describe("ref", () => {
  it("keeps the element for a handler to use", async () => {
    await render(
      cs.create(
        "1ig5nq86fb7c4:13:6",
        { params: [{ kind: "splice", value: state, bindings: [] }] },
        () => ({
          type: "BlockStatement",
          loc: { start: { line: 13, column: 9 }, end: { line: 21, column: 7 } },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 14, column: 8 },
                end: { line: 14, column: 60 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 14, column: 14 },
                    end: { line: 14, column: 59 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 14, column: 14 },
                      end: { line: 14, column: 19 },
                    },
                    name: "field",
                    key: "field$1ig5nq86fb7c4$0",
                  },
                  init: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 14, column: 22 },
                      end: { line: 14, column: 59 },
                    },
                    callee: {
                      type: "Splice",
                      loc: {
                        start: { line: 14, column: 22 },
                        end: { line: 14, column: 28 },
                      },
                      param: 0,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 14, column: 54 },
                          end: { line: 14, column: 58 },
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
                start: { line: 15, column: 8 },
                end: { line: 20, column: 10 },
              },
              argument: {
                type: "JSXElement",
                loc: {
                  start: { line: 16, column: 10 },
                  end: { line: 19, column: 16 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 16, column: 10 },
                    end: { line: 16, column: 15 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 16, column: 11 },
                      end: { line: 16, column: 14 },
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
                      end: { line: 17, column: 77 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 17, column: 12 },
                        end: { line: 17, column: 77 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 17, column: 13 },
                          end: { line: 17, column: 18 },
                        },
                        name: "input",
                      },
                      attributes: [
                        {
                          type: "JSXAttribute",
                          loc: {
                            start: { line: 17, column: 19 },
                            end: { line: 17, column: 36 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 17, column: 19 },
                              end: { line: 17, column: 29 },
                            },
                            name: "aria-label",
                          },
                          value: {
                            type: "Literal",
                            loc: {
                              start: { line: 17, column: 30 },
                              end: { line: 17, column: 36 },
                            },
                            value: "name",
                          },
                        },
                        {
                          type: "JSXAttribute",
                          loc: {
                            start: { line: 17, column: 37 },
                            end: { line: 17, column: 74 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 17, column: 37 },
                              end: { line: 17, column: 40 },
                            },
                            name: "ref",
                          },
                          value: {
                            type: "JSXExpressionContainer",
                            loc: {
                              start: { line: 17, column: 41 },
                              end: { line: 17, column: 74 },
                            },
                            expression: {
                              type: "ArrowFunctionExpression",
                              loc: {
                                start: { line: 17, column: 42 },
                                end: { line: 17, column: 73 },
                              },
                              params: [
                                {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 17, column: 43 },
                                    end: { line: 17, column: 50 },
                                  },
                                  name: "element",
                                  key: "element$1ig5nq86fb7c4$1",
                                },
                              ],
                              body: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 17, column: 55 },
                                  end: { line: 17, column: 73 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 17, column: 55 },
                                    end: { line: 17, column: 64 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 17, column: 55 },
                                      end: { line: 17, column: 60 },
                                    },
                                    name: "field",
                                    key: "field$1ig5nq86fb7c4$0",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 17, column: 61 },
                                      end: { line: 17, column: 64 },
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
                                      start: { line: 17, column: 65 },
                                      end: { line: 17, column: 72 },
                                    },
                                    name: "element",
                                    key: "element$1ig5nq86fb7c4$1",
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
                      start: { line: 18, column: 12 },
                      end: { line: 18, column: 12 },
                    },
                    value: "\n            ",
                    raw: "\n            ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 18, column: 12 },
                      end: { line: 18, column: 70 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 18, column: 12 },
                        end: { line: 18, column: 57 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 18, column: 13 },
                          end: { line: 18, column: 19 },
                        },
                        name: "button",
                      },
                      attributes: [
                        {
                          type: "JSXAttribute",
                          loc: {
                            start: { line: 18, column: 20 },
                            end: { line: 18, column: 56 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 18, column: 20 },
                              end: { line: 18, column: 27 },
                            },
                            name: "onclick",
                          },
                          value: {
                            type: "JSXExpressionContainer",
                            loc: {
                              start: { line: 18, column: 28 },
                              end: { line: 18, column: 56 },
                            },
                            expression: {
                              type: "ArrowFunctionExpression",
                              loc: {
                                start: { line: 18, column: 29 },
                                end: { line: 18, column: 55 },
                              },
                              params: [],
                              body: {
                                type: "ChainExpression",
                                loc: {
                                  start: { line: 18, column: 35 },
                                  end: { line: 18, column: 55 },
                                },
                                expression: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 18, column: 35 },
                                    end: { line: 18, column: 55 },
                                  },
                                  callee: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 18, column: 35 },
                                      end: { line: 18, column: 53 },
                                    },
                                    object: {
                                      type: "CallExpression",
                                      loc: {
                                        start: { line: 18, column: 35 },
                                        end: { line: 18, column: 46 },
                                      },
                                      callee: {
                                        type: "MemberExpression",
                                        loc: {
                                          start: { line: 18, column: 35 },
                                          end: { line: 18, column: 44 },
                                        },
                                        object: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 18, column: 35 },
                                            end: { line: 18, column: 40 },
                                          },
                                          name: "field",
                                          key: "field$1ig5nq86fb7c4$0",
                                        },
                                        property: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 18, column: 41 },
                                            end: { line: 18, column: 44 },
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
                                        start: { line: 18, column: 48 },
                                        end: { line: 18, column: 53 },
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
                          start: { line: 18, column: 57 },
                          end: { line: 18, column: 61 },
                        },
                        value: "edit",
                        raw: "edit",
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 18, column: 61 },
                        end: { line: 18, column: 70 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 18, column: 63 },
                          end: { line: 18, column: 69 },
                        },
                        name: "button",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 19, column: 10 },
                      end: { line: 19, column: 10 },
                    },
                    value: "\n          ",
                    raw: "\n          ",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 19, column: 10 },
                    end: { line: 19, column: 16 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 19, column: 12 },
                      end: { line: 19, column: 15 },
                    },
                    name: "div",
                  },
                },
              },
            },
          ],
        }),
        {
          code: 'export default ($0) => {\n    const field = $0()(null);\n    return (<div>\n            <input aria-label="name" ref={(element) => field.set(element)}/>\n            <button onclick={() => field.get()?.focus()}>edit</button>\n          </div>);\n};',
          map: '{"version":3,"file":"ref.test.jsx","sourceRoot":"","sources":["ref.test.tsx"],"names":[],"mappings":"eAYS;IACD,MAAM,KAAK,GAAG,IAAM,CAA0B,IAAI,CAAC,CAAC;IACpD,OAAO,CACL,CAAC,GAAG,CACF;YAAA,CAAC,KAAK,CAAC,UAAU,CAAC,MAAM,CAAC,GAAG,CAAC,CAAC,CAAC,OAAO,EAAE,EAAE,CAAC,KAAK,CAAC,GAAG,CAAC,OAAO,CAAC,CAAC,EAC9D;YAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,GAAG,EAAE,EAAE,KAAK,EAAE,CAAC,CAAC,IAAI,EAAE,MAAM,CAC3D;UAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
        },
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });
  it("focuses once in place, through onMount", async () => {
    await render(
      cs.create(
        "1ig5nq86fb7c4:29:6",
        { params: [{ kind: "splice", value: onMount, bindings: [] }] },
        () => ({
          type: "BlockStatement",
          loc: { start: { line: 29, column: 9 }, end: { line: 36, column: 7 } },
          body: [
            {
              type: "ReturnStatement",
              loc: {
                start: { line: 30, column: 8 },
                end: { line: 35, column: 10 },
              },
              argument: {
                type: "JSXElement",
                loc: {
                  start: { line: 31, column: 10 },
                  end: { line: 34, column: 12 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 31, column: 10 },
                    end: { line: 34, column: 12 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 31, column: 11 },
                      end: { line: 31, column: 16 },
                    },
                    name: "input",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 32, column: 12 },
                        end: { line: 32, column: 29 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 32, column: 12 },
                          end: { line: 32, column: 22 },
                        },
                        name: "aria-label",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 32, column: 23 },
                          end: { line: 32, column: 29 },
                        },
                        value: "name",
                      },
                    },
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 33, column: 12 },
                        end: { line: 33, column: 62 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 33, column: 12 },
                          end: { line: 33, column: 15 },
                        },
                        name: "ref",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 33, column: 16 },
                          end: { line: 33, column: 62 },
                        },
                        expression: {
                          type: "ArrowFunctionExpression",
                          loc: {
                            start: { line: 33, column: 17 },
                            end: { line: 33, column: 61 },
                          },
                          params: [
                            {
                              type: "Identifier",
                              loc: {
                                start: { line: 33, column: 18 },
                                end: { line: 33, column: 25 },
                              },
                              name: "element",
                              key: "element$1ig5nq86fb7c4$2",
                            },
                          ],
                          body: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 33, column: 30 },
                              end: { line: 33, column: 61 },
                            },
                            callee: {
                              type: "Splice",
                              loc: {
                                start: { line: 33, column: 30 },
                                end: { line: 33, column: 38 },
                              },
                              param: 0,
                            },
                            arguments: [
                              {
                                type: "ArrowFunctionExpression",
                                loc: {
                                  start: { line: 33, column: 39 },
                                  end: { line: 33, column: 60 },
                                },
                                params: [],
                                body: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 33, column: 45 },
                                    end: { line: 33, column: 60 },
                                  },
                                  callee: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 33, column: 45 },
                                      end: { line: 33, column: 58 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 33, column: 45 },
                                        end: { line: 33, column: 52 },
                                      },
                                      name: "element",
                                      key: "element$1ig5nq86fb7c4$2",
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 33, column: 53 },
                                        end: { line: 33, column: 58 },
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
        {
          code: 'export default ($0) => {\n    return (<input aria-label="name" ref={(element) => $0()(() => element.focus())}/>);\n};',
          map: '{"version":3,"file":"ref.test.jsx","sourceRoot":"","sources":["ref.test.tsx"],"names":[],"mappings":"eA4BS;IACD,OAAO,CACL,CAAC,KAAK,CACJ,UAAU,CAAC,MAAM,CACjB,GAAG,CAAC,CAAC,CAAC,OAAO,EAAE,EAAE,CAAC,IAAQ,CAAC,GAAG,EAAE,CAAC,OAAO,CAAC,KAAK,EAAE,CAAC,CAAC,EAClD,CACH,CAAC;AACJ,CAAC"}',
        },
      ),
    );
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });
  it("is not written as an attribute", async () => {
    await render(
      cs.create(
        "1ig5nq86fb7c4:42:17",
        { params: [] },
        () => ({
          type: "JSXElement",
          loc: {
            start: { line: 42, column: 20 },
            end: { line: 42, column: 62 },
          },
          openingElement: {
            type: "JSXOpeningElement",
            loc: {
              start: { line: 42, column: 20 },
              end: { line: 42, column: 62 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 42, column: 21 },
                end: { line: 42, column: 26 },
              },
              name: "input",
            },
            attributes: [
              {
                type: "JSXAttribute",
                loc: {
                  start: { line: 42, column: 27 },
                  end: { line: 42, column: 44 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 42, column: 27 },
                    end: { line: 42, column: 37 },
                  },
                  name: "aria-label",
                },
                value: {
                  type: "Literal",
                  loc: {
                    start: { line: 42, column: 38 },
                    end: { line: 42, column: 44 },
                  },
                  value: "name",
                },
              },
              {
                type: "JSXAttribute",
                loc: {
                  start: { line: 42, column: 45 },
                  end: { line: 42, column: 59 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 42, column: 45 },
                    end: { line: 42, column: 48 },
                  },
                  name: "ref",
                },
                value: {
                  type: "JSXExpressionContainer",
                  loc: {
                    start: { line: 42, column: 49 },
                    end: { line: 42, column: 59 },
                  },
                  expression: {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 42, column: 50 },
                      end: { line: 42, column: 58 },
                    },
                    params: [],
                    body: {
                      type: "BlockStatement",
                      loc: {
                        start: { line: 42, column: 56 },
                        end: { line: 42, column: 58 },
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
        {
          code: 'export default () => <input aria-label="name" ref={() => { }}/>;',
          map: '{"version":3,"file":"ref.test.jsx","sourceRoot":"","sources":["ref.test.tsx"],"names":[],"mappings":"eAyCoB,MAAA,CAAC,KAAK,CAAC,UAAU,CAAC,MAAM,CAAC,GAAG,CAAC,CAAC,GAAG,EAAE,GAAE,CAAC,CAAC,EAAG"}',
        },
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
          "1ig5nq86fb7c4:64:8",
          {
            params: [
              { kind: "splice", value: state, bindings: [] },
              { kind: "splice", value: window, bindings: [] },
            ],
          },
          () => ({
            type: "BlockStatement",
            loc: {
              start: { line: 64, column: 11 },
              end: { line: 77, column: 9 },
            },
            body: [
              {
                type: "VariableDeclaration",
                loc: {
                  start: { line: 65, column: 10 },
                  end: { line: 65, column: 37 },
                },
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    loc: {
                      start: { line: 65, column: 16 },
                      end: { line: 65, column: 36 },
                    },
                    id: {
                      type: "Identifier",
                      loc: {
                        start: { line: 65, column: 16 },
                        end: { line: 65, column: 21 },
                      },
                      name: "shown",
                      key: "shown$1ig5nq86fb7c4$3",
                    },
                    init: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 65, column: 24 },
                        end: { line: 65, column: 36 },
                      },
                      callee: {
                        type: "Splice",
                        loc: {
                          start: { line: 65, column: 24 },
                          end: { line: 65, column: 30 },
                        },
                        param: 0,
                      },
                      arguments: [
                        {
                          type: "Literal",
                          loc: {
                            start: { line: 65, column: 31 },
                            end: { line: 65, column: 35 },
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
                  start: { line: 66, column: 10 },
                  end: { line: 66, column: 30 },
                },
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    loc: {
                      start: { line: 66, column: 16 },
                      end: { line: 66, column: 29 },
                    },
                    id: {
                      type: "Identifier",
                      loc: {
                        start: { line: 66, column: 16 },
                        end: { line: 66, column: 17 },
                      },
                      name: "n",
                      key: "n$1ig5nq86fb7c4$4",
                    },
                    init: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 66, column: 20 },
                        end: { line: 66, column: 29 },
                      },
                      callee: {
                        type: "Splice",
                        loc: {
                          start: { line: 66, column: 20 },
                          end: { line: 66, column: 26 },
                        },
                        param: 0,
                      },
                      arguments: [
                        {
                          type: "Literal",
                          loc: {
                            start: { line: 66, column: 27 },
                            end: { line: 66, column: 28 },
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
                  start: { line: 67, column: 10 },
                  end: { line: 76, column: 12 },
                },
                argument: {
                  type: "JSXElement",
                  loc: {
                    start: { line: 68, column: 12 },
                    end: { line: 75, column: 18 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 68, column: 12 },
                      end: { line: 68, column: 17 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 68, column: 13 },
                        end: { line: 68, column: 16 },
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
                        start: { line: 69, column: 14 },
                        end: { line: 69, column: 14 },
                      },
                      value: "\n              ",
                      raw: "\n              ",
                    },
                    {
                      type: "JSXElement",
                      loc: {
                        start: { line: 69, column: 14 },
                        end: { line: 71, column: 23 },
                      },
                      openingElement: {
                        type: "JSXOpeningElement",
                        loc: {
                          start: { line: 69, column: 14 },
                          end: { line: 69, column: 57 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 69, column: 15 },
                            end: { line: 69, column: 21 },
                          },
                          name: "button",
                        },
                        attributes: [
                          {
                            type: "JSXAttribute",
                            loc: {
                              start: { line: 69, column: 22 },
                              end: { line: 69, column: 56 },
                            },
                            name: {
                              type: "JSXIdentifier",
                              loc: {
                                start: { line: 69, column: 22 },
                                end: { line: 69, column: 29 },
                              },
                              name: "onclick",
                            },
                            value: {
                              type: "JSXExpressionContainer",
                              loc: {
                                start: { line: 69, column: 30 },
                                end: { line: 69, column: 56 },
                              },
                              expression: {
                                type: "ArrowFunctionExpression",
                                loc: {
                                  start: { line: 69, column: 31 },
                                  end: { line: 69, column: 55 },
                                },
                                params: [],
                                body: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 69, column: 37 },
                                    end: { line: 69, column: 55 },
                                  },
                                  callee: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 69, column: 37 },
                                      end: { line: 69, column: 42 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 69, column: 37 },
                                        end: { line: 69, column: 38 },
                                      },
                                      name: "n",
                                      key: "n$1ig5nq86fb7c4$4",
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 69, column: 39 },
                                        end: { line: 69, column: 42 },
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
                                        start: { line: 69, column: 43 },
                                        end: { line: 69, column: 54 },
                                      },
                                      operator: "+",
                                      left: {
                                        type: "CallExpression",
                                        loc: {
                                          start: { line: 69, column: 43 },
                                          end: { line: 69, column: 50 },
                                        },
                                        callee: {
                                          type: "MemberExpression",
                                          loc: {
                                            start: { line: 69, column: 43 },
                                            end: { line: 69, column: 48 },
                                          },
                                          object: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 69, column: 43 },
                                              end: { line: 69, column: 44 },
                                            },
                                            name: "n",
                                            key: "n$1ig5nq86fb7c4$4",
                                          },
                                          property: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 69, column: 45 },
                                              end: { line: 69, column: 48 },
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
                                          start: { line: 69, column: 53 },
                                          end: { line: 69, column: 54 },
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
                            start: { line: 70, column: 16 },
                            end: { line: 70, column: 16 },
                          },
                          value: "\n                ",
                          raw: "\n                ",
                        },
                        {
                          type: "JSXExpressionContainer",
                          loc: {
                            start: { line: 70, column: 16 },
                            end: { line: 70, column: 32 },
                          },
                          expression: {
                            type: "BinaryExpression",
                            loc: {
                              start: { line: 70, column: 17 },
                              end: { line: 70, column: 31 },
                            },
                            operator: "+",
                            left: {
                              type: "Literal",
                              loc: {
                                start: { line: 70, column: 17 },
                                end: { line: 70, column: 21 },
                              },
                              value: "n ",
                            },
                            right: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 70, column: 24 },
                                end: { line: 70, column: 31 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 70, column: 24 },
                                  end: { line: 70, column: 29 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 70, column: 24 },
                                    end: { line: 70, column: 25 },
                                  },
                                  name: "n",
                                  key: "n$1ig5nq86fb7c4$4",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 70, column: 26 },
                                    end: { line: 70, column: 29 },
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
                            start: { line: 71, column: 14 },
                            end: { line: 71, column: 14 },
                          },
                          value: "\n              ",
                          raw: "\n              ",
                        },
                      ],
                      closingElement: {
                        type: "JSXClosingElement",
                        loc: {
                          start: { line: 71, column: 14 },
                          end: { line: 71, column: 23 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 71, column: 16 },
                            end: { line: 71, column: 22 },
                          },
                          name: "button",
                        },
                      },
                    },
                    {
                      type: "JSXText",
                      loc: {
                        start: { line: 72, column: 14 },
                        end: { line: 72, column: 14 },
                      },
                      value: "\n              ",
                      raw: "\n              ",
                    },
                    {
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 72, column: 14 },
                        end: { line: 74, column: 23 },
                      },
                      expression: {
                        type: "ConditionalExpression",
                        loc: {
                          start: { line: 72, column: 15 },
                          end: { line: 74, column: 22 },
                        },
                        test: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 72, column: 15 },
                            end: { line: 72, column: 26 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 72, column: 15 },
                              end: { line: 72, column: 24 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 72, column: 15 },
                                end: { line: 72, column: 20 },
                              },
                              name: "shown",
                              key: "shown$1ig5nq86fb7c4$3",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 72, column: 21 },
                                end: { line: 72, column: 24 },
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
                            start: { line: 73, column: 16 },
                            end: { line: 73, column: 69 },
                          },
                          openingElement: {
                            type: "JSXOpeningElement",
                            loc: {
                              start: { line: 73, column: 16 },
                              end: { line: 73, column: 60 },
                            },
                            name: {
                              type: "JSXIdentifier",
                              loc: {
                                start: { line: 73, column: 17 },
                                end: { line: 73, column: 18 },
                              },
                              name: "p",
                            },
                            attributes: [
                              {
                                type: "JSXAttribute",
                                loc: {
                                  start: { line: 73, column: 19 },
                                  end: { line: 73, column: 59 },
                                },
                                name: {
                                  type: "JSXIdentifier",
                                  loc: {
                                    start: { line: 73, column: 19 },
                                    end: { line: 73, column: 22 },
                                  },
                                  name: "ref",
                                },
                                value: {
                                  type: "JSXExpressionContainer",
                                  loc: {
                                    start: { line: 73, column: 23 },
                                    end: { line: 73, column: 59 },
                                  },
                                  expression: {
                                    type: "ArrowFunctionExpression",
                                    loc: {
                                      start: { line: 73, column: 24 },
                                      end: { line: 73, column: 58 },
                                    },
                                    params: [],
                                    body: {
                                      type: "CallExpression",
                                      loc: {
                                        start: { line: 73, column: 30 },
                                        end: { line: 73, column: 58 },
                                      },
                                      callee: {
                                        type: "MemberExpression",
                                        loc: {
                                          start: { line: 73, column: 30 },
                                          end: { line: 73, column: 49 },
                                        },
                                        object: {
                                          type: "MemberExpression",
                                          loc: {
                                            start: { line: 73, column: 30 },
                                            end: { line: 73, column: 45 },
                                          },
                                          object: {
                                            type: "Splice",
                                            loc: {
                                              start: { line: 73, column: 30 },
                                              end: { line: 73, column: 37 },
                                            },
                                            param: 1,
                                          },
                                          property: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 73, column: 38 },
                                              end: { line: 73, column: 45 },
                                            },
                                            name: "console",
                                          },
                                          computed: false,
                                          optional: false,
                                        },
                                        property: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 73, column: 46 },
                                            end: { line: 73, column: 49 },
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
                                            start: { line: 73, column: 50 },
                                            end: { line: 73, column: 57 },
                                          },
                                          callee: {
                                            type: "MemberExpression",
                                            loc: {
                                              start: { line: 73, column: 50 },
                                              end: { line: 73, column: 55 },
                                            },
                                            object: {
                                              type: "Identifier",
                                              loc: {
                                                start: { line: 73, column: 50 },
                                                end: { line: 73, column: 51 },
                                              },
                                              name: "n",
                                              key: "n$1ig5nq86fb7c4$4",
                                            },
                                            property: {
                                              type: "Identifier",
                                              loc: {
                                                start: { line: 73, column: 52 },
                                                end: { line: 73, column: 55 },
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
                                start: { line: 73, column: 60 },
                                end: { line: 73, column: 65 },
                              },
                              value: "shown",
                              raw: "shown",
                            },
                          ],
                          closingElement: {
                            type: "JSXClosingElement",
                            loc: {
                              start: { line: 73, column: 65 },
                              end: { line: 73, column: 69 },
                            },
                            name: {
                              type: "JSXIdentifier",
                              loc: {
                                start: { line: 73, column: 67 },
                                end: { line: 73, column: 68 },
                              },
                              name: "p",
                            },
                          },
                        },
                        alternate: {
                          type: "Literal",
                          loc: {
                            start: { line: 74, column: 18 },
                            end: { line: 74, column: 22 },
                          },
                          value: null,
                        },
                      },
                    },
                    {
                      type: "JSXText",
                      loc: {
                        start: { line: 75, column: 12 },
                        end: { line: 75, column: 12 },
                      },
                      value: "\n            ",
                      raw: "\n            ",
                    },
                  ],
                  closingElement: {
                    type: "JSXClosingElement",
                    loc: {
                      start: { line: 75, column: 12 },
                      end: { line: 75, column: 18 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 75, column: 14 },
                        end: { line: 75, column: 17 },
                      },
                      name: "div",
                    },
                  },
                },
              },
            ],
          }),
          {
            code: 'export default ($0, $1) => {\n    const shown = $0()(true);\n    const n = $0()(0);\n    return (<div>\n              <button onclick={() => n.set(n.get() + 1)}>\n                {"n " + n.get()}\n              </button>\n              {shown.get() ? (<p ref={() => $1().console.log(n.get())}>shown</p>) : null}\n            </div>);\n};',
            map: '{"version":3,"file":"ref.test.jsx","sourceRoot":"","sources":["ref.test.tsx"],"names":[],"mappings":"eA+DW;IACD,MAAM,KAAK,GAAG,IAAM,CAAC,IAAI,CAAC,CAAC;IAC3B,MAAM,CAAC,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IACpB,OAAO,CACL,CAAC,GAAG,CACF;cAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC,CACxC;gBAAA,CAAC,IAAI,GAAG,CAAC,CAAC,GAAG,EAAE,CACjB;cAAA,EAAE,MAAM,CACR;cAAA,CAAC,KAAK,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,CACb,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,EAAE,CAAC,IAAO,CAAC,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,CAAC,CACtD,CAAC,CAAC,CAAC,IAAI,CACV;YAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
          },
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
