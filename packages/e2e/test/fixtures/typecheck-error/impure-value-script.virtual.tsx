import { cs } from "@backtickjs/core";

// A value script computes: a spliced action or a void call in statement
// position fails; assignments and dead value computations stay legal.
const action = cs.liftAction((() => {
    const __cs_x = 1;
})());

const ping = cs.liftValue(() => {
    const __cs_x = 1;
});

export const script = cs.liftValue((() => {
    cs.spliceValue((action));
    return 1;
})());

export const branch = cs.liftValue((__cs_b: boolean) => {
    let __cs_n = 0;
    if ((cs.condition(__cs_b) && __cs_b)) {
        cs.liftValue(cs.spliceValue((ping))());
        __cs_n = 1;
    }
    cs.liftValue(__cs_n + 1);
    return __cs_n;
});
