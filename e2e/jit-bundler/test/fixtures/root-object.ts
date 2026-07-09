import type { Client, AsObject } from "@backtickjs/core/cs-runtime";

class Color implements Client<AsObject<Color>> {
  "@backtickjs": AsObject<Color>;

  constructor(
    readonly r: number,
    readonly g: number,
    readonly b: number,
  ) {}
}

export default new Color(1, 2, 3);
