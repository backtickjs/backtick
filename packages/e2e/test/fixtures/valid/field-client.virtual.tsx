import type { Client, ClientObject } from "@backtickjs/core";
import { cs } from "@backtickjs/core";

class Color implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly r: Client<number>;
  readonly g: Client<number>;
  readonly b: Client<number>;

  constructor(r: Client<number>, g: Client<number>, b: Client<number>) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

export default cs.lift((() => {
    const __cs_c = cs.const(cs.splice(new Color(cs.lift(cs.const(30)), cs.lift(cs.const(144)), cs.lift(cs.const(255)))));
    const __cs_brightness = cs.const(cs.receiver(__cs_c).r + cs.receiver(__cs_c).g + cs.receiver(__cs_c).b);
    if (__cs_brightness > 382) {
        return cs.const("light");
    }
    return cs.const("dark");
})());
