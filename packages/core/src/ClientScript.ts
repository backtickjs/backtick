import type { Spliceable } from "./Spliceable.js";

// One parameter of a script's function. Splices come first, in the order the
// script reads them, then captures.
export type Param =
  // a host value, passed as a function the script calls with `bindings`
  // wherever it reads it, a tag (`<$Card>`) among them
  | { kind: "splice"; bindings: readonly string[] }
  // a variable of the enclosing script
  | { kind: "capture"; key: string };

// The compiled code of one `cs`, shared by every script it creates.
export interface ScriptModule {
  // `<fileHash>:<line>:<column>` of the `cs`. The hash keeps ids from two
  // files apart: they match only when the files are identical.
  readonly id: string;
  // A module-table entry, `(module, exports, require) => { … }`, whose default
  // export is the script's function.
  readonly code: string;
  // Source map into the host file, without its content.
  readonly map: string;
  // The modules `code` requires.
  readonly dependencies: readonly string[];
  // `params[i]` is the function's `$splice<i>` or `$capture<i>`
  readonly params: readonly Param[];
  // What the script is written as: a function, `(props) => …`; a class,
  // `class … {}`; an expression; or a block, which is the function it runs.
  readonly kind: "function" | "class" | "expression" | "block";
  // Where its `cs` is written in its host file: at the module's top level,
  // run once, so its value is the app's, shared by every bundle of it, as a
  // module-level `const` is; or in a function, run each call, so each value
  // is its bundle's own.
  readonly scope: "module" | "function";
}

// One run of a `cs`: its module, and the values that run passes it. The rest
// are flags, how the bundle treats the script: each optional, absent meaning
// the plain script, so code that makes or spreads a script without knowing a
// flag reads the same.
export interface ClientScript {
  readonly "@backtickjs": "ClientScript";
  readonly module: ScriptModule;
  // one per splice, in parameter order
  readonly args: readonly Spliceable[];
}

export function isClientScript(value: unknown): value is ClientScript {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "ClientScript"
  );
}

export function create(
  module: ScriptModule,
  args: readonly Spliceable[],
): ClientScript {
  return { "@backtickjs": "ClientScript", module, args };
}
