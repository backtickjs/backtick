import { cs } from "@backtickjs/core";

// Every part of the header is optional: this one declares nothing and updates
// nothing, leaving both to the block around it and the body.
const forHeaderParts = cs.lift((() => {
    let __cs_i = 0;
    let __cs_seen = "";
    for (; __cs_i < 3;) {
        __cs_seen = cs.const(__cs_seen + __cs_i);
        __cs_i = cs.const(__cs_i + 1);
    }
    return cs.const(__cs_seen);
})());
