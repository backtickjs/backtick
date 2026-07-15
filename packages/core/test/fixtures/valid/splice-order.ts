import { cs } from "@backtickjs/core";

// Splices evaluate when the `cs` expression does, left to right in source
// order, like a real template literal's spans — braced and unbraced alike:
// the `$count` read sees 0 before `${++count}` bumps it to 1.
let count = 0;

export default cs`({ a: $count, b: ${++count} })`;
