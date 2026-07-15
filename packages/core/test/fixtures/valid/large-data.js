import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs } from "@backtickjs/core";
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
export default _jsx("button", { data: orders, onA: cs.create({ path: "large-data.tsx", start: { line: 21, character: 43 }, end: { line: 21, character: 83 } }, "1ws93k5", { splices: { $0splice0: { orders, currency: "CAD" } }, captures: [], declarations: [] }, v => v.arrow({ path: "large-data.tsx", start: { line: 21, character: 46 }, end: { line: 21, character: 82 } }, [], v.splice({ path: "large-data.tsx", start: { line: 21, character: 52 }, end: { line: 21, character: 82 } }, "$0splice0"))) });
