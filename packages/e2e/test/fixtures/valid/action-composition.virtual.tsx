import { cs, type Client } from "@backtickjs/core";

// An action — a block with no `return` — types `Client<void>` natively and
// composes as a block running it in statement position.
const effects: Client<void> = cs.lift((() => {
    const __cs_x = cs.const(1);
})());

const composed: Client<void> = cs.lift((() => {
    cs.statement(cs.splice((effects)));
})());

export default cs.lift((() => {
    cs.statement(cs.splice((composed)));
})());
