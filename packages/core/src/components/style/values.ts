import type { Client, ClientValue, Prop } from "@backtickjs/cs-runtime";

// Every style property is optional and may be client-driven — and so may the
// whole of it, which is what a script writing an element needs: everything it
// writes is client code, so the object it hands over is a `Client` of one
// rather than an object of `Client` members.
export type Styled<T extends Record<string, ClientValue>> =
  | { readonly [K in keyof T]?: Prop<T[K]> }
  | Client<{ readonly [K in keyof T]?: T[K] }>;
