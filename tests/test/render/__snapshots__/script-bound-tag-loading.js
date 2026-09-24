import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A function the script holds that draws a bundle it is still waiting for.
//
// Read inside the drawing, so the condition follows the cell: when the bundle
// arrives the child runs again and calls `Badge`, and `count` stays a prop the
// badge reads on access rather than a value handed over once.
const loadedBadge = await bundler.run(
  cs.create(
    { start: { line: 16, column: 2 }, end: { line: 16, column: 67 } },
    { fileHash: "v8fe0e5k2jbe", splices: {}, captures: [] },
    () => ({
      type: "ArrowFunctionExpression",
      loc: { start: { line: 16, column: 5 }, end: { line: 16, column: 66 } },
      params: [
        {
          type: "Identifier",
          loc: {
            start: { line: 16, column: 6 },
            end: { line: 16, column: 11 },
          },
          name: "props",
          key: "props$v8fe0e5k2jbe$0",
        },
      ],
      body: {
        type: "JSXElement",
        loc: { start: { line: 16, column: 35 }, end: { line: 16, column: 66 } },
        openingElement: {
          type: "JSXOpeningElement",
          loc: {
            start: { line: 16, column: 35 },
            end: { line: 16, column: 38 },
          },
          name: {
            type: "JSXIdentifier",
            loc: {
              start: { line: 16, column: 36 },
              end: { line: 16, column: 37 },
            },
            name: "b",
          },
          attributes: [],
          selfClosing: false,
        },
        children: [
          {
            type: "JSXExpressionContainer",
            loc: {
              start: { line: 16, column: 38 },
              end: { line: 16, column: 62 },
            },
            expression: {
              type: "BinaryExpression",
              loc: {
                start: { line: 16, column: 39 },
                end: { line: 16, column: 61 },
              },
              operator: "+",
              left: {
                type: "Literal",
                loc: {
                  start: { line: 16, column: 39 },
                  end: { line: 16, column: 47 },
                },
                value: "count ",
              },
              right: {
                type: "MemberExpression",
                loc: {
                  start: { line: 16, column: 50 },
                  end: { line: 16, column: 61 },
                },
                object: {
                  type: "Identifier",
                  loc: {
                    start: { line: 16, column: 50 },
                    end: { line: 16, column: 55 },
                  },
                  name: "props",
                  key: "props$v8fe0e5k2jbe$0",
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 16, column: 56 },
                    end: { line: 16, column: 61 },
                  },
                  name: "count",
                },
                computed: false,
                optional: false,
              },
            },
          },
        ],
        closingElement: {
          type: "JSXClosingElement",
          loc: {
            start: { line: 16, column: 62 },
            end: { line: 16, column: 66 },
          },
          name: {
            type: "JSXIdentifier",
            loc: {
              start: { line: 16, column: 64 },
              end: { line: 16, column: 65 },
            },
            name: "b",
          },
        },
      },
      expression: true,
    }),
    '() => (props) => <b>{"count " + props.count}</b>',
    '{"version":3,"file":"script-bound-tag-loading.test.jsx","sourceRoot":"","sources":["script-bound-tag-loading.test.tsx"],"names":[],"mappings":"AAeK,MAAA,CAAC,KAAwB,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,QAAQ,GAAG,KAAK,CAAC,KAAK,CAAC,EAAE,CAAC,CAAC,CAAA"}',
  ),
);
const scriptBoundTagLoading = cs.create(
  { start: { line: 19, column: 30 }, end: { line: 36, column: 2 } },
  {
    fileHash: "v8fe0e5k2jbe",
    splices: {
      $state: { value: state, params: [] },
      $loadedBadge: { value: loadedBadge, params: [] },
    },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 19, column: 33 }, end: { line: 36, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 20, column: 2 }, end: { line: 20, column: 26 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 20, column: 8 },
              end: { line: 20, column: 25 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 20, column: 8 },
                end: { line: 20, column: 13 },
              },
              name: "count",
              key: "count$v8fe0e5k2jbe$1",
            },
            init: {
              type: "CallExpression",
              loc: {
                start: { line: 20, column: 16 },
                end: { line: 20, column: 25 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 20, column: 16 },
                  end: { line: 20, column: 22 },
                },
                key: "$state",
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 20, column: 23 },
                    end: { line: 20, column: 24 },
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
        type: "VariableDeclaration",
        loc: { start: { line: 21, column: 2 }, end: { line: 23, column: 18 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 21, column: 8 },
              end: { line: 23, column: 17 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 21, column: 8 },
                end: { line: 21, column: 13 },
              },
              name: "drawn",
              key: "drawn$v8fe0e5k2jbe$2",
            },
            init: {
              type: "CallExpression",
              loc: {
                start: { line: 21, column: 16 },
                end: { line: 23, column: 17 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 21, column: 16 },
                  end: { line: 21, column: 22 },
                },
                key: "$state",
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 23, column: 12 },
                    end: { line: 23, column: 16 },
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
        type: "VariableDeclaration",
        loc: { start: { line: 24, column: 2 }, end: { line: 27, column: 4 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 24, column: 8 },
              end: { line: 27, column: 3 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 24, column: 8 },
                end: { line: 24, column: 13 },
              },
              name: "Badge",
              key: "Badge$v8fe0e5k2jbe$3",
            },
            init: {
              type: "ArrowFunctionExpression",
              loc: {
                start: { line: 24, column: 16 },
                end: { line: 27, column: 3 },
              },
              params: [
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 24, column: 17 },
                    end: { line: 24, column: 22 },
                  },
                  name: "props",
                  key: "props$v8fe0e5k2jbe$4",
                },
              ],
              body: {
                type: "BlockStatement",
                loc: {
                  start: { line: 24, column: 46 },
                  end: { line: 27, column: 3 },
                },
                body: [
                  {
                    type: "VariableDeclaration",
                    loc: {
                      start: { line: 25, column: 4 },
                      end: { line: 25, column: 29 },
                    },
                    kind: "const",
                    declarations: [
                      {
                        type: "VariableDeclarator",
                        loc: {
                          start: { line: 25, column: 10 },
                          end: { line: 25, column: 28 },
                        },
                        id: {
                          type: "Identifier",
                          loc: {
                            start: { line: 25, column: 10 },
                            end: { line: 25, column: 14 },
                          },
                          name: "held",
                          key: "held$v8fe0e5k2jbe$5",
                        },
                        init: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 25, column: 17 },
                            end: { line: 25, column: 28 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 25, column: 17 },
                              end: { line: 25, column: 26 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 25, column: 17 },
                                end: { line: 25, column: 22 },
                              },
                              name: "drawn",
                              key: "drawn$v8fe0e5k2jbe$2",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 25, column: 23 },
                                end: { line: 25, column: 26 },
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
                  },
                  {
                    type: "ReturnStatement",
                    loc: {
                      start: { line: 26, column: 4 },
                      end: { line: 26, column: 52 },
                    },
                    argument: {
                      type: "ConditionalExpression",
                      loc: {
                        start: { line: 26, column: 11 },
                        end: { line: 26, column: 51 },
                      },
                      test: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 26, column: 11 },
                          end: { line: 26, column: 24 },
                        },
                        operator: "===",
                        left: {
                          type: "Identifier",
                          loc: {
                            start: { line: 26, column: 11 },
                            end: { line: 26, column: 15 },
                          },
                          name: "held",
                          key: "held$v8fe0e5k2jbe$5",
                        },
                        right: {
                          type: "Literal",
                          loc: {
                            start: { line: 26, column: 20 },
                            end: { line: 26, column: 24 },
                          },
                          value: null,
                        },
                      },
                      consequent: {
                        type: "Literal",
                        loc: {
                          start: { line: 26, column: 27 },
                          end: { line: 26, column: 31 },
                        },
                        value: null,
                      },
                      alternate: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 26, column: 34 },
                          end: { line: 26, column: 51 },
                        },
                        callee: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 26, column: 34 },
                            end: { line: 26, column: 44 },
                          },
                          callee: {
                            type: "Identifier",
                            loc: {
                              start: { line: 26, column: 34 },
                              end: { line: 26, column: 38 },
                            },
                            name: "eval",
                          },
                          arguments: [
                            {
                              type: "Identifier",
                              loc: {
                                start: { line: 26, column: 39 },
                                end: { line: 26, column: 43 },
                              },
                              name: "held",
                              key: "held$v8fe0e5k2jbe$5",
                            },
                          ],
                          optional: false,
                        },
                        arguments: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 26, column: 45 },
                              end: { line: 26, column: 50 },
                            },
                            name: "props",
                            key: "props$v8fe0e5k2jbe$4",
                          },
                        ],
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
        loc: { start: { line: 29, column: 2 }, end: { line: 35, column: 4 } },
        argument: {
          type: "JSXElement",
          loc: {
            start: { line: 30, column: 4 },
            end: { line: 34, column: 10 },
          },
          openingElement: {
            type: "JSXOpeningElement",
            loc: {
              start: { line: 30, column: 4 },
              end: { line: 30, column: 9 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 30, column: 5 },
                end: { line: 30, column: 8 },
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
                start: { line: 31, column: 6 },
                end: { line: 31, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXExpressionContainer",
              loc: {
                start: { line: 31, column: 6 },
                end: { line: 31, column: 77 },
              },
              expression: {
                type: "ConditionalExpression",
                loc: {
                  start: { line: 31, column: 7 },
                  end: { line: 31, column: 76 },
                },
                test: {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 31, column: 7 },
                    end: { line: 31, column: 27 },
                  },
                  operator: "===",
                  left: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 31, column: 7 },
                      end: { line: 31, column: 18 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 31, column: 7 },
                        end: { line: 31, column: 16 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 31, column: 7 },
                          end: { line: 31, column: 12 },
                        },
                        name: "drawn",
                        key: "drawn$v8fe0e5k2jbe$2",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 31, column: 13 },
                          end: { line: 31, column: 16 },
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
                      start: { line: 31, column: 23 },
                      end: { line: 31, column: 27 },
                    },
                    value: null,
                  },
                },
                consequent: {
                  type: "JSXElement",
                  loc: {
                    start: { line: 31, column: 30 },
                    end: { line: 31, column: 44 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 31, column: 30 },
                      end: { line: 31, column: 33 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 31, column: 31 },
                        end: { line: 31, column: 32 },
                      },
                      name: "i",
                    },
                    attributes: [],
                    selfClosing: false,
                  },
                  children: [
                    {
                      type: "JSXText",
                      loc: {
                        start: { line: 31, column: 33 },
                        end: { line: 31, column: 40 },
                      },
                      value: "loading",
                      raw: "loading",
                    },
                  ],
                  closingElement: {
                    type: "JSXClosingElement",
                    loc: {
                      start: { line: 31, column: 40 },
                      end: { line: 31, column: 44 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 31, column: 42 },
                        end: { line: 31, column: 43 },
                      },
                      name: "i",
                    },
                  },
                },
                alternate: {
                  type: "JSXElement",
                  loc: {
                    start: { line: 31, column: 47 },
                    end: { line: 31, column: 76 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 31, column: 47 },
                      end: { line: 31, column: 76 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 31, column: 48 },
                        end: { line: 31, column: 53 },
                      },
                      name: "Badge",
                      key: "Badge$v8fe0e5k2jbe$3",
                    },
                    attributes: [
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 31, column: 54 },
                          end: { line: 31, column: 73 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 31, column: 54 },
                            end: { line: 31, column: 59 },
                          },
                          name: "count",
                        },
                        value: {
                          type: "JSXExpressionContainer",
                          loc: {
                            start: { line: 31, column: 60 },
                            end: { line: 31, column: 73 },
                          },
                          expression: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 31, column: 61 },
                              end: { line: 31, column: 72 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 31, column: 61 },
                                end: { line: 31, column: 70 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 31, column: 61 },
                                  end: { line: 31, column: 66 },
                                },
                                name: "count",
                                key: "count$v8fe0e5k2jbe$1",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 31, column: 67 },
                                  end: { line: 31, column: 70 },
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
                    selfClosing: true,
                  },
                  children: [],
                  closingElement: null,
                },
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 32, column: 6 },
                end: { line: 32, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXElement",
              loc: {
                start: { line: 32, column: 6 },
                end: { line: 32, column: 67 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 32, column: 6 },
                  end: { line: 32, column: 54 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 32, column: 7 },
                    end: { line: 32, column: 13 },
                  },
                  name: "button",
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 32, column: 14 },
                      end: { line: 32, column: 53 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 32, column: 14 },
                        end: { line: 32, column: 21 },
                      },
                      name: "onclick",
                    },
                    value: {
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 32, column: 22 },
                        end: { line: 32, column: 53 },
                      },
                      expression: {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 32, column: 23 },
                          end: { line: 32, column: 52 },
                        },
                        params: [],
                        body: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 32, column: 29 },
                            end: { line: 32, column: 52 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 32, column: 29 },
                              end: { line: 32, column: 38 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 32, column: 29 },
                                end: { line: 32, column: 34 },
                              },
                              name: "drawn",
                              key: "drawn$v8fe0e5k2jbe$2",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 32, column: 35 },
                                end: { line: 32, column: 38 },
                              },
                              name: "set",
                            },
                            computed: false,
                            optional: false,
                          },
                          arguments: [
                            {
                              type: "Splice",
                              loc: {
                                start: { line: 32, column: 39 },
                                end: { line: 32, column: 51 },
                              },
                              key: "$loadedBadge",
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
                    start: { line: 32, column: 54 },
                    end: { line: 32, column: 58 },
                  },
                  value: "load",
                  raw: "load",
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 32, column: 58 },
                  end: { line: 32, column: 67 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 32, column: 60 },
                    end: { line: 32, column: 66 },
                  },
                  name: "button",
                },
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 33, column: 6 },
                end: { line: 33, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXElement",
              loc: {
                start: { line: 33, column: 6 },
                end: { line: 33, column: 70 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 33, column: 6 },
                  end: { line: 33, column: 57 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 33, column: 7 },
                    end: { line: 33, column: 13 },
                  },
                  name: "button",
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 33, column: 14 },
                      end: { line: 33, column: 56 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 33, column: 14 },
                        end: { line: 33, column: 21 },
                      },
                      name: "onclick",
                    },
                    value: {
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 33, column: 22 },
                        end: { line: 33, column: 56 },
                      },
                      expression: {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 33, column: 23 },
                          end: { line: 33, column: 55 },
                        },
                        params: [],
                        body: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 33, column: 29 },
                            end: { line: 33, column: 55 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 33, column: 29 },
                              end: { line: 33, column: 38 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 33, column: 29 },
                                end: { line: 33, column: 34 },
                              },
                              name: "count",
                              key: "count$v8fe0e5k2jbe$1",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 33, column: 35 },
                                end: { line: 33, column: 38 },
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
                                start: { line: 33, column: 39 },
                                end: { line: 33, column: 54 },
                              },
                              operator: "+",
                              left: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 33, column: 39 },
                                  end: { line: 33, column: 50 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 33, column: 39 },
                                    end: { line: 33, column: 48 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 33, column: 39 },
                                      end: { line: 33, column: 44 },
                                    },
                                    name: "count",
                                    key: "count$v8fe0e5k2jbe$1",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 33, column: 45 },
                                      end: { line: 33, column: 48 },
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
                                  start: { line: 33, column: 53 },
                                  end: { line: 33, column: 54 },
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
                    start: { line: 33, column: 57 },
                    end: { line: 33, column: 61 },
                  },
                  value: "more",
                  raw: "more",
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 33, column: 61 },
                  end: { line: 33, column: 70 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 33, column: 63 },
                    end: { line: 33, column: 69 },
                  },
                  name: "button",
                },
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 34, column: 4 },
                end: { line: 34, column: 4 },
              },
              value: "\n    ",
              raw: "\n    ",
            },
          ],
          closingElement: {
            type: "JSXClosingElement",
            loc: {
              start: { line: 34, column: 4 },
              end: { line: 34, column: 10 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 34, column: 6 },
                end: { line: 34, column: 9 },
              },
              name: "div",
            },
          },
        },
      },
    ],
  }),
  "($0, $1) => {\n    const count = $0()(0);\n    const drawn = $0()(null);\n    const Badge = (props) => {\n        const held = drawn.get();\n        return held === null ? null : eval(held)(props);\n    };\n    return (<div>\n      {drawn.get() === null ? <i>loading</i> : <Badge count={count.get()}/>}\n      <button onclick={() => drawn.set($1())}>load</button>\n      <button onclick={() => count.set(count.get() + 1)}>more</button>\n    </div>);\n}",
  '{"version":3,"file":"script-bound-tag-loading.test.jsx","sourceRoot":"","sources":["script-bound-tag-loading.test.tsx"],"names":[],"mappings":"AAkBiC;IAC/B,MAAM,KAAK,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IACxB,MAAM,KAAK,GAAG,IAAM,CAEV,IAAI,CAAC,CAAC;IAChB,MAAM,KAAK,GAAG,CAAC,KAAwB,EAAE,EAAE;QACzC,MAAM,IAAI,GAAG,KAAK,CAAC,GAAG,EAAE,CAAC;QACzB,OAAO,IAAI,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,KAAK,CAAC,CAAC;IAClD,CAAC,CAAC;IAEF,OAAO,CACL,CAAC,GAAG,CACF;MAAA,CAAC,KAAK,CAAC,GAAG,EAAE,KAAK,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,OAAO,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,GAAG,EAAE,CAAC,EAAG,CACtE;MAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,GAAG,CAAC,IAAY,CAAC,CAAC,CAAC,IAAI,EAAE,MAAM,CAC5D;MAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,GAAG,CAAC,KAAK,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,IAAI,EAAE,MAAM,CACjE;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC,CAAA"}',
);
it("scriptBoundTagLoading", async (t) => {
  await snapshotCase(t, "scriptBoundTagLoading", scriptBoundTagLoading);
});
describe("a tag naming a function the script holds", () => {
  it("draws one that arrives later, and keeps its prop live", async () => {
    await render(scriptBoundTagLoading);
    assert.equal(screen.getByText("loading").tagName.toLowerCase(), "i");
    await userEvent.click(screen.getByRole("button", { name: "load" }));
    const badge = screen.getByText("count 0");
    assert.equal(badge.tagName.toLowerCase(), "b");
    assert.equal(screen.queryByText("loading"), null);
    await userEvent.click(screen.getByRole("button", { name: "more" }));
    assert.equal(
      screen.getByText("count 1"),
      badge,
      "the same <b>, updated in place",
    );
  });
});
