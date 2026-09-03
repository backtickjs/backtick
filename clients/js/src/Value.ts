// What a value is: seven cases, mirroring `clients/cpp/src/Value.h`.

export type Array = readonly Value[];

// Keys in the order they were written, which is what `Object.entries` gives.
export type Record = { readonly [key: string]: Value };

// No `undefined`: `null` is the only absent value the format has.
export type Value =
  | null
  | boolean
  | number
  | string
  | Array
  | Record
  | ((...args: Value[]) => Value);
