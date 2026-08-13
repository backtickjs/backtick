import * as types from "./types/index.js";

/**
 * How a schema is written: the nodes of `SchemaNode` and nothing else.
 *
 * Adding a kind is adding a case to every generator first, and a member here
 * second. `Unknown` is absent because nothing a target writes needs it — a
 * `Parameter` makes one when it is given no constraint.
 */
export const Type = {
  String: types.String,
  Number: types.Number,
  Boolean: types.Boolean,
  Literal: types.Literal,
  Union: types.Union,
  Object: types.Object,
  Array: types.Array,
  Function: types.Function,
  Void: types.Void,
  Null: types.Null,
  Ref: types.Ref,
  Optional: types.Optional,
  Rest: types.Rest,
  Generic: types.Generic,
  Parameter: types.Parameter,
  Element: types.Element,
  Interface: types.Interface,
};
