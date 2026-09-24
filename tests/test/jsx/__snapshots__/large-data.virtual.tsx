import { it } from "node:test";
import { cs, For } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

type Item = { sku: string; qty: number };

type Order = {
  id: string;
  customer: { name: string; city: string };
  items: Item[];
  total: number;
};

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
    <div>
      <For each={cs.lift((cs.splice((orders)) satisfies typeof cs.ClientUnknown))}>
        {cs.lift((__cs_order: Order) => (cs.splice((
            <div>
              <img
                src={cs.lift("https://img.example.com/" + __cs_order.id + ".png")}
                alt=""
              />
              <span>{cs.lift(__cs_order.customer.name)}</span>
              <span>{cs.lift(__cs_order.customer.city)}</span>
              <For each={cs.lift(__cs_order.items)}>
                {cs.lift((__cs_item: Item) => (cs.splice((<span>{cs.lift(__cs_item.sku + " x" + __cs_item.qty)}</span>)) satisfies typeof cs.ClientUnknown))}
              </For>
              <span>{cs.lift("$" + __cs_order.total)}</span>
            </div>
          )) satisfies typeof cs.ClientUnknown))}
      </For>
    </div>,
  );
});
