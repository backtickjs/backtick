import { cs } from "@backtickjs/core";
import type { Client, ClientObject, Spliced } from "@backtickjs/core/cs-runtime";

// Annotations pass into the virtual verbatim, so a parameter receiving a
// spliced instance is written in spliced terms: `Spliced<Color>` is the plain
// object the client sees — `c.r` is a number, not a `Client<number>`.
class Color implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly r: Client<number>;
  readonly hex: string;

  constructor(r: Client<number>, hex: string) {
    this.r = r;
    this.hex = hex;
  }

  get update() {
    return cs`() => ${this.r} + 2`;
  }
}

export default cs`{
  const pick = (c: Spliced<Color>) => c.r + 1;
  return pick(${new Color(cs`7`, "#123")});
}`;
