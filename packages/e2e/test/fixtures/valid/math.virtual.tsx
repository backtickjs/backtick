import { cs } from "@backtickjs/core";

// The one global. What it is, is the host's to answer; which members exist and
// what each means is the format's, which is why the list is short — only the
// members every host can agree on to the last bit are here.
export default cs.lift((() => {
    const __cs_rounded = cs.const(cs.receiver(Math).round(2.5) + "," + cs.receiver(Math).round(-cs.number(2.5)) + "," + cs.receiver(Math).round(-cs.number(0.5)));
    const __cs_edges = cs.const(cs.receiver(Math).floor(-cs.number(1.5)) + "," + cs.receiver(Math).ceil(-cs.number(1.5)) + "," + cs.receiver(Math).trunc(-cs.number(1.5)));
    const __cs_picks = cs.const(cs.receiver(Math).min(3, 1, 2) + "," + cs.receiver(Math).max(3, 1, 2) + "," + cs.receiver(Math).abs(-cs.number(4)));
    return cs.const(__cs_rounded + "|" + __cs_edges + "|" + __cs_picks + "|" + cs.receiver(Math).sqrt(9) + "," + cs.receiver(Math).sign(-cs.number(8)) + "," + cs.receiver(Math).fround(1.5) + "|" + (cs.receiver(Math).PI > 3.14) + "," + (cs.receiver(Math).E > 2.71));
})());
