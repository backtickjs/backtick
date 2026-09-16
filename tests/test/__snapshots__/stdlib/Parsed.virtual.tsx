import { cs } from "@backtickjs/core";

// A namespace static, reached the way `Math.floor` and `Array.from` are: the
// whole of `Number.parseInt` is one name the client answers, so `Number` is a
// front rather than a value and nothing is read off it.
async function Parsed() {
  return cs.lift((() => {
    const __cs_whole = cs.const(cs.receiver(Number).parseInt("42px"));
    const __cs_based = cs.const(cs.receiver(Number).parseInt("ff", 16));
    const __cs_fractional = cs.const(cs.receiver(Number).parseFloat("1.5"));
    return cs.const(<span>{cs.lift(__cs_whole + __cs_based + __cs_fractional + "")}</span>);
})());
}
