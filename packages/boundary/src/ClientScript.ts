import { assertVersion } from "./assertVersion.js";
import type { SourceLocation } from "./SourceLocation.js";
import type { ClientScriptBody } from "./Ast.js";

// A hole: what is spliced there, and what it hands whatever lands in it.
//
// `unknown`, and not the `Spliceable` it is: what may be spliced is the
// language's to say, and the language is generated from a schema built on top
// of this. The bundler, which knows both ends, is where it is read as one.
export interface MetadataSplice {
  value: unknown;
  params: string[];
}

export interface Metadata {
  // the version of the toolchain that emitted this script
  version: string;
  // names the source file for humans; identity comes from `fileHash` and `loc`
  filePath: string;
  // distinguishes same-named files across codebases (see `locKey`)
  fileHash: string;
  // spliced host values, under the keys the body uses (see `ClientScriptSplice`)
  splices: { [key: string]: MetadataSplice };
  // binding keys the script captures from an enclosing scope
  captures: string[];
}

export interface ClientScript {
  readonly "@backtickjs": "ClientScript";
  readonly loc: SourceLocation;
  readonly metadata: Metadata;
  // The script's syntax, behind a thunk: one `cs` in a host function makes a
  // `ClientScript` per call, and the bundler parses one per source location, so
  // the nodes are built when they are first read rather than at every call.
  readonly body: () => ClientScriptBody;
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
  loc: SourceLocation,
  metadata: Metadata,
  body: () => ClientScriptBody,
): ClientScript {
  assertVersion(metadata.version);
  return {
    "@backtickjs": "ClientScript",
    loc,
    metadata,
    body,
  };
}
