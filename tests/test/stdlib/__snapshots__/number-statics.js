import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A namespace holding a value beside its functions: `Number.EPSILON` is read
// where `Number.isInteger` is called, and both are whole names the client
// answers rather than a member read off a `Number` there is no value for.
async function Checked() {
  return cs.create(
    { start: { line: 9, column: 9 }, end: { line: 37, column: 4 } },
    {
      version: "0.0.0",
      filePath: "stdlib/number-statics.test.tsx",
      fileHash: "1o8290c5hfi65",
      splices: {},
      captures: [],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 9, column: 12 }, end: { line: 37, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 10, column: 4 },
            end: { line: 10, column: 40 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 10, column: 10 },
                end: { line: 10, column: 39 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 10, column: 10 },
                  end: { line: 10, column: 18 },
                },
                name: "positive",
                bindingKey: "positive$1o8290c5hfi65$0",
              },
              init: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 10, column: 21 },
                  end: { line: 10, column: 39 },
                },
                operator: ">",
                left: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 10, column: 21 },
                    end: { line: 10, column: 35 },
                  },
                  object: {
                    type: "Identifier",
                    loc: {
                      start: { line: 10, column: 21 },
                      end: { line: 10, column: 27 },
                    },
                    name: "Number",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 10, column: 28 },
                      end: { line: 10, column: 35 },
                    },
                    name: "EPSILON",
                  },
                  computed: false,
                  optional: false,
                },
                right: {
                  type: "Literal",
                  loc: {
                    start: { line: 10, column: 38 },
                    end: { line: 10, column: 39 },
                  },
                  value: 0,
                },
              },
            },
          ],
        },
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 11, column: 4 },
            end: { line: 11, column: 45 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 11, column: 10 },
                end: { line: 11, column: 44 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 11, column: 10 },
                  end: { line: 11, column: 17 },
                },
                name: "largest",
                bindingKey: "largest$1o8290c5hfi65$1",
              },
              init: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 11, column: 20 },
                  end: { line: 11, column: 44 },
                },
                operator: ">",
                left: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 11, column: 20 },
                    end: { line: 11, column: 36 },
                  },
                  object: {
                    type: "Identifier",
                    loc: {
                      start: { line: 11, column: 20 },
                      end: { line: 11, column: 26 },
                    },
                    name: "Number",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 11, column: 27 },
                      end: { line: 11, column: 36 },
                    },
                    name: "MAX_VALUE",
                  },
                  computed: false,
                  optional: false,
                },
                right: {
                  type: "Literal",
                  loc: {
                    start: { line: 11, column: 39 },
                    end: { line: 11, column: 44 },
                  },
                  value: 1e308,
                },
              },
            },
          ],
        },
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 12, column: 4 },
            end: { line: 17, column: 57 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 12, column: 10 },
                end: { line: 17, column: 56 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 12, column: 10 },
                  end: { line: 12, column: 14 },
                },
                name: "safe",
                bindingKey: "safe$1o8290c5hfi65$2",
              },
              init: {
                type: "LogicalExpression",
                loc: {
                  start: { line: 13, column: 6 },
                  end: { line: 17, column: 56 },
                },
                operator: "&&",
                left: {
                  type: "LogicalExpression",
                  loc: {
                    start: { line: 13, column: 6 },
                    end: { line: 16, column: 29 },
                  },
                  operator: "&&",
                  left: {
                    type: "LogicalExpression",
                    loc: {
                      start: { line: 13, column: 6 },
                      end: { line: 15, column: 26 },
                    },
                    operator: "&&",
                    left: {
                      type: "LogicalExpression",
                      loc: {
                        start: { line: 13, column: 6 },
                        end: { line: 14, column: 51 },
                      },
                      operator: "&&",
                      left: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 13, column: 6 },
                          end: { line: 13, column: 50 },
                        },
                        operator: "===",
                        left: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 13, column: 6 },
                            end: { line: 13, column: 29 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 13, column: 6 },
                              end: { line: 13, column: 12 },
                            },
                            name: "Number",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 13, column: 13 },
                              end: { line: 13, column: 29 },
                            },
                            name: "MAX_SAFE_INTEGER",
                          },
                          computed: false,
                          optional: false,
                        },
                        right: {
                          type: "Literal",
                          loc: {
                            start: { line: 13, column: 34 },
                            end: { line: 13, column: 50 },
                          },
                          value: 9007199254740991,
                        },
                      },
                      right: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 14, column: 6 },
                          end: { line: 14, column: 51 },
                        },
                        operator: "===",
                        left: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 14, column: 6 },
                            end: { line: 14, column: 29 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 14, column: 6 },
                              end: { line: 14, column: 12 },
                            },
                            name: "Number",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 14, column: 13 },
                              end: { line: 14, column: 29 },
                            },
                            name: "MIN_SAFE_INTEGER",
                          },
                          computed: false,
                          optional: false,
                        },
                        right: {
                          type: "UnaryExpression",
                          loc: {
                            start: { line: 14, column: 34 },
                            end: { line: 14, column: 51 },
                          },
                          operator: "-",
                          prefix: true,
                          argument: {
                            type: "Literal",
                            loc: {
                              start: { line: 14, column: 35 },
                              end: { line: 14, column: 51 },
                            },
                            value: 9007199254740991,
                          },
                        },
                      },
                    },
                    right: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 15, column: 6 },
                        end: { line: 15, column: 26 },
                      },
                      operator: ">",
                      left: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 15, column: 6 },
                          end: { line: 15, column: 22 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 15, column: 6 },
                            end: { line: 15, column: 12 },
                          },
                          name: "Number",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 15, column: 13 },
                            end: { line: 15, column: 22 },
                          },
                          name: "MIN_VALUE",
                        },
                        computed: false,
                        optional: false,
                      },
                      right: {
                        type: "Literal",
                        loc: {
                          start: { line: 15, column: 25 },
                          end: { line: 15, column: 26 },
                        },
                        value: 0,
                      },
                    },
                  },
                  right: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 16, column: 6 },
                      end: { line: 16, column: 29 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 16, column: 6 },
                        end: { line: 16, column: 26 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 16, column: 6 },
                          end: { line: 16, column: 12 },
                        },
                        name: "Number",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 16, column: 13 },
                          end: { line: 16, column: 26 },
                        },
                        name: "isSafeInteger",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 16, column: 27 },
                          end: { line: 16, column: 28 },
                        },
                        value: 3,
                      },
                    ],
                    optional: false,
                  },
                },
                right: {
                  type: "UnaryExpression",
                  loc: {
                    start: { line: 17, column: 6 },
                    end: { line: 17, column: 56 },
                  },
                  operator: "!",
                  prefix: true,
                  argument: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 17, column: 7 },
                      end: { line: 17, column: 56 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 17, column: 7 },
                        end: { line: 17, column: 27 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 17, column: 7 },
                          end: { line: 17, column: 13 },
                        },
                        name: "Number",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 17, column: 14 },
                          end: { line: 17, column: 27 },
                        },
                        name: "isSafeInteger",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 17, column: 28 },
                          end: { line: 17, column: 55 },
                        },
                        operator: "+",
                        left: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 17, column: 28 },
                            end: { line: 17, column: 51 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 17, column: 28 },
                              end: { line: 17, column: 34 },
                            },
                            name: "Number",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 17, column: 35 },
                              end: { line: 17, column: 51 },
                            },
                            name: "MAX_SAFE_INTEGER",
                          },
                          computed: false,
                          optional: false,
                        },
                        right: {
                          type: "Literal",
                          loc: {
                            start: { line: 17, column: 54 },
                            end: { line: 17, column: 55 },
                          },
                          value: 1,
                        },
                      },
                    ],
                    optional: false,
                  },
                },
              },
            },
          ],
        },
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 18, column: 4 },
            end: { line: 18, column: 38 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 18, column: 10 },
                end: { line: 18, column: 37 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 18, column: 10 },
                  end: { line: 18, column: 15 },
                },
                name: "whole",
                bindingKey: "whole$1o8290c5hfi65$3",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 18, column: 18 },
                  end: { line: 18, column: 37 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 18, column: 18 },
                    end: { line: 18, column: 34 },
                  },
                  object: {
                    type: "Identifier",
                    loc: {
                      start: { line: 18, column: 18 },
                      end: { line: 18, column: 24 },
                    },
                    name: "Number",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 18, column: 25 },
                      end: { line: 18, column: 34 },
                    },
                    name: "isInteger",
                  },
                  computed: false,
                  optional: false,
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 18, column: 35 },
                      end: { line: 18, column: 36 },
                    },
                    value: 2,
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
            start: { line: 19, column: 4 },
            end: { line: 19, column: 45 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 19, column: 10 },
                end: { line: 19, column: 44 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 19, column: 10 },
                  end: { line: 19, column: 20 },
                },
                name: "fractional",
                bindingKey: "fractional$1o8290c5hfi65$4",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 19, column: 23 },
                  end: { line: 19, column: 44 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 19, column: 23 },
                    end: { line: 19, column: 39 },
                  },
                  object: {
                    type: "Identifier",
                    loc: {
                      start: { line: 19, column: 23 },
                      end: { line: 19, column: 29 },
                    },
                    name: "Number",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 19, column: 30 },
                      end: { line: 19, column: 39 },
                    },
                    name: "isInteger",
                  },
                  computed: false,
                  optional: false,
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 19, column: 40 },
                      end: { line: 19, column: 43 },
                    },
                    value: 2.5,
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
            start: { line: 21, column: 4 },
            end: { line: 21, column: 41 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 21, column: 10 },
                end: { line: 21, column: 40 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 21, column: 10 },
                  end: { line: 21, column: 17 },
                },
                name: "written",
                bindingKey: "written$1o8290c5hfi65$5",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 21, column: 20 },
                  end: { line: 21, column: 40 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 21, column: 20 },
                    end: { line: 21, column: 35 },
                  },
                  object: {
                    type: "Identifier",
                    loc: {
                      start: { line: 21, column: 20 },
                      end: { line: 21, column: 26 },
                    },
                    name: "Number",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 21, column: 27 },
                      end: { line: 21, column: 35 },
                    },
                    name: "isFinite",
                  },
                  computed: false,
                  optional: false,
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 21, column: 36 },
                      end: { line: 21, column: 39 },
                    },
                    value: "2",
                  },
                ],
                optional: false,
              },
            },
          ],
        },
        {
          type: "ReturnStatement",
          loc: { start: { line: 22, column: 4 }, end: { line: 36, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 23, column: 6 },
              end: { line: 35, column: 13 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 23, column: 6 },
                end: { line: 23, column: 12 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 23, column: 7 },
                  end: { line: 23, column: 11 },
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
                  start: { line: 24, column: 8 },
                  end: { line: 24, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXExpressionContainer",
                loc: {
                  start: { line: 24, column: 8 },
                  end: { line: 34, column: 15 },
                },
                expression: {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 24, column: 9 },
                    end: { line: 34, column: 14 },
                  },
                  operator: "+",
                  left: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 24, column: 9 },
                      end: { line: 33, column: 13 },
                    },
                    operator: "+",
                    left: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 24, column: 9 },
                        end: { line: 32, column: 17 },
                      },
                      operator: "+",
                      left: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 24, column: 9 },
                          end: { line: 31, column: 13 },
                        },
                        operator: "+",
                        left: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 24, column: 9 },
                            end: { line: 30, column: 18 },
                          },
                          operator: "+",
                          left: {
                            type: "BinaryExpression",
                            loc: {
                              start: { line: 24, column: 9 },
                              end: { line: 29, column: 13 },
                            },
                            operator: "+",
                            left: {
                              type: "BinaryExpression",
                              loc: {
                                start: { line: 24, column: 9 },
                                end: { line: 28, column: 17 },
                              },
                              operator: "+",
                              left: {
                                type: "BinaryExpression",
                                loc: {
                                  start: { line: 24, column: 9 },
                                  end: { line: 27, column: 13 },
                                },
                                operator: "+",
                                left: {
                                  type: "BinaryExpression",
                                  loc: {
                                    start: { line: 24, column: 9 },
                                    end: { line: 26, column: 20 },
                                  },
                                  operator: "+",
                                  left: {
                                    type: "BinaryExpression",
                                    loc: {
                                      start: { line: 24, column: 9 },
                                      end: { line: 25, column: 13 },
                                    },
                                    operator: "+",
                                    left: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 24, column: 9 },
                                        end: { line: 24, column: 14 },
                                      },
                                      name: "whole",
                                      bindingKey: "whole$1o8290c5hfi65$3",
                                    },
                                    right: {
                                      type: "Literal",
                                      loc: {
                                        start: { line: 25, column: 10 },
                                        end: { line: 25, column: 13 },
                                      },
                                      value: " ",
                                    },
                                  },
                                  right: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 26, column: 10 },
                                      end: { line: 26, column: 20 },
                                    },
                                    name: "fractional",
                                    bindingKey: "fractional$1o8290c5hfi65$4",
                                  },
                                },
                                right: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 27, column: 10 },
                                    end: { line: 27, column: 13 },
                                  },
                                  value: " ",
                                },
                              },
                              right: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 28, column: 10 },
                                  end: { line: 28, column: 17 },
                                },
                                name: "written",
                                bindingKey: "written$1o8290c5hfi65$5",
                              },
                            },
                            right: {
                              type: "Literal",
                              loc: {
                                start: { line: 29, column: 10 },
                                end: { line: 29, column: 13 },
                              },
                              value: " ",
                            },
                          },
                          right: {
                            type: "Identifier",
                            loc: {
                              start: { line: 30, column: 10 },
                              end: { line: 30, column: 18 },
                            },
                            name: "positive",
                            bindingKey: "positive$1o8290c5hfi65$0",
                          },
                        },
                        right: {
                          type: "Literal",
                          loc: {
                            start: { line: 31, column: 10 },
                            end: { line: 31, column: 13 },
                          },
                          value: " ",
                        },
                      },
                      right: {
                        type: "Identifier",
                        loc: {
                          start: { line: 32, column: 10 },
                          end: { line: 32, column: 17 },
                        },
                        name: "largest",
                        bindingKey: "largest$1o8290c5hfi65$1",
                      },
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 33, column: 10 },
                        end: { line: 33, column: 13 },
                      },
                      value: " ",
                    },
                  },
                  right: {
                    type: "Identifier",
                    loc: {
                      start: { line: 34, column: 10 },
                      end: { line: 34, column: 14 },
                    },
                    name: "safe",
                    bindingKey: "safe$1o8290c5hfi65$2",
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 35, column: 6 },
                  end: { line: 35, column: 6 },
                },
                value: "\n      ",
                raw: "\n      ",
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 35, column: 6 },
                end: { line: 35, column: 13 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 35, column: 8 },
                  end: { line: 35, column: 12 },
                },
                name: "span",
              },
            },
          },
        },
      ],
    }),
  );
}
it("Checked", async (t) => {
  await snapshotCase(t, "Checked", _jsx(Checked, {}));
});
