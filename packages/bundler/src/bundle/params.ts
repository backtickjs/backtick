import type { ClientScript, Param } from "@backtickjs/core";

// What a script's module says about its parameters, the same for every run.

// The bindings a hole hands over. A tag hands over none.
export function bindingsOf(param: Param | undefined): readonly string[] {
  return param?.kind === "splice" ? param.bindings : [];
}

// The binding keys a script captures, in parameter order.
export function capturesOf(script: ClientScript): readonly string[] {
  return script.module.params.flatMap((param) =>
    param.kind === "capture" ? [param.key] : [],
  );
}
