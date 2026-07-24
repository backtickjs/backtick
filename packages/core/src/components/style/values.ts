import type { ClientValue, Prop } from "@backtickjs/cs-runtime";

// A named color, #hex, rgb()/rgba(), hsl()/hsla(), or "transparent".
export type Color = string;

// A length: logical pixels (number) or a percentage string like "50%".
export type Dimension = number | string;

// Every style property is optional and may be client-driven
export type Styled<T extends Record<string, ClientValue>> = {
  readonly [K in keyof T]?: Prop<T[K]>;
};
