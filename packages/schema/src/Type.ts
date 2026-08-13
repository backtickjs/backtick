import { Array } from "./types/Array.js";
import { Boolean } from "./types/Boolean.js";
import { Element } from "./types/Element.js";
import { Function } from "./types/Function.js";
import { Generic } from "./types/Generic.js";
import { Interface } from "./types/Interface.js";
import { Literal } from "./types/Literal.js";
import { Null } from "./types/Null.js";
import { Number } from "./types/Number.js";
import { Object } from "./types/Object.js";
import { Optional } from "./types/Optional.js";
import { Parameter } from "./types/Parameter.js";
import { Ref } from "./types/Ref.js";
import { Rest } from "./types/Rest.js";
import { String } from "./types/String.js";
import { Union } from "./types/Union.js";
import { Void } from "./types/Void.js";

/**
 * How a schema is written: the nodes of `TSchema` and nothing else.
 *
 * Adding a kind is adding a case to every generator first, and a member here
 * second. `Unknown` is absent because nothing a target writes needs it — a
 * `Parameter` makes one when it is given no constraint.
 */
export const Type = {
  String,
  Number,
  Boolean,
  Literal,
  Union,
  Object,
  Array,
  Function,
  Void,
  Null,
  Ref,
  Optional,
  Rest,
  Generic,
  Parameter,
  Element,
  Interface,
};
