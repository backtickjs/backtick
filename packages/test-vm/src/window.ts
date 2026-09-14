import type { HostWindow } from "@backtickjs/web-vm";

// A window for a test: the process's clock and console, and nothing a page
// has. What a script reaches through `$window` is the web VM's to write out;
// this is only what it reads through to.
//
// Ids are this window's rather than the host's: a browser's `setTimeout`
// answers with the number the schema promises, and Node's answers with an
// object. So the number a bundle sees is minted here, and the handle it stands
// for stays in the map.
const pending = new Map<number, ReturnType<typeof globalThis.setTimeout>>();
let last = 0;

function cancel(id: number): void {
  const held = pending.get(id);
  if (held !== undefined) {
    globalThis.clearTimeout(held);
    globalThis.clearInterval(held);
    pending.delete(id);
  }
}

// What a page has and a process does not, refused where it is reached.
function absent(what: string): never {
  throw new Error(`a test has no ${what}`);
}

export const window: HostWindow = {
  performance: globalThis.performance,
  console: globalThis.console,
  addEventListener: () => absent("window events"),
  removeEventListener: () => absent("window events"),
  postMessage: () => absent("window to post to"),
  get location(): never {
    return absent("location");
  },
  setTimeout: (handler, timeout) => {
    const id = ++last;
    pending.set(
      id,
      globalThis.setTimeout(() => {
        pending.delete(id);
        handler();
      }, timeout),
    );
    return id;
  },
  clearTimeout: cancel,
  setInterval: (handler, timeout) => {
    const id = ++last;
    pending.set(id, globalThis.setInterval(handler, timeout));
    return id;
  },
  clearInterval: cancel,
};
