import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, onMount, state } from "@backtickjs/core";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
// What the page held each time a script logged, read through the console
// `onMount` reaches from a script.
async function logged(draw) {
  const seen = [];
  const log = globalThis.window.console.log;
  globalThis.window.console.log = () => {
    seen.push(document.body.textContent ?? "");
  };
  try {
    await draw();
  } finally {
    globalThis.window.console.log = log;
  }
  return seen;
}
describe("onMount", () => {
  it("runs once, after the drawing is in the page", async () => {
    const seen = await logged(() =>
      render(
        cs.create(
          { start: { line: 28, column: 8 }, end: { line: 35, column: 10 } },
          {
            filePath: "render/on-mount.test.tsx",
            fileHash: "1qp1kr79c2kqf",
            splices: {
              $state: { value: state, params: [] },
              $onMount: { value: onMount, params: [] },
              $window: { value: window, params: [] },
            },
            captures: [],
          },
          () => ({
            type: "BlockStatement",
            loc: {
              start: { line: 28, column: 11 },
              end: { line: 35, column: 9 },
            },
            body: [
              {
                type: "VariableDeclaration",
                loc: {
                  start: { line: 29, column: 10 },
                  end: { line: 29, column: 34 },
                },
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    loc: {
                      start: { line: 29, column: 16 },
                      end: { line: 29, column: 33 },
                    },
                    id: {
                      type: "Identifier",
                      loc: {
                        start: { line: 29, column: 16 },
                        end: { line: 29, column: 21 },
                      },
                      name: "count",
                      key: "count$1qp1kr79c2kqf$0",
                    },
                    init: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 29, column: 24 },
                        end: { line: 29, column: 33 },
                      },
                      callee: {
                        type: "Splice",
                        loc: {
                          start: { line: 29, column: 24 },
                          end: { line: 29, column: 30 },
                        },
                        key: "$state",
                      },
                      arguments: [
                        {
                          type: "Literal",
                          loc: {
                            start: { line: 29, column: 31 },
                            end: { line: 29, column: 32 },
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
                type: "ExpressionStatement",
                loc: {
                  start: { line: 30, column: 10 },
                  end: { line: 33, column: 13 },
                },
                expression: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 30, column: 10 },
                    end: { line: 33, column: 12 },
                  },
                  callee: {
                    type: "Splice",
                    loc: {
                      start: { line: 30, column: 10 },
                      end: { line: 30, column: 18 },
                    },
                    key: "$onMount",
                  },
                  arguments: [
                    {
                      type: "ArrowFunctionExpression",
                      loc: {
                        start: { line: 30, column: 19 },
                        end: { line: 33, column: 11 },
                      },
                      params: [],
                      body: {
                        type: "BlockStatement",
                        loc: {
                          start: { line: 30, column: 25 },
                          end: { line: 33, column: 11 },
                        },
                        body: [
                          {
                            type: "ExpressionStatement",
                            loc: {
                              start: { line: 31, column: 12 },
                              end: { line: 31, column: 34 },
                            },
                            expression: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 31, column: 12 },
                                end: { line: 31, column: 33 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 31, column: 12 },
                                  end: { line: 31, column: 31 },
                                },
                                object: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 31, column: 12 },
                                    end: { line: 31, column: 27 },
                                  },
                                  object: {
                                    type: "Splice",
                                    loc: {
                                      start: { line: 31, column: 12 },
                                      end: { line: 31, column: 19 },
                                    },
                                    key: "$window",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 31, column: 20 },
                                      end: { line: 31, column: 27 },
                                    },
                                    name: "console",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 31, column: 28 },
                                    end: { line: 31, column: 31 },
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
                            type: "ExpressionStatement",
                            loc: {
                              start: { line: 32, column: 12 },
                              end: { line: 32, column: 39 },
                            },
                            expression: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 32, column: 12 },
                                end: { line: 32, column: 38 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 32, column: 12 },
                                  end: { line: 32, column: 21 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 32, column: 12 },
                                    end: { line: 32, column: 17 },
                                  },
                                  name: "count",
                                  key: "count$1qp1kr79c2kqf$0",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 32, column: 18 },
                                    end: { line: 32, column: 21 },
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
                                    start: { line: 32, column: 22 },
                                    end: { line: 32, column: 37 },
                                  },
                                  operator: "+",
                                  left: {
                                    type: "CallExpression",
                                    loc: {
                                      start: { line: 32, column: 22 },
                                      end: { line: 32, column: 33 },
                                    },
                                    callee: {
                                      type: "MemberExpression",
                                      loc: {
                                        start: { line: 32, column: 22 },
                                        end: { line: 32, column: 31 },
                                      },
                                      object: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 32, column: 22 },
                                          end: { line: 32, column: 27 },
                                        },
                                        name: "count",
                                        key: "count$1qp1kr79c2kqf$0",
                                      },
                                      property: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 32, column: 28 },
                                          end: { line: 32, column: 31 },
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
                                      start: { line: 32, column: 36 },
                                      end: { line: 32, column: 37 },
                                    },
                                    value: 1,
                                  },
                                },
                              ],
                              optional: false,
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
              {
                type: "ReturnStatement",
                loc: {
                  start: { line: 34, column: 10 },
                  end: { line: 34, column: 51 },
                },
                argument: {
                  type: "JSXElement",
                  loc: {
                    start: { line: 34, column: 17 },
                    end: { line: 34, column: 50 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 34, column: 17 },
                      end: { line: 34, column: 20 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 34, column: 18 },
                        end: { line: 34, column: 19 },
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
                        start: { line: 34, column: 20 },
                        end: { line: 34, column: 46 },
                      },
                      expression: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 34, column: 21 },
                          end: { line: 34, column: 45 },
                        },
                        operator: "+",
                        left: {
                          type: "Literal",
                          loc: {
                            start: { line: 34, column: 21 },
                            end: { line: 34, column: 31 },
                          },
                          value: "mounted ",
                        },
                        right: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 34, column: 34 },
                            end: { line: 34, column: 45 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 34, column: 34 },
                              end: { line: 34, column: 43 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 34, column: 34 },
                                end: { line: 34, column: 39 },
                              },
                              name: "count",
                              key: "count$1qp1kr79c2kqf$0",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 34, column: 40 },
                                end: { line: 34, column: 43 },
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
                      start: { line: 34, column: 46 },
                      end: { line: 34, column: 50 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 34, column: 48 },
                        end: { line: 34, column: 49 },
                      },
                      name: "p",
                    },
                  },
                },
              },
            ],
          }),
          '($0, $1, $2) => {\n    const count = $0()(0);\n    $1()(() => {\n        $2().console.log();\n        count.set(count.get() + 1);\n    });\n    return <p>{"mounted " + count.get()}</p>;\n}',
          '{"version":3,"file":"on-mount.test.jsx","sourceRoot":"","sources":["on-mount.test.tsx"],"names":[],"mappings":"AA2BW;IACD,MAAM,KAAK,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IACxB,IAAQ,CAAC,GAAG,EAAE;QACZ,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC;QACtB,KAAK,CAAC,GAAG,CAAC,KAAK,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC;IAC7B,CAAC,CAAC,CAAC;IACH,OAAO,CAAC,CAAC,CAAC,CAAC,UAAU,GAAG,KAAK,CAAC,GAAG,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;AAC3C,CAAC,CAAA"}',
        ),
      ),
    );
    assert.deepEqual(seen, ["mounted 0"]);
    assert.equal(screen.getByText(/mounted/).textContent, "mounted 1");
  });
  it("runs at once when called from a handler", async () => {
    await render(
      cs.create(
        { start: { line: 44, column: 6 }, end: { line: 51, column: 8 } },
        {
          filePath: "render/on-mount.test.tsx",
          fileHash: "1qp1kr79c2kqf",
          splices: {
            $state: { value: state, params: [] },
            $onMount: { value: onMount, params: [] },
          },
          captures: [],
        },
        () => ({
          type: "BlockStatement",
          loc: { start: { line: 44, column: 9 }, end: { line: 51, column: 7 } },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 45, column: 8 },
                end: { line: 45, column: 39 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 45, column: 14 },
                    end: { line: 45, column: 38 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 45, column: 14 },
                      end: { line: 45, column: 18 },
                    },
                    name: "said",
                    key: "said$1qp1kr79c2kqf$1",
                  },
                  init: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 45, column: 21 },
                      end: { line: 45, column: 38 },
                    },
                    callee: {
                      type: "Splice",
                      loc: {
                        start: { line: 45, column: 21 },
                        end: { line: 45, column: 27 },
                      },
                      key: "$state",
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 45, column: 28 },
                          end: { line: 45, column: 37 },
                        },
                        value: "not yet",
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
                start: { line: 46, column: 8 },
                end: { line: 50, column: 10 },
              },
              argument: {
                type: "JSXElement",
                loc: {
                  start: { line: 47, column: 10 },
                  end: { line: 49, column: 19 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 47, column: 10 },
                    end: { line: 47, column: 66 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 47, column: 11 },
                      end: { line: 47, column: 17 },
                    },
                    name: "button",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 47, column: 18 },
                        end: { line: 47, column: 65 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 47, column: 18 },
                          end: { line: 47, column: 25 },
                        },
                        name: "onclick",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 47, column: 26 },
                          end: { line: 47, column: 65 },
                        },
                        expression: {
                          type: "ArrowFunctionExpression",
                          loc: {
                            start: { line: 47, column: 27 },
                            end: { line: 47, column: 64 },
                          },
                          params: [],
                          body: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 47, column: 33 },
                              end: { line: 47, column: 64 },
                            },
                            callee: {
                              type: "Splice",
                              loc: {
                                start: { line: 47, column: 33 },
                                end: { line: 47, column: 41 },
                              },
                              key: "$onMount",
                            },
                            arguments: [
                              {
                                type: "ArrowFunctionExpression",
                                loc: {
                                  start: { line: 47, column: 42 },
                                  end: { line: 47, column: 63 },
                                },
                                params: [],
                                body: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 47, column: 48 },
                                    end: { line: 47, column: 63 },
                                  },
                                  callee: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 47, column: 48 },
                                      end: { line: 47, column: 56 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 47, column: 48 },
                                        end: { line: 47, column: 52 },
                                      },
                                      name: "said",
                                      key: "said$1qp1kr79c2kqf$1",
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 47, column: 53 },
                                        end: { line: 47, column: 56 },
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
                                        start: { line: 47, column: 57 },
                                        end: { line: 47, column: 62 },
                                      },
                                      value: "ran",
                                    },
                                  ],
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
                  selfClosing: false,
                },
                children: [
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 48, column: 12 },
                      end: { line: 48, column: 12 },
                    },
                    value: "\n            ",
                    raw: "\n            ",
                  },
                  {
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 48, column: 12 },
                      end: { line: 48, column: 24 },
                    },
                    expression: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 48, column: 13 },
                        end: { line: 48, column: 23 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 48, column: 13 },
                          end: { line: 48, column: 21 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 48, column: 13 },
                            end: { line: 48, column: 17 },
                          },
                          name: "said",
                          key: "said$1qp1kr79c2kqf$1",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 48, column: 18 },
                            end: { line: 48, column: 21 },
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
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 49, column: 10 },
                      end: { line: 49, column: 10 },
                    },
                    value: "\n          ",
                    raw: "\n          ",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 49, column: 10 },
                    end: { line: 49, column: 19 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 49, column: 12 },
                      end: { line: 49, column: 18 },
                    },
                    name: "button",
                  },
                },
              },
            },
          ],
        }),
        '($0, $1) => {\n    const said = $0()("not yet");\n    return (<button onclick={() => $1()(() => said.set("ran"))}>\n            {said.get()}\n          </button>);\n}',
        '{"version":3,"file":"on-mount.test.jsx","sourceRoot":"","sources":["on-mount.test.tsx"],"names":[],"mappings":"AA2CS;IACD,MAAM,IAAI,GAAG,IAAM,CAAC,SAAS,CAAC,CAAC;IAC/B,OAAO,CACL,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,IAAQ,CAAC,GAAG,EAAE,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CACrD;YAAA,CAAC,IAAI,CAAC,GAAG,EAAE,CACb;UAAA,EAAE,MAAM,CAAC,CACV,CAAC;AACJ,CAAC,CAAA"}',
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    assert.equal(screen.getByRole("button").textContent, "ran");
  });
});
