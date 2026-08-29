import type { WebBuiltins, Window } from "@backtickjs/web-schema";

/**
 * What this target answers for, beside the language's own.
 *
 * Written out rather than handed the host's `window`, the way the language's
 * table is: a member the schema left out stays left out instead of arriving
 * because JavaScript happens to have it. A frame's `contentWindow` is the
 * host's own object, and what may be read off one there is the schema's
 * question rather than this file's.
 *
 * `WebBuiltins` and not `Builtins`, which is every name in scope: a name added
 * to the schema stops this file compiling until it is answered.
 */
export const builtins: WebBuiltins = {
  window: {
    // Only `now`. What ports is the difference between two readings, not the
    // time of day.
    performance: {
      now: () => performance.now(),
    },

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
    },

    // On the window, which is what is left once an element's own events are
    // props on that element.
    addEventListener: (type: string, listener: unknown) => {
      globalThis.addEventListener(type, listener as EventListener);
    },

    // Matched by identity, as in a browser: a closure held in a name and passed
    // twice removes what it added, and the same arrow written twice does not.
    removeEventListener: (type: string, listener: unknown) => {
      globalThis.removeEventListener(type, listener as EventListener);
    },

    postMessage: (message: unknown, targetOrigin: string) => {
      globalThis.postMessage(message, targetOrigin);
    },
    // Cast through the brand, the way `state` is one layer down.
  } as unknown as Window,
};
