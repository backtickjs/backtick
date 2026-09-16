import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs, For } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
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
// The dataset ships once and the list expands on the client: one card
// template with holes for each order's fields (and a nested item list),
// mapped at runtime. The bundle carries the data plus a single card, not five
// expanded copies. The root View stays static; only its children map on the
// client.
it("largeData", async (t) => {
  await snapshotCase(
    t,
    "largeData",
    _jsx("div", {
      children: _jsx(For, {
        each: cs.create(
          [37, 18, 37, 29],
          {
            version: "0.0.0",
            filePath: "jsx/large-data.test.tsx",
            fileHash: "2tquu92zqyse3",
            splices: { $orders: { value: orders, params: [] } },
            captures: [],
          },
          () => ({
            kind: "splice",
            loc: [37, 21, 37, 28],
            key: "$orders",
          }),
        ),
        children: cs.create(
          [38, 10, 53, 14],
          {
            version: "0.0.0",
            filePath: "jsx/large-data.test.tsx",
            fileHash: "2tquu92zqyse3",
            splices: {
              $0splice0: {
                value: _jsxs("div", {
                  children: [
                    _jsx("img", {
                      src: cs.create(
                        [42, 22, 42, 72],
                        {
                          version: "0.0.0",
                          filePath: "jsx/large-data.test.tsx",
                          fileHash: "2tquu92zqyse3",
                          splices: {},
                          captures: ["order$2tquu92zqyse3$0"],
                        },
                        () => ({
                          kind: "binop",
                          loc: [42, 25, 42, 71],
                          left: {
                            kind: "binop",
                            loc: [42, 25, 42, 62],
                            left: {
                              kind: "string",
                              loc: [42, 25, 42, 51],
                              text: "https://img.example.com/",
                            },
                            operatorToken: "+",
                            right: {
                              kind: ".",
                              loc: [42, 54, 42, 62],
                              expression: {
                                kind: "id",
                                loc: [42, 54, 42, 59],
                                text: "order",
                                bindingKey: "order$2tquu92zqyse3$0",
                              },
                              name: "id",
                            },
                          },
                          operatorToken: "+",
                          right: {
                            kind: "string",
                            loc: [42, 65, 42, 71],
                            text: ".png",
                          },
                        }),
                      ),
                      alt: "",
                    }),
                    _jsx("span", {
                      children: cs.create(
                        [45, 22, 45, 45],
                        {
                          version: "0.0.0",
                          filePath: "jsx/large-data.test.tsx",
                          fileHash: "2tquu92zqyse3",
                          splices: {},
                          captures: ["order$2tquu92zqyse3$0"],
                        },
                        () => ({
                          kind: ".",
                          loc: [45, 25, 45, 44],
                          expression: {
                            kind: ".",
                            loc: [45, 25, 45, 39],
                            expression: {
                              kind: "id",
                              loc: [45, 25, 45, 30],
                              text: "order",
                              bindingKey: "order$2tquu92zqyse3$0",
                            },
                            name: "customer",
                          },
                          name: "name",
                        }),
                      ),
                    }),
                    _jsx("span", {
                      children: cs.create(
                        [46, 22, 46, 45],
                        {
                          version: "0.0.0",
                          filePath: "jsx/large-data.test.tsx",
                          fileHash: "2tquu92zqyse3",
                          splices: {},
                          captures: ["order$2tquu92zqyse3$0"],
                        },
                        () => ({
                          kind: ".",
                          loc: [46, 25, 46, 44],
                          expression: {
                            kind: ".",
                            loc: [46, 25, 46, 39],
                            expression: {
                              kind: "id",
                              loc: [46, 25, 46, 30],
                              text: "order",
                              bindingKey: "order$2tquu92zqyse3$0",
                            },
                            name: "customer",
                          },
                          name: "city",
                        }),
                      ),
                    }),
                    _jsx(For, {
                      each: cs.create(
                        [47, 26, 47, 41],
                        {
                          version: "0.0.0",
                          filePath: "jsx/large-data.test.tsx",
                          fileHash: "2tquu92zqyse3",
                          splices: {},
                          captures: ["order$2tquu92zqyse3$0"],
                        },
                        () => ({
                          kind: ".",
                          loc: [47, 29, 47, 40],
                          expression: {
                            kind: "id",
                            loc: [47, 29, 47, 34],
                            text: "order",
                            bindingKey: "order$2tquu92zqyse3$0",
                          },
                          name: "items",
                        }),
                      ),
                      children: cs.create(
                        [48, 18, 49, 70],
                        {
                          version: "0.0.0",
                          filePath: "jsx/large-data.test.tsx",
                          fileHash: "2tquu92zqyse3",
                          splices: {
                            $0splice0: {
                              value: _jsx("span", {
                                children: cs.create(
                                  [49, 29, 49, 59],
                                  {
                                    version: "0.0.0",
                                    filePath: "jsx/large-data.test.tsx",
                                    fileHash: "2tquu92zqyse3",
                                    splices: {},
                                    captures: ["item$2tquu92zqyse3$1"],
                                  },
                                  () => ({
                                    kind: "binop",
                                    loc: [49, 32, 49, 58],
                                    left: {
                                      kind: "binop",
                                      loc: [49, 32, 49, 47],
                                      left: {
                                        kind: ".",
                                        loc: [49, 32, 49, 40],
                                        expression: {
                                          kind: "id",
                                          loc: [49, 32, 49, 36],
                                          text: "item",
                                          bindingKey: "item$2tquu92zqyse3$1",
                                        },
                                        name: "sku",
                                      },
                                      operatorToken: "+",
                                      right: {
                                        kind: "string",
                                        loc: [49, 43, 49, 47],
                                        text: " x",
                                      },
                                    },
                                    operatorToken: "+",
                                    right: {
                                      kind: ".",
                                      loc: [49, 50, 49, 58],
                                      expression: {
                                        kind: "id",
                                        loc: [49, 50, 49, 54],
                                        text: "item",
                                        bindingKey: "item$2tquu92zqyse3$1",
                                      },
                                      name: "qty",
                                    },
                                  }),
                                ),
                              }),
                              params: ["item$2tquu92zqyse3$1"],
                            },
                          },
                          captures: [],
                        },
                        () => ({
                          kind: "=>",
                          loc: [48, 21, 49, 69],
                          parameters: [
                            {
                              kind: "param",
                              loc: [48, 22, 48, 32],
                              name: {
                                kind: "id",
                                loc: [48, 22, 48, 26],
                                text: "item",
                                bindingKey: "item$2tquu92zqyse3$1",
                              },
                            },
                          ],
                          body: {
                            kind: "splice",
                            loc: [49, 19, 49, 69],
                            key: "$0splice0",
                          },
                        }),
                      ),
                    }),
                    _jsx("span", {
                      children: cs.create(
                        [51, 22, 51, 43],
                        {
                          version: "0.0.0",
                          filePath: "jsx/large-data.test.tsx",
                          fileHash: "2tquu92zqyse3",
                          splices: {},
                          captures: ["order$2tquu92zqyse3$0"],
                        },
                        () => ({
                          kind: "binop",
                          loc: [51, 25, 51, 42],
                          left: {
                            kind: "string",
                            loc: [51, 25, 51, 28],
                            text: "$",
                          },
                          operatorToken: "+",
                          right: {
                            kind: ".",
                            loc: [51, 31, 51, 42],
                            expression: {
                              kind: "id",
                              loc: [51, 31, 51, 36],
                              text: "order",
                              bindingKey: "order$2tquu92zqyse3$0",
                            },
                            name: "total",
                          },
                        }),
                      ),
                    }),
                  ],
                }),
                params: ["order$2tquu92zqyse3$0"],
              },
            },
            captures: [],
          },
          () => ({
            kind: "=>",
            loc: [38, 13, 53, 13],
            parameters: [
              {
                kind: "param",
                loc: [38, 14, 38, 26],
                name: {
                  kind: "id",
                  loc: [38, 14, 38, 19],
                  text: "order",
                  bindingKey: "order$2tquu92zqyse3$0",
                },
              },
            ],
            body: {
              kind: "splice",
              loc: [39, 11, 53, 13],
              key: "$0splice0",
            },
          }),
        ),
      }),
    }),
  );
});
