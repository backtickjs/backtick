import type { ClientScript, Param } from "@backtickjs/core";

// What a script's module says about its parameters, the same for every run.

// The bindings a hole hands over. A capture hands over none.
export function bindingsOf(param: Param | undefined): readonly string[] {
  return param?.kind === "splice" ? param.bindings : [];
}

// Whether a script is one value for the bundle, made once at its top: a
// `once` script, a function and a class, as a module-level one is. A function
// or a class that reads a variable of the script around it, itself or through
// what it's handed, is made where it's read instead (see `valueOf`).
export function isValue(script: ClientScript): boolean {
  return (
    script.once === true ||
    script.module.kind === "function" ||
    script.module.kind === "class"
  );
}

// The binding keys a script captures, in parameter order.
export function capturesOf(script: ClientScript): readonly string[] {
  return script.module.params.flatMap((param) =>
    param.kind === "capture" ? [param.key] : [],
  );
}
