import type { TApply } from "./nodes/Apply.js";
import type { TArray } from "./nodes/Array.js";
import type { TBoolean } from "./nodes/Boolean.js";
import type { TFunction } from "./nodes/Function.js";
import type { TFunctionParameter } from "./nodes/FunctionParameter.js";
import type { TGeneric } from "./nodes/Generic.js";
import type { TIndex } from "./nodes/Index.js";
import type { TInterface } from "./nodes/Interface.js";
import type { TNull } from "./nodes/Null.js";
import type { TNumber } from "./nodes/Number.js";
import type { TObject } from "./nodes/Object.js";
import type { TRecord } from "./nodes/Record.js";
import type { TRef } from "./nodes/Ref.js";
import type { TRest } from "./nodes/Rest.js";
import type { TString } from "./nodes/String.js";
import type { TUnion } from "./nodes/Union.js";
import type { TUnknown } from "./nodes/Unknown.js";
import type { TVoid } from "./nodes/Void.js";

/**
 * A type a schema may hold, which is the set every generator can read.
 *
 * Closed, so a generator can be exhaustive: a kind added here without a case
 * to read it is a compile error where it is read, rather than a throw where it
 * is generated.
 *
 * Narrower than the languages that read it for the same reason: five of them
 * do, and a kind is only worth having where all of them can say it.
 */
export type TNode =
  | TString
  | TNumber
  | TBoolean
  | TUnion
  | TIndex
  | TInterface
  | TObject
  | TArray
  | TFunction
  | TVoid
  | TNull
  | TUnknown
  | TRecord
  | TRef
  | TRest
  | TGeneric
  | TApply
  | TFunctionParameter;
