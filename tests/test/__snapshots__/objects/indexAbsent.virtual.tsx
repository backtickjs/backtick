import { cs } from "@backtickjs/core";

// A key an object hasn't got reads as the language's one absent value. A
// record's member reads as `string | null` — a record says nothing about which
// keys it has — so this one is answered rather than assumed.
const answers: { [key: string]: string } = { here: "yes" };

const indexAbsent = cs.lift((() => {
    const __cs_names = cs.const(["zero", "one"]);
    const __cs_missing = cs.const(cs.receiver(cs.splice((answers)) satisfies typeof cs.ClientUnknown)["nowhere"] ?? "gone");
    return cs.const(cs.receiver(__cs_names)[1] + "/" + __cs_missing);
})());
