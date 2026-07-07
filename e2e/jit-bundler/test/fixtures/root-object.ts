import type { Client } from "@backtickjs/core/cs-runtime";

class Color implements Client<Color> {
  "@backtickjs": Color;

  constructor(
    readonly r: number,
    readonly g: number,
    readonly b: number,
  ) {}
}

export default new Color(1, 2, 3);
