import { cs } from "@backtickjs/core";

// Each level splices the level below it twice, so the composition graph is a
// diamond lattice with exponentially many root-to-leaf paths. The bundler shares
// each script rather than re-expanding it per path, so the payload has one entry
// per level (linear) — not one per path, which would blow up as 2^depth.
const d0 = cs.liftValue(1);
const d1 = cs.liftValue((() => {
    return cs.spliceValue((d0)) + cs.spliceValue((d0));
})());
const d2 = cs.liftValue((() => {
    return cs.spliceValue((d1)) + cs.spliceValue((d1));
})());
const d3 = cs.liftValue((() => {
    return cs.spliceValue((d2)) + cs.spliceValue((d2));
})());
const d4 = cs.liftValue((() => {
    return cs.spliceValue((d3)) + cs.spliceValue((d3));
})());

export default d4;
