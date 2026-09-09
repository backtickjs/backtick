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
      now: () => window.performance.now(),
    },

    // Bound to the host's, so the browser reports the line a call came from
    // rather than this file.
    console: {
      log: (...values: unknown[]) => {
        window.console.log(...values);
      },
      warn: (...values: unknown[]) => {
        window.console.warn(...values);
      },
      error: (...values: unknown[]) => {
        window.console.error(...values);
      },
    },

    // On the window, which is what is left once an element's own events are
    // props on that element.
    addEventListener: (type: string, listener: unknown) => {
      window.addEventListener(type, listener as EventListener);
    },

    // Matched by identity, as in a browser: a closure held in a name and passed
    // twice removes what it added, and the same arrow written twice does not.
    removeEventListener: (type: string, listener: unknown) => {
      window.removeEventListener(type, listener as EventListener);
    },

    postMessage: (message: unknown, targetOrigin: string) => {
      window.postMessage(message, targetOrigin);
    },

    // A clock is the host's rather than the language's, so the timers are here
    // beside the rest of what a window holds. A script reaches one by splicing
    // the window — `$window.setTimeout(…)` — and never as a bare name.
    setTimeout: (handler: () => void, timeout?: number) => {
      const id = ++last;
      pending.set(
        id,
        window.setTimeout(() => {
          // Dropped before it runs: an id that has fired is one nothing has
          // left to cancel, and holding it would be a leak that grows by one
          // per timer for as long as the page is open.
          pending.delete(id);
          handler();
        }, timeout),
      );
      return id;
    },
    clearTimeout: cancel,

    // Kept, where a timeout drops itself: a tick that fired is a tick before
    // the next one, and the id stays good until something cancels it.
    setInterval: (handler: () => void, timeout?: number) => {
      const id = ++last;
      pending.set(id, window.setInterval(handler, timeout));
      return id;
    },
    clearInterval: cancel,
    // Cast through the brand, the way `state` is one layer down.
  } as unknown as Window,
};

// The handles, kept beside the ids rather than handed out as one.
//
// The number a script sees is this table's rather than the page's, so an id it
// was never given cancels nothing: a script clears what a script started, and a
// timer the app set around it is not something a bundle can reach.
const pending = new Map<
  number,
  ReturnType<typeof window.setTimeout | typeof window.setInterval>
>();
let last = 0;

// One series of ids whichever call made them, so either `clear` cancels either
// kind — the same as on the web, where a script that had to match the pair up
// would be keeping a book the platform does not.
function cancel(id: number): null {
  const held = pending.get(id);
  if (held === undefined) {
    // An id that already ran, or was never one, is not an error: the platform
    // says so, and a script that cancels twice is a script being careful.
    return null;
  }
  // One operation in a browser, and this holds both kinds of handle, so the
  // two names reach the same line.
  window.clearTimeout(held as ReturnType<typeof window.setTimeout>);
  window.clearInterval(held as ReturnType<typeof window.setInterval>);
  pending.delete(id);
  return null;
}
