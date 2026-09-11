import { cs } from "@backtickjs/core";

// The members ES2015 added that this language answers for: a search that
// finds nothing reads as `undefined`, as a read past the end does, and
// everything else is what the standard library says it is.
export default cs.lift((() => {
    const __cs_xs = cs.const([3, 8, 12, 5]);
    const __cs_word = cs.const("backtick");
    return cs.const({ found: cs.receiver(__cs_xs).find(__cs_x => __cs_x > 7), missing: cs.receiver(__cs_xs).find(__cs_x => __cs_x > 100) === undefined, at: cs.receiver(__cs_xs).findIndex(__cs_x => __cs_x > 7), nowhere: cs.receiver(__cs_xs).findIndex(__cs_x => __cs_x > 100), includes: cs.receiver(__cs_word).includes("tick"), startsWith: cs.receiver(__cs_word).startsWith("back"), endsWith: cs.receiver(__cs_word).endsWith("tick", 4), repeated: cs.receiver("ab").repeat(3), codePoint: cs.receiver("\uD83D\uDE00").codePointAt(0), keys: cs.receiver(Object).keys({ a: 1, b: 2 }) });
})());
