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

export default cs.liftValue((() => {
    const __cs_c = cs.splice(new Color(cs.liftValue(30), cs.liftValue(144), cs.liftValue(255)));
    const __cs_brightness = cs.virtualize(__cs_c).r + cs.virtualize(__cs_c).g + cs.virtualize(__cs_c).b;
    if (__cs_brightness > 382) {
        return "light";
    }
    return "dark";
})());
