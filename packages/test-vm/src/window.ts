import type { ClientOptions } from "@backtickjs/web-vm";
import { Window as Page } from "happy-dom";

/** What a script reaches through `$window`, as the client reads one. */
export type ScriptWindow = ClientOptions["window"];

// A page's window, as a script reaches it.
//
// Ids are this window's rather than the page's: a browser's `setTimeout`
// answers with the number the schema promises, and happy-dom's answers with an
// object. So the number a bundle sees is minted here, and the handle it stands
// for stays in the map. One pool for both kinds, so `clearTimeout` stops an
// interval and the other way round, as in a browser.
export function windowOf(page: Page): ScriptWindow {
  const pending = new Map<number, unknown>();
  let last = 0;

  const mint = (handle: unknown): number => {
    const id = ++last;
    pending.set(id, handle);
    return id;
  };

  const cancel = (id: number): void => {
    const held = pending.get(id);
    if (held !== undefined) {
      page.clearTimeout(held as never);
      page.clearInterval(held as never);
      pending.delete(id);
    }
  };

  // Written out rather than the page's window handed over, the way the web VM
  // writes out a page's: what a script reaches is these names and no more.
  return {
    performance: page.performance,
    console: page.console,
    location: page.location,
    addEventListener: (type: string, listener: unknown) => {
      page.addEventListener(type, listener as never);
    },
    removeEventListener: (type: string, listener: unknown) => {
      page.removeEventListener(type, listener as never);
    },
    postMessage: (message: unknown, targetOrigin: string) => {
      page.postMessage(message, targetOrigin);
    },
    setTimeout: (handler: () => void, timeout?: number) =>
      mint(
        page.setTimeout(() => {
          handler();
        }, timeout),
      ),
    clearTimeout: cancel,
    setInterval: (handler: () => void, timeout?: number) =>
      mint(page.setInterval(handler, timeout)),
    clearInterval: cancel,
  } as unknown as ScriptWindow;
}

// The page every unmounted drawing is built with: a bundle evaluated rather
// than mounted still builds the target's nodes, so it needs a document, and one
// page is enough where nothing is ever inserted into it.
//
// A page rather than a bare window, so a test that waits has a clock.
export const page = new Page();

// What a script evaluated against that page reaches through `$window`.
export const window = windowOf(page);
