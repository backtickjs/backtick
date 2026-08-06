import type { Client, ClientValue, Prop } from "@backtickjs/cs-runtime";

// A named color, #hex, rgb()/rgba(), hsl()/hsla(), or "transparent".
export type Color = string;

// A length: logical pixels (number) or a percentage string like "50%".
export type Dimension = number | string;

// Every style property is optional and may be client-driven — and so may the
// whole of it, which is what a script writing an element needs: everything it
// writes is client code, so the object it hands over is a `Client` of one
// rather than an object of `Client` members.
export type Styled<T extends Record<string, ClientValue>> =
  | { readonly [K in keyof T]?: Prop<T[K]> }
  | Client<{ readonly [K in keyof T]?: T[K] }>;
