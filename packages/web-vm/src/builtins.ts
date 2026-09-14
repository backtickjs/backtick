import type { WebBuiltins, Window } from "@backtickjs/web-client";

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

    // Read through, so what a script reads is where the document is now rather
    // than where it was when this table was built. Going somewhere is a call —
    // the schema leaves every field read-only, so there is no write here to
    // answer for.
    location: {
      get href() {
        return window.location.href;
      },
      get origin() {
        return window.location.origin;
      },
      get protocol() {
        return window.location.protocol;
      },
      get host() {
        return window.location.host;
      },
      get hostname() {
        return window.location.hostname;
      },
      get port() {
        return window.location.port;
      },
      get pathname() {
        return window.location.pathname;
      },
      get search() {
        return window.location.search;
      },
      get hash() {
        return window.location.hash;
      },
      assign: (url: string) => {
        window.location.assign(url);
      },
      replace: (url: string) => {
        window.location.replace(url);
      },
      reload: () => {
        window.location.reload();
      },
    },

    // A clock is the host's rather than the language's, so the timers are here
    // beside the rest of what a window holds. A script reaches one by splicing
    // the window — `$window.setTimeout(…)` — and never as a bare name.
    setTimeout: (handler: () => void, timeout?: number) =>
      window.setTimeout(handler, timeout),
    clearTimeout: (id: number) => {
      window.clearTimeout(id);
    },
    setInterval: (handler: () => void, timeout?: number) =>
      window.setInterval(handler, timeout),
    clearInterval: (id: number) => {
      window.clearInterval(id);
    },
    // Cast through the brand, the way `state` is one layer down.
  } as unknown as Window,
};
