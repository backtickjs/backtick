import { createSignal } from "solid-js";
import type { Value } from "./Value.js";

// A cell's storage and the handle that reaches it. The writers yield `null`
// because `void` is not a value this language has.
export function makeState(initial: Value): Value {
  const [read, store] = createSignal<Value>(initial);
  // Through the updater form: a setter handed a function reads it as one, and a
  // cell may hold a function.
  const write = (value: Value): Value => {
    store(() => value);
    return null;
  };
  const update = (updater: (current: Value) => Value): Value => {
    store((previous) => updater(previous));
    return null;
  };
  return { read, write, update: update as Value };
}
