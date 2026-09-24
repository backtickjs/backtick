import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { computed, cs, onCleanup, onMount, state } from "@backtickjs/core";
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
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
describe("onCleanup", () => {
  it("runs when the drawing is removed", async () => {
    const { unmount } = await render(
      cs.create(
        { start: { line: 27, column: 6 }, end: { line: 30, column: 8 } },
        {
          filePath: "render/on-cleanup.test.tsx",
          fileHash: "24mnkvlbr5ln5",
          splices: {
            $onCleanup: { value: onCleanup, params: [] },
            $window: { value: window, params: [] },
          },
          captures: [],
        },
        () => ({
          type: "BlockStatement",
          loc: { start: { line: 27, column: 9 }, end: { line: 30, column: 7 } },
          body: [
            {
              type: "ExpressionStatement",
              loc: {
                start: { line: 28, column: 8 },
                end: { line: 28, column: 48 },
              },
              expression: {
                type: "CallExpression",
                loc: {
                  start: { line: 28, column: 8 },
                  end: { line: 28, column: 47 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 28, column: 8 },
                    end: { line: 28, column: 18 },
                  },
                  key: "$onCleanup",
                },
                arguments: [
                  {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 28, column: 19 },
                      end: { line: 28, column: 46 },
                    },
                    params: [],
                    body: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 28, column: 25 },
                        end: { line: 28, column: 46 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 28, column: 25 },
                          end: { line: 28, column: 44 },
                        },
                        object: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 28, column: 25 },
                            end: { line: 28, column: 40 },
                          },
                          object: {
                            type: "Splice",
                            loc: {
                              start: { line: 28, column: 25 },
                              end: { line: 28, column: 32 },
                            },
                            key: "$window",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 28, column: 33 },
                              end: { line: 28, column: 40 },
                            },
                            name: "console",
                          },
                          computed: false,
                          optional: false,
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 28, column: 41 },
                            end: { line: 28, column: 44 },
                          },
                          name: "log",
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
            },
            {
              type: "ReturnStatement",
              loc: {
                start: { line: 29, column: 8 },
                end: { line: 29, column: 28 },
              },
              argument: {
                type: "JSXElement",
                loc: {
                  start: { line: 29, column: 15 },
                  end: { line: 29, column: 27 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 29, column: 15 },
                    end: { line: 29, column: 18 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 29, column: 16 },
                      end: { line: 29, column: 17 },
                    },
                    name: "p",
                  },
                  attributes: [],
                  selfClosing: false,
                },
                children: [
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 29, column: 18 },
                      end: { line: 29, column: 23 },
                    },
                    value: "drawn",
                    raw: "drawn",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 29, column: 23 },
                    end: { line: 29, column: 27 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 29, column: 25 },
                      end: { line: 29, column: 26 },
                    },
                    name: "p",
                  },
                },
              },
            },
          ],
        }),
        "($0, $1) => {\n    $0()(() => $1().console.log());\n    return <p>drawn</p>;\n}",
        '{"version":3,"file":"on-cleanup.test.jsx","sourceRoot":"","sources":["on-cleanup.test.tsx"],"names":[],"mappings":"AA0BS;IACD,IAAU,CAAC,GAAG,EAAE,CAAC,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC,CAAC;IACxC,OAAO,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,CAAC,CAAC;AACtB,CAAC,CAAA"}',
      ),
    );
    assert.equal(runs, 0);
    unmount();
    assert.equal(runs, 1);
  });
  it("runs before a computed calculates again", async () => {
    await render(
      cs.create(
        { start: { line: 39, column: 6 }, end: { line: 48, column: 8 } },
        {
          filePath: "render/on-cleanup.test.tsx",
          fileHash: "24mnkvlbr5ln5",
          splices: {
            $state: { value: state, params: [] },
            $computed: { value: computed, params: [] },
            $onCleanup: { value: onCleanup, params: [] },
            $window: { value: window, params: [] },
          },
          captures: [],
        },
        () => ({
          type: "BlockStatement",
          loc: { start: { line: 39, column: 9 }, end: { line: 48, column: 7 } },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 40, column: 8 },
                end: { line: 40, column: 28 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 40, column: 14 },
                    end: { line: 40, column: 27 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 40, column: 14 },
                      end: { line: 40, column: 15 },
                    },
                    name: "n",
                    key: "n$24mnkvlbr5ln5$0",
                  },
                  init: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 40, column: 18 },
                      end: { line: 40, column: 27 },
                    },
                    callee: {
                      type: "Splice",
                      loc: {
                        start: { line: 40, column: 18 },
                        end: { line: 40, column: 24 },
                      },
                      key: "$state",
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 40, column: 25 },
                          end: { line: 40, column: 26 },
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
                start: { line: 41, column: 8 },
                end: { line: 44, column: 11 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 41, column: 14 },
                    end: { line: 44, column: 10 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 41, column: 14 },
                      end: { line: 41, column: 21 },
                    },
                    name: "doubled",
                    key: "doubled$24mnkvlbr5ln5$1",
                  },
                  init: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 41, column: 24 },
                      end: { line: 44, column: 10 },
                    },
                    callee: {
                      type: "Splice",
                      loc: {
                        start: { line: 41, column: 24 },
                        end: { line: 41, column: 33 },
                      },
                      key: "$computed",
                    },
                    arguments: [
                      {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 41, column: 34 },
                          end: { line: 44, column: 9 },
                        },
                        params: [],
                        body: {
                          type: "BlockStatement",
                          loc: {
                            start: { line: 41, column: 40 },
                            end: { line: 44, column: 9 },
                          },
                          body: [
                            {
                              type: "ExpressionStatement",
                              loc: {
                                start: { line: 42, column: 10 },
                                end: { line: 42, column: 50 },
                              },
                              expression: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 42, column: 10 },
                                  end: { line: 42, column: 49 },
                                },
                                callee: {
                                  type: "Splice",
                                  loc: {
                                    start: { line: 42, column: 10 },
                                    end: { line: 42, column: 20 },
                                  },
                                  key: "$onCleanup",
                                },
                                arguments: [
                                  {
                                    type: "ArrowFunctionExpression",
                                    loc: {
                                      start: { line: 42, column: 21 },
                                      end: { line: 42, column: 48 },
                                    },
                                    params: [],
                                    body: {
                                      type: "CallExpression",
                                      loc: {
                                        start: { line: 42, column: 27 },
                                        end: { line: 42, column: 48 },
                                      },
                                      callee: {
                                        type: "MemberExpression",
                                        loc: {
                                          start: { line: 42, column: 27 },
                                          end: { line: 42, column: 46 },
                                        },
                                        object: {
                                          type: "MemberExpression",
                                          loc: {
                                            start: { line: 42, column: 27 },
                                            end: { line: 42, column: 42 },
                                          },
                                          object: {
                                            type: "Splice",
                                            loc: {
                                              start: { line: 42, column: 27 },
                                              end: { line: 42, column: 34 },
                                            },
                                            key: "$window",
                                          },
                                          property: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 42, column: 35 },
                                              end: { line: 42, column: 42 },
                                            },
                                            name: "console",
                                          },
                                          computed: false,
                                          optional: false,
                                        },
                                        property: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 42, column: 43 },
                                            end: { line: 42, column: 46 },
                                          },
                                          name: "log",
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
                            },
                            {
                              type: "ReturnStatement",
                              loc: {
                                start: { line: 43, column: 10 },
                                end: { line: 43, column: 29 },
                              },
                              argument: {
                                type: "BinaryExpression",
                                loc: {
                                  start: { line: 43, column: 17 },
                                  end: { line: 43, column: 28 },
                                },
                                operator: "*",
                                left: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 43, column: 17 },
                                    end: { line: 43, column: 24 },
                                  },
                                  callee: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 43, column: 17 },
                                      end: { line: 43, column: 22 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 43, column: 17 },
                                        end: { line: 43, column: 18 },
                                      },
                                      name: "n",
                                      key: "n$24mnkvlbr5ln5$0",
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 43, column: 19 },
                                        end: { line: 43, column: 22 },
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
                                    start: { line: 43, column: 27 },
                                    end: { line: 43, column: 28 },
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
                start: { line: 45, column: 8 },
                end: { line: 47, column: 10 },
              },
              argument: {
                type: "JSXElement",
                loc: {
                  start: { line: 46, column: 10 },
                  end: { line: 46, column: 77 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 46, column: 10 },
                    end: { line: 46, column: 53 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 46, column: 11 },
                      end: { line: 46, column: 17 },
                    },
                    name: "button",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 46, column: 18 },
                        end: { line: 46, column: 52 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 46, column: 18 },
                          end: { line: 46, column: 25 },
                        },
                        name: "onclick",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 46, column: 26 },
                          end: { line: 46, column: 52 },
                        },
                        expression: {
                          type: "ArrowFunctionExpression",
                          loc: {
                            start: { line: 46, column: 27 },
                            end: { line: 46, column: 51 },
                          },
                          params: [],
                          body: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 46, column: 33 },
                              end: { line: 46, column: 51 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 46, column: 33 },
                                end: { line: 46, column: 38 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 46, column: 33 },
                                  end: { line: 46, column: 34 },
                                },
                                name: "n",
                                key: "n$24mnkvlbr5ln5$0",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 46, column: 35 },
                                  end: { line: 46, column: 38 },
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
                                  start: { line: 46, column: 39 },
                                  end: { line: 46, column: 50 },
                                },
                                operator: "+",
                                left: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 46, column: 39 },
                                    end: { line: 46, column: 46 },
                                  },
                                  callee: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 46, column: 39 },
                                      end: { line: 46, column: 44 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 46, column: 39 },
                                        end: { line: 46, column: 40 },
                                      },
                                      name: "n",
                                      key: "n$24mnkvlbr5ln5$0",
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 46, column: 41 },
                                        end: { line: 46, column: 44 },
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
                                    start: { line: 46, column: 49 },
                                    end: { line: 46, column: 50 },
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
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 46, column: 53 },
                      end: { line: 46, column: 68 },
                    },
                    expression: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 46, column: 54 },
                        end: { line: 46, column: 67 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 46, column: 54 },
                          end: { line: 46, column: 65 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 46, column: 54 },
                            end: { line: 46, column: 61 },
                          },
                          name: "doubled",
                          key: "doubled$24mnkvlbr5ln5$1",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 46, column: 62 },
                            end: { line: 46, column: 65 },
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
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 46, column: 68 },
                    end: { line: 46, column: 77 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 46, column: 70 },
                      end: { line: 46, column: 76 },
                    },
                    name: "button",
                  },
                },
              },
            },
          ],
        }),
        "($0, $1, $2, $3) => {\n    const n = $0()(1);\n    const doubled = $1()(() => {\n        $2()(() => $3().console.log());\n        return n.get() * 2;\n    });\n    return (<button onclick={() => n.set(n.get() + 1)}>{doubled.get()}</button>);\n}",
        '{"version":3,"file":"on-cleanup.test.jsx","sourceRoot":"","sources":["on-cleanup.test.tsx"],"names":[],"mappings":"AAsCS;IACD,MAAM,CAAC,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IACpB,MAAM,OAAO,GAAG,IAAS,CAAC,GAAG,EAAE;QAC7B,IAAU,CAAC,GAAG,EAAE,CAAC,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC,CAAC;QACxC,OAAO,CAAC,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC;IACrB,CAAC,CAAC,CAAC;IACH,OAAO,CACL,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC,EAAE,MAAM,CAAC,CACpE,CAAC;AACJ,CAAC,CAAA"}',
      ),
    );
    assert.equal(runs, 0);
    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 1);
    assert.equal(screen.getByRole("button").textContent, "4");
  });
  it("stops what onMount started", async (t) => {
    // Every interval the script starts is cleared once the test ends, so a
    // cleanup that never ran fails the test rather than hanging the run.
    const started = [];
    const setInterval = globalThis.window.setInterval;
    t.mock.method(globalThis.window, "setInterval", (handler, timeout) => {
      const id = setInterval(handler, timeout);
      started.push(id);
      return id;
    });
    t.after(() => started.forEach((id) => globalThis.window.clearInterval(id)));
    const { unmount } = await render(
      cs.create(
        { start: { line: 73, column: 6 }, end: { line: 80, column: 8 } },
        {
          filePath: "render/on-cleanup.test.tsx",
          fileHash: "24mnkvlbr5ln5",
          splices: {
            $state: { value: state, params: [] },
            $onMount: { value: onMount, params: [] },
            $window: { value: window, params: [] },
            $onCleanup: { value: onCleanup, params: [] },
          },
          captures: [],
        },
        () => ({
          type: "BlockStatement",
          loc: { start: { line: 73, column: 9 }, end: { line: 80, column: 7 } },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 74, column: 8 },
                end: { line: 74, column: 32 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 74, column: 14 },
                    end: { line: 74, column: 31 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 74, column: 14 },
                      end: { line: 74, column: 19 },
                    },
                    name: "timer",
                    key: "timer$24mnkvlbr5ln5$2",
                  },
                  init: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 74, column: 22 },
                      end: { line: 74, column: 31 },
                    },
                    callee: {
                      type: "Splice",
                      loc: {
                        start: { line: 74, column: 22 },
                        end: { line: 74, column: 28 },
                      },
                      key: "$state",
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 74, column: 29 },
                          end: { line: 74, column: 30 },
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
                start: { line: 75, column: 8 },
                end: { line: 77, column: 11 },
              },
              expression: {
                type: "CallExpression",
                loc: {
                  start: { line: 75, column: 8 },
                  end: { line: 77, column: 10 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 75, column: 8 },
                    end: { line: 75, column: 16 },
                  },
                  key: "$onMount",
                },
                arguments: [
                  {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 75, column: 17 },
                      end: { line: 77, column: 9 },
                    },
                    params: [],
                    body: {
                      type: "BlockStatement",
                      loc: {
                        start: { line: 75, column: 23 },
                        end: { line: 77, column: 9 },
                      },
                      body: [
                        {
                          type: "ExpressionStatement",
                          loc: {
                            start: { line: 76, column: 10 },
                            end: { line: 76, column: 73 },
                          },
                          expression: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 76, column: 10 },
                              end: { line: 76, column: 72 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 76, column: 10 },
                                end: { line: 76, column: 19 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 76, column: 10 },
                                  end: { line: 76, column: 15 },
                                },
                                name: "timer",
                                key: "timer$24mnkvlbr5ln5$2",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 76, column: 16 },
                                  end: { line: 76, column: 19 },
                                },
                                name: "set",
                              },
                              computed: false,
                              optional: false,
                            },
                            arguments: [
                              {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 76, column: 20 },
                                  end: { line: 76, column: 71 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 76, column: 20 },
                                    end: { line: 76, column: 39 },
                                  },
                                  object: {
                                    type: "Splice",
                                    loc: {
                                      start: { line: 76, column: 20 },
                                      end: { line: 76, column: 27 },
                                    },
                                    key: "$window",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 76, column: 28 },
                                      end: { line: 76, column: 39 },
                                    },
                                    name: "setInterval",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                                arguments: [
                                  {
                                    type: "ArrowFunctionExpression",
                                    loc: {
                                      start: { line: 76, column: 40 },
                                      end: { line: 76, column: 67 },
                                    },
                                    params: [],
                                    body: {
                                      type: "CallExpression",
                                      loc: {
                                        start: { line: 76, column: 46 },
                                        end: { line: 76, column: 67 },
                                      },
                                      callee: {
                                        type: "MemberExpression",
                                        loc: {
                                          start: { line: 76, column: 46 },
                                          end: { line: 76, column: 65 },
                                        },
                                        object: {
                                          type: "MemberExpression",
                                          loc: {
                                            start: { line: 76, column: 46 },
                                            end: { line: 76, column: 61 },
                                          },
                                          object: {
                                            type: "Splice",
                                            loc: {
                                              start: { line: 76, column: 46 },
                                              end: { line: 76, column: 53 },
                                            },
                                            key: "$window",
                                          },
                                          property: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 76, column: 54 },
                                              end: { line: 76, column: 61 },
                                            },
                                            name: "console",
                                          },
                                          computed: false,
                                          optional: false,
                                        },
                                        property: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 76, column: 62 },
                                            end: { line: 76, column: 65 },
                                          },
                                          name: "log",
                                        },
                                        computed: false,
                                        optional: false,
                                      },
                                      arguments: [],
                                      optional: false,
                                    },
                                    expression: true,
                                  },
                                  {
                                    type: "Literal",
                                    loc: {
                                      start: { line: 76, column: 69 },
                                      end: { line: 76, column: 70 },
                                    },
                                    value: 5,
                                  },
                                ],
                                optional: false,
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
              type: "ExpressionStatement",
              loc: {
                start: { line: 78, column: 8 },
                end: { line: 78, column: 61 },
              },
              expression: {
                type: "CallExpression",
                loc: {
                  start: { line: 78, column: 8 },
                  end: { line: 78, column: 60 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 78, column: 8 },
                    end: { line: 78, column: 18 },
                  },
                  key: "$onCleanup",
                },
                arguments: [
                  {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 78, column: 19 },
                      end: { line: 78, column: 59 },
                    },
                    params: [],
                    body: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 78, column: 25 },
                        end: { line: 78, column: 59 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 78, column: 25 },
                          end: { line: 78, column: 46 },
                        },
                        object: {
                          type: "Splice",
                          loc: {
                            start: { line: 78, column: 25 },
                            end: { line: 78, column: 32 },
                          },
                          key: "$window",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 78, column: 33 },
                            end: { line: 78, column: 46 },
                          },
                          name: "clearInterval",
                        },
                        computed: false,
                        optional: false,
                      },
                      arguments: [
                        {
                          type: "CallExpression",
                          loc: {
                            start: { line: 78, column: 47 },
                            end: { line: 78, column: 58 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 78, column: 47 },
                              end: { line: 78, column: 56 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 78, column: 47 },
                                end: { line: 78, column: 52 },
                              },
                              name: "timer",
                              key: "timer$24mnkvlbr5ln5$2",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 78, column: 53 },
                                end: { line: 78, column: 56 },
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
                ],
                optional: false,
              },
            },
            {
              type: "ReturnStatement",
              loc: {
                start: { line: 79, column: 8 },
                end: { line: 79, column: 30 },
              },
              argument: {
                type: "JSXElement",
                loc: {
                  start: { line: 79, column: 15 },
                  end: { line: 79, column: 29 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 79, column: 15 },
                    end: { line: 79, column: 18 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 79, column: 16 },
                      end: { line: 79, column: 17 },
                    },
                    name: "p",
                  },
                  attributes: [],
                  selfClosing: false,
                },
                children: [
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 79, column: 18 },
                      end: { line: 79, column: 25 },
                    },
                    value: "ticking",
                    raw: "ticking",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 79, column: 25 },
                    end: { line: 79, column: 29 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 79, column: 27 },
                      end: { line: 79, column: 28 },
                    },
                    name: "p",
                  },
                },
              },
            },
          ],
        }),
        "($0, $1, $2, $3) => {\n    const timer = $0()(0);\n    $1()(() => {\n        timer.set($2().setInterval(() => $2().console.log(), 5));\n    });\n    $3()(() => $2().clearInterval(timer.get()));\n    return <p>ticking</p>;\n}",
        '{"version":3,"file":"on-cleanup.test.jsx","sourceRoot":"","sources":["on-cleanup.test.tsx"],"names":[],"mappings":"AAwES;IACD,MAAM,KAAK,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IACxB,IAAQ,CAAC,GAAG,EAAE;QACZ,KAAK,CAAC,GAAG,CAAC,IAAO,CAAC,WAAW,CAAC,GAAG,EAAE,CAAC,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC;IACjE,CAAC,CAAC,CAAC;IACH,IAAU,CAAC,GAAG,EAAE,CAAC,IAAO,CAAC,aAAa,CAAC,KAAK,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC;IACrD,OAAO,CAAC,CAAC,CAAC,OAAO,EAAE,CAAC,CAAC,CAAC;AACxB,CAAC,CAAA"}',
      ),
    );
    await wait(40);
    assert.ok(runs > 0);
    unmount();
    const stopped = runs;
    await wait(40);
    assert.equal(runs, stopped);
  });
  it("never runs when called from a handler", async () => {
    const { unmount } = await render(
      cs.create(
        { start: { line: 93, column: 6 }, end: { line: 99, column: 8 } },
        {
          filePath: "render/on-cleanup.test.tsx",
          fileHash: "24mnkvlbr5ln5",
          splices: {
            $onCleanup: { value: onCleanup, params: [] },
            $window: { value: window, params: [] },
          },
          captures: [],
        },
        () => ({
          type: "BlockStatement",
          loc: { start: { line: 93, column: 9 }, end: { line: 99, column: 7 } },
          body: [
            {
              type: "ReturnStatement",
              loc: {
                start: { line: 94, column: 8 },
                end: { line: 98, column: 10 },
              },
              argument: {
                type: "JSXElement",
                loc: {
                  start: { line: 95, column: 10 },
                  end: { line: 97, column: 19 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 95, column: 10 },
                    end: { line: 95, column: 74 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 95, column: 11 },
                      end: { line: 95, column: 17 },
                    },
                    name: "button",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 95, column: 18 },
                        end: { line: 95, column: 73 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 95, column: 18 },
                          end: { line: 95, column: 25 },
                        },
                        name: "onclick",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 95, column: 26 },
                          end: { line: 95, column: 73 },
                        },
                        expression: {
                          type: "ArrowFunctionExpression",
                          loc: {
                            start: { line: 95, column: 27 },
                            end: { line: 95, column: 72 },
                          },
                          params: [],
                          body: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 95, column: 33 },
                              end: { line: 95, column: 72 },
                            },
                            callee: {
                              type: "Splice",
                              loc: {
                                start: { line: 95, column: 33 },
                                end: { line: 95, column: 43 },
                              },
                              key: "$onCleanup",
                            },
                            arguments: [
                              {
                                type: "ArrowFunctionExpression",
                                loc: {
                                  start: { line: 95, column: 44 },
                                  end: { line: 95, column: 71 },
                                },
                                params: [],
                                body: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 95, column: 50 },
                                    end: { line: 95, column: 71 },
                                  },
                                  callee: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 95, column: 50 },
                                      end: { line: 95, column: 69 },
                                    },
                                    object: {
                                      type: "MemberExpression",
                                      loc: {
                                        start: { line: 95, column: 50 },
                                        end: { line: 95, column: 65 },
                                      },
                                      object: {
                                        type: "Splice",
                                        loc: {
                                          start: { line: 95, column: 50 },
                                          end: { line: 95, column: 57 },
                                        },
                                        key: "$window",
                                      },
                                      property: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 95, column: 58 },
                                          end: { line: 95, column: 65 },
                                        },
                                        name: "console",
                                      },
                                      computed: false,
                                      optional: false,
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 95, column: 66 },
                                        end: { line: 95, column: 69 },
                                      },
                                      name: "log",
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
                  selfClosing: false,
                },
                children: [
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 96, column: 12 },
                      end: { line: 97, column: 10 },
                    },
                    value: "\n            press\n          ",
                    raw: "\n            press\n          ",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 97, column: 10 },
                    end: { line: 97, column: 19 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 97, column: 12 },
                      end: { line: 97, column: 18 },
                    },
                    name: "button",
                  },
                },
              },
            },
          ],
        }),
        "($0, $1) => {\n    return (<button onclick={() => $0()(() => $1().console.log())}>\n            press\n          </button>);\n}",
        '{"version":3,"file":"on-cleanup.test.jsx","sourceRoot":"","sources":["on-cleanup.test.tsx"],"names":[],"mappings":"AA4FS;IACD,OAAO,CACL,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,IAAU,CAAC,GAAG,EAAE,CAAC,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC,CAAC,CAC7D;;UACF,EAAE,MAAM,CAAC,CACV,CAAC;AACJ,CAAC,CAAA"}',
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    unmount();
    assert.equal(runs, 0);
  });
});
