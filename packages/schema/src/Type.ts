import { Apply } from "./nodes/Apply.js";
import { Array } from "./nodes/Array.js";
import { Boolean } from "./nodes/Boolean.js";
import { Class } from "./nodes/Class.js";
import { Element } from "./nodes/Element.js";
import { Function } from "./nodes/Function.js";
import { Generic } from "./nodes/Generic.js";
import { Interface } from "./nodes/Interface.js";
import { Literal } from "./nodes/Literal.js";
import { Null } from "./nodes/Null.js";
import { Number } from "./nodes/Number.js";
import { Object } from "./nodes/Object.js";
import { Optional } from "./nodes/Optional.js";
import { Parameter } from "./nodes/Parameter.js";
import { Ref } from "./nodes/Ref.js";
import { Rest } from "./nodes/Rest.js";
import { String } from "./nodes/String.js";
import { Union } from "./nodes/Union.js";
import { Void } from "./nodes/Void.js";

/**
 * How a schema is written: the nodes of `TNode` and nothing else.
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
  Apply,
  Element,
  Interface,
  Class,
};
