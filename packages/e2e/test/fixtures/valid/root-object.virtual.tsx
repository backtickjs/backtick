import type { ClientObject } from "@backtickjs/core";

class Color implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

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
