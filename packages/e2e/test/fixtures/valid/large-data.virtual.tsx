import { Image, Text, View } from "@backtickjs/core";

// A data-heavy tree: a dataset rendered into a View/Text/Image component tree,
// one card per order, so the wire cost of a real rendered list shows up at
// scale rather than on toy literals.
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

export default (
  <View>
    {orders.map((order) => (
      <View key={order.id}>
        <Image source={{ uri: `https://img.example.com/${order.id}.png` }} />
        <Text>{order.customer.name}</Text>
        <Text>{order.customer.city}</Text>
        <View>
          {order.items.map((item) => (
            <Text key={item.sku}>{`${item.sku} x${item.qty}`}</Text>
          ))}
        </View>
        <Text>{`$${order.total.toFixed(2)}`}</Text>
      </View>
    ))}
  </View>
);
