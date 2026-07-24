import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/core/jsx-runtime";
import { Image, Text, View } from "@backtickjs/core";
// A data-heavy tree: a dataset rendered into a View/Text/Image component tree,
// one card per order, so the wire cost of a real rendered list shows up at
// scale rather than on toy literals. The per-item `map` sits beside sibling
// elements — nested children, no hand-flattening (see `Children`).
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
export default _jsx(View, {
  children: orders.map((order) =>
    _jsxs(
      View,
      {
        children: [
          _jsx(Image, {
            source: { uri: `https://img.example.com/${order.id}.png` },
          }),
          _jsx(Text, { children: order.customer.name }),
          _jsx(Text, { children: order.customer.city }),
          order.items.map((item) =>
            _jsx(Text, { children: `${item.sku} x${item.qty}` }, item.sku),
          ),
          _jsx(Text, { children: `$${order.total.toFixed(2)}` }),
        ],
      },
      order.id,
    ),
  ),
});
