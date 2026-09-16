import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
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
const largeData = _jsx("div", {
  children: _jsx(For, {
    each: cs.create(
      [31, 16, 31, 27],
      {
        version: "0.0.0",
        filePath: "largeData.tsx",
        fileHash: "206n7zdn45ef6",
        splices: { $orders: { value: orders, params: [] } },
        captures: [],
      },
      () => ({
        kind: "splice",
        loc: [31, 19, 31, 26],
        key: "$orders",
      }),
    ),
    children: cs.create(
      [32, 8, 47, 12],
      {
        version: "0.0.0",
        filePath: "largeData.tsx",
        fileHash: "206n7zdn45ef6",
        splices: {
          $0splice0: {
            value: _jsxs("div", {
              children: [
                _jsx("img", {
                  src: cs.create(
                    [36, 20, 36, 70],
                    {
                      version: "0.0.0",
                      filePath: "largeData.tsx",
                      fileHash: "206n7zdn45ef6",
                      splices: {},
                      captures: ["order$206n7zdn45ef6$0"],
                    },
                    () => ({
                      kind: "binop",
                      loc: [36, 23, 36, 69],
                      left: {
                        kind: "binop",
                        loc: [36, 23, 36, 60],
                        left: {
                          kind: "string",
                          loc: [36, 23, 36, 49],
                          text: "https://img.example.com/",
                        },
                        operatorToken: "+",
                        right: {
                          kind: ".",
                          loc: [36, 52, 36, 60],
                          expression: {
                            kind: "id",
                            loc: [36, 52, 36, 57],
                            text: "order",
                            bindingKey: "order$206n7zdn45ef6$0",
                          },
                          name: "id",
                        },
                      },
                      operatorToken: "+",
                      right: {
                        kind: "string",
                        loc: [36, 63, 36, 69],
                        text: ".png",
                      },
                    }),
                  ),
                  alt: "",
                }),
                _jsx("span", {
                  children: cs.create(
                    [39, 20, 39, 43],
                    {
                      version: "0.0.0",
                      filePath: "largeData.tsx",
                      fileHash: "206n7zdn45ef6",
                      splices: {},
                      captures: ["order$206n7zdn45ef6$0"],
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
                          bindingKey: "order$206n7zdn45ef6$0",
                        },
                        name: "customer",
                      },
                      name: "name",
                    }),
                  ),
                }),
                _jsx("span", {
                  children: cs.create(
                    [40, 20, 40, 43],
                    {
                      version: "0.0.0",
                      filePath: "largeData.tsx",
                      fileHash: "206n7zdn45ef6",
                      splices: {},
                      captures: ["order$206n7zdn45ef6$0"],
                    },
                    () => ({
                      kind: ".",
                      loc: [40, 23, 40, 42],
                      expression: {
                        kind: ".",
                        loc: [40, 23, 40, 37],
                        expression: {
                          kind: "id",
                          loc: [40, 23, 40, 28],
                          text: "order",
                          bindingKey: "order$206n7zdn45ef6$0",
                        },
                        name: "customer",
                      },
                      name: "city",
                    }),
                  ),
                }),
                _jsx(For, {
                  each: cs.create(
                    [41, 24, 41, 39],
                    {
                      version: "0.0.0",
                      filePath: "largeData.tsx",
                      fileHash: "206n7zdn45ef6",
                      splices: {},
                      captures: ["order$206n7zdn45ef6$0"],
                    },
                    () => ({
                      kind: ".",
                      loc: [41, 27, 41, 38],
                      expression: {
                        kind: "id",
                        loc: [41, 27, 41, 32],
                        text: "order",
                        bindingKey: "order$206n7zdn45ef6$0",
                      },
                      name: "items",
                    }),
                  ),
                  children: cs.create(
                    [42, 16, 43, 68],
                    {
                      version: "0.0.0",
                      filePath: "largeData.tsx",
                      fileHash: "206n7zdn45ef6",
                      splices: {
                        $0splice0: {
                          value: _jsx("span", {
                            children: cs.create(
                              [43, 27, 43, 57],
                              {
                                version: "0.0.0",
                                filePath: "largeData.tsx",
                                fileHash: "206n7zdn45ef6",
                                splices: {},
                                captures: ["item$206n7zdn45ef6$1"],
                              },
                              () => ({
                                kind: "binop",
                                loc: [43, 30, 43, 56],
                                left: {
                                  kind: "binop",
                                  loc: [43, 30, 43, 45],
                                  left: {
                                    kind: ".",
                                    loc: [43, 30, 43, 38],
                                    expression: {
                                      kind: "id",
                                      loc: [43, 30, 43, 34],
                                      text: "item",
                                      bindingKey: "item$206n7zdn45ef6$1",
                                    },
                                    name: "sku",
                                  },
                                  operatorToken: "+",
                                  right: {
                                    kind: "string",
                                    loc: [43, 41, 43, 45],
                                    text: " x",
                                  },
                                },
                                operatorToken: "+",
                                right: {
                                  kind: ".",
                                  loc: [43, 48, 43, 56],
                                  expression: {
                                    kind: "id",
                                    loc: [43, 48, 43, 52],
                                    text: "item",
                                    bindingKey: "item$206n7zdn45ef6$1",
                                  },
                                  name: "qty",
                                },
                              }),
                            ),
                          }),
                          params: ["item$206n7zdn45ef6$1"],
                        },
                      },
                      captures: [],
                    },
                    () => ({
                      kind: "=>",
                      loc: [42, 19, 43, 67],
                      parameters: [
                        {
                          kind: "param",
                          loc: [42, 20, 42, 30],
                          name: {
                            kind: "id",
                            loc: [42, 20, 42, 24],
                            text: "item",
                            bindingKey: "item$206n7zdn45ef6$1",
                          },
                        },
                      ],
                      body: {
                        kind: "splice",
                        loc: [43, 17, 43, 67],
                        key: "$0splice0",
                      },
                    }),
                  ),
                }),
                _jsx("span", {
                  children: cs.create(
                    [45, 20, 45, 41],
                    {
                      version: "0.0.0",
                      filePath: "largeData.tsx",
                      fileHash: "206n7zdn45ef6",
                      splices: {},
                      captures: ["order$206n7zdn45ef6$0"],
                    },
                    () => ({
                      kind: "binop",
                      loc: [45, 23, 45, 40],
                      left: {
                        kind: "string",
                        loc: [45, 23, 45, 26],
                        text: "$",
                      },
                      operatorToken: "+",
                      right: {
                        kind: ".",
                        loc: [45, 29, 45, 40],
                        expression: {
                          kind: "id",
                          loc: [45, 29, 45, 34],
                          text: "order",
                          bindingKey: "order$206n7zdn45ef6$0",
                        },
                        name: "total",
                      },
                    }),
                  ),
                }),
              ],
            }),
            params: ["order$206n7zdn45ef6$0"],
          },
        },
        captures: [],
      },
      () => ({
        kind: "=>",
        loc: [32, 11, 47, 11],
        parameters: [
          {
            kind: "param",
            loc: [32, 12, 32, 24],
            name: {
              kind: "id",
              loc: [32, 12, 32, 17],
              text: "order",
              bindingKey: "order$206n7zdn45ef6$0",
            },
          },
        ],
        body: {
          kind: "splice",
          loc: [33, 9, 47, 11],
          key: "$0splice0",
        },
      }),
    ),
  }),
});
