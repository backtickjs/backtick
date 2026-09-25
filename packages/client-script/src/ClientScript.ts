import type { Spliceable } from "@backtickjs/platform-sdk";
import type * as ES from "estree";
import type {} from "./Splice.js";

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
  // The script's syntax, behind a thunk: one `cs` in a host function makes a
  // `ClientScript` per call, and the bundler parses one per source location, so
  // the nodes are built when they are first read rather than at every call.
  readonly body: () => ES.Expression | ES.BlockStatement;
  // The script as its bundle entry, `($0, …) => body`, compiled when the host
  // was: `metadata.params` are its parameters, and JSX is as written.
  readonly code: string;
  // The code's source map, as JSON, into the host file.
  readonly map: string;
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
  body: () => ES.Expression | ES.BlockStatement,
  code: string,
  map: string,
): ClientScript {
  return {
    "@backtickjs": "ClientScript",
    id,
    metadata,
    body,
    code,
    map,
  };
}
