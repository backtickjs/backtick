import type { Builtins } from "@backtickjs/web-schema";

/**
 * What this target answers for, beside the language's own.
 *
 * The names are the schema's, whole, as the wire carries them — a bundle
 * reaches one by its name alone. What is here is what a script cannot reach any
 * other way: an element's own events arrive as props on that element, and these
 * are the rest.
 *
 * Written out rather than handed the host's objects, the way the language's own
 * table is: `console.log` is a function this file names and forwards, so a
 * member the schema left out stays left out instead of arriving because
 * JavaScript happens to have it.
 *
 * Picked from `Builtins` rather than typed as it: that name is the whole chain,
 * the language's own included, and what a target hands over is only what it
 * adds. `builtinsOf` puts the two together and throws if this shadows one of
 * those.
 */
type WebBuiltins = Pick<
  Builtins,
  "performance" | "console" | "addEventListener" | "removeEventListener"
>;

export const builtins: WebBuiltins = {
  // Only `now`, because only the difference between two readings ports. A clock
  // that says what time it is somewhere is not a thing every client has.
  // The cast reads through a brand, the way `state` does one layer down: a
  // handle's type says opaque, and its being an object of closures underneath
  // is this client's knowledge rather than the schema's.
  performance: {
    now: () => performance.now(),
  } as unknown as Builtins["performance"],

  // Forwarded one name at a time. Bound to the host's console, which is what
  // makes the browser report the line a call came from rather than this file.
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
  } as unknown as Builtins["console"],

  // On the window, because that is what is left once an element's own events
  // are props: something happening where nothing drawn here is the target.
  addEventListener: ((type: string, listener: (event: unknown) => void) => {
    globalThis.addEventListener(type, listener as EventListener);
  }) as unknown as Builtins["addEventListener"],

  // The DOM matches a listener by identity, so what is handed here has to be
  // the same function that was handed to `addEventListener`. A script holding
  // one in a `const` and passing that twice removes what it added; a script
  // writing the arrow out twice does not, exactly as in a browser.
  removeEventListener: ((type: string, listener: (event: unknown) => void) => {
    globalThis.removeEventListener(type, listener as EventListener);
  }) as unknown as Builtins["removeEventListener"],
};
