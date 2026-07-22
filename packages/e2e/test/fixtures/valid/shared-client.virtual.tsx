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
    return cs.liftValue(() => cs.spliceValue(this.x) + cs.spliceValue(this.y));
  }
}

// The same instance spliced through two scripts: it must lower once and be
// shared (its getters evaluated a single time), not re-expanded per path.
const shared = new Point(cs.liftValue(1), cs.liftValue(2));

const left = cs.liftValue((() => {
    const __cs_p = cs.spliceValue((shared));
    return cs.receiver(__cs_p).sum();
})());

const right = cs.liftValue((() => {
    const __cs_p = cs.spliceValue((shared));
    return cs.receiver(__cs_p).x;
})());

export default cs.liftValue(cs.spliceValue((left)) + cs.spliceValue((right)));
