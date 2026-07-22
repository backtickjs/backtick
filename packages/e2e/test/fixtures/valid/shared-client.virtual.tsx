import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core";

class Point implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly x: Client<number>;
  readonly y: Client<number>;

  constructor(x: Client<number>, y: Client<number>) {
    this.x = x;
    this.y = y;
  }

  get sum() {
    return cs.lift(cs.value(() => cs.splice(this.x) + cs.splice(this.y)));
  }
}

// The same instance spliced through two scripts: it must lower once and be
// shared (its getters evaluated a single time), not re-expanded per path.
const shared = new Point(cs.lift(cs.value(1)), cs.lift(cs.value(2)));

const left = cs.lift(cs.value((() => {
    const __cs_p = cs.value(cs.splice((shared)));
    return cs.receiver(__cs_p).sum();
})()));

const right = cs.lift(cs.value((() => {
    const __cs_p = cs.value(cs.splice((shared)));
    return cs.receiver(__cs_p).x;
})()));

export default cs.lift(cs.value(cs.splice((left)) + cs.splice((right))));
