import type { ClientUnknown, ClientValue } from "@backtickjs/core";
import type { Bundle, BundleFunctionLabel } from "@backtickjs/language";
import type { Renderer as SolidRenderer } from "solid-js/universal";

// A bundle paired with a host: what is needed to draw one, which neither of
// them holds alone. A bundle says what to draw and a host knows how, and an
// element reached anywhere in a body needs both — so this is what a scope
// carries, rather than either of them.
//
// One per mount rather than one per instantiation — a function's cells are
// bindings in its call, so nothing here differs between two of them.
export interface Instance {
  readonly bundle: Bundle<ClientUnknown>;
  // `object` rather than the target's node type: every node this holds came
  // from the target and goes back to it untouched, so what it is, is the
  // target's business throughout.
  readonly renderer: SolidRenderer<object>;
  // The host's window, which `window` is read through.
  readonly window: typeof window;
  // What the target answers for beside the client's own names, asked only after
  // those have not answered.
  readonly compileBuiltin?: (name: string) => ClientValue;
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
