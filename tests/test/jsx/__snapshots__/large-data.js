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
          "($splice0) => $splice0()",
          '{"version":3,"file":"large-data.test.jsx","sourceRoot":"","sources":["jsx/large-data.test.tsx"],"names":[],"mappings":"AAqCoB,cAAA,UAAO"}',
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
                        '($capture0) => "https://img.example.com/" + $capture0.id + ".png"',
                        '{"version":3,"file":"large-data.test.jsx","sourceRoot":"","sources":["jsx/large-data.test.tsx"],"names":[],"mappings":"AA0CwB,eAAA,0BAA0B,GAAG,SAAK,CAAC,EAAE,GAAG,MAAM"}',
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
                        "($capture0) => $capture0.customer.name",
                        '{"version":3,"file":"large-data.test.jsx","sourceRoot":"","sources":["jsx/large-data.test.tsx"],"names":[],"mappings":"AA6CwB,eAAA,SAAK,CAAC,QAAQ,CAAC,IAAI"}',
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
                        "($capture0) => $capture0.customer.city",
                        '{"version":3,"file":"large-data.test.jsx","sourceRoot":"","sources":["jsx/large-data.test.tsx"],"names":[],"mappings":"AA8CwB,eAAA,SAAK,CAAC,QAAQ,CAAC,IAAI"}',
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
                        "($capture0) => $capture0.items",
                        '{"version":3,"file":"large-data.test.jsx","sourceRoot":"","sources":["jsx/large-data.test.tsx"],"names":[],"mappings":"AA+C4B,eAAA,SAAK,CAAC,KAAK"}',
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
                                  '($capture0) => $capture0.sku + " x" + $capture0.qty',
                                  '{"version":3,"file":"large-data.test.jsx","sourceRoot":"","sources":["jsx/large-data.test.tsx"],"names":[],"mappings":"AAiD+B,eAAA,SAAI,CAAC,GAAG,GAAG,IAAI,GAAG,SAAI,CAAC,GAAG"}',
                                ),
                              }),
                              bindings: ["item$1kp1hmxk5fcuo$1"],
                            },
                          ],
                        },
                        "($splice0) => (item) => $splice0(item)",
                        '{"version":3,"file":"large-data.test.jsx","sourceRoot":"","sources":["jsx/large-data.test.tsx"],"names":[],"mappings":"AAgDoB,cAAA,CAAC,IAAU,EAAE,EAAE,CACjB,cAAC"}',
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
                        '($capture0) => "$" + $capture0.total',
                        '{"version":3,"file":"large-data.test.jsx","sourceRoot":"","sources":["jsx/large-data.test.tsx"],"names":[],"mappings":"AAmDwB,eAAA,GAAG,GAAG,SAAK,CAAC,KAAK"}',
                      ),
                    }),
                  ],
                }),
                bindings: ["order$1kp1hmxk5fcuo$0"],
              },
            ],
          },
          "($splice0) => (order) => $splice0(order)",
          '{"version":3,"file":"large-data.test.jsx","sourceRoot":"","sources":["jsx/large-data.test.tsx"],"names":[],"mappings":"AAsCY,cAAA,CAAC,KAAY,EAAE,EAAE,CACnB,eAAC"}',
        ),
      }),
    }),
  );
});
