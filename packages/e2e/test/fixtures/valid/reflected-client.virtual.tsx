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

  get valid() {
    return cs.liftValue(() => cs.spliceValue(this.x) + cs.spliceValue(this.y));
  }

  get invalid() {
    return;
  }
}

export default cs.liftAction((() => {
    const __cs_a = cs.value(cs.spliceValue(new Point(cs.liftValue(1), cs.liftValue(2))));
    const __cs_b = cs.value(cs.spliceValue(new Point(cs.liftValue(3), cs.liftValue(4))));
    const __cs_sum = cs.value(cs.receiver(__cs_a).valid() + cs.receiver(__cs_b).valid());
})());
