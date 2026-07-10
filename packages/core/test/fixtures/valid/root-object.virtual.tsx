import type { Client, AsObject } from "@backtickjs/core/cs-runtime";

class Color implements Client<AsObject<Color>> {
  "@backtickjs/Client": AsObject<Color>;

  readonly r: number;
  readonly g: number;
  readonly b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

export default new Color(1, 2, 3);
