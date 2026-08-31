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
export default cs`{
  const stop = clearInterval;
  const repeating = setInterval(() => 0, 1000);
  stop(repeating);
  clearTimeout(setTimeout(() => 0, 1000));
}`;
