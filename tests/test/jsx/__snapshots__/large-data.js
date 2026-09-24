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
          { start: { line: 37, column: 17 }, end: { line: 37, column: 28 } },
          {
            version: "0.0.0",
            filePath: "jsx/large-data.test.tsx",
            fileHash: "2tquu92zqyse3",
            splices: { $orders: { value: orders, params: [] } },
            captures: [],
          },
          () => ({
            type: "Splice",
            loc: {
              start: { line: 37, column: 20 },
              end: { line: 37, column: 27 },
            },
            key: "$orders",
          }),
        ),
        children: cs.create(
          { start: { line: 38, column: 9 }, end: { line: 53, column: 13 } },
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
                        {
                          start: { line: 42, column: 21 },
                          end: { line: 42, column: 71 },
                        },
                        {
                          version: "0.0.0",
                          filePath: "jsx/large-data.test.tsx",
                          fileHash: "2tquu92zqyse3",
                          splices: {},
                          captures: ["order$2tquu92zqyse3$0"],
                        },
                        () => ({
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 42, column: 24 },
                            end: { line: 42, column: 70 },
                          },
                          operator: "+",
                          left: {
                            type: "BinaryExpression",
                            loc: {
                              start: { line: 42, column: 24 },
                              end: { line: 42, column: 61 },
                            },
                            operator: "+",
                            left: {
                              type: "Literal",
                              loc: {
                                start: { line: 42, column: 24 },
                                end: { line: 42, column: 50 },
                              },
                              value: "https://img.example.com/",
                            },
                            right: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 42, column: 53 },
                                end: { line: 42, column: 61 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 42, column: 53 },
                                  end: { line: 42, column: 58 },
                                },
                                name: "order",
                                bindingKey: "order$2tquu92zqyse3$0",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 42, column: 59 },
                                  end: { line: 42, column: 61 },
                                },
                                name: "id",
                              },
                              computed: false,
                              optional: false,
                            },
                          },
                          right: {
                            type: "Literal",
                            loc: {
                              start: { line: 42, column: 64 },
                              end: { line: 42, column: 70 },
                            },
                            value: ".png",
                          },
                        }),
                      ),
                      alt: "",
                    }),
                    _jsx("span", {
                      children: cs.create(
                        {
                          start: { line: 45, column: 21 },
                          end: { line: 45, column: 44 },
                        },
                        {
                          version: "0.0.0",
                          filePath: "jsx/large-data.test.tsx",
                          fileHash: "2tquu92zqyse3",
                          splices: {},
                          captures: ["order$2tquu92zqyse3$0"],
                        },
                        () => ({
                          type: "MemberExpression",
                          loc: {
                            start: { line: 45, column: 24 },
                            end: { line: 45, column: 43 },
                          },
                          object: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 45, column: 24 },
                              end: { line: 45, column: 38 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 45, column: 24 },
                                end: { line: 45, column: 29 },
                              },
                              name: "order",
                              bindingKey: "order$2tquu92zqyse3$0",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 45, column: 30 },
                                end: { line: 45, column: 38 },
                              },
                              name: "customer",
                            },
                            computed: false,
                            optional: false,
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 45, column: 39 },
                              end: { line: 45, column: 43 },
                            },
                            name: "name",
                          },
                          computed: false,
                          optional: false,
                        }),
                      ),
                    }),
                    _jsx("span", {
                      children: cs.create(
                        {
                          start: { line: 46, column: 21 },
                          end: { line: 46, column: 44 },
                        },
                        {
                          version: "0.0.0",
                          filePath: "jsx/large-data.test.tsx",
                          fileHash: "2tquu92zqyse3",
                          splices: {},
                          captures: ["order$2tquu92zqyse3$0"],
                        },
                        () => ({
                          type: "MemberExpression",
                          loc: {
                            start: { line: 46, column: 24 },
                            end: { line: 46, column: 43 },
                          },
                          object: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 46, column: 24 },
                              end: { line: 46, column: 38 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 46, column: 24 },
                                end: { line: 46, column: 29 },
                              },
                              name: "order",
                              bindingKey: "order$2tquu92zqyse3$0",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 46, column: 30 },
                                end: { line: 46, column: 38 },
                              },
                              name: "customer",
                            },
                            computed: false,
                            optional: false,
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 46, column: 39 },
                              end: { line: 46, column: 43 },
                            },
                            name: "city",
                          },
                          computed: false,
                          optional: false,
                        }),
                      ),
                    }),
                    _jsx(For, {
                      each: cs.create(
                        {
                          start: { line: 47, column: 25 },
                          end: { line: 47, column: 40 },
                        },
                        {
                          version: "0.0.0",
                          filePath: "jsx/large-data.test.tsx",
                          fileHash: "2tquu92zqyse3",
                          splices: {},
                          captures: ["order$2tquu92zqyse3$0"],
                        },
                        () => ({
                          type: "MemberExpression",
                          loc: {
                            start: { line: 47, column: 28 },
                            end: { line: 47, column: 39 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 47, column: 28 },
                              end: { line: 47, column: 33 },
                            },
                            name: "order",
                            bindingKey: "order$2tquu92zqyse3$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 47, column: 34 },
                              end: { line: 47, column: 39 },
                            },
                            name: "items",
                          },
                          computed: false,
                          optional: false,
                        }),
                      ),
                      children: cs.create(
                        {
                          start: { line: 48, column: 17 },
                          end: { line: 49, column: 69 },
                        },
                        {
                          version: "0.0.0",
                          filePath: "jsx/large-data.test.tsx",
                          fileHash: "2tquu92zqyse3",
                          splices: {
                            $0splice0: {
                              value: _jsx("span", {
                                children: cs.create(
                                  {
                                    start: { line: 49, column: 28 },
                                    end: { line: 49, column: 58 },
                                  },
                                  {
                                    version: "0.0.0",
                                    filePath: "jsx/large-data.test.tsx",
                                    fileHash: "2tquu92zqyse3",
                                    splices: {},
                                    captures: ["item$2tquu92zqyse3$1"],
                                  },
                                  () => ({
                                    type: "BinaryExpression",
                                    loc: {
                                      start: { line: 49, column: 31 },
                                      end: { line: 49, column: 57 },
                                    },
                                    operator: "+",
                                    left: {
                                      type: "BinaryExpression",
                                      loc: {
                                        start: { line: 49, column: 31 },
                                        end: { line: 49, column: 46 },
                                      },
                                      operator: "+",
                                      left: {
                                        type: "MemberExpression",
                                        loc: {
                                          start: { line: 49, column: 31 },
                                          end: { line: 49, column: 39 },
                                        },
                                        object: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 49, column: 31 },
                                            end: { line: 49, column: 35 },
                                          },
                                          name: "item",
                                          bindingKey: "item$2tquu92zqyse3$1",
                                        },
                                        property: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 49, column: 36 },
                                            end: { line: 49, column: 39 },
                                          },
                                          name: "sku",
                                        },
                                        computed: false,
                                        optional: false,
                                      },
                                      right: {
                                        type: "Literal",
                                        loc: {
                                          start: { line: 49, column: 42 },
                                          end: { line: 49, column: 46 },
                                        },
                                        value: " x",
                                      },
                                    },
                                    right: {
                                      type: "MemberExpression",
                                      loc: {
                                        start: { line: 49, column: 49 },
                                        end: { line: 49, column: 57 },
                                      },
                                      object: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 49, column: 49 },
                                          end: { line: 49, column: 53 },
                                        },
                                        name: "item",
                                        bindingKey: "item$2tquu92zqyse3$1",
                                      },
                                      property: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 49, column: 54 },
                                          end: { line: 49, column: 57 },
                                        },
                                        name: "qty",
                                      },
                                      computed: false,
                                      optional: false,
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
                          type: "ArrowFunctionExpression",
                          loc: {
                            start: { line: 48, column: 20 },
                            end: { line: 49, column: 68 },
                          },
                          params: [
                            {
                              type: "Identifier",
                              loc: {
                                start: { line: 48, column: 21 },
                                end: { line: 48, column: 25 },
                              },
                              name: "item",
                              bindingKey: "item$2tquu92zqyse3$1",
                            },
                          ],
                          body: {
                            type: "Splice",
                            loc: {
                              start: { line: 49, column: 18 },
                              end: { line: 49, column: 68 },
                            },
                            key: "$0splice0",
                          },
                          expression: true,
                        }),
                      ),
                    }),
                    _jsx("span", {
                      children: cs.create(
                        {
                          start: { line: 51, column: 21 },
                          end: { line: 51, column: 42 },
                        },
                        {
                          version: "0.0.0",
                          filePath: "jsx/large-data.test.tsx",
                          fileHash: "2tquu92zqyse3",
                          splices: {},
                          captures: ["order$2tquu92zqyse3$0"],
                        },
                        () => ({
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 51, column: 24 },
                            end: { line: 51, column: 41 },
                          },
                          operator: "+",
                          left: {
                            type: "Literal",
                            loc: {
                              start: { line: 51, column: 24 },
                              end: { line: 51, column: 27 },
                            },
                            value: "$",
                          },
                          right: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 51, column: 30 },
                              end: { line: 51, column: 41 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 51, column: 30 },
                                end: { line: 51, column: 35 },
                              },
                              name: "order",
                              bindingKey: "order$2tquu92zqyse3$0",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 51, column: 36 },
                                end: { line: 51, column: 41 },
                              },
                              name: "total",
                            },
                            computed: false,
                            optional: false,
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
            type: "ArrowFunctionExpression",
            loc: {
              start: { line: 38, column: 12 },
              end: { line: 53, column: 12 },
            },
            params: [
              {
                type: "Identifier",
                loc: {
                  start: { line: 38, column: 13 },
                  end: { line: 38, column: 18 },
                },
                name: "order",
                bindingKey: "order$2tquu92zqyse3$0",
              },
            ],
            body: {
              type: "Splice",
              loc: {
                start: { line: 39, column: 10 },
                end: { line: 53, column: 12 },
              },
              key: "$0splice0",
            },
            expression: true,
          }),
        ),
      }),
    }),
  );
});
