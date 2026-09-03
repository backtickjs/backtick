import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-schema/jsx-runtime";
import { cs, For } from "@backtickjs/core";
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
export default _jsx("div", {
  children: _jsx(For, {
    each: cs.create(
      [30, 16, 30, 27],
      {
        version: "0.0.0",
        filePath: "large-data.tsx",
        fileHash: "2yx6cd1u55xly",
        splices: { $orders: { value: orders, params: [] } },
        captures: [],
      },
      () => ({
        kind: "splice",
        loc: [30, 19, 30, 26],
        key: "$orders",
      }),
    ),
    children: cs.create(
      [31, 8, 46, 12],
      {
        version: "0.0.0",
        filePath: "large-data.tsx",
        fileHash: "2yx6cd1u55xly",
        splices: {
          $0splice0: {
            value: _jsxs("div", {
              children: [
                _jsx("img", {
                  src: cs.create(
                    [35, 20, 35, 70],
                    {
                      version: "0.0.0",
                      filePath: "large-data.tsx",
                      fileHash: "2yx6cd1u55xly",
                      splices: {},
                      captures: ["order$2yx6cd1u55xly$0"],
                    },
                    () => ({
                      kind: "binop",
                      loc: [35, 23, 35, 69],
                      left: {
                        kind: "binop",
                        loc: [35, 23, 35, 60],
                        left: {
                          kind: "string",
                          loc: [35, 23, 35, 49],
                          text: "https://img.example.com/",
                        },
                        operatorToken: "+",
                        right: {
                          kind: ".",
                          loc: [35, 52, 35, 60],
                          expression: {
                            kind: "id",
                            loc: [35, 52, 35, 57],
                            text: "order",
                            bindingKey: "order$2yx6cd1u55xly$0",
                          },
                          name: "id",
                        },
                      },
                      operatorToken: "+",
                      right: {
                        kind: "string",
                        loc: [35, 63, 35, 69],
                        text: ".png",
                      },
                    }),
                  ),
                  alt: "",
                }),
                _jsx("span", {
                  children: cs.create(
                    [38, 20, 38, 43],
                    {
                      version: "0.0.0",
                      filePath: "large-data.tsx",
                      fileHash: "2yx6cd1u55xly",
                      splices: {},
                      captures: ["order$2yx6cd1u55xly$0"],
                    },
                    () => ({
                      kind: ".",
                      loc: [38, 23, 38, 42],
                      expression: {
                        kind: ".",
                        loc: [38, 23, 38, 37],
                        expression: {
                          kind: "id",
                          loc: [38, 23, 38, 28],
                          text: "order",
                          bindingKey: "order$2yx6cd1u55xly$0",
                        },
                        name: "customer",
                      },
                      name: "name",
                    }),
                  ),
                }),
                _jsx("span", {
                  children: cs.create(
                    [39, 20, 39, 43],
                    {
                      version: "0.0.0",
                      filePath: "large-data.tsx",
                      fileHash: "2yx6cd1u55xly",
                      splices: {},
                      captures: ["order$2yx6cd1u55xly$0"],
                    },
                    () => ({
                      kind: ".",
                      loc: [39, 23, 39, 42],
                      expression: {
                        kind: ".",
                        loc: [39, 23, 39, 37],
                        expression: {
                          kind: "id",
                          loc: [39, 23, 39, 28],
                          text: "order",
                          bindingKey: "order$2yx6cd1u55xly$0",
                        },
                        name: "customer",
                      },
                      name: "city",
                    }),
                  ),
                }),
                _jsx(For, {
                  each: cs.create(
                    [40, 24, 40, 39],
                    {
                      version: "0.0.0",
                      filePath: "large-data.tsx",
                      fileHash: "2yx6cd1u55xly",
                      splices: {},
                      captures: ["order$2yx6cd1u55xly$0"],
                    },
                    () => ({
                      kind: ".",
                      loc: [40, 27, 40, 38],
                      expression: {
                        kind: "id",
                        loc: [40, 27, 40, 32],
                        text: "order",
                        bindingKey: "order$2yx6cd1u55xly$0",
                      },
                      name: "items",
                    }),
                  ),
                  children: cs.create(
                    [41, 16, 42, 68],
                    {
                      version: "0.0.0",
                      filePath: "large-data.tsx",
                      fileHash: "2yx6cd1u55xly",
                      splices: {
                        $0splice0: {
                          value: _jsx("span", {
                            children: cs.create(
                              [42, 27, 42, 57],
                              {
                                version: "0.0.0",
                                filePath: "large-data.tsx",
                                fileHash: "2yx6cd1u55xly",
                                splices: {},
                                captures: ["item$2yx6cd1u55xly$1"],
                              },
                              () => ({
                                kind: "binop",
                                loc: [42, 30, 42, 56],
                                left: {
                                  kind: "binop",
                                  loc: [42, 30, 42, 45],
                                  left: {
                                    kind: ".",
                                    loc: [42, 30, 42, 38],
                                    expression: {
                                      kind: "id",
                                      loc: [42, 30, 42, 34],
                                      text: "item",
                                      bindingKey: "item$2yx6cd1u55xly$1",
                                    },
                                    name: "sku",
                                  },
                                  operatorToken: "+",
                                  right: {
                                    kind: "string",
                                    loc: [42, 41, 42, 45],
                                    text: " x",
                                  },
                                },
                                operatorToken: "+",
                                right: {
                                  kind: ".",
                                  loc: [42, 48, 42, 56],
                                  expression: {
                                    kind: "id",
                                    loc: [42, 48, 42, 52],
                                    text: "item",
                                    bindingKey: "item$2yx6cd1u55xly$1",
                                  },
                                  name: "qty",
                                },
                              }),
                            ),
                          }),
                          params: ["item$2yx6cd1u55xly$1"],
                        },
                      },
                      captures: [],
                    },
                    () => ({
                      kind: "=>",
                      loc: [41, 19, 42, 67],
                      parameters: [
                        {
                          kind: "param",
                          loc: [41, 20, 41, 30],
                          name: {
                            kind: "id",
                            loc: [41, 20, 41, 24],
                            text: "item",
                            bindingKey: "item$2yx6cd1u55xly$1",
                          },
                        },
                      ],
                      body: {
                        kind: "splice",
                        loc: [42, 17, 42, 67],
                        key: "$0splice0",
                      },
                    }),
                  ),
                }),
                _jsx("span", {
                  children: cs.create(
                    [44, 20, 44, 41],
                    {
                      version: "0.0.0",
                      filePath: "large-data.tsx",
                      fileHash: "2yx6cd1u55xly",
                      splices: {},
                      captures: ["order$2yx6cd1u55xly$0"],
                    },
                    () => ({
                      kind: "binop",
                      loc: [44, 23, 44, 40],
                      left: {
                        kind: "string",
                        loc: [44, 23, 44, 26],
                        text: "$",
                      },
                      operatorToken: "+",
                      right: {
                        kind: ".",
                        loc: [44, 29, 44, 40],
                        expression: {
                          kind: "id",
                          loc: [44, 29, 44, 34],
                          text: "order",
                          bindingKey: "order$2yx6cd1u55xly$0",
                        },
                        name: "total",
                      },
                    }),
                  ),
                }),
              ],
            }),
            params: ["order$2yx6cd1u55xly$0"],
          },
        },
        captures: [],
      },
      () => ({
        kind: "=>",
        loc: [31, 11, 46, 11],
        parameters: [
          {
            kind: "param",
            loc: [31, 12, 31, 24],
            name: {
              kind: "id",
              loc: [31, 12, 31, 17],
              text: "order",
              bindingKey: "order$2yx6cd1u55xly$0",
            },
          },
        ],
        body: {
          kind: "splice",
          loc: [32, 9, 46, 11],
          key: "$0splice0",
        },
      }),
    ),
  }),
});
