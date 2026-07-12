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
    return cs.lift(() => cs.lower(this.r) + 2);
  }
}

export default cs.lift((() => {
    const __cs_pick = (__cs_c: Spliced<Color>) => __cs_c.r + 1;
    return __cs_pick(cs.lower(new Color(cs.lift(7), "#123")));
})());
