import { cs, For, Image, Text, View } from "@backtickjs/core";

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
export default (
  <View>
    <For each={cs`$orders`}>
      {cs`(order: Order) =>
        ${(
          <View>
            <Image
              source={{
                uri: cs`"https://img.example.com/" + order.id + ".png"`,
              }}
            />
            <Text>{cs`order.customer.name`}</Text>
            <Text>{cs`order.customer.city`}</Text>
            <For each={cs`order.items`}>
              {cs`(item: Item) =>
                ${(<Text>{cs`item.sku + " x" + item.qty`}</Text>)}`}
            </For>
            <Text>{cs`"$" + order.total`}</Text>
          </View>
        )}`}
    </For>
  </View>
);
