import { cs } from "@backtickjs/core";

// `?.` propagates null one step: a null receiver reads as null — the
// language's absent value; `undefined` never arises. A chain spells `?.` at
// each access, and a null method receiver skips the call.
const pick = cs.lift(cs.const((__cs_p: {
    x: number;
} | null) => {
    return cs.const(cs.receiver(__cs_p)?.x);
}));

const deep = cs.lift(cs.const((__cs_o: {
    inner: {
        z: number;
    } | null;
} | null) => {
    return cs.const(cs.receiver(cs.receiver(__cs_o)?.inner)?.z);
}));

const shout = cs.lift(cs.const((__cs_s: string | null) => {
    return cs.const(cs.receiver(__cs_s)?.concat("!"));
}));

export default cs.lift(cs.const({ found: (cs.splice((pick)) satisfies typeof cs.ClientUnknown)({ x: 5 }), missing: (cs.splice((pick)) satisfies typeof cs.ClientUnknown)(null), deep: (cs.splice((deep)) satisfies typeof cs.ClientUnknown)({ inner: { z: 7 } }), cut: (cs.splice((deep)) satisfies typeof cs.ClientUnknown)({ inner: null }), top: (cs.splice((deep)) satisfies typeof cs.ClientUnknown)(null), loud: (cs.splice((shout)) satisfies typeof cs.ClientUnknown)("hi"), silent: (cs.splice((shout)) satisfies typeof cs.ClientUnknown)(null) }));
