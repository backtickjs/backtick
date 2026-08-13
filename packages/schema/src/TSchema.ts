import type { TArray } from "./types/Array.js";
import type { TBoolean } from "./types/Boolean.js";
import type { TFunction } from "./types/Function.js";
import type { TGeneric } from "./types/Generic.js";
import type { TInterface } from "./types/Interface.js";
import type { TNull } from "./types/Null.js";
import type { TNumber } from "./types/Number.js";
import type { TObject } from "./types/Object.js";
import type { TRef } from "./types/Ref.js";
import type { TRest } from "./types/Rest.js";
import type { TString } from "./types/String.js";
import type { TUnion } from "./types/Union.js";
import type { TUnknown } from "./types/Unknown.js";
import type { TVoid } from "./types/Void.js";

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
export type TSchema =
  | TString
  | TNumber
  | TBoolean
  | TUnion
  | TInterface
  | TObject
  | TArray
  | TFunction
  | TVoid
  | TNull
  | TUnknown
  | TRef
  | TRest
  | TGeneric;
