import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/core/jsx-runtime";
import { cs, Image, Text, View } from "@backtickjs/core";
const orders = Array.from({ length: 5 }, (_, i) => ({
  id: `ord-${1000 + i}`,
  customer: {
    name: `Customer ${i}`,
    city: i % 2 === 0 ? "Montréal" : "Toronto",
  },
  items: [
    { sku: `SKU-${i}-A`, qty: (i % 3) + 1 },
    { sku: `SKU-${i}-B`, qty: 1 },
  ],
  total: 45.23 + i,
}));
// The dataset ships once and the list expands on the client: one card template
// with holes for each order's fields (and a nested item list), mapped at
// runtime. The bundle carries the data plus a single card, not five expanded
// copies. The root View stays static; only its children map on the client.
export default _jsx(View, {
  children: cs.create(
    [22, 6, 44, 7],
    {
      version: "0.0.0",
      filePath: "large-data.tsx",
      fileHash: "kpf5b5091dr1",
      kind: "value",
      splices: {
        $orders: orders,
        $0splice0: _jsxs(
          View,
          {
            children: [
              _jsx(Image, {
                source: {
                  uri: cs.create(
                    [28, 22, 28, 72],
                    {
                      version: "0.0.0",
                      filePath: "large-data.tsx",
                      fileHash: "kpf5b5091dr1",
                      kind: "value",
                      splices: {},
                      captures: ["order$kpf5b5091dr1$0"],
                      spliceParams: {},
                    },
                    () => ({
                      kind: "AstScriptBinaryExpression",
                      loc: [28, 25, 28, 71],
                      left: {
                        kind: "AstScriptBinaryExpression",
                        loc: [28, 25, 28, 62],
                        left: {
                          kind: "AstScriptStringLiteral",
                          loc: [28, 25, 28, 51],
                          text: "https://img.example.com/",
                        },
                        operatorToken: "+",
                        right: {
                          kind: "AstScriptPropertyAccessExpression",
                          loc: [28, 54, 28, 62],
                          expression: {
                            kind: "AstScriptIdentifier",
                            loc: [28, 54, 28, 59],
                            text: "order",
                            bindingKey: "order$kpf5b5091dr1$0",
                          },
                          questionDotToken: false,
                          name: "id",
                        },
                      },
                      operatorToken: "+",
                      right: {
                        kind: "AstScriptStringLiteral",
                        loc: [28, 65, 28, 71],
                        text: ".png",
                      },
                    }),
                  ),
                },
              }),
              _jsx(Text, {
                children: cs.create(
                  [31, 20, 31, 43],
                  {
                    version: "0.0.0",
                    filePath: "large-data.tsx",
                    fileHash: "kpf5b5091dr1",
                    kind: "value",
                    splices: {},
                    captures: ["order$kpf5b5091dr1$0"],
                    spliceParams: {},
                  },
                  () => ({
                    kind: "AstScriptPropertyAccessExpression",
                    loc: [31, 23, 31, 42],
                    expression: {
                      kind: "AstScriptPropertyAccessExpression",
                      loc: [31, 23, 31, 37],
                      expression: {
                        kind: "AstScriptIdentifier",
                        loc: [31, 23, 31, 28],
                        text: "order",
                        bindingKey: "order$kpf5b5091dr1$0",
                      },
                      questionDotToken: false,
                      name: "customer",
                    },
                    questionDotToken: false,
                    name: "name",
                  }),
                ),
              }),
              _jsx(Text, {
                children: cs.create(
                  [32, 20, 32, 43],
                  {
                    version: "0.0.0",
                    filePath: "large-data.tsx",
                    fileHash: "kpf5b5091dr1",
                    kind: "value",
                    splices: {},
                    captures: ["order$kpf5b5091dr1$0"],
                    spliceParams: {},
                  },
                  () => ({
                    kind: "AstScriptPropertyAccessExpression",
                    loc: [32, 23, 32, 42],
                    expression: {
                      kind: "AstScriptPropertyAccessExpression",
                      loc: [32, 23, 32, 37],
                      expression: {
                        kind: "AstScriptIdentifier",
                        loc: [32, 23, 32, 28],
                        text: "order",
                        bindingKey: "order$kpf5b5091dr1$0",
                      },
                      questionDotToken: false,
                      name: "customer",
                    },
                    questionDotToken: false,
                    name: "city",
                  }),
                ),
              }),
              cs.create(
                [33, 14, 40, 15],
                {
                  version: "0.0.0",
                  filePath: "large-data.tsx",
                  fileHash: "kpf5b5091dr1",
                  kind: "value",
                  splices: {
                    $0splice0: _jsx(
                      Text,
                      {
                        children: cs.create(
                          [37, 22, 37, 52],
                          {
                            version: "0.0.0",
                            filePath: "large-data.tsx",
                            fileHash: "kpf5b5091dr1",
                            kind: "value",
                            splices: {},
                            captures: ["item$kpf5b5091dr1$1"],
                            spliceParams: {},
                          },
                          () => ({
                            kind: "AstScriptBinaryExpression",
                            loc: [37, 25, 37, 51],
                            left: {
                              kind: "AstScriptBinaryExpression",
                              loc: [37, 25, 37, 40],
                              left: {
                                kind: "AstScriptPropertyAccessExpression",
                                loc: [37, 25, 37, 33],
                                expression: {
                                  kind: "AstScriptIdentifier",
                                  loc: [37, 25, 37, 29],
                                  text: "item",
                                  bindingKey: "item$kpf5b5091dr1$1",
                                },
                                questionDotToken: false,
                                name: "sku",
                              },
                              operatorToken: "+",
                              right: {
                                kind: "AstScriptStringLiteral",
                                loc: [37, 36, 37, 40],
                                text: " x",
                              },
                            },
                            operatorToken: "+",
                            right: {
                              kind: "AstScriptPropertyAccessExpression",
                              loc: [37, 43, 37, 51],
                              expression: {
                                kind: "AstScriptIdentifier",
                                loc: [37, 43, 37, 47],
                                text: "item",
                                bindingKey: "item$kpf5b5091dr1$1",
                              },
                              questionDotToken: false,
                              name: "qty",
                            },
                          }),
                        ),
                      },
                      cs.create(
                        [36, 30, 36, 42],
                        {
                          version: "0.0.0",
                          filePath: "large-data.tsx",
                          fileHash: "kpf5b5091dr1",
                          kind: "value",
                          splices: {},
                          captures: ["item$kpf5b5091dr1$1"],
                          spliceParams: {},
                        },
                        () => ({
                          kind: "AstScriptPropertyAccessExpression",
                          loc: [36, 33, 36, 41],
                          expression: {
                            kind: "AstScriptIdentifier",
                            loc: [36, 33, 36, 37],
                            text: "item",
                            bindingKey: "item$kpf5b5091dr1$1",
                          },
                          questionDotToken: false,
                          name: "sku",
                        }),
                      ),
                    ),
                  },
                  captures: ["order$kpf5b5091dr1$0"],
                  spliceParams: { $0splice0: ["item$kpf5b5091dr1$1"] },
                },
                () => ({
                  kind: "AstScriptCallExpression",
                  loc: [33, 17, 40, 14],
                  expression: {
                    kind: "AstScriptPropertyAccessExpression",
                    loc: [33, 17, 33, 32],
                    expression: {
                      kind: "AstScriptPropertyAccessExpression",
                      loc: [33, 17, 33, 28],
                      expression: {
                        kind: "AstScriptIdentifier",
                        loc: [33, 17, 33, 22],
                        text: "order",
                        bindingKey: "order$kpf5b5091dr1$0",
                      },
                      questionDotToken: false,
                      name: "items",
                    },
                    questionDotToken: false,
                    name: "map",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: "AstScriptArrowFunction",
                      loc: [34, 15, 39, 19],
                      parameters: [
                        {
                          kind: "AstScriptParameterDeclaration",
                          loc: [34, 16, 34, 20],
                          name: {
                            kind: "AstScriptIdentifier",
                            loc: [34, 16, 34, 20],
                            text: "item",
                            bindingKey: "item$kpf5b5091dr1$1",
                          },
                        },
                      ],
                      body: {
                        kind: "AstScriptSplice",
                        loc: [35, 17, 39, 19],
                        key: "$0splice0",
                      },
                    },
                  ],
                }),
              ),
              _jsx(Text, {
                children: cs.create(
                  [41, 20, 41, 41],
                  {
                    version: "0.0.0",
                    filePath: "large-data.tsx",
                    fileHash: "kpf5b5091dr1",
                    kind: "value",
                    splices: {},
                    captures: ["order$kpf5b5091dr1$0"],
                    spliceParams: {},
                  },
                  () => ({
                    kind: "AstScriptBinaryExpression",
                    loc: [41, 23, 41, 40],
                    left: {
                      kind: "AstScriptStringLiteral",
                      loc: [41, 23, 41, 26],
                      text: "$",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "AstScriptPropertyAccessExpression",
                      loc: [41, 29, 41, 40],
                      expression: {
                        kind: "AstScriptIdentifier",
                        loc: [41, 29, 41, 34],
                        text: "order",
                        bindingKey: "order$kpf5b5091dr1$0",
                      },
                      questionDotToken: false,
                      name: "total",
                    },
                  }),
                ),
              }),
            ],
          },
          cs.create(
            [25, 22, 25, 34],
            {
              version: "0.0.0",
              filePath: "large-data.tsx",
              fileHash: "kpf5b5091dr1",
              kind: "value",
              splices: {},
              captures: ["order$kpf5b5091dr1$0"],
              spliceParams: {},
            },
            () => ({
              kind: "AstScriptPropertyAccessExpression",
              loc: [25, 25, 25, 33],
              expression: {
                kind: "AstScriptIdentifier",
                loc: [25, 25, 25, 30],
                text: "order",
                bindingKey: "order$kpf5b5091dr1$0",
              },
              questionDotToken: false,
              name: "id",
            }),
          ),
        ),
      },
      captures: [],
      spliceParams: { $orders: [], $0splice0: ["order$kpf5b5091dr1$0"] },
    },
    () => ({
      kind: "AstScriptCallExpression",
      loc: [22, 9, 44, 6],
      expression: {
        kind: "AstScriptPropertyAccessExpression",
        loc: [22, 9, 22, 20],
        expression: {
          kind: "AstScriptSplice",
          loc: [22, 9, 22, 16],
          key: "$orders",
        },
        questionDotToken: false,
        name: "map",
      },
      questionDotToken: false,
      arguments: [
        {
          kind: "AstScriptArrowFunction",
          loc: [23, 7, 43, 11],
          parameters: [
            {
              kind: "AstScriptParameterDeclaration",
              loc: [23, 8, 23, 13],
              name: {
                kind: "AstScriptIdentifier",
                loc: [23, 8, 23, 13],
                text: "order",
                bindingKey: "order$kpf5b5091dr1$0",
              },
            },
          ],
          body: {
            kind: "AstScriptSplice",
            loc: [24, 9, 43, 11],
            key: "$0splice0",
          },
        },
      ],
    }),
  ),
});
