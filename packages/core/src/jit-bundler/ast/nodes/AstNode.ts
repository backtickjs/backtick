import type { RuntimeArray } from "./RuntimeArray.js";
import type { RuntimeBoolean } from "./RuntimeBoolean.js";
import type { RuntimeNull } from "./RuntimeNull.js";
import type { RuntimeNumber } from "./RuntimeNumber.js";
import type { RuntimeObject } from "./RuntimeObject.js";
import type { RuntimeString } from "./RuntimeString.js";
import type { SourceArray } from "./SourceArray.js";
import type { SourceArrow } from "./SourceArrow.js";
import type { SourceAssignment } from "./SourceAssignment.js";
import type { SourceBinop } from "./SourceBinop.js";
import type { SourceBlock } from "./SourceBlock.js";
import type { SourceBoolean } from "./SourceBoolean.js";
import type { SourceCall } from "./SourceCall.js";
import type { SourceClientScript } from "./SourceClientScript.js";
import type { SourceIdentifier } from "./SourceIdentifier.js";
import type { SourceIf } from "./SourceIf.js";
import type { SourceNull } from "./SourceNull.js";
import type { SourceNumber } from "./SourceNumber.js";
import type { SourceObject } from "./SourceObject.js";
import type { SourcePropertyAccess } from "./SourcePropertyAccess.js";
import type { SourceReturn } from "./SourceReturn.js";
import type { SourceSplice } from "./SourceSplice.js";
import type { SourceString } from "./SourceString.js";

// A node parsed from a client script's source text. Every source node carries
// the source location it was parsed from.
export type SourceNode =
  | SourceArray
  | SourceArrow
  | SourceAssignment
  | SourceBinop
  | SourceBlock
  | SourceBoolean
  | SourceCall
  | SourceClientScript
  | SourceIdentifier
  | SourceIf
  | SourceNull
  | SourceNumber
  | SourceObject
  | SourcePropertyAccess
  | SourceReturn
  | SourceSplice
  | SourceString;

// A node built from a value spliced into a client script. Splice values are
// resolved at runtime and have no source text, so a `RuntimeNode` never has a
// location.
export type RuntimeNode =
  | RuntimeArray
  | RuntimeBoolean
  | RuntimeNull
  | RuntimeNumber
  | RuntimeObject
  | RuntimeString;

export type AstNode = SourceNode | RuntimeNode;
