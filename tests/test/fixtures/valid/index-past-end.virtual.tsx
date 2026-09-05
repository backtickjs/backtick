import { cs } from "@backtickjs/core";

// Where the two rules part company, pinned so a client implementer can see it:
// `names[9]` types as `string`, because TypeScript's indexed access says the
// element type, and reads as null, because the runtime read is total. Nothing
// faults; the type simply doesn't mention the floor under it.
export default cs.lift((() => {
    const __cs_names = cs.const(["zero", "one"]);
    return cs.const(cs.receiver(__cs_names)[9]);
})());
