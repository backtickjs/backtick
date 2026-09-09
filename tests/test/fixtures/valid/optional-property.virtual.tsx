import { cs } from "@backtickjs/core";

// `?` on a property means omittable: an absent member reads as null — the
// language's absent value; `undefined` never arises — and `?.` composes on
// top for the nullable reads.
const read = cs.lift(cs.const((__cs_o: {
    label: string;
    inner?: {
        z?: number;
    };
}) => {
    return cs.const([cs.receiver(__cs_o).label, cs.receiver(cs.receiver(__cs_o).inner)?.z ?? 0]);
}));

export default cs.lift(cs.const({ present: (cs.splice((read)) satisfies typeof cs.ClientUnknown)({ label: "a", inner: { z: 3 } }), partial: (cs.splice((read)) satisfies typeof cs.ClientUnknown)({ label: "b", inner: {} }), omitted: (cs.splice((read)) satisfies typeof cs.ClientUnknown)({ label: "c" }) }));
