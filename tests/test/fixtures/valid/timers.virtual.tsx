import { cs } from "@backtickjs/core";
import { window } from "@backtickjs/web-schema";

// A clock, which is the target's rather than the language's: a script reaches
// one by splicing the window, the same as anything else a target hands over.
//
// And the shape of a member read off a handle. `$window.clearInterval` is read
// as a value and handed on, which is what a name has to survive being — the
// call site below reaches it through a variable, not through the window.
//
// An action rather than a value, and not by preference: starting a timer is a
// side effect, and a script that returns one cannot have those. Which is where
// a timer is started anyway — a handler is an action.
//
// Started and stopped in the one body, so nothing is left ticking after this is
// evaluated: what it pins is the lowering and the names, not the waiting. And
// either clear cancels either kind, which is why one of them is reached through
// the other's id.
export default cs.lift((() => {
    const __cs_stop = cs.const(cs.receiver(cs.splice((window)) satisfies import("@backtickjs/core").ClientUnknown).clearInterval);
    const __cs_repeating = cs.const(cs.receiver(cs.splice((window)) satisfies import("@backtickjs/core").ClientUnknown).setInterval(() => 0, 1000));
    cs.statement(__cs_stop(__cs_repeating));
    cs.statement(cs.receiver(cs.splice((window)) satisfies import("@backtickjs/core").ClientUnknown).clearTimeout(cs.receiver(cs.splice((window)) satisfies import("@backtickjs/core").ClientUnknown).setTimeout(() => 0, 1000)));
})());
