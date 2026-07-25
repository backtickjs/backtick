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
export default (
  <View>
    {cs`$orders.map(
      (order) =>
        ${(
          <View key={cs`order.id`}>
            <Image
              source={{
                uri: cs`"https://img.example.com/" + order.id + ".png"`,
              }}
            />
            <Text>{cs`order.customer.name`}</Text>
            <Text>{cs`order.customer.city`}</Text>
            {cs`order.items.map(
              (item) =>
                ${(
                  <Text key={cs`item.sku`}>
                    {cs`item.sku + " x" + item.qty`}
                  </Text>
                )},
            )`}
            <Text>{cs`"$" + order.total`}</Text>
          </View>
        )},
    )`}
  </View>
);
