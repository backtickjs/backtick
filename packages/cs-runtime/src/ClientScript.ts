import { assertVersion } from "./assertVersion.js";
import type { SourceLocation } from "./SourceLocation.js";
import type { Spliceable } from "./Spliceable.js";
import type { Visitor } from "./Visitor.js";

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
  // spliced host values, under the keys the body uses (see `Visitor.splice`)
  splices: { [key: string]: Spliceable };
  // binding keys the script captures from an enclosing scope
  captures: string[];
  // for each splice, the declarations bound where that hole sits — what the
  // hole hands the thunk carrying whatever lands there. Declared above the hole,
  // so a binding inside its own initializer is not one of them.
  spliceScopes: { [splice: string]: string[] };
}

export interface ClientScript {
  readonly "@backtickjs": "ClientScript";
  readonly loc: SourceLocation;
  readonly metadata: Metadata;
  readonly visit: <U>(visitor: Visitor<U>) => U;
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
  visit: <U>(visitor: Visitor<U>) => U,
): ClientScript {
  assertVersion(metadata.version);
  return {
    "@backtickjs": "ClientScript",
    loc,
    metadata,
    visit,
  };
}
