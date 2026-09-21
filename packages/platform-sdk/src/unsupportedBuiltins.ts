// What TypeScript lends a type that doesn't declare a member itself: its lib's
// `Object` to every object, and `Function` to every function. No client answers
// any of it, so each receiver extends the interface here naming what it doesn't
// declare, and its own declaration hides the lent one.

declare const unsupported: unique symbol;

/**
 * A member no client answers: it can't be called, passed, compared or
 * returned.
 */
export interface UnsupportedBuiltin {
  readonly [unsupported]: never;
}

export interface ObjectUnsupportedBuiltins {
  readonly constructor: UnsupportedBuiltin;
  readonly hasOwnProperty: UnsupportedBuiltin;
  readonly isPrototypeOf: UnsupportedBuiltin;
  readonly propertyIsEnumerable: UnsupportedBuiltin;
  readonly toLocaleString: UnsupportedBuiltin;
  readonly toString: UnsupportedBuiltin;
  readonly valueOf: UnsupportedBuiltin;
}

export interface FunctionUnsupportedBuiltins extends ObjectUnsupportedBuiltins {
  readonly apply: UnsupportedBuiltin;
  readonly arguments: UnsupportedBuiltin;
  readonly bind: UnsupportedBuiltin;
  readonly call: UnsupportedBuiltin;
  readonly caller: UnsupportedBuiltin;
  readonly length: UnsupportedBuiltin;
  readonly name: UnsupportedBuiltin;
  readonly prototype: UnsupportedBuiltin;
}

export interface BooleanUnsupportedBuiltins {
  readonly constructor: UnsupportedBuiltin;
  readonly hasOwnProperty: UnsupportedBuiltin;
  readonly isPrototypeOf: UnsupportedBuiltin;
  readonly propertyIsEnumerable: UnsupportedBuiltin;
  readonly toLocaleString: UnsupportedBuiltin;
  readonly toString: UnsupportedBuiltin;
}

export interface NumberUnsupportedBuiltins {
  readonly constructor: UnsupportedBuiltin;
  readonly hasOwnProperty: UnsupportedBuiltin;
  readonly isPrototypeOf: UnsupportedBuiltin;
  readonly propertyIsEnumerable: UnsupportedBuiltin;
  readonly toLocaleString: UnsupportedBuiltin;
}

export interface StringUnsupportedBuiltins {
  readonly constructor: UnsupportedBuiltin;
  readonly hasOwnProperty: UnsupportedBuiltin;
  readonly isPrototypeOf: UnsupportedBuiltin;
  readonly propertyIsEnumerable: UnsupportedBuiltin;
  readonly toLocaleString: UnsupportedBuiltin;
}

export interface ArrayUnsupportedBuiltins extends ObjectUnsupportedBuiltins {}

export interface JSONUnsupportedBuiltins extends ObjectUnsupportedBuiltins {}

export interface MathUnsupportedBuiltins extends ObjectUnsupportedBuiltins {}

export interface ArrayConstructorUnsupportedBuiltins extends ObjectUnsupportedBuiltins {}

export interface NumberConstructorUnsupportedBuiltins extends ObjectUnsupportedBuiltins {}

export interface ObjectConstructorUnsupportedBuiltins extends ObjectUnsupportedBuiltins {}

export interface StringConstructorUnsupportedBuiltins extends ObjectUnsupportedBuiltins {}
