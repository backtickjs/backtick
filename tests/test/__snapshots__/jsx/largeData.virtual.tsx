import { cs, For } from "@backtickjs/core";

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

// The dataset ships once and the list expands on the client: one card template
// with holes for each order's fields (and a nested item list), mapped at
// runtime. The bundle carries the data plus a single card, not five expanded
// copies. The root View stays static; only its children map on the client.
const largeData = (
  <div>
    <For each={cs.lift(cs.const(cs.splice((orders)) satisfies typeof cs.ClientUnknown))}>
      {cs.lift(cs.const((__cs_order: Order) => cs.splice((
          <div>
            <img
              src={cs.lift(cs.const("https://img.example.com/" + cs.receiver(__cs_order).id + ".png"))}
              alt=""
            />
            <span>{cs.lift(cs.const(cs.receiver(cs.receiver(__cs_order).customer).name))}</span>
            <span>{cs.lift(cs.const(cs.receiver(cs.receiver(__cs_order).customer).city))}</span>
            <For each={cs.lift(cs.const(cs.receiver(__cs_order).items))}>
              {cs.lift(cs.const((__cs_item: Item) => cs.splice((<span>{cs.lift(cs.const(cs.receiver(__cs_item).sku + " x" + cs.receiver(__cs_item).qty))}</span>)) satisfies typeof cs.ClientUnknown))}
            </For>
            <span>{cs.lift(cs.const("$" + cs.receiver(__cs_order).total))}</span>
          </div>
        )) satisfies typeof cs.ClientUnknown))}
    </For>
  </div>
);
