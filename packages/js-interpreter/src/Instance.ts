import type { ClientUnknown, ClientValue } from "@backtickjs/core";
import type { Bundle, BundleFunctionLabel } from "@backtickjs/bundler";
import type { Renderer } from "solid-js/universal";

// A bundle paired with a host: what is needed to draw one, which neither of
// them holds alone. A bundle says what to draw and a host knows how, and an
// element reached anywhere in a body needs both — so this is what a scope
// carries, rather than either of them.
//
// One per mount rather than one per instantiation — a function's cells are
// bindings in its call, so nothing here differs between two of them.
export interface Instance {
  readonly bundle: Bundle<ClientUnknown>;
  readonly renderer: Renderer<object>;
  // Every name this client answers for, the language's own included, keyed
  // whole as the wire carries it. Built once here rather than merged at each
  // lookup: what a name means is settled before a bundle asks for it, and a
  // target colliding with the language is refused when its client is made.
  readonly builtins: Readonly<Record<string, ClientValue>>;
  // What each `functions` label evaluated to, for this host. A function is
  // evaluated once per mount, not once per reference: a fresh closure per
  // reference would be a fresh identity, and a prop holding one would be set
  // again every time its position is read.
  //
  // Keyed here rather than on the bundle because the closure holds this host —
  // the same function under a second host is a second closure.
  //
  // `ClientUnknown` rather than `ClientValue`: an entry may be an action, which
  // answers with nothing.
  readonly functions: Map<
    BundleFunctionLabel,
    (...args: ClientValue[]) => ClientUnknown
  >;
}
