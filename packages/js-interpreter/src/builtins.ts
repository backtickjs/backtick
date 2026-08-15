import type { Builtins, Value } from "@backtickjs/cs-runtime";
import { createSignal } from "solid-js";

export const builtins: Builtins = {
  state(initial) {
    const [read, store] = createSignal(initial);
    const write = (value: typeof initial): Value => {
      store(() => value);
      return null;
    };
    const update = (updater: (current: typeof initial) => typeof initial) => {
      store((previous) => updater(previous));
      return null;
    };
    return { read, write, update };
  },
};
