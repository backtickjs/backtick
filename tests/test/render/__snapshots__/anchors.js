import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, For, state } from "@backtickjs/core";
import { createRuntime } from "@backtickjs/web-interpreter";
import { screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// Where a render draws, and what it may move.
//
// An anchor is one of the target's children: drawn in front of, and kept in
// front of. What the host holds on either side of it is the host's, so a target
// is never a render's to empty — the anchor is what says where the drawing
// ends.
//
// The web is what wants this — a bundle leaves a comment where it stood and
// draws in front of it, so a page's own markup keeps its order — but nothing
// here is the web's: an anchor is one of the host's own nodes, so this is the
// same claim on every target.
// A list at the root, with nothing wrapping it. What that makes the root is a
// stretch of the target rather than one node of it: emptying the list takes
// children away from the target itself, which is the one shape where what a
// render claims of its target is visible.
//
// The anchor tests below draw this into a target that is already holding
// something and empty it, which a claim to the whole target would take with it.
async function Rows() {
  return cs.create(
    { start: { line: 31, column: 9 }, end: { line: 42, column: 4 } },
    {
      version: "0.0.0",
      filePath: "render/anchors.test.tsx",
      fileHash: "1l1sblr1an3g5",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 31, column: 12 }, end: { line: 42, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 32, column: 4 },
            end: { line: 32, column: 44 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 32, column: 10 },
                end: { line: 32, column: 43 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 32, column: 10 },
                  end: { line: 32, column: 13 },
                },
                name: "ids",
                bindingKey: "ids$1l1sblr1an3g5$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 32, column: 16 },
                  end: { line: 32, column: 43 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 32, column: 16 },
                    end: { line: 32, column: 22 },
                  },
                  key: "$state",
                },
                arguments: [
                  {
                    type: "ArrayExpression",
                    loc: {
                      start: { line: 32, column: 33 },
                      end: { line: 32, column: 42 },
                    },
                    elements: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 32, column: 34 },
                          end: { line: 32, column: 35 },
                        },
                        value: 1,
                      },
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 32, column: 37 },
                          end: { line: 32, column: 38 },
                        },
                        value: 2,
                      },
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 32, column: 40 },
                          end: { line: 32, column: 41 },
                        },
                        value: 3,
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
          loc: { start: { line: 33, column: 4 }, end: { line: 35, column: 6 } },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 33, column: 10 },
                end: { line: 35, column: 5 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 33, column: 10 },
                  end: { line: 33, column: 15 },
                },
                name: "clear",
                bindingKey: "clear$1l1sblr1an3g5$1",
              },
              init: {
                type: "ArrowFunctionExpression",
                loc: {
                  start: { line: 33, column: 18 },
                  end: { line: 35, column: 5 },
                },
                params: [],
                body: {
                  type: "BlockStatement",
                  loc: {
                    start: { line: 33, column: 24 },
                    end: { line: 35, column: 5 },
                  },
                  body: [
                    {
                      type: "ExpressionStatement",
                      loc: {
                        start: { line: 34, column: 6 },
                        end: { line: 34, column: 18 },
                      },
                      expression: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 34, column: 6 },
                          end: { line: 34, column: 17 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 34, column: 6 },
                            end: { line: 34, column: 13 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 34, column: 6 },
                              end: { line: 34, column: 9 },
                            },
                            name: "ids",
                            bindingKey: "ids$1l1sblr1an3g5$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 34, column: 10 },
                              end: { line: 34, column: 13 },
                            },
                            name: "set",
                          },
                          computed: false,
                          optional: false,
                        },
                        arguments: [
                          {
                            type: "ArrayExpression",
                            loc: {
                              start: { line: 34, column: 14 },
                              end: { line: 34, column: 16 },
                            },
                            elements: [],
                          },
                        ],
                        optional: false,
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
          loc: { start: { line: 36, column: 4 }, end: { line: 41, column: 6 } },
          argument: {
            type: "JSXFragment",
            loc: {
              start: { line: 37, column: 6 },
              end: { line: 40, column: 9 },
            },
            openingFragment: {
              type: "JSXOpeningFragment",
              loc: {
                start: { line: 37, column: 6 },
                end: { line: 37, column: 8 },
              },
            },
            children: [
              {
                type: "JSXText",
                loc: {
                  start: { line: 38, column: 8 },
                  end: { line: 38, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 38, column: 8 },
                  end: { line: 38, column: 42 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 38, column: 8 },
                    end: { line: 38, column: 30 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 38, column: 9 },
                      end: { line: 38, column: 13 },
                    },
                    name: "span",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 38, column: 14 },
                        end: { line: 38, column: 29 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 38, column: 14 },
                          end: { line: 38, column: 21 },
                        },
                        name: "onclick",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 38, column: 22 },
                          end: { line: 38, column: 29 },
                        },
                        expression: {
                          type: "Identifier",
                          loc: {
                            start: { line: 38, column: 23 },
                            end: { line: 38, column: 28 },
                          },
                          name: "clear",
                          bindingKey: "clear$1l1sblr1an3g5$1",
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
                      start: { line: 38, column: 30 },
                      end: { line: 38, column: 35 },
                    },
                    value: "clear",
                    raw: "clear",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 38, column: 35 },
                    end: { line: 38, column: 42 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 38, column: 37 },
                      end: { line: 38, column: 41 },
                    },
                    name: "span",
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 39, column: 8 },
                  end: { line: 39, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 39, column: 8 },
                  end: { line: 39, column: 80 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 39, column: 8 },
                    end: { line: 39, column: 30 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 39, column: 9 },
                      end: { line: 39, column: 12 },
                    },
                    name: "For",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 39, column: 13 },
                        end: { line: 39, column: 29 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 39, column: 13 },
                          end: { line: 39, column: 17 },
                        },
                        name: "each",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 39, column: 18 },
                          end: { line: 39, column: 29 },
                        },
                        expression: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 39, column: 19 },
                            end: { line: 39, column: 28 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 39, column: 19 },
                              end: { line: 39, column: 26 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 39, column: 19 },
                                end: { line: 39, column: 22 },
                              },
                              name: "ids",
                              bindingKey: "ids$1l1sblr1an3g5$0",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 39, column: 23 },
                                end: { line: 39, column: 26 },
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
                  selfClosing: false,
                },
                children: [
                  {
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 39, column: 30 },
                      end: { line: 39, column: 74 },
                    },
                    expression: {
                      type: "ArrowFunctionExpression",
                      loc: {
                        start: { line: 39, column: 31 },
                        end: { line: 39, column: 73 },
                      },
                      params: [
                        {
                          type: "Identifier",
                          loc: {
                            start: { line: 39, column: 32 },
                            end: { line: 39, column: 34 },
                          },
                          name: "id",
                          bindingKey: "id$1l1sblr1an3g5$2",
                        },
                      ],
                      body: {
                        type: "JSXElement",
                        loc: {
                          start: { line: 39, column: 47 },
                          end: { line: 39, column: 73 },
                        },
                        openingElement: {
                          type: "JSXOpeningElement",
                          loc: {
                            start: { line: 39, column: 47 },
                            end: { line: 39, column: 53 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 39, column: 48 },
                              end: { line: 39, column: 52 },
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
                              start: { line: 39, column: 53 },
                              end: { line: 39, column: 66 },
                            },
                            expression: {
                              type: "BinaryExpression",
                              loc: {
                                start: { line: 39, column: 54 },
                                end: { line: 39, column: 65 },
                              },
                              operator: "+",
                              left: {
                                type: "Literal",
                                loc: {
                                  start: { line: 39, column: 54 },
                                  end: { line: 39, column: 60 },
                                },
                                value: "row ",
                              },
                              right: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 39, column: 63 },
                                  end: { line: 39, column: 65 },
                                },
                                name: "id",
                                bindingKey: "id$1l1sblr1an3g5$2",
                              },
                            },
                          },
                        ],
                        closingElement: {
                          type: "JSXClosingElement",
                          loc: {
                            start: { line: 39, column: 66 },
                            end: { line: 39, column: 73 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 39, column: 68 },
                              end: { line: 39, column: 72 },
                            },
                            name: "span",
                          },
                        },
                      },
                      expression: true,
                    },
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 39, column: 74 },
                    end: { line: 39, column: 80 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 39, column: 76 },
                      end: { line: 39, column: 79 },
                    },
                    name: "For",
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 40, column: 6 },
                  end: { line: 40, column: 6 },
                },
                value: "\n      ",
                raw: "\n      ",
              },
            ],
            closingFragment: {
              type: "JSXClosingFragment",
              loc: {
                start: { line: 40, column: 6 },
                end: { line: 40, column: 9 },
              },
            },
          },
        },
      ],
    }),
  );
}
it("Rows", async (t) => {
  await snapshotCase(t, "Rows", _jsx(Rows, {}));
});
// What a target holds, by tag — `#text` for the text nodes a drawing inserted,
// as a document names them.
function tags(parent) {
  return [...parent.childNodes].map((child) => child.nodeName.toLowerCase());
}
// What a drawing put in a target, as the nodes themselves.
function nodesIn(parent) {
  return [...parent.childNodes];
}
// The first drawing's button that empties its list.
const clearButton = () => screen.getAllByText("clear")[0];
// What each test drew and added to the page, taken down after it, last first.
const undo = [];
afterEach(() => {
  for (const step of undo.splice(0).reverse()) {
    step();
  }
});
// A target in the page holding the markup given, as a page's own would.
function target(html) {
  const main = document.createElement("main");
  main.innerHTML = html;
  document.body.append(main);
  undo.push(() => main.remove());
  return main;
}
// Draws in front of the anchor `selector` names. `render` takes no anchor —
// where a drawing goes among a page's own nodes is the runtime's business —
// so these ask the runtime directly.
async function drawAt(value, parent, selector) {
  const code = await bundler.run(value);
  const unmount = createRuntime({ window, global: globalThis }).render(
    () => (0, eval)(code),
    parent,
    parent.querySelector(selector),
  );
  undo.push(unmount);
}
describe("where a render draws", () => {
  it("draws in front of its anchor", async () => {
    const container = target(
      "<header></header><comment></comment><footer></footer>",
    );
    await drawAt(_jsx(Rows, {}), container, "comment");
    assert.deepEqual(tags(container), [
      "header",
      "span",
      "span",
      "span",
      "span",
      "comment",
      "footer",
    ]);
  });
  it("leaves alone what the host holds on either side", async () => {
    // A root that is a list, emptied. A render that claimed its target would
    // take every child the target has, the host's own included; what is drawn
    // is what goes.
    const container = target(
      "<header></header><comment></comment><footer></footer>",
    );
    await drawAt(_jsx(Rows, {}), container, "comment");
    const [before] = nodesIn(container);
    const after = nodesIn(container).at(-1);
    await userEvent.click(clearButton());
    assert.deepEqual(tags(container), ["header", "span", "comment", "footer"]);
    assert.equal(nodesIn(container)[0], before);
    assert.equal(nodesIn(container).at(-1), after);
  });
  it("never claims a target it was given nothing else of", async () => {
    // An anchor is always a node, so the path that empties a whole target is
    // one this cannot take — an empty target holding only the anchor included.
    const container = target("<comment></comment>");
    await drawAt(_jsx(Rows, {}), container, "comment");
    await userEvent.click(clearButton());
    assert.deepEqual(tags(container), ["span", "comment"]);
  });
  it("holds two drawings apart in one target", async () => {
    // One page, two drawings: each at its own anchor, and a write to one leaves
    // the other where it is.
    const container = target("<comment-1></comment-1><comment-2></comment-2>");
    await drawAt(_jsx(Rows, {}), container, "comment-1");
    await drawAt(_jsx(Rows, {}), container, "comment-2");
    assert.deepEqual(tags(container), [
      "span",
      "span",
      "span",
      "span",
      "comment-1",
      "span",
      "span",
      "span",
      "span",
      "comment-2",
    ]);
    // Everything from the first anchor onwards, as the nodes it is.
    const first = container.querySelector("comment-1");
    const tail = nodesIn(container).slice(nodesIn(container).indexOf(first));
    await userEvent.click(clearButton());
    // The first drawing shrank and the second is the nodes it was, in order.
    assert.deepEqual(tags(container), [
      "span",
      "comment-1",
      "span",
      "span",
      "span",
      "span",
      "comment-2",
    ]);
    assert.deepEqual(
      nodesIn(container).slice(nodesIn(container).indexOf(first)),
      tail,
    );
  });
});
