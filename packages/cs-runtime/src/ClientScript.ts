import type { SourceLocation } from "./SourceLocation.js";
import type { Spliceable } from "./Spliceable.js";
import type { Visitor } from "./Visitor.js";

export interface Metadata {
  filePath: string;
  // distinguishes same-named files across codebases (see `locKey`)
  fileHash: string;
  // spliced host values, under the keys the body uses (see `Visitor.splice`)
  splices: { [key: string]: Spliceable };
  // binding keys the script captures from an enclosing scope
  captures: string[];
  // binding keys the script declares itself
  declarations: string[];
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
  return {
    "@backtickjs": "ClientScript",
    loc,
    metadata,
    visit,
  };
}
