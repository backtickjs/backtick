import type { Window } from "@backtickjs/web-client";

// A window for a test, which is the timers and nothing else.
//
// The language answers for no clock — a timer is the client's, and a script
// reaches one by splicing the window — so a bundle that waits needs a client
// to hand it one. `packages/web-vm/src/builtins.ts` is the real client's, and
// carries the reasoning; what is here is the part a test uses.
//
// Ids are this table's rather than the host's, which is what the web VM does
// not have to do: a browser's `setTimeout` answers with the number the
// schema promises, and Node's answers with an object. So the number a bundle
// sees is minted here, and the handle it stands for stays in the map.
const pending = new Map<number, ReturnType<typeof globalThis.setTimeout>>();
let last = 0;

function cancel(id: number): null {
  const held = pending.get(id);
  if (held !== undefined) {
    globalThis.clearTimeout(held);
    globalThis.clearInterval(held);
    pending.delete(id);
  }
  return null;
}

export const window = {
  setTimeout: (handler: () => void, timeout?: number) => {
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
  setInterval: (handler: () => void, timeout?: number) => {
    const id = ++last;
    pending.set(id, globalThis.setInterval(handler, timeout));
    return id;
  },
  clearInterval: cancel,
  // Cast through the brand, as the web VM's window is.
} as unknown as Window;
