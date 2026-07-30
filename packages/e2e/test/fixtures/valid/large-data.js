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
                    (v) =>
                      v.binaryExpression(
                        [28, 25, 28, 71],
                        v.binaryExpression(
                          [28, 25, 28, 62],
                          v.stringLiteral(
                            [28, 25, 28, 51],
                            "https://img.example.com/",
                          ),
                          "+",
                          v.propertyAccessExpression(
                            [28, 54, 28, 62],
                            v.identifier(
                              [28, 54, 28, 59],
                              "order",
                              "order$kpf5b5091dr1$0",
                            ),
                            false,
                            "id",
                          ),
                        ),
                        "+",
                        v.stringLiteral([28, 65, 28, 71], ".png"),
                      ),
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
                  (v) =>
                    v.propertyAccessExpression(
                      [31, 23, 31, 42],
                      v.propertyAccessExpression(
                        [31, 23, 31, 37],
                        v.identifier(
                          [31, 23, 31, 28],
                          "order",
                          "order$kpf5b5091dr1$0",
                        ),
                        false,
                        "customer",
                      ),
                      false,
                      "name",
                    ),
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
                  (v) =>
                    v.propertyAccessExpression(
                      [32, 23, 32, 42],
                      v.propertyAccessExpression(
                        [32, 23, 32, 37],
                        v.identifier(
                          [32, 23, 32, 28],
                          "order",
                          "order$kpf5b5091dr1$0",
                        ),
                        false,
                        "customer",
                      ),
                      false,
                      "city",
                    ),
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
                          (v) =>
                            v.binaryExpression(
                              [37, 25, 37, 51],
                              v.binaryExpression(
                                [37, 25, 37, 40],
                                v.propertyAccessExpression(
                                  [37, 25, 37, 33],
                                  v.identifier(
                                    [37, 25, 37, 29],
                                    "item",
                                    "item$kpf5b5091dr1$1",
                                  ),
                                  false,
                                  "sku",
                                ),
                                "+",
                                v.stringLiteral([37, 36, 37, 40], " x"),
                              ),
                              "+",
                              v.propertyAccessExpression(
                                [37, 43, 37, 51],
                                v.identifier(
                                  [37, 43, 37, 47],
                                  "item",
                                  "item$kpf5b5091dr1$1",
                                ),
                                false,
                                "qty",
                              ),
                            ),
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
                        (v) =>
                          v.propertyAccessExpression(
                            [36, 33, 36, 41],
                            v.identifier(
                              [36, 33, 36, 37],
                              "item",
                              "item$kpf5b5091dr1$1",
                            ),
                            false,
                            "sku",
                          ),
                      ),
                    ),
                  },
                  captures: ["order$kpf5b5091dr1$0"],
                  spliceParams: { $0splice0: ["item$kpf5b5091dr1$1"] },
                },
                (v) =>
                  v.callExpression(
                    [33, 17, 40, 14],
                    v.propertyAccessExpression(
                      [33, 17, 33, 32],
                      v.propertyAccessExpression(
                        [33, 17, 33, 28],
                        v.identifier(
                          [33, 17, 33, 22],
                          "order",
                          "order$kpf5b5091dr1$0",
                        ),
                        false,
                        "items",
                      ),
                      false,
                      "map",
                    ),
                    false,
                    [
                      v.arrowFunction(
                        [34, 15, 39, 19],
                        [
                          v.identifier(
                            [34, 16, 34, 20],
                            "item",
                            "item$kpf5b5091dr1$1",
                          ),
                        ],
                        v.splice([35, 17, 39, 19], "$0splice0"),
                      ),
                    ],
                  ),
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
                  (v) =>
                    v.binaryExpression(
                      [41, 23, 41, 40],
                      v.stringLiteral([41, 23, 41, 26], "$"),
                      "+",
                      v.propertyAccessExpression(
                        [41, 29, 41, 40],
                        v.identifier(
                          [41, 29, 41, 34],
                          "order",
                          "order$kpf5b5091dr1$0",
                        ),
                        false,
                        "total",
                      ),
                    ),
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
            (v) =>
              v.propertyAccessExpression(
                [25, 25, 25, 33],
                v.identifier([25, 25, 25, 30], "order", "order$kpf5b5091dr1$0"),
                false,
                "id",
              ),
          ),
        ),
      },
      captures: [],
      spliceParams: { $orders: [], $0splice0: ["order$kpf5b5091dr1$0"] },
    },
    (v) =>
      v.callExpression(
        [22, 9, 44, 6],
        v.propertyAccessExpression(
          [22, 9, 22, 20],
          v.splice([22, 9, 22, 16], "$orders"),
          false,
          "map",
        ),
        false,
        [
          v.arrowFunction(
            [23, 7, 43, 11],
            [v.identifier([23, 8, 23, 13], "order", "order$kpf5b5091dr1$0")],
            v.splice([24, 9, 43, 11], "$0splice0"),
          ),
        ],
      ),
  ),
});
