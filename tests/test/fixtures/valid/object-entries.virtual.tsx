import { cs } from "@backtickjs/core";

// A record read as pairs and built back from them: how a script makes a record
// whose keys it only learns when it runs.
export default cs.lift((() => {
    const __cs_held = cs.const({ n: 1, q: "ada" });
    const __cs_written = cs.const(cs.receiver(Object).fromEntries(cs.receiver(cs.receiver(Object).entries(__cs_held)).map(__cs_pair => [cs.receiver(__cs_pair)[0], cs.receiver(JSON).stringify(cs.receiver(__cs_pair)[1])])));
    return cs.const(cs.receiver(__cs_written).n + " " + cs.receiver(__cs_written).q);
})());
