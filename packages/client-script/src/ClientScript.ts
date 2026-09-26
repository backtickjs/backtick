import type { Spliceable } from "@backtickjs/platform-sdk";

// What one of a script's parameters is handed: splices, then host tags, then
// captures.
export type Param =
  // a host value, called with the bindings its hole hands over
  | { kind: "splice"; value: Spliceable; bindings: string[] }
  // a host tag, handed over as the value it names
  | { kind: "tag"; value: Spliceable }
  // the binding key of an enclosing script's binding
  | { kind: "capture"; key: string };

export interface Metadata {
  // one per parameter: `params[i]` is `$i`
  params: Param[];
}

// One import declaration of a script's module: where it stands, so a bundle can
// replace it, and what it binds, so a bundle can bind it again.
export interface ModuleImport {
  readonly from: string;
  // `[start, end)` in the module's code
  readonly range: readonly [number, number];
  // `name` is the export: `"default"`, `"*"` for a namespace, or its name
  readonly bindings: readonly {
    readonly name: string;
    readonly local: string;
  }[];
}

// A script's code as a module, `export default ($0, …) => body` through the
// framework's compiler, and what a bundle needs to make an entry of it without
// parsing it.
export interface ScriptModule {
  readonly code: string;
  // The code's source map, as JSON, into the host file. It carries no
  // `sourcesContent`: the host file is the server's.
  readonly map: string;
  readonly imports: readonly ModuleImport[];
  // the offset of `export default ` in the code
  readonly exportAt: number;
}

export interface ClientScript {
  readonly "@backtickjs": "ClientScript";
  // Which script this is: `<fileHash>:<line>:<column>`, where it was written.
  // Two scripts with one id are one function-table entry, as a `cs` in a host
  // function called twice is. The file's hash is part of it because a position
  // alone recurs across files and codebases: two libraries compiled apart
  // could both have a script at `1:0`. With the hash, ids collide only when
  // the files' contents are identical, and then the scripts are the same.
  readonly id: string;
  readonly metadata: Metadata;
  // The script as the client runs it, compiled when the host was:
  // `metadata.params` are its default export's parameters. The same for every
  // script with its id, where `metadata` is one call's.
  readonly module: ScriptModule;
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
  id: string,
  metadata: Metadata,
  module: ScriptModule,
): ClientScript {
  return {
    "@backtickjs": "ClientScript",
    id,
    metadata,
    module,
  };
}
