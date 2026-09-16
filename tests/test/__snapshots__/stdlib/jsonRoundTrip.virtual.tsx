import { cs } from "@backtickjs/core";

// Text in, value out, and back again. What round-trips is the format's to say —
// so what is here is what every host spells the same way, and a value a host
// could not hand back is not a value this admits.
const jsonRoundTrip = cs.lift((() => {
    const __cs_numbers = cs.const(cs.receiver(JSON).stringify([1, 2, 3]));
    const __cs_text = cs.const(cs.receiver(JSON).stringify("hi"));
    const __cs_flag = cs.const(cs.receiver(JSON).stringify(true));
    const __cs_held = cs.const(cs.receiver(JSON).stringify({ a: 1, b: "two" }));
    const __cs_back = cs.const(cs.receiver(JSON).parse(__cs_numbers));
    return cs.const(__cs_numbers + "|" + __cs_text + "|" + __cs_flag + "|" + __cs_held + "|" + cs.receiver(JSON).stringify(__cs_back) + "|" + cs.receiver(JSON).stringify(cs.receiver(JSON).parse(__cs_held)));
})());
