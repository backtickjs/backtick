import type { Bundle, FunctionLabel } from "@backtickjs/core";
import type { Compiled, Executed } from "./interpret.js";
import type { Value } from "./Value.js";
import type { Host } from "./view.js";

// A bundle paired with a host: what is needed to draw one, which neither of
// them holds alone. A bundle says what to draw and a host knows how, and an
// element reached anywhere in a body needs both — so this is what a scope
// carries, rather than either of them.
//
// One per mount rather than one per instantiation — a function's cells are
// bindings in its call, so nothing here differs between two of them.
export interface Instance {
  readonly bundle: Bundle;
  readonly host: Host;
  // What each `functions` label evaluated to, for this host. A function is
  // evaluated once per mount, not once per reference: a fresh closure per
  // reference would be a fresh identity, and a prop holding one would be set
  // again every time its position is read.
  //
  // Keyed here rather than on the bundle because the closure holds this host —
  // the same function under a second host is a second closure.
  readonly functions: Map<FunctionLabel, (...args: Value[]) => Value>;
  // A node is compiled once into the closure that evaluates it. Held here
  // rather than in a table of its own for the same reason as `functions`: a
  // closure holds the mount it was compiled for, so the same node under a
  // second mount is a second closure.
  readonly nodes: WeakMap<object, Compiled>;
  readonly statements: WeakMap<object, Executed>;
}
