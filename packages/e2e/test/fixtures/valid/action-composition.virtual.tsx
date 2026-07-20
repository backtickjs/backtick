import { cs, type Client } from "@backtickjs/core";

// An action — a block with no `return` — types `Client<void>` natively and
// composes as a block running it in statement position.
const effects: Client<void> = cs.liftAction((() => {
    const __cs_x = 1;
})());

const composed: Client<void> = cs.liftAction((() => {
    cs.spliceAction((effects));
})());

export default cs.liftAction((() => {
    cs.spliceAction((composed));
})());
