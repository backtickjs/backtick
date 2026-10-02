import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
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
    cs`<div>
      <For each={$orders}>
        {(order: Order) => (
          <div>
            <img src={"https://img.example.com/" + order.id + ".png"} alt="" />
            <span>{order.customer.name}</span>
            <span>{order.customer.city}</span>
            <For each={order.items}>
              {(item: Item) => <span>{item.sku + " x" + item.qty}</span>}
            </For>
            <span>{"$" + order.total}</span>
          </div>
        )}
      </For>
    </div>`,
  );
});
