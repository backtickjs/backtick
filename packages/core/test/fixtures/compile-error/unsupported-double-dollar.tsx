import { cs } from "@backtickjs/core";

const $x = 1;

// A `$`-prefixed host binding has no unbraced shorthand — `$$x` stacks
// sigils unreadably — so it splices braced, as the second splice does.
export default cs`$$x + ${$x}`;
