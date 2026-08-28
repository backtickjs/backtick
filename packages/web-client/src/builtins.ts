import type { WebBuiltins, Performance, Console } from "@backtickjs/web-schema";

/**
 * What this target answers for, beside the language's own.
 *
 * Written out rather than handed the host's objects, the way the language's
 * table is: a member the schema left out stays left out instead of arriving
 * because JavaScript happens to have it.
 *
 * `WebBuiltins` and not `Builtins`, which is every name in scope: a name added
 * to the schema stops this file compiling until it is answered.
 */
export const builtins: WebBuiltins = {
  // Only `now`. What ports is the difference between two readings, not the
  // time of day. Cast through the brand, the way `state` is one layer down.
  performance: {
    now: () => performance.now(),
  } as unknown as Performance,

  // Bound to the host's, so the browser reports the line a call came from
  // rather than this file.
  console: {
    log: (...values: unknown[]) => {
      console.log(...values);
    },
    warn: (...values: unknown[]) => {
      console.warn(...values);
    },
    error: (...values: unknown[]) => {
      console.error(...values);
    },
  } as unknown as Console,

  // On the window, which is what is left once an element's own events are props
  // on that element.
  addEventListener: (type, listener) => {
    globalThis.addEventListener(type, listener as unknown as EventListener);
  },

  // Matched by identity, as in a browser: a closure held in a name and passed
  // twice removes what it added, and the same arrow written twice does not.
  removeEventListener: (type, listener) => {
    globalThis.removeEventListener(type, listener as unknown as EventListener);
  },
};
