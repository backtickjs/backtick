import { Apply } from "./nodes/Apply.js";
import { Array } from "./nodes/Array.js";
import { Boolean } from "./nodes/Boolean.js";
import { Function } from "./nodes/Function.js";
import { Generic } from "./nodes/Generic.js";
import { Index } from "./nodes/Index.js";
import { Interface } from "./nodes/Interface.js";
import { Literal } from "./nodes/Literal.js";
import { Never } from "./nodes/Never.js";
import { Null } from "./nodes/Null.js";
import { Undefined } from "./nodes/Undefined.js";
import { Number } from "./nodes/Number.js";
import { Object } from "./nodes/Object.js";
import { Optional } from "./nodes/Optional.js";
import { FunctionParameter } from "./nodes/FunctionParameter.js";
import { GenericParameter } from "./nodes/GenericParameter.js";
import { Record } from "./nodes/Record.js";
import { Ref } from "./nodes/Ref.js";
import { Rest } from "./nodes/Rest.js";
import { String } from "./nodes/String.js";
import { Tuple } from "./nodes/Tuple.js";
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
  Record,
  Array,
  Tuple,
  Function,
  Void,
  Never,
  Null,
  Undefined,
  Ref,
  Optional,
  Rest,
  Generic,
  GenericParameter,
  FunctionParameter,
  Apply,
  Index,
  Interface,
};
