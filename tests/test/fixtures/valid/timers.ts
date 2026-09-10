import { cs } from "@backtickjs/core";
import { window } from "@backtickjs/web";

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
export default cs`{
  const stop = $window.clearInterval;
  const repeating = $window.setInterval(() => 0, 1000);
  stop(repeating);
  $window.clearTimeout($window.setTimeout(() => 0, 1000));
}`;
