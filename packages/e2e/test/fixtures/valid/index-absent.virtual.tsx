import { cs } from "@backtickjs/core";

// A key an object hasn't got reads as the language's one absent value. A
// record's member reads as `string | null` — a record says nothing about which
// keys it has — so this one is answered rather than assumed.
const table: { [key: string]: string } = { here: "yes" };

export default cs.lift((() => {
    const __cs_names = cs.const(["zero", "one"]);
    const __cs_missing = cs.const(cs.receiver(cs.splice((table)))["nowhere"] ?? "gone");
    return cs.const(cs.receiver(__cs_names)[1] + "/" + __cs_missing);
})());
