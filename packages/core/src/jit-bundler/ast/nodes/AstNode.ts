import type { AstArray } from "./AstArray.js";
import type { AstBoolean } from "./AstBoolean.js";
import type { AstElement } from "./AstElement.js";
import type { AstNull } from "./AstNull.js";
import type { AstNumber } from "./AstNumber.js";
import type { AstObject } from "./AstObject.js";
import type { AstScript } from "./AstScript.js";
import type { AstScriptArray } from "./AstScriptArray.js";
import type { AstScriptArrow } from "./AstScriptArrow.js";
import type { AstScriptAssignment } from "./AstScriptAssignment.js";
import type { AstScriptBinop } from "./AstScriptBinop.js";
import type { AstScriptBlock } from "./AstScriptBlock.js";
import type { AstScriptBoolean } from "./AstScriptBoolean.js";
import type { AstScriptCall } from "./AstScriptCall.js";
import type { AstScriptIdentifier } from "./AstScriptIdentifier.js";
import type { AstScriptIf } from "./AstScriptIf.js";
import type { AstScriptNull } from "./AstScriptNull.js";
import type { AstScriptNumber } from "./AstScriptNumber.js";
import type { AstScriptObject } from "./AstScriptObject.js";
import type { AstScriptPropertyAccess } from "./AstScriptPropertyAccess.js";
import type { AstScriptReturn } from "./AstScriptReturn.js";
import type { AstScriptSplice } from "./AstScriptSplice.js";
import type { AstScriptString } from "./AstScriptString.js";
import type { AstScriptVariableDeclaration } from "./AstScriptVariableDeclaration.js";
import type { AstString } from "./AstString.js";

// A node parsed from a client script's source text. Every script node carries
// the source location it was parsed from.
export type AstScriptNode =
  | AstScriptArray
  | AstScriptArrow
  | AstScriptAssignment
  | AstScriptBinop
  | AstScriptBlock
  | AstScriptBoolean
  | AstScriptCall
  | AstScript
  | AstScriptIdentifier
  | AstScriptIf
  | AstScriptNull
  | AstScriptNumber
  | AstScriptObject
  | AstScriptPropertyAccess
  | AstScriptReturn
  | AstScriptSplice
  | AstScriptString
  | AstScriptVariableDeclaration;

// A node built from a value spliced into a client script. Splice values are
// resolved at runtime and have no source text, so a value node never has a
// location.
export type AstValueNode =
  | AstArray
  | AstBoolean
  | AstElement
  | AstNull
  | AstNumber
  | AstObject
  | AstString;

export type AstNode = AstScriptNode | AstValueNode;

export type AstRoot = AstScript | AstValueNode;
