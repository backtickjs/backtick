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
    cs.create(
      "1qtri6ano7i0b:37:4",
      {
        params: [
          { kind: "splice", value: orders, bindings: [] },
          { kind: "tag", value: For },
        ],
      },
      '($splice0, $tag1) => <div>\n      <$tag1 each={$splice0()}>\n        {(order) => (<div>\n            <img src={"https://img.example.com/" + order.id + ".png"} alt=""/>\n            <span>{order.customer.name}</span>\n            <span>{order.customer.city}</span>\n            <$tag1 each={order.items}>\n              {(item) => <span>{item.sku + " x" + item.qty}</span>}\n            </$tag1>\n            <span>{"$" + order.total}</span>\n          </div>)}\n      </$tag1>\n    </div>',
      '{"version":3,"file":"large-data.test.jsx","sourceRoot":"","sources":["jsx/large-data.test.tsx"],"names":[],"mappings":"AAoCO,qBAAA,CAAC,GAAG,CACL;MAAA,CAAC,KAAG,CAAC,IAAI,CAAC,CAAC,UAAO,CAAC,CACjB;QAAA,CAAC,CAAC,KAAY,EAAE,EAAE,CAAC,CACjB,CAAC,GAAG,CACF;YAAA,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,0BAA0B,GAAG,KAAK,CAAC,EAAE,GAAG,MAAM,CAAC,CAAC,GAAG,CAAC,EAAE,EAChE;YAAA,CAAC,IAAI,CAAC,CAAC,KAAK,CAAC,QAAQ,CAAC,IAAI,CAAC,EAAE,IAAI,CACjC;YAAA,CAAC,IAAI,CAAC,CAAC,KAAK,CAAC,QAAQ,CAAC,IAAI,CAAC,EAAE,IAAI,CACjC;YAAA,CAAC,KAAG,CAAC,IAAI,CAAC,CAAC,KAAK,CAAC,KAAK,CAAC,CACrB;cAAA,CAAC,CAAC,IAAU,EAAE,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,GAAG,GAAG,IAAI,GAAG,IAAI,CAAC,GAAG,CAAC,EAAE,IAAI,CAAC,CAC5D;YAAA,EAAE,KAAG,CACL;YAAA,CAAC,IAAI,CAAC,CAAC,GAAG,GAAG,KAAK,CAAC,KAAK,CAAC,EAAE,IAAI,CACjC;UAAA,EAAE,GAAG,CAAC,CACP,CACH;MAAA,EAAE,KAAG,CACP;IAAA,EAAE,GAAG,CAAC"}',
    ),
  );
});
