import type { Spliceable } from "@backtickjs/platform-sdk";
import type * as ES from "estree";
import type {} from "./Splice.js";

// A hole: what is spliced there, and what it hands whatever lands in it.
export interface MetadataSplice {
  value: Spliceable;
  params: string[];
}

export interface Metadata {
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
  readonly loc: ES.SourceLocation;
  readonly metadata: Metadata;
  // The script's syntax, behind a thunk: one `cs` in a host function makes a
  // `ClientScript` per call, and the bundler parses one per source location, so
  // the nodes are built when they are first read rather than at every call.
  readonly body: () => ES.Expression | ES.BlockStatement;
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
  loc: ES.SourceLocation,
  metadata: Metadata,
  body: () => ES.Expression | ES.BlockStatement,
): ClientScript {
  return {
    "@backtickjs": "ClientScript",
    loc,
    metadata,
    body,
  };
}
