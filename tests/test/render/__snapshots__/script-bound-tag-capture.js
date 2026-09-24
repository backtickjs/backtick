import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A tag naming a function an enclosing script holds. The nested script captures
// it the way it captures any binding, and calls it as a component: once, with
// its props read on access.
const scriptBoundTagCapture = cs.create(
  { start: { line: 11, column: 30 }, end: { line: 33, column: 2 } },
  {
    version: "0.0.0",
    filePath: "render/script-bound-tag-capture.test.tsx",
    fileHash: "h5jruxcfnavr",
    splices: {
      $state: { value: state, params: [] },
      $0splice0: {
        value: cs.create(
          { start: { line: 17, column: 9 }, end: { line: 17, column: 38 } },
          {
            version: "0.0.0",
            filePath: "render/script-bound-tag-capture.test.tsx",
            fileHash: "h5jruxcfnavr",
            splices: {},
            captures: ["Badge$h5jruxcfnavr$1", "count$h5jruxcfnavr$0"],
          },
          () => ({
            type: "JSXElement",
            loc: {
              start: { line: 17, column: 12 },
              end: { line: 17, column: 37 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 17, column: 12 },
                end: { line: 17, column: 37 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 17, column: 13 },
                  end: { line: 17, column: 18 },
                },
                name: "Badge",
                key: "Badge$h5jruxcfnavr$1",
              },
              attributes: [
                {
                  type: "JSXAttribute",
                  loc: {
                    start: { line: 17, column: 19 },
                    end: { line: 17, column: 34 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 17, column: 19 },
                      end: { line: 17, column: 20 },
                    },
                    name: "n",
                  },
                  value: {
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 17, column: 21 },
                      end: { line: 17, column: 34 },
                    },
                    expression: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 17, column: 22 },
                        end: { line: 17, column: 33 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 17, column: 22 },
                          end: { line: 17, column: 31 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 17, column: 22 },
                            end: { line: 17, column: 27 },
                          },
                          name: "count",
                          key: "count$h5jruxcfnavr$0",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 17, column: 28 },
                            end: { line: 17, column: 31 },
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
          }),
        ),
        params: ["count$h5jruxcfnavr$0", "Badge$h5jruxcfnavr$1"],
      },
      $0splice1: {
        value: cs.create(
          { start: { line: 19, column: 10 }, end: { line: 22, column: 10 } },
          {
            version: "0.0.0",
            filePath: "render/script-bound-tag-capture.test.tsx",
            fileHash: "h5jruxcfnavr",
            splices: {
              $0splice0: {
                value: cs.create(
                  {
                    start: { line: 21, column: 19 },
                    end: { line: 21, column: 54 },
                  },
                  {
                    version: "0.0.0",
                    filePath: "render/script-bound-tag-capture.test.tsx",
                    fileHash: "h5jruxcfnavr",
                    splices: {},
                    captures: ["Badge$h5jruxcfnavr$1", "count$h5jruxcfnavr$0"],
                  },
                  () => ({
                    type: "JSXElement",
                    loc: {
                      start: { line: 21, column: 22 },
                      end: { line: 21, column: 53 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 21, column: 22 },
                        end: { line: 21, column: 53 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 21, column: 23 },
                          end: { line: 21, column: 28 },
                        },
                        name: "Badge",
                        key: "Badge$h5jruxcfnavr$1",
                      },
                      attributes: [
                        {
                          type: "JSXAttribute",
                          loc: {
                            start: { line: 21, column: 29 },
                            end: { line: 21, column: 50 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 21, column: 29 },
                              end: { line: 21, column: 30 },
                            },
                            name: "n",
                          },
                          value: {
                            type: "JSXExpressionContainer",
                            loc: {
                              start: { line: 21, column: 31 },
                              end: { line: 21, column: 50 },
                            },
                            expression: {
                              type: "BinaryExpression",
                              loc: {
                                start: { line: 21, column: 32 },
                                end: { line: 21, column: 49 },
                              },
                              operator: "+",
                              left: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 21, column: 32 },
                                  end: { line: 21, column: 43 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 21, column: 32 },
                                    end: { line: 21, column: 41 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 21, column: 32 },
                                      end: { line: 21, column: 37 },
                                    },
                                    name: "count",
                                    key: "count$h5jruxcfnavr$0",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 21, column: 38 },
                                      end: { line: 21, column: 41 },
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
                                  start: { line: 21, column: 46 },
                                  end: { line: 21, column: 49 },
                                },
                                value: 100,
                              },
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
                params: [],
              },
            },
            captures: ["Badge$h5jruxcfnavr$1", "count$h5jruxcfnavr$0"],
          },
          () => ({
            type: "BlockStatement",
            loc: {
              start: { line: 19, column: 13 },
              end: { line: 22, column: 9 },
            },
            body: [
              {
                type: "VariableDeclaration",
                loc: {
                  start: { line: 20, column: 10 },
                  end: { line: 20, column: 29 },
                },
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    loc: {
                      start: { line: 20, column: 16 },
                      end: { line: 20, column: 28 },
                    },
                    id: {
                      type: "Identifier",
                      loc: {
                        start: { line: 20, column: 16 },
                        end: { line: 20, column: 23 },
                      },
                      name: "skipped",
                      key: "skipped$h5jruxcfnavr$3",
                    },
                    init: {
                      type: "Literal",
                      loc: {
                        start: { line: 20, column: 26 },
                        end: { line: 20, column: 28 },
                      },
                      value: 10,
                    },
                  },
                ],
              },
              {
                type: "ReturnStatement",
                loc: {
                  start: { line: 21, column: 10 },
                  end: { line: 21, column: 56 },
                },
                argument: {
                  type: "Splice",
                  loc: {
                    start: { line: 21, column: 17 },
                    end: { line: 21, column: 55 },
                  },
                  key: "$0splice0",
                },
              },
            ],
          }),
        ),
        params: ["count$h5jruxcfnavr$0", "Badge$h5jruxcfnavr$1"],
      },
      $0splice2: {
        value: _jsx("section", {
          children: cs.create(
            { start: { line: 24, column: 20 }, end: { line: 24, column: 56 } },
            {
              version: "0.0.0",
              filePath: "render/script-bound-tag-capture.test.tsx",
              fileHash: "h5jruxcfnavr",
              splices: {},
              captures: ["Badge$h5jruxcfnavr$1", "count$h5jruxcfnavr$0"],
            },
            () => ({
              type: "JSXElement",
              loc: {
                start: { line: 24, column: 23 },
                end: { line: 24, column: 55 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 24, column: 23 },
                  end: { line: 24, column: 55 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 24, column: 24 },
                    end: { line: 24, column: 29 },
                  },
                  name: "Badge",
                  key: "Badge$h5jruxcfnavr$1",
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 24, column: 30 },
                      end: { line: 24, column: 52 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 24, column: 30 },
                        end: { line: 24, column: 31 },
                      },
                      name: "n",
                    },
                    value: {
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 24, column: 32 },
                        end: { line: 24, column: 52 },
                      },
                      expression: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 24, column: 33 },
                          end: { line: 24, column: 51 },
                        },
                        operator: "+",
                        left: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 24, column: 33 },
                            end: { line: 24, column: 44 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 24, column: 33 },
                              end: { line: 24, column: 42 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 24, column: 33 },
                                end: { line: 24, column: 38 },
                              },
                              name: "count",
                              key: "count$h5jruxcfnavr$0",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 24, column: 39 },
                                end: { line: 24, column: 42 },
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
                            start: { line: 24, column: 47 },
                            end: { line: 24, column: 51 },
                          },
                          value: 1000,
                        },
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
        }),
        params: ["count$h5jruxcfnavr$0", "Badge$h5jruxcfnavr$1"],
      },
      $0splice3: {
        value: cs.create(
          { start: { line: 26, column: 10 }, end: { line: 28, column: 15 } },
          {
            version: "0.0.0",
            filePath: "render/script-bound-tag-capture.test.tsx",
            fileHash: "h5jruxcfnavr",
            splices: { $For: { value: For, params: [] } },
            captures: ["Badge$h5jruxcfnavr$1", "count$h5jruxcfnavr$0"],
          },
          () => ({
            type: "JSXElement",
            loc: {
              start: { line: 26, column: 13 },
              end: { line: 28, column: 14 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 26, column: 13 },
                end: { line: 26, column: 32 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 26, column: 14 },
                  end: { line: 26, column: 17 },
                },
                name: "For",
              },
              attributes: [
                {
                  type: "JSXAttribute",
                  loc: {
                    start: { line: 26, column: 18 },
                    end: { line: 26, column: 31 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 26, column: 18 },
                      end: { line: 26, column: 22 },
                    },
                    name: "each",
                  },
                  value: {
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 26, column: 23 },
                      end: { line: 26, column: 31 },
                    },
                    expression: {
                      type: "ArrayExpression",
                      loc: {
                        start: { line: 26, column: 24 },
                        end: { line: 26, column: 30 },
                      },
                      elements: [
                        {
                          type: "Literal",
                          loc: {
                            start: { line: 26, column: 25 },
                            end: { line: 26, column: 26 },
                          },
                          value: 1,
                        },
                        {
                          type: "Literal",
                          loc: {
                            start: { line: 26, column: 28 },
                            end: { line: 26, column: 29 },
                          },
                          value: 2,
                        },
                      ],
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
                  start: { line: 27, column: 10 },
                  end: { line: 27, column: 10 },
                },
                value: "\n          ",
                raw: "\n          ",
              },
              {
                type: "JSXExpressionContainer",
                loc: {
                  start: { line: 27, column: 10 },
                  end: { line: 27, column: 56 },
                },
                expression: {
                  type: "ArrowFunctionExpression",
                  loc: {
                    start: { line: 27, column: 11 },
                    end: { line: 27, column: 55 },
                  },
                  params: [
                    {
                      type: "Identifier",
                      loc: {
                        start: { line: 27, column: 12 },
                        end: { line: 27, column: 13 },
                      },
                      name: "m",
                      key: "m$h5jruxcfnavr$4",
                    },
                  ],
                  body: {
                    type: "JSXElement",
                    loc: {
                      start: { line: 27, column: 26 },
                      end: { line: 27, column: 55 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 27, column: 26 },
                        end: { line: 27, column: 55 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 27, column: 27 },
                          end: { line: 27, column: 32 },
                        },
                        name: "Badge",
                        key: "Badge$h5jruxcfnavr$1",
                      },
                      attributes: [
                        {
                          type: "JSXAttribute",
                          loc: {
                            start: { line: 27, column: 33 },
                            end: { line: 27, column: 52 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 27, column: 33 },
                              end: { line: 27, column: 34 },
                            },
                            name: "n",
                          },
                          value: {
                            type: "JSXExpressionContainer",
                            loc: {
                              start: { line: 27, column: 35 },
                              end: { line: 27, column: 52 },
                            },
                            expression: {
                              type: "BinaryExpression",
                              loc: {
                                start: { line: 27, column: 36 },
                                end: { line: 27, column: 51 },
                              },
                              operator: "*",
                              left: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 27, column: 36 },
                                  end: { line: 27, column: 37 },
                                },
                                name: "m",
                                key: "m$h5jruxcfnavr$4",
                              },
                              right: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 27, column: 40 },
                                  end: { line: 27, column: 51 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 27, column: 40 },
                                    end: { line: 27, column: 49 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 27, column: 40 },
                                      end: { line: 27, column: 45 },
                                    },
                                    name: "count",
                                    key: "count$h5jruxcfnavr$0",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 27, column: 46 },
                                      end: { line: 27, column: 49 },
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
                        },
                      ],
                      selfClosing: true,
                    },
                    children: [],
                    closingElement: null,
                  },
                  expression: true,
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 28, column: 8 },
                  end: { line: 28, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 28, column: 8 },
                end: { line: 28, column: 14 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 28, column: 10 },
                  end: { line: 28, column: 13 },
                },
                name: "For",
              },
            },
          }),
        ),
        params: ["count$h5jruxcfnavr$0", "Badge$h5jruxcfnavr$1"],
      },
    },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 11, column: 33 }, end: { line: 33, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 12, column: 2 }, end: { line: 12, column: 26 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 12, column: 8 },
              end: { line: 12, column: 25 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 12, column: 8 },
                end: { line: 12, column: 13 },
              },
              name: "count",
              key: "count$h5jruxcfnavr$0",
            },
            init: {
              type: "CallExpression",
              loc: {
                start: { line: 12, column: 16 },
                end: { line: 12, column: 25 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 12, column: 16 },
                  end: { line: 12, column: 22 },
                },
                key: "$state",
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 12, column: 23 },
                    end: { line: 12, column: 24 },
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
        loc: { start: { line: 13, column: 2 }, end: { line: 13, column: 66 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 13, column: 8 },
              end: { line: 13, column: 65 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 13, column: 8 },
                end: { line: 13, column: 13 },
              },
              name: "Badge",
              key: "Badge$h5jruxcfnavr$1",
            },
            init: {
              type: "ArrowFunctionExpression",
              loc: {
                start: { line: 13, column: 16 },
                end: { line: 13, column: 65 },
              },
              params: [
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 17 },
                    end: { line: 13, column: 22 },
                  },
                  name: "props",
                  key: "props$h5jruxcfnavr$2",
                },
              ],
              body: {
                type: "JSXElement",
                loc: {
                  start: { line: 13, column: 42 },
                  end: { line: 13, column: 65 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 13, column: 42 },
                    end: { line: 13, column: 45 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 13, column: 43 },
                      end: { line: 13, column: 44 },
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
                      start: { line: 13, column: 45 },
                      end: { line: 13, column: 61 },
                    },
                    expression: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 13, column: 46 },
                        end: { line: 13, column: 60 },
                      },
                      operator: "+",
                      left: {
                        type: "Literal",
                        loc: {
                          start: { line: 13, column: 46 },
                          end: { line: 13, column: 50 },
                        },
                        value: "n ",
                      },
                      right: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 13, column: 53 },
                          end: { line: 13, column: 60 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 13, column: 53 },
                            end: { line: 13, column: 58 },
                          },
                          name: "props",
                          key: "props$h5jruxcfnavr$2",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 13, column: 59 },
                            end: { line: 13, column: 60 },
                          },
                          name: "n",
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
                    start: { line: 13, column: 61 },
                    end: { line: 13, column: 65 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 13, column: 63 },
                      end: { line: 13, column: 64 },
                    },
                    name: "b",
                  },
                },
              },
              expression: true,
            },
          },
        ],
      },
      {
        type: "ReturnStatement",
        loc: { start: { line: 15, column: 2 }, end: { line: 32, column: 4 } },
        argument: {
          type: "JSXElement",
          loc: {
            start: { line: 16, column: 4 },
            end: { line: 31, column: 10 },
          },
          openingElement: {
            type: "JSXOpeningElement",
            loc: {
              start: { line: 16, column: 4 },
              end: { line: 16, column: 9 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 16, column: 5 },
                end: { line: 16, column: 8 },
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
                start: { line: 17, column: 6 },
                end: { line: 17, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXExpressionContainer",
              loc: {
                start: { line: 17, column: 6 },
                end: { line: 17, column: 40 },
              },
              expression: {
                type: "Splice",
                loc: {
                  start: { line: 17, column: 7 },
                  end: { line: 17, column: 39 },
                },
                key: "$0splice0",
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 18, column: 6 },
                end: { line: 18, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXExpressionContainer",
              loc: {
                start: { line: 18, column: 6 },
                end: { line: 23, column: 7 },
              },
              expression: {
                type: "Splice",
                loc: {
                  start: { line: 19, column: 8 },
                  end: { line: 22, column: 11 },
                },
                key: "$0splice1",
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 24, column: 6 },
                end: { line: 24, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXExpressionContainer",
              loc: {
                start: { line: 24, column: 6 },
                end: { line: 24, column: 70 },
              },
              expression: {
                type: "Splice",
                loc: {
                  start: { line: 24, column: 7 },
                  end: { line: 24, column: 69 },
                },
                key: "$0splice2",
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 25, column: 6 },
                end: { line: 25, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXExpressionContainer",
              loc: {
                start: { line: 25, column: 6 },
                end: { line: 29, column: 7 },
              },
              expression: {
                type: "Splice",
                loc: {
                  start: { line: 26, column: 8 },
                  end: { line: 28, column: 16 },
                },
                key: "$0splice3",
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 30, column: 6 },
                end: { line: 30, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXElement",
              loc: {
                start: { line: 30, column: 6 },
                end: { line: 30, column: 70 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 30, column: 6 },
                  end: { line: 30, column: 57 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 30, column: 7 },
                    end: { line: 30, column: 13 },
                  },
                  name: "button",
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 30, column: 14 },
                      end: { line: 30, column: 56 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 30, column: 14 },
                        end: { line: 30, column: 21 },
                      },
                      name: "onclick",
                    },
                    value: {
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 30, column: 22 },
                        end: { line: 30, column: 56 },
                      },
                      expression: {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 30, column: 23 },
                          end: { line: 30, column: 55 },
                        },
                        params: [],
                        body: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 30, column: 29 },
                            end: { line: 30, column: 55 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 30, column: 29 },
                              end: { line: 30, column: 38 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 30, column: 29 },
                                end: { line: 30, column: 34 },
                              },
                              name: "count",
                              key: "count$h5jruxcfnavr$0",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 30, column: 35 },
                                end: { line: 30, column: 38 },
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
                                start: { line: 30, column: 39 },
                                end: { line: 30, column: 54 },
                              },
                              operator: "+",
                              left: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 30, column: 39 },
                                  end: { line: 30, column: 50 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 30, column: 39 },
                                    end: { line: 30, column: 48 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 30, column: 39 },
                                      end: { line: 30, column: 44 },
                                    },
                                    name: "count",
                                    key: "count$h5jruxcfnavr$0",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 30, column: 45 },
                                      end: { line: 30, column: 48 },
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
                                  start: { line: 30, column: 53 },
                                  end: { line: 30, column: 54 },
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
                    start: { line: 30, column: 57 },
                    end: { line: 30, column: 61 },
                  },
                  value: "more",
                  raw: "more",
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 30, column: 61 },
                  end: { line: 30, column: 70 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 30, column: 63 },
                    end: { line: 30, column: 69 },
                  },
                  name: "button",
                },
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 31, column: 4 },
                end: { line: 31, column: 4 },
              },
              value: "\n    ",
              raw: "\n    ",
            },
          ],
          closingElement: {
            type: "JSXClosingElement",
            loc: {
              start: { line: 31, column: 4 },
              end: { line: 31, column: 10 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 31, column: 6 },
                end: { line: 31, column: 9 },
              },
              name: "div",
            },
          },
        },
      },
    ],
  }),
);
it("scriptBoundTagCapture", async (t) => {
  await snapshotCase(t, "scriptBoundTagCapture", scriptBoundTagCapture);
});
describe("a tag naming a function the script holds", () => {
  it("calls one an enclosing script holds, however the call is nested", async () => {
    const { container } = await render(scriptBoundTagCapture);
    const badges = () => [...container.querySelectorAll("b")];
    const before = badges();
    const texts = () => badges().map((b) => b.textContent);
    assert.deepEqual(texts(), ["n 0", "n 100", "n 1000", "n 0", "n 0"]);
    await userEvent.click(screen.getByRole("button", { name: "more" }));
    assert.deepEqual(texts(), ["n 1", "n 101", "n 1001", "n 1", "n 2"]);
    assert.deepEqual(badges(), before, "the same <b>s");
  });
});
