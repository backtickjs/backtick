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
    {cs.lift(cs.const(cs.receiver(cs.splice((orders))).map(__cs_order => cs.splice((
          <View>
            <Image
              source={{
                uri: cs.lift(cs.const("https://img.example.com/" + cs.receiver(__cs_order).id + ".png")),
              }}
            />
            <Text>{cs.lift(cs.const(cs.receiver(cs.receiver(__cs_order).customer).name))}</Text>
            <Text>{cs.lift(cs.const(cs.receiver(cs.receiver(__cs_order).customer).city))}</Text>
            {cs.lift(cs.const(cs.receiver(cs.receiver(__cs_order).items).map(__cs_item => cs.splice((
                  <Text>
                    {cs.lift(cs.const(cs.receiver(__cs_item).sku + " x" + cs.receiver(__cs_item).qty))}
                  </Text>
                )))))}
            <Text>{cs.lift(cs.const("$" + cs.receiver(__cs_order).total))}</Text>
          </View>
        )))))}
  </View>
);
