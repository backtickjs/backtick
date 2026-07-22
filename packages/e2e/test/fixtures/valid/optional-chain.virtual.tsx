import { cs } from "@backtickjs/core";

// `?.` propagates null one step: a null receiver reads as null — the
// language's absent value; `undefined` never arises. A chain spells `?.` at
// each access, and a null method receiver skips the call.
const pick = cs.liftValue((__cs_p: {
    x: number;
} | null) => {
    return (cs.receiver(__cs_p)?.x ?? null);
});

const deep = cs.liftValue((__cs_o: {
    inner: {
        z: number;
    } | null;
} | null) => {
    return (cs.receiver((cs.receiver(__cs_o)?.inner ?? null))?.z ?? null);
});

const shout = cs.liftValue((__cs_s: string | null) => {
    return (cs.receiver(__cs_s)?.concat("!") ?? null);
});

export default cs.liftValue({ found: cs.splice((pick))({ x: 5 }), missing: cs.splice((pick))(null), deep: cs.splice((deep))({ inner: { z: 7 } }), cut: cs.splice((deep))({ inner: null }), top: cs.splice((deep))(null), loud: cs.splice((shout))("hi"), silent: cs.splice((shout))(null) });
