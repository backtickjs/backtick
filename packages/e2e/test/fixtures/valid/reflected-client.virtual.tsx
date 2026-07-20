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
    return cs.liftValue(() => cs.splice(this.x) + cs.splice(this.y));
  }

  get invalid() {
    return;
  }
}

export default cs.liftAction((() => {
    const __cs_a = cs.splice(new Point(cs.liftValue(1), cs.liftValue(2)));
    const __cs_b = cs.splice(new Point(cs.liftValue(3), cs.liftValue(4)));
    cs.virtualize(__cs_a).valid();
})());
