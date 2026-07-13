import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core/cs-runtime";

// A script parameter annotated with the host class directly: the spliced
// argument stays typed `Color`, and member access virtualizes — `c.r` reads
// the `Client<number>` field as `number` — so the natural spelling checks.
class Color implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly r: Client<number>;
  readonly hex: string;

  constructor(r: Client<number>, hex: string) {
    this.r = r;
    this.hex = hex;
  }

  get update() {
    return cs.lift(() => cs.splice(this.r) + 2);
  }
}

export default cs.lift((() => {
    const __cs_pick = (__cs_c: Color) => cs.virtualize(cs.autobox(__cs_c)).r + 1;
    return __cs_pick(cs.splice(new Color(cs.lift(7), "#123")));
})());
