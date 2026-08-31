import { cs } from "@backtickjs/core";

// A clock, and the shape of a name that is not a front.
//
// `Math.floor` is a namespace and a member folded into one name the client
// answers; these arrive whole, so they read as a value where a front cannot —
// bound to a variable and handed on, the same as any builtin function.
//
// An action rather than a value, and not by preference: starting a timer is a
// side effect, and a script that returns one cannot have those. Which is where
// a timer is started anyway — a handler is an action.
//
// Started and stopped in the one body, so nothing is left ticking after this is
// evaluated: what it pins is the lowering and the names, not the waiting. And
// either `clear` cancels either kind, which is why one of them is reached
// through the other's id.
export default cs.lift((() => {
    const __cs_stop = cs.const(cs.receiver(clearInterval));
    const __cs_repeating = cs.const(cs.receiver(setInterval)(() => 0, 1000));
    cs.statement(__cs_stop(__cs_repeating));
    cs.statement(cs.receiver(clearTimeout)(cs.receiver(setTimeout)(() => 0, 1000)));
})());
