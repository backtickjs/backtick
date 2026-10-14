import type { ClientScript, Param } from "@backtickjs/core";

// What a script's module says about its parameters, the same for every run.

// The bindings a hole hands over. A capture hands over none.
export function bindingsOf(param: Param | undefined): readonly string[] {
  return param?.kind === "splice" ? param.bindings : [];
}

// Whether a script is one value for the bundle, made once at its top: a
// `once` script, and a class that reads nothing of the script around it, as a
// module-level class is one class.
export function isValue(script: ClientScript): boolean {
  return (
    script.once === true ||
    (script.module.kind === "class" && capturesOf(script).length === 0)
  );
}

// The binding keys a script captures, in parameter order.
export function capturesOf(script: ClientScript): readonly string[] {
  return script.module.params.flatMap((param) =>
    param.kind === "capture" ? [param.key] : [],
  );
}
