import { cs } from "@backtickjs/core";

// Each level splices the level below it twice, so the composition graph is a
// diamond lattice with exponentially many root-to-leaf paths. The bundler shares
// each script rather than re-expanding it per path, so the payload has one entry
// per level (linear) — not one per path, which would blow up as 2^depth.
const d0 = cs.lift(1);
const d1 = cs.lift((() => {
    return cs.lower(d0) + cs.lower(d0);
})());
const d2 = cs.lift((() => {
    return cs.lower(d1) + cs.lower(d1);
})());
const d3 = cs.lift((() => {
    return cs.lower(d2) + cs.lower(d2);
})());
const d4 = cs.lift((() => {
    return cs.lower(d3) + cs.lower(d3);
})());

export default d4;
