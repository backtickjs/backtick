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
            code: "export default $0 => $0();",
            map: '{"version":3,"mappings":"eAqCoBA,EAAA,IAAAA,EAAA,EAAO","names":["$0"],"ignoreList":[],"sources":["large-data.test.tsx"]}',
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
                          code: 'export default $0 => "https://img.example.com/" + $0.id + ".png";',
                          map: '{"version":3,"mappings":"eA0CwBA,EAAA,8BAA0B,GAAGA,EAAK,CAACC,EAAE,GAAG,MAAM","names":["$0","id"],"ignoreList":[],"sources":["large-data.test.tsx"]}',
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
                          code: "export default $0 => $0.customer.name;",
                          map: '{"version":3,"mappings":"eA6CwBA,EAAA,IAAAA,EAAK,CAACC,QAAQ,CAACC,IAAI","names":["$0","customer","name"],"ignoreList":[],"sources":["large-data.test.tsx"]}',
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
                          code: "export default $0 => $0.customer.city;",
                          map: '{"version":3,"mappings":"eA8CwBA,EAAA,IAAAA,EAAK,CAACC,QAAQ,CAACC,IAAI","names":["$0","customer","city"],"ignoreList":[],"sources":["large-data.test.tsx"]}',
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
                          code: "export default $0 => $0.items;",
                          map: '{"version":3,"mappings":"eA+C4BA,EAAA,IAAAA,EAAK,CAACC,KAAK","names":["$0","items"],"ignoreList":[],"sources":["large-data.test.tsx"]}',
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
                                    code: 'export default $0 => $0.sku + " x" + $0.qty;',
                                    map: '{"version":3,"mappings":"eAiD+BA,EAAA,IAAAA,EAAI,CAACC,GAAG,GAAG,IAAI,GAAGD,EAAI,CAACE,GAAG","names":["$0","sku","qty"],"ignoreList":[],"sources":["large-data.test.tsx"]}',
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
                          code: "export default $0 => item => $0(item);",
                          map: '{"version":3,"mappings":"eAgDoBA,EAAA,IAACC,IAAU,IACbD,EAAA,CAAAC,IAAA,CAAC","names":["$0","item"],"ignoreList":[],"sources":["large-data.test.tsx"]}',
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
                          code: 'export default $0 => "$" + $0.total;',
                          map: '{"version":3,"mappings":"eAmDwBA,EAAA,OAAG,GAAGA,EAAK,CAACC,KAAK","names":["$0","total"],"ignoreList":[],"sources":["large-data.test.tsx"]}',
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
            code: "export default $0 => order => $0(order);",
            map: '{"version":3,"mappings":"eAsCYA,EAAA,IAACC,KAAY,IACfD,EAAA,CAAAC,KAAA,CAAC","names":["$0","order"],"ignoreList":[],"sources":["large-data.test.tsx"]}',
            imports: [],
            exportAt: 0,
          },
        ),
      }),
    }),
  );
});
