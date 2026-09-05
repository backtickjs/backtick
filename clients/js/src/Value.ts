// What a value is: eight cases, mirroring `clients/cpp/src/Value.h`.

export type Array = readonly Value[];

// Keys in the order they were written, which is what `Object.entries` gives.
export type Record = { readonly [key: string]: Value };

// `undefined` is what an absent value reads as, and `null` is what a script
// wrote — the two are distinct, as they are in TypeScript.
export type Value =
  | null
  | undefined
  | boolean
  | number
  | string
  | Array
  | Record
  | ((...args: Value[]) => Value);
