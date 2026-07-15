import { cs } from "@backtickjs/core";

// Splices evaluate when the `cs` expression does, in metadata dictionary
// order: braced first, in span order, then unbraced. The `$count` read runs
// after the `${count++}` beside it, so `a` observes the increment even
// though it is spliced first.
let count = 0;

export default cs.lift({ a: cs.splice($count), b: cs.splice(count++) });
