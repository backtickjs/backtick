import type { ClientValue } from "@backtickjs/core";

// A window for the suite, which is the timers and nothing else.
//
// The language answers for no clock — a timer is the target's, and a script
// reaches one by splicing the window — so a fixture that waits needs a target
// to hand it one. `packages/web-client/src/builtins.ts` is the real target's,
// and carries the reasoning; what is here is the part a fixture uses.
//
// Ids are this table's rather than the host's: the schema says a script is
// handed a number, and Node answers its own `setTimeout` with an object.
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
} as unknown as ClientValue;
