import type { Spliceable } from "./Spliceable.js";

// One parameter of a script's function. Splices and tags come first, in the
// order the script reads them, then captures.
export type Param =
  // a host value, passed as a function the script calls with `bindings`
  | { kind: "splice"; bindings: readonly string[] }
  // a host value used as a tag (`<$Card>`), passed as is: a tag can't be a call
  | { kind: "tag" }
  // a variable of the enclosing script
  | { kind: "capture"; key: string };

// The compiled code of one `cs`, shared by every script it creates.
export interface ClientModule {
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
  // `params[i]` is the function's `$splice<i>`, `$tag<i>` or `$capture<i>`
  readonly params: readonly Param[];
}

// One run of a `cs`: its module, and the values that run passes it.
export interface ClientScript {
  readonly "@backtickjs": "ClientScript";
  readonly module: ClientModule;
  // one per splice and tag, in parameter order
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
  module: ClientModule,
  args: readonly Spliceable[],
): ClientScript {
  return { "@backtickjs": "ClientScript", module, args };
}
