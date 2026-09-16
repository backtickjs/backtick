import { cs } from "@backtickjs/core";

// Each level splices the level below it twice, so the composition graph is a
// diamond lattice with exponentially many root-to-leaf paths. The bundler shares
// each script rather than re-expanding it per path, so the payload has one entry
// per level (linear) — not one per path, which would blow up as 2^depth.
const d0 = cs.lift(cs.const(1));

const d1 = cs.lift((() => {
    return cs.const((cs.splice((d0)) satisfies typeof cs.ClientUnknown) + (cs.splice((d0)) satisfies typeof cs.ClientUnknown));
})());

const d2 = cs.lift((() => {
    return cs.const((cs.splice((d1)) satisfies typeof cs.ClientUnknown) + (cs.splice((d1)) satisfies typeof cs.ClientUnknown));
})());

const d3 = cs.lift((() => {
    return cs.const((cs.splice((d2)) satisfies typeof cs.ClientUnknown) + (cs.splice((d2)) satisfies typeof cs.ClientUnknown));
})());

const d4 = cs.lift((() => {
    return cs.const((cs.splice((d3)) satisfies typeof cs.ClientUnknown) + (cs.splice((d3)) satisfies typeof cs.ClientUnknown));
})());

const diamond = d4;
