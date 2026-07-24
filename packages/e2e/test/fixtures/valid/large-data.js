import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs } from "@backtickjs/core";
const Button = (props) => ({
  "@backtickjs": "ClientElement",
  id: "Button",
  props,
});
// A realistic data-heavy tree: one element carrying a sizable dataset as a
// plain data prop, so the wire cost of the `value`/`array`/`object`
// envelopes shows up at scale rather than on toy literals.
const orders = Array.from({ length: 5 }, (_, i) => ({
  id: `ord-${1000 + i}`,
  customer: {
    name: `Customer ${i}`,
    city: i % 2 === 0 ? "Montréal" : "Toronto",
  },
  items: [
    { sku: `SKU-${i}-A`, qty: (i % 3) + 1, price: 19.99 },
    { sku: `SKU-${i}-B`, qty: 1, price: 5.25 },
  ],
  total: 45.23 + i,
  paid: i % 4 !== 0,
  coupon: i % 5 === 0 ? `SAVE${i}` : null,
}));
export default _jsx(Button, {
  data: orders,
  onA: cs.create(
    [28, 30, 28, 70],
    {
      version: "0.0.0",
      filePath: "large-data.tsx",
      fileHash: "3fomp7p2xf69f",
      kind: "value",
      splices: { $0splice0: { orders, currency: "CAD" } },
      captures: [],
      declarations: [],
    },
    (v) =>
      v.arrow([28, 33, 28, 69], [], v.splice([28, 39, 28, 69], "$0splice0")),
  ),
});
