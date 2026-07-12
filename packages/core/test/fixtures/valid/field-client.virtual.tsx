import type { Client, ClientObject } from "@backtickjs/core/cs-runtime";
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
    const __cs_c = cs.lower(new Color(cs.lift(30), cs.lift(144), cs.lift(255)));
    const __cs_brightness = __cs_c.r + __cs_c.g + __cs_c.b;
    if (__cs_brightness > 382) {
        return "light";
    }
    return "dark";
})());
