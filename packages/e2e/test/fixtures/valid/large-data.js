import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/core/jsx-runtime";
import { cs, For, Image, Text, View } from "@backtickjs/core";
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
  children: _jsx(For, {
    each: cs.create(
      [30, 16, 30, 27],
      {
        version: "0.0.0",
        filePath: "large-data.tsx",
        fileHash: "b5tmg4sc0e9w",
        kind: "value",
        splices: { $orders: orders },
        captures: [],
        spliceParams: { $orders: [] },
      },
      () => ({
        kind: 1000,
        loc: [30, 19, 30, 26],
        key: "$orders",
      }),
    ),
    children: cs.create(
      [31, 8, 47, 12],
      {
        version: "0.0.0",
        filePath: "large-data.tsx",
        fileHash: "b5tmg4sc0e9w",
        kind: "value",
        splices: {
          $0splice0: _jsxs(View, {
            children: [
              _jsx(Image, {
                source: {
                  uri: cs.create(
                    [36, 22, 36, 72],
                    {
                      version: "0.0.0",
                      filePath: "large-data.tsx",
                      fileHash: "b5tmg4sc0e9w",
                      kind: "value",
                      splices: {},
                      captures: ["order$b5tmg4sc0e9w$0"],
                      spliceParams: {},
                    },
                    () => ({
                      kind: 227,
                      loc: [36, 25, 36, 71],
                      left: {
                        kind: 227,
                        loc: [36, 25, 36, 62],
                        left: {
                          kind: 11,
                          loc: [36, 25, 36, 51],
                          text: "https://img.example.com/",
                        },
                        operatorToken: "+",
                        right: {
                          kind: 212,
                          loc: [36, 54, 36, 62],
                          expression: {
                            kind: 80,
                            loc: [36, 54, 36, 59],
                            text: "order",
                            bindingKey: "order$b5tmg4sc0e9w$0",
                          },
                          questionDotToken: false,
                          name: "id",
                        },
                      },
                      operatorToken: "+",
                      right: {
                        kind: 11,
                        loc: [36, 65, 36, 71],
                        text: ".png",
                      },
                    }),
                  ),
                },
              }),
              _jsx(Text, {
                children: cs.create(
                  [39, 20, 39, 43],
                  {
                    version: "0.0.0",
                    filePath: "large-data.tsx",
                    fileHash: "b5tmg4sc0e9w",
                    kind: "value",
                    splices: {},
                    captures: ["order$b5tmg4sc0e9w$0"],
                    spliceParams: {},
                  },
                  () => ({
                    kind: 212,
                    loc: [39, 23, 39, 42],
                    expression: {
                      kind: 212,
                      loc: [39, 23, 39, 37],
                      expression: {
                        kind: 80,
                        loc: [39, 23, 39, 28],
                        text: "order",
                        bindingKey: "order$b5tmg4sc0e9w$0",
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
                  [40, 20, 40, 43],
                  {
                    version: "0.0.0",
                    filePath: "large-data.tsx",
                    fileHash: "b5tmg4sc0e9w",
                    kind: "value",
                    splices: {},
                    captures: ["order$b5tmg4sc0e9w$0"],
                    spliceParams: {},
                  },
                  () => ({
                    kind: 212,
                    loc: [40, 23, 40, 42],
                    expression: {
                      kind: 212,
                      loc: [40, 23, 40, 37],
                      expression: {
                        kind: 80,
                        loc: [40, 23, 40, 28],
                        text: "order",
                        bindingKey: "order$b5tmg4sc0e9w$0",
                      },
                      questionDotToken: false,
                      name: "customer",
                    },
                    questionDotToken: false,
                    name: "city",
                  }),
                ),
              }),
              _jsx(For, {
                each: cs.create(
                  [41, 24, 41, 39],
                  {
                    version: "0.0.0",
                    filePath: "large-data.tsx",
                    fileHash: "b5tmg4sc0e9w",
                    kind: "value",
                    splices: {},
                    captures: ["order$b5tmg4sc0e9w$0"],
                    spliceParams: {},
                  },
                  () => ({
                    kind: 212,
                    loc: [41, 27, 41, 38],
                    expression: {
                      kind: 80,
                      loc: [41, 27, 41, 32],
                      text: "order",
                      bindingKey: "order$b5tmg4sc0e9w$0",
                    },
                    questionDotToken: false,
                    name: "items",
                  }),
                ),
                children: cs.create(
                  [42, 16, 43, 68],
                  {
                    version: "0.0.0",
                    filePath: "large-data.tsx",
                    fileHash: "b5tmg4sc0e9w",
                    kind: "value",
                    splices: {
                      $0splice0: _jsx(Text, {
                        children: cs.create(
                          [43, 27, 43, 57],
                          {
                            version: "0.0.0",
                            filePath: "large-data.tsx",
                            fileHash: "b5tmg4sc0e9w",
                            kind: "value",
                            splices: {},
                            captures: ["item$b5tmg4sc0e9w$1"],
                            spliceParams: {},
                          },
                          () => ({
                            kind: 227,
                            loc: [43, 30, 43, 56],
                            left: {
                              kind: 227,
                              loc: [43, 30, 43, 45],
                              left: {
                                kind: 212,
                                loc: [43, 30, 43, 38],
                                expression: {
                                  kind: 80,
                                  loc: [43, 30, 43, 34],
                                  text: "item",
                                  bindingKey: "item$b5tmg4sc0e9w$1",
                                },
                                questionDotToken: false,
                                name: "sku",
                              },
                              operatorToken: "+",
                              right: {
                                kind: 11,
                                loc: [43, 41, 43, 45],
                                text: " x",
                              },
                            },
                            operatorToken: "+",
                            right: {
                              kind: 212,
                              loc: [43, 48, 43, 56],
                              expression: {
                                kind: 80,
                                loc: [43, 48, 43, 52],
                                text: "item",
                                bindingKey: "item$b5tmg4sc0e9w$1",
                              },
                              questionDotToken: false,
                              name: "qty",
                            },
                          }),
                        ),
                      }),
                    },
                    captures: [],
                    spliceParams: { $0splice0: ["item$b5tmg4sc0e9w$1"] },
                  },
                  () => ({
                    kind: 220,
                    loc: [42, 19, 43, 67],
                    parameters: [
                      {
                        kind: 170,
                        loc: [42, 20, 42, 30],
                        name: {
                          kind: 80,
                          loc: [42, 20, 42, 24],
                          text: "item",
                          bindingKey: "item$b5tmg4sc0e9w$1",
                        },
                      },
                    ],
                    body: {
                      kind: 1000,
                      loc: [43, 17, 43, 67],
                      key: "$0splice0",
                    },
                  }),
                ),
              }),
              _jsx(Text, {
                children: cs.create(
                  [45, 20, 45, 41],
                  {
                    version: "0.0.0",
                    filePath: "large-data.tsx",
                    fileHash: "b5tmg4sc0e9w",
                    kind: "value",
                    splices: {},
                    captures: ["order$b5tmg4sc0e9w$0"],
                    spliceParams: {},
                  },
                  () => ({
                    kind: 227,
                    loc: [45, 23, 45, 40],
                    left: {
                      kind: 11,
                      loc: [45, 23, 45, 26],
                      text: "$",
                    },
                    operatorToken: "+",
                    right: {
                      kind: 212,
                      loc: [45, 29, 45, 40],
                      expression: {
                        kind: 80,
                        loc: [45, 29, 45, 34],
                        text: "order",
                        bindingKey: "order$b5tmg4sc0e9w$0",
                      },
                      questionDotToken: false,
                      name: "total",
                    },
                  }),
                ),
              }),
            ],
          }),
        },
        captures: [],
        spliceParams: { $0splice0: ["order$b5tmg4sc0e9w$0"] },
      },
      () => ({
        kind: 220,
        loc: [31, 11, 47, 11],
        parameters: [
          {
            kind: 170,
            loc: [31, 12, 31, 24],
            name: {
              kind: 80,
              loc: [31, 12, 31, 17],
              text: "order",
              bindingKey: "order$b5tmg4sc0e9w$0",
            },
          },
        ],
        body: {
          kind: 1000,
          loc: [32, 9, 47, 11],
          key: "$0splice0",
        },
      }),
    ),
  }),
});
