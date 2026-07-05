import type { SourceLocation } from "../../cs-runtime/index.js";
import type { RuntimeArray } from "./RuntimeArray.js";
import type { RuntimeBoolean } from "./RuntimeBoolean.js";
import type { RuntimeNull } from "./RuntimeNull.js";
import type { RuntimeNumber } from "./RuntimeNumber.js";
import type { RuntimeObject } from "./RuntimeObject.js";
import type { RuntimeString } from "./RuntimeString.js";

// A node parsed from a client script's source text. It carries the source
// location it was parsed from.
export interface SourceNode {
  readonly loc: SourceLocation;
}

// A node built from a value spliced into a client script. Splice values are
// resolved at runtime and have no source text, so a `RuntimeNode` never has a
// location.
export type RuntimeNode =
  | RuntimeNull
  | RuntimeBoolean
  | RuntimeNumber
  | RuntimeString
  | RuntimeArray
  | RuntimeObject;

export type AstNode = SourceNode | RuntimeNode;
