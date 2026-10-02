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
    cs.lift(((__cs_For = cs.splice(For)) => <div>{<__cs_For each={cs.splice((orders))}>{(__cs_order: Order) => (<div>{<img src={"https://img.example.com/" + __cs_order.id + ".png"} alt={""}/>}{<span>{__cs_order.customer.name}</span>}{<span>{__cs_order.customer.city}</span>}{<__cs_For each={__cs_order.items}>{(__cs_item: Item) => <span>{__cs_item.sku + " x" + __cs_item.qty}</span>}</__cs_For>}{<span>{"$" + __cs_order.total}</span>}</div>)}</__cs_For>}</div>)()),
  );
});
