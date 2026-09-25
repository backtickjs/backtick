import type { ClientScript, Param } from "@backtickjs/client-script";

// What a script's parameters say about its shape, which is all an entry
// reads: one `ClientScript` stands for every script with its id, so its host
// values are one call site's and never read here.

// The bindings a hole hands over. A tag hands over none.
export function bindingsOf(param: Param | undefined): readonly string[] {
  return param?.kind === "splice" ? param.bindings : [];
}

// The binding keys a script captures, in parameter order.
export function capturesOf(script: ClientScript): readonly string[] {
  return script.metadata.params.flatMap((param) =>
    param.kind === "capture" ? [param.key] : [],
  );
}
