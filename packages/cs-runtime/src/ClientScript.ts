import { assertVersion } from "./assertVersion.js";
import type { SourceLocation } from "./SourceLocation.js";
import type { Spliceable } from "@backtickjs/language-schema";
import type { ClientScriptBody } from "./Ast.js";

export interface Metadata {
  // the version of the toolchain that emitted this script
  version: string;
  // names the source file for humans; identity comes from `fileHash` and `loc`
  filePath: string;
  // distinguishes same-named files across codebases (see `locKey`)
  fileHash: string;
  // the compiler's classification: a value script returns on every path;
  // an action completes without returning
  kind: "value" | "action";
  // spliced host values, under the keys the body uses (see `ClientScriptSplice`)
  splices: { [key: string]: Spliceable };
  // binding keys the script captures from an enclosing scope
  captures: string[];
  // for each splice, this script's own bindings a fragment landing at that hole
  // can reach: bound above the hole, and wanted by something. What the hole
  // hands whatever arrives there.
  spliceParams: { [splice: string]: string[] };
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
