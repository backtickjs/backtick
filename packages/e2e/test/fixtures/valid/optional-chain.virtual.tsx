import { cs } from "@backtickjs/core";

// `?.` propagates null one step: a null receiver reads as null — the
// language's absent value; `undefined` never arises. A chain spells `?.` at
// each access, and a null method receiver skips the call.
const pick = cs.liftValue((__cs_p: {
    x: number;
} | null) => {
    return (cs.virtualize(__cs_p)?.x ?? null);
});

const deep = cs.liftValue((__cs_o: {
    inner: {
        z: number;
    } | null;
} | null) => {
    return (cs.virtualize((cs.virtualize(__cs_o)?.inner ?? null))?.z ?? null);
});

const shout = cs.liftValue((__cs_s: string | null) => {
    return (cs.virtualize(__cs_s)?.concat("!") ?? null);
});

export default cs.liftValue({ found: cs.spliceValue((pick))({ x: 5 }), missing: cs.spliceValue((pick))(null), deep: cs.spliceValue((deep))({ inner: { z: 7 } }), cut: cs.spliceValue((deep))({ inner: null }), top: cs.spliceValue((deep))(null), loud: cs.spliceValue((shout))("hi"), silent: cs.spliceValue((shout))(null) });
