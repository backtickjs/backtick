import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
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
          "1kp1hmxk5fcuo:38:17",
          { params: [{ kind: "splice", value: orders, bindings: [] }] },
          {
            code: "export default ($0) => $0();",
            map: '{"version":3,"file":"large-data.test.jsx","sourceRoot":"","sources":["large-data.test.tsx"],"names":[],"mappings":"eAqCoB,QAAA,IAAO"}',
            imports: [],
            exportAt: 0,
          },
        ),
        children: cs.create(
          "1kp1hmxk5fcuo:39:9",
          {
            params: [
              {
                kind: "splice",
                value: _jsxs("div", {
                  children: [
                    _jsx("img", {
                      src: cs.create(
                        "1kp1hmxk5fcuo:43:21",
                        {
                          params: [
                            { kind: "capture", key: "order$1kp1hmxk5fcuo$0" },
                          ],
                        },
                        {
                          code: 'export default ($0) => "https://img.example.com/" + $0.id + ".png";',
                          map: '{"version":3,"file":"large-data.test.jsx","sourceRoot":"","sources":["large-data.test.tsx"],"names":[],"mappings":"eA0CwB,QAAA,0BAA0B,GAAG,EAAK,CAAC,EAAE,GAAG,MAAM"}',
                          imports: [],
                          exportAt: 0,
                        },
                      ),
                      alt: "",
                    }),
                    _jsx("span", {
                      children: cs.create(
                        "1kp1hmxk5fcuo:46:21",
                        {
                          params: [
                            { kind: "capture", key: "order$1kp1hmxk5fcuo$0" },
                          ],
                        },
                        {
                          code: "export default ($0) => $0.customer.name;",
                          map: '{"version":3,"file":"large-data.test.jsx","sourceRoot":"","sources":["large-data.test.tsx"],"names":[],"mappings":"eA6CwB,QAAA,EAAK,CAAC,QAAQ,CAAC,IAAI"}',
                          imports: [],
                          exportAt: 0,
                        },
                      ),
                    }),
                    _jsx("span", {
                      children: cs.create(
                        "1kp1hmxk5fcuo:47:21",
                        {
                          params: [
                            { kind: "capture", key: "order$1kp1hmxk5fcuo$0" },
                          ],
                        },
                        {
                          code: "export default ($0) => $0.customer.city;",
                          map: '{"version":3,"file":"large-data.test.jsx","sourceRoot":"","sources":["large-data.test.tsx"],"names":[],"mappings":"eA8CwB,QAAA,EAAK,CAAC,QAAQ,CAAC,IAAI"}',
                          imports: [],
                          exportAt: 0,
                        },
                      ),
                    }),
                    _jsx(For, {
                      each: cs.create(
                        "1kp1hmxk5fcuo:48:25",
                        {
                          params: [
                            { kind: "capture", key: "order$1kp1hmxk5fcuo$0" },
                          ],
                        },
                        {
                          code: "export default ($0) => $0.items;",
                          map: '{"version":3,"file":"large-data.test.jsx","sourceRoot":"","sources":["large-data.test.tsx"],"names":[],"mappings":"eA+C4B,QAAA,EAAK,CAAC,KAAK"}',
                          imports: [],
                          exportAt: 0,
                        },
                      ),
                      children: cs.create(
                        "1kp1hmxk5fcuo:49:17",
                        {
                          params: [
                            {
                              kind: "splice",
                              value: _jsx("span", {
                                children: cs.create(
                                  "1kp1hmxk5fcuo:50:28",
                                  {
                                    params: [
                                      {
                                        kind: "capture",
                                        key: "item$1kp1hmxk5fcuo$1",
                                      },
                                    ],
                                  },
                                  {
                                    code: 'export default ($0) => $0.sku + " x" + $0.qty;',
                                    map: '{"version":3,"file":"large-data.test.jsx","sourceRoot":"","sources":["large-data.test.tsx"],"names":[],"mappings":"eAiD+B,QAAA,EAAI,CAAC,GAAG,GAAG,IAAI,GAAG,EAAI,CAAC,GAAG"}',
                                    imports: [],
                                    exportAt: 0,
                                  },
                                ),
                              }),
                              bindings: ["item$1kp1hmxk5fcuo$1"],
                            },
                          ],
                        },
                        {
                          code: "export default ($0) => (item) => $0(item);",
                          map: '{"version":3,"file":"large-data.test.jsx","sourceRoot":"","sources":["large-data.test.tsx"],"names":[],"mappings":"eAgDoB,QAAA,CAAC,IAAU,EAAE,EAAE,CACjB,QAAC"}',
                          imports: [],
                          exportAt: 0,
                        },
                      ),
                    }),
                    _jsx("span", {
                      children: cs.create(
                        "1kp1hmxk5fcuo:52:21",
                        {
                          params: [
                            { kind: "capture", key: "order$1kp1hmxk5fcuo$0" },
                          ],
                        },
                        {
                          code: 'export default ($0) => "$" + $0.total;',
                          map: '{"version":3,"file":"large-data.test.jsx","sourceRoot":"","sources":["large-data.test.tsx"],"names":[],"mappings":"eAmDwB,QAAA,GAAG,GAAG,EAAK,CAAC,KAAK"}',
                          imports: [],
                          exportAt: 0,
                        },
                      ),
                    }),
                  ],
                }),
                bindings: ["order$1kp1hmxk5fcuo$0"],
              },
            ],
          },
          {
            code: "export default ($0) => (order) => $0(order);",
            map: '{"version":3,"file":"large-data.test.jsx","sourceRoot":"","sources":["large-data.test.tsx"],"names":[],"mappings":"eAsCY,QAAA,CAAC,KAAY,EAAE,EAAE,CACnB,SAAC"}',
            imports: [],
            exportAt: 0,
          },
        ),
      }),
    }),
  );
});
