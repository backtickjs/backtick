import { Type as TypeBox } from "typebox";

/**
 * How a schema is written: the nodes of `SchemaNode` and nothing else.
 *
 * TypeBox builds far more — `Date`, `BigInt`, arrays, template literals — and
 * a schema holding one of those would typecheck and then fail where it was
 * read. So a target writes against this rather than against TypeBox, and a
 * node no generator knows is a name that does not exist.
 *
 * Adding a kind is adding a case to every generator first, and a member here
 * second. `Unsafe` is deliberately absent: a node no guard can narrow is a
 * node no generator can be exhaustive about.
 */
export const Type = {
  String: TypeBox.String,
  Number: TypeBox.Number,
  Boolean: TypeBox.Boolean,
  Literal: TypeBox.Literal,
  Union: TypeBox.Union,
  Intersect: TypeBox.Intersect,
  Object: TypeBox.Object,
  Array: TypeBox.Array,
  Function: TypeBox.Function,
  Void: TypeBox.Void,
  Null: TypeBox.Null,
  Ref: TypeBox.Ref,
  Optional: TypeBox.Optional,
  Rest: TypeBox.Rest,
  Generic: TypeBox.Generic,
  Parameter: TypeBox.Parameter,
};
