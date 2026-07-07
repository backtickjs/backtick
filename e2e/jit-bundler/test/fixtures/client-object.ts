import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core/cs-runtime";

class Color implements Client<Color> {
  declare $$type: Color;

  constructor(
    readonly r: number,
    readonly g: number,
    readonly b: number,
  ) {}
}

export default cs`{
  const c = ${new Color(1, 2, 3)};
  return c.r + c.g + c.b;
}`;
