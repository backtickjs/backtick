import { cs } from "@backtickjs/core";

// The one thing the language cannot do for itself: produce a sequence of a
// given length. Everything else about an array is a transformation of one that
// already exists.
//
// The mapper's first argument is always `null` — the standard library passes
// the element it found, and against a `{ length }` source there is none.
export default cs.lift((() => {
    const __cs_doubled = cs.const(cs.receiver(Array).from({ length: 4 }, (__cs__, __cs_index) => __cs_index * 2));
    const __cs_empty = cs.const(cs.receiver(Array).from({ length: 0 }, (__cs__, __cs_index) => __cs_index));
    const __cs_absent = cs.const(cs.receiver(Array).from({ length: 2 }, (__cs_value, __cs_index) => __cs_value === null ? __cs_index : -cs.number(1)));
    return cs.const(cs.receiver(__cs_doubled).join(",") + "|" + cs.receiver(__cs_empty).length + "|" + cs.receiver(__cs_absent).join(","));
})());
